import { useState } from 'react';

// Hook personalizado para manipulação de texto
function useTextManipulation() {
  const [text, setText] = useState('');

  const splitClasses = (code: string): string[] => {
    // Usando regex para encontrar as definições de classe com ou sem herança
    const classPattern: RegExp = new RegExp(
      /class\s+(\w+)\s*(\((.*?)\))?:\s*(.*?)\s*(?=class|\Z)/, 'gs');
    const classMatches: RegExpExecArray[] = [...code.matchAll(classPattern)];

    // Lista para armazenar as partes divididas do código
    const splitCode: string[] = [];

    // Índice de início da próxima classe
    let startIndex: number = 0;

    // Dividindo o código em partes com base nas definições de classe
    for (const match of classMatches) {
      const className: string = match[1];
      const inheritance: string = match[3];
      const classContent: string = match[4];
      const classStart: number = match.index!;
      const classEnd: number = classStart + match[0].length;

      // Adicionando parte do código antes da definição da classe atual
      splitCode.push(code.substring(startIndex, classStart));

      // Construindo a definição da classe atual
      let classDefinition: string = `class ${className}`;
      if (inheritance) {
        classDefinition += `(${inheritance})`;
      }
      classDefinition += `:\n${classContent}\n`;
      splitCode.push(classDefinition);

      // Atualizando o índice de início para a próxima iteração
      startIndex = classEnd;
    }

    // Adicionando a parte final do código após a última classe
    splitCode.push(code.substring(startIndex));

    return splitCode;
  }

  function identificar_nome_da_classe(classe: string): string {
    const padrao = /\bclass\s+(\w+)\b/;
    const match = classe.match(padrao);

    if (match) {
      return match[1];
    } else {
      return '';
    }
  }

  function encontrar_variaveis_e_tipos_do_construtor(classe: string){
    const padrao = /\b__init__\b\s*\(.*?\):/;
    const match = classe.match(padrao);

    const variaveis_e_tipos = [];

    if (match) {
      const construtor = match[0];
      const parametros = construtor.match(/\b(\w+)\s*:\s*(\w+)\b/g);

      if (parametros != null){
        for (const param of parametros) {
          const [variavel, tipo] = param.split(':').map(item => item.trim());
          variaveis_e_tipos.push([variavel, tipo]);
        }
      }
    }
    return variaveis_e_tipos;
  }

  function encontrar_heranca(classe: string): string[] | null {
    const padrao = /\bclass\s+(\w+)\s*\((.*?)\):/;
    const match = classe.match(padrao);

    if (match) {
        let heranca = match[2].trim();
        if (heranca) {
            return heranca.split(',').map(classe => classe.trim());
        } else {
            return [];
        }
    } else {
        return null;
    }
  }

  function identificar_associacoes(classe: string): [string, string][] {
    const padrao = /\b__init__\b\s*\(.*?\):/;
    const match = classe.match(padrao);

    const associacoes: [string, string][] = [];

    if (match) {
      const construtor = match[0];
      const parametros = construtor.match(/\b(\w+)\s*:\s*(\w+)\b/g);

      if (parametros) {
        for (const param of parametros) {
          const [variavel, tipo] = param.split(':').map(item => item.trim());
          if (tipo[0] === tipo[0].toUpperCase()) {
            associacoes.push([variavel, tipo]);
          }
        }
      }
    }
    return associacoes;
  }

  function encontrar_criacao_objetos(classe: string): [string, string][] {
    const padrao_construtor = /\bdef\s+__init__\b.*?:\s*\n((?:\s+.*\n)*)/;
    const match_construtor = classe.match(padrao_construtor);

    const criacoes_objetos: [string, string][] = [];

    if (match_construtor) {
      const linhas_construtor = match_construtor[1].trim().split('\n');
      for (const linha of linhas_construtor) {
        const match_objeto = linha.trim().match(
          /self\.(\w+)\s*=\s*(\w+)\(.*\)/);
        if (match_objeto) {
          const atributo = match_objeto[1];
          const classe_objeto = match_objeto[2];
          criacoes_objetos.push([atributo, classe_objeto]);
        }
      }
    }

    return criacoes_objetos;
  }

  function identificar_nomes_metodos(classe: string): string[] {
    const padrao_metodos = /\bdef\s+((?!__init__)\w+)\b/g;
    const nomes_metodos = [];
    let match;

    while ((match = padrao_metodos.exec(classe)) !== null) {
      nomes_metodos.push(match[1]);
    }

    return nomes_metodos;
  }

  interface ClassInfo {
    name: string[];
    attributes: [string, string][];
    methods: string[];
    inheritance: string[] | null;
    association: [string, string][];
    composition: [string, string][];
  }

  function generate_dot_code(class_info: Record<string, ClassInfo>): string {
    let dot_code = 'digraph ClassDiagram {\n';
    for (const [name, info] of Object.entries(class_info)) {
      dot_code += addClass_and_attributes_and_methods(
        name, info.attributes, info.methods);

      if (info.inheritance) {
        for (const inher of info.inheritance) {
          dot_code += addinheritance(name, inher);
        }
      }

      if (info.association) {
        for (const assoc of info.association) {
          dot_code += addAssociation(name, assoc[1]);
        }
      }

      if (info.composition) {
        for (const comp of info.composition) {
          dot_code += addComposition(name, comp[1]);
        }
      }
    }
    dot_code += "}\n";
    return dot_code;
  }

  function addAssociation(class1: string, class2: string): string {
    return `${class1} -> ${class2} [arrowtail=none, dir=back]\n`;
  }

  function addinheritance(superclasse: string, subclasse: string): string {
    return `${superclasse} -> ${subclasse} [arrowtail=onormal, dir=back]\n`;
  }

  function addComposition(class1: string, class2: string): string {
    return `${class1} -> ${class2} [arrowtail=diamond, dir=back]\n`;
  }

  function addClass_and_attributes_and_methods(class_name, attributes, methods) {
    let attrs = "";
    for (const [attribute, type] of attributes) {
        attrs += `+ ${attribute}:${type}\\l`;
    }

    let meth = "";
    for (const method of methods) {
        meth += `+ ${method}()\\l`;
    }

    const class_code = `${class_name} [label="{{ ${class_name} | ${attrs} | ${meth} }}", shape=record]\n`;
    return class_code;
  }


  // Função para alterar o texto
  const setTextManipulated = (newText: string) => {
    var userList = ""

    var splitClass = splitClasses(newText)
    console.log(splitClass);
    // Para cada classe, extrair as informações
    for (var i in splitClass) {
      var class_name = identificar_nome_da_classe(splitClass[i])

      var variables = encontrar_variaveis_e_tipos_do_construtor(splitClass[i])

      var inheritances = encontrar_heranca(splitClass[i])

      var associations = identificar_associacoes(splitClass[i])

      var objects = encontrar_criacao_objetos(splitClass[i])

      var methods = identificar_nomes_metodos(splitClass[i])

      var cl = {
        name: class_name
      }

      var class_info = {};
      class_info[class_name] = {
          attributes: variables,
          methods: methods,
          inheritance: inheritances,
          association: associations,
          composition: objects
      };

      var dotcode = generate_dot_code(class_info);

      userList = dotcode


    }

    setText(userList); // Exemplo: Convertendo texto para maiúsculas
  };

  return [text, setTextManipulated];
}

export default useTextManipulation;
