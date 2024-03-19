import { useState } from 'react';

interface ClassInfo {
  name?: string;
  attributes?: [string, string][];
  methods?: string[];
  inheritance?: string[] | null;
  association?: string[];
  aggregation?: [string, string][];
  composition?: [string, string][];
}

interface Class {
  name: string;
  inheritance: string | null;
  content: string;
  functions: Function[];
}

interface Function {
  name: string;
  params: string;
  content: string;
}

// Hook personalizado para manipulação de texto
function useTextManipulation(): [string, (newText: string) => void] {
  const [text, setText] = useState<string>('');

  function removerComentariosPython(codigoPython: string) {
    // Expressão regular para remover comentários de uma linha
    const regexComentariosUmaLinha = /#.*$/gm;

    // Expressão regular para remover comentários de várias linhas (docstrings)
    const regexDocstrings = /'''[\s\S]*?'''|"""[\s\S]*?"""/gm;

    // Remover comentários de uma linha
    codigoPython = codigoPython.replace(regexComentariosUmaLinha, '');

    // Remover docstrings (comentários de várias linhas)
    codigoPython = codigoPython.replace(regexDocstrings, '');

    return codigoPython;
  }


  const splitClasses = (code: string): Class[] => {
    // Usando regex para encontrar as definições de classe com ou sem herança
    const classPattern = /class\s+(\w+)\s*(\((.*?)\))?:\s*(.*?)\s*(?=class|$)/gs;
    const classMatches = [...code.matchAll(classPattern)];

    // Array para armazenar os objetos de classe
    const classes: Class[] = [];

    // Expressão regular para encontrar definições de função dentro do conteúdo da classe
    const functionPattern = /def\s+(\w+)\s*\((.*?)\):([\s\S]*?)(?=\s*def|\s*class|\s*$)/gs;

    // Dividindo o código em partes com base nas definições de classe
    for (const match of classMatches) {
      const className = match[1];
      const inheritance = match[3];
      const classContent = match[4];

      // Encontrando todas as funções dentro do conteúdo da classe
      const functions: Function[] = [];
      let functionMatch;
      while ((functionMatch = functionPattern.exec(classContent)) !== null) {
        const functionName = functionMatch[1];
        const functionParams = functionMatch[2];
        const functionContent = functionMatch[3].trim();
        functions.push({ name: functionName, params: functionParams, content: functionContent });
      }

      // Construindo o objeto da classe
      const classObj: Class = {
        name: className,
        inheritance: inheritance ? inheritance : null,
        content: classContent.trim(),
        functions: functions
      };

      // Adicionando o objeto da classe ao array
      classes.push(classObj);
    }

    return classes;
  }

  function draw_class(classe: Class): string {
    let attrs = "";
    let meth = "";
    classe.functions.forEach((func) => {
      if (func.name == "__init__") { // construtor

        // extrai as variáveis parâmetros
        const parametros_match = func.params.match(/\b(\w+)\s*:\s*(\w+)\b/g);
        const parametros: { nome: string; tipo: string; }[] = [];
        if (parametros_match != null) {
          for (const param of parametros_match) {
            const [variavel, tipo] = param.split(':').map(item => item.trim());
            const v = {
              nome: variavel,
              tipo: tipo,
            };
            parametros.push(v);
          }
        }

        // Expressão regular para extrair as variáveis internas do contrutor, seus tipos (se fornecidos) e atribuições
        const regex = /self\.(\w+)(?::(\w+))?\s*=\s*(.+)$/gm;
        let match;
        const internas: { nome: string; tipo: string; atribuicao: string; }[] = [];

        while ((match = regex.exec(func.content)) !== null) {
          const p = {
            nome: match[1],
            tipo: match[2] || 'None',
            atribuicao: match[3].trim()
          };
          internas.push(p);
        }

        //obs.: o nome das variáveis que serão mostrados no diagrama serão as variáveis de dentro do construtor

        // atualiza o tipo com base nos parâmetros
        internas.forEach((v) => {
          parametros.forEach((p) => {
            if (v.atribuicao == p.nome) {
              v.tipo = p.tipo
            }
          })
        })

        // deleta as variáveis objetos
        internas.forEach((_v, index) => {
          if (_v.tipo[0] === _v.tipo[0].toUpperCase()) {
            internas.splice(index, 1);
          }
        });

        // construção do dot code para as variáveis
        internas.forEach((variavel) => {
          if (variavel.nome.substring(0, 2) === "__") {
            attrs += `- ${variavel.nome.replace("__", "")}:${variavel.tipo}\\l`;
          } else {
            attrs += `+ ${variavel.nome}:${variavel.tipo}\\l`;
          }
        })

      } else { //demais funções
        if (func.name.substring(0, 2) === "__") {
          meth += `- ${func.name.replace("__", "")}()\\l`;
        } else {
          meth += `+ ${func.name}()\\l`;
        }
      }
    });

    const class_code = `${classe.name} [label="{ {${classe.name}} | {${attrs}} | {${meth}} }", shape=record] \n`;
    return class_code;
  }

  function generate_dot_code(classes: Class[]): string {
    let dot_code = "";
    classes.forEach((classe) => {

      // desenha a classe, seus atributos e métodos
      dot_code += draw_class(classe)

    });

    return dot_code;
  }


  // Função para alterar o texto
  const setTextManipulated = (newText: string): void => {
    const code = removerComentariosPython(newText)
    const classes: Class[] = splitClasses(code);
    console.log(classes);


    /* classes.forEach((classe, index) => {
  
      console.log(`Classe ${index + 1}:`);
      console.log(`Nome: ${classe.name}`);
      console.log(`Herança: ${classe.inheritance ? classe.inheritance : 'Nenhuma'}`);
      console.log(`Funções:`);
      classe.functions.forEach((func, i) => {
        console.log(`    ${i + 1}. ${func.name}(${func.params}):`);
        console.log(func.content);
      });
      console.log(`Conteúdo:\n${classe.content}\n`);
    }); */
    const dotcode = generate_dot_code(classes);

    let userList = "digraph ClassDiagram {graph[rankdir=\"TB\"] node[shape=record,style=filled,fillcolor=gray95] edge[dir=back, arrowtail=empty]\n" + dotcode + "}\n";

    setText(userList);
  };

  return [text, setTextManipulated];
}

export default useTextManipulation;
