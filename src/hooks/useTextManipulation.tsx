import { useState } from 'react';

// Definindo interfaces em TypeScript
interface Class {
  name: string;
  inheritance: string | null;
  content: string;
  functions: Function[];
  attributes?: Attribute[]

}

interface Attribute {
  access: string | null,
  name: string,
  type: string | null,
  value?: string | null
}

interface Function {
  access: string | null,
  name: string;
  decorators: string[] | null;
  params: string;
  content: string;
}

// Hook personalizado para manipulação de texto
function useTextManipulation(): [string, (newText: string) => void] {
  const [text, setText] = useState<string>('');

  function setAccessElement(name: string): string {
    return name.substring(0, 2) === "__" ? "-" : "+"
  }
  function setNameElement(name: string): string {
    return name.replace("__", "")
  }

  function removePythonComments(codigoPython: string) {
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

  const extractPythonCodeInfo = (code: string): Class[] => {
    // Usando regex para encontrar as definições de classe com ou sem herança
    const classPattern = /(?<!\w)class\b\s+(\w+)\s*(\((.*?)\))?:\s*(.*?)\s*(?=class\b|$)/gs;
    const classMatches = [...code.matchAll(classPattern)];

    // Array para armazenar os objetos de classe
    const classes: Class[] = [];

    // Expressão regular para encontrar definições de função dentro do conteúdo da classe
    const functionPattern = /.*?def\s+(\w+)\s*\((.*?)\):([\s\S]*?)(?=\s*(?!.*\bclass[\w\d])@|def|\s*$)/gs;
    //const functionPattern = /.*?(?:@\w+\s*)*def\s+(\w+)\s*\((.*?)\):([\s\S]*?)(?=\s*(?!.*\bclass[\w\d])def|\s*$)/gs


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
        const functionParams = functionMatch[2].replace(/ /g, "");
        const functionContent = functionMatch[3].trim().replace(/ /g, "");
        const functionContentWithDecorator = functionMatch[0].trim().replace(/ /g, "");

        //Extração dos decoradores
        const decorators = functionContentWithDecorator.match(/^@.*$/gm)
        const attr: Function = {
          access: functionName == "__init__" ? null : setAccessElement(functionName),
          name: functionName == "__init__" ? functionName : setNameElement(functionName),
          decorators: decorators,
          params: functionParams,
          content: functionContent
        }
        functions.push(attr);
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

  function addMoreInfo(classes: Class[]): Class[] {
    classes.forEach((classe: Class) => {
      const construtor = classe.functions.find((func) => func.name == '__init__')

      if (construtor) {
        // extrai as variáveis parâmetros
        const parametros_match = construtor.params.match(/\b(\w+)\s*:\s*(\w+)\b/g);
        const parametros: Attribute[] = [];
        if (parametros_match != null) {
          for (const param of parametros_match) {
            const [nome, tipo] = param.split(':').map(item => item.trim());
            const v: Attribute = {
              access: setAccessElement(nome),
              name: setNameElement(nome),
              type: tipo
            };
            parametros.push(v);
          }
        }

        // Expressão regular para extrair as variáveis internas do contrutor, seus tipos (se fornecidos) e atribuições
        const regex = /self\.(\w+)(?::(\w+))?\s*=\s*(.+)$/gm;
        let match;
        const internas: Attribute[] = [];

        while ((match = regex.exec(construtor.content)) !== null) {
          const p: Attribute = {
            access: setAccessElement(match[1]),
            name: setNameElement(match[1]),
            type: match[2] || null,
            value: match[3].trim() || null,
          };

          // Caso a variável não tenha tipo definido
          if (!p.type && p.value) {
            // verifica se é um inteiro
            if (!isNaN(parseFloat(p.value))) {
              p.type = 'int'
            } else {
              // Verifica se é um booleano
              if (p.value === 'True' || p.value === 'False') {
                p.type = 'bool'
              } else {
                // verifica se é uma string
                if (p.value[0] == '\"') {
                  p.type = 'str'
                } else {// um objeto
                  //Obtem o tipo com base no nome da instância
                  const regex = /(\w+)\s*\(.*$/gm;
                  while ((match = regex.exec(p.value)) !== null) {
                    p.type = match[1]
                  }
                }
              }
            }
          }
          internas.push(p);
        }

        // atualiza o tipo com base nos parâmetros
        internas.forEach((v) => {
          parametros.forEach((p) => {
            if (v.value == p.name) {
              v.type = p.type
            }
          })
        })

        classe.attributes = []
        internas.forEach((_v) => {
          classe.attributes?.push(_v)
        })

      }
    })

    return classes

  }

  function getClassDataPythonCode(code: string): Class[] {

    // Remove todos os tipos de comentários no código
    const codePython = removePythonComments(code)

    // Extrai as informações básicas (que originam os relacionamentos)
    let classes: Class[] = extractPythonCodeInfo(codePython);

    classes = addMoreInfo(classes)

    console.log(classes);


    return classes;
  }

  function draw_inheritance(classe: Class): string {
    let dot_code = "";
    if (classe.inheritance) {
      const superClasses = classe.inheritance.split(',')
      for (var i = 0; i < superClasses.length; i++) {
        dot_code += `${superClasses[i].trim()} -> ${classe.name} [arrowtail=onormal, dir=back]\n`;
      }
    }
    return dot_code;
  }

  function drawClassDiagram(classes: Class[]): string {
    let dot_content = ""

    classes.forEach((classe: Class) => {
      let attrs = "";
      let meth = "";

      // Constroi as funções da classe
      classe.functions.forEach((func) => {
        if (func.name != "__init__") {
          meth += `${func.access} ${func.name}()\\l`;
        }
      })

      // constroi a classe e seus relacionamentos
      classe.attributes?.forEach((attr) => {
        // Adiciona variáveis com tipo iniciando com letra minúscula (variáveis internas ao construtor)
        if (attr.type && (attr.type[0] !== attr.type[0].toUpperCase())) {
          attrs += `${attr.access} ${attr.name}:${attr.type}\\l`;
        } else { // desenha as agregações
          // Adiciona se não tiver atribuições começando com letra maiúscula
          if (attr.value && attr.value[0] !== attr.value[0].toUpperCase()) {
            dot_content += `${classe.name} -> ${attr.type} [arrowtail=odiamond, dir=back, label="${attr.access} ${attr.name}", labeldistance=2]\n`;
          } else { // desenha as composições
            // Atribuições iniciadas com letra maiúscula
            dot_content += `${classe.name} -> ${attr.type} [arrowtail=diamond, dir=back, label="${attr.access} ${attr.name}", labeldistance=2]\n`;
          }
        }
      })

      dot_content += `${classe.name} [label="{ {${classe.name}} | {${attrs}} | {${meth}} }", shape=record] \n`;

      //desenha o relacionamento de herança
      dot_content += draw_inheritance(classe)
    })

    let dot_code = "digraph ClassDiagram {graph[rankdir=\"TB\"] node[shape=record,style=filled,fillcolor=gray95] edge[dir=back, arrowtail=empty]\n" + dot_content + "}\n";

    return dot_code
  }

  // Função PRINCIPAL para alterar o texto
  const setTextManipulated = (codePython: string): void => {

    // Faz a extração dos dados das classes a partir de um código em Python
    const classes: Class[] = getClassDataPythonCode(codePython);

    let dot_code = drawClassDiagram(classes);

    setText(dot_code);
  };

  return [text, setTextManipulated];
}

export default useTextManipulation;
