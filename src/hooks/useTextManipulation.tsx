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
        const parametros_match = construtor.params.match(/(\w+):(list\[(\w+)\]|\w+)/g);
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
        const regex = /self\.(\w+)(?::(\w+(?:\[\w+\])?))?(?:\s*=\s*(.+))?$/gm;
        let match;
        const internas: Attribute[] = [];

        while ((match = regex.exec(construtor.content)) !== null) {
          const p: Attribute = {
            access: setAccessElement(match[1]),
            name: setNameElement(match[1]),
            type: match[2] || null,
            value: match[3] || null,
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

    //console.log(classes);


    return classes;
  }

/*   function draw_inheritance(classe: Class): string {
    let dot_code = "";
    if (classe.inheritance) {
      const superClasses = classe.inheritance.split(',')
      for (var i = 0; i < superClasses.length; i++) {
        dot_code += `${superClasses[i].trim()} -> ${classe.name} [arrowtail=onormal, dir=back]\n`;
      }
    }
    return dot_code;
  }

  function draw_association(classe: Class): string {
    let dot_code = "";

    let regexFuncao = /def\s+\w+\s*\([^)]*\):\s*([\s\S]*?)(?=def|$)/g;
    // Substituir todas as funções por uma string vazia
    let textoSemFuncoes = classe.content.replace(regexFuncao, '');

    const regex = /^\s*([a-zA-Z_]\w*)(?:\s*:\s*(list\[)?([a-zA-Z_]\w*)\]?)?(?:\s*=\s*(.*))?\s*$/gm;

    let match;
    while ((match = regex.exec(textoSemFuncoes)) !== null) {
      var privacySymbol = "+";
      var multiplicity = "1";
      var nome = match[1];
      if (nome.substring(0, 2) === "__") {
        nome = nome.replace("__", "");
        privacySymbol = "-";
      }
      const tipo = match[3] || null;
      if (match[2] == "list[") {
        multiplicity = "*";
      }
      //const atribuicao = match[3] !== undefined ? match[3].trim() : null;

      if (tipo && tipo[0] === tipo[0].toUpperCase()) {
        dot_code += `${classe.name} -> ${tipo} [arrowhead=vee, dir=forward, open="${privacySymbol}${nome}", headlabel="${multiplicity}", labeldistance=2]\n`;
        //variaveis.push({ nome, tipo, atribuicao });
      }
    }
    return dot_code;
  } */

 /*  function drawClassDiagram(classes: Class[]): string {
    let dot_content = ""

    classes.forEach((classe: Class) => {
      let attrs = "";
      let meth = "";

      // Constroi as funções da classe
      classe.functions.forEach((func) => {
        if (func.name != "__init__") {
          meth += `${func.access} ${func.name}()\\l`;

          // Analisa internamente cada função e cria os relacionamentos de Dependência
          const regex = /self\.(\w+)(?::(\w+(?:\[\w+\])?))?(?:\s*=\s*(.+))?$/gm;
          let match;
          while ((match = regex.exec(func.content)) !== null) {

            const p: Attribute = {
              access: setAccessElement(match[1]),
              name: setNameElement(match[1]),
              type: match[3].replace(/\([^)]*\)/g, '') || null,
              value: match[3] || null,
            };

            dot_content += `${p.type}  ->   ${classe.name} [style=dotted, arrowtail=open, dir=back, label="<<create>>", labeldistance=1.5]\n`;
          }
        }
      })

      // constroi a classe e seus relacionamentos
      classe.attributes?.forEach((attr) => {
        // Adiciona variáveis com tipo iniciando com letra minúscula (variáveis internas ao construtor)
        if (attr.type && (attr.type[0] !== attr.type[0].toUpperCase())) {
          if (!attr.type.includes('list[')) {
            attrs += `${attr.access} ${attr.name}:${attr.type}\\l`;
          } else { // desenha as agregações em lista
            const padrao = /\[(.*?)\]/;
            const resultado = padrao.exec(attr.type);
            if (resultado) {
              dot_content += `${classe.name} -> ${resultado[1]} [arrowtail=odiamond, dir=back, label="${attr.access} ${attr.name}",taillabel=1,  headlabel="*", labeldistance=1.5]\n`;
            }
          }
        } else { // desenha as agregações
          // Adiciona se não tiver atribuições começando com letra maiúscula
          if (attr.value && attr.value[0] !== attr.value[0].toUpperCase()) {
            dot_content += `${classe.name} -> ${attr.type} [arrowtail=odiamond, dir=back, taillabel="${attr.access} ${attr.name}", labeldistance=2]\n`;
          } else { // desenha as composições
            // Atribuições iniciadas com letra maiúscula
            dot_content += `${classe.name} -> ${attr.type} [arrowtail=diamond, dir=back, taillabel="${attr.access} ${attr.name}", labeldistance=2]\n`;
          }
        }
      })

      // desenhas as associações


      dot_content += `${classe.name} [label="{ {${classe.name}} | {${attrs}} | {${meth}} }", shape=record] \n`;

      //desenha o relacionamento de herança
      dot_content += draw_inheritance(classe)

      dot_content += draw_association(classe)
    })

    let dot_code = "digraph ClassDiagram {graph[rankdir=\"TB\"] node[shape=record,style=filled,fillcolor=gray95] edge[dir=back, arrowtail=empty]\n" + dot_content + "}\n";

    return dot_code
  }
 */

  function drawUseCaseDiagram(classes: Class[]): string {
    let dot_content = ""

    /* Actor Nodes */
     dot_content += `node [shape=plaintext];\n`

    classes.forEach((classe: Class) => {
      dot_content += `subgraph cluster${classe.name} {label="${classe.name}";\n
      ${classe.name}};\n${classe.name} [label=<<TABLE border="0">
        <TR><TD>&nbsp;&#9786;&nbsp;</TD></TR>
         <TR><TD> / | \\ </TD></TR>
         <TR><TD> /   \\ </TD></TR>
      </TABLE>>];\n`
    })

    

    /* Use Case Nodes */
    dot_content += `node [shape=ellipse, style=solid];\n`

    classes.forEach((classe: Class) => {
      classe.functions.forEach((func) => {
        func.decorators?.forEach(() => {
          //console.log(decorator);
          dot_content += `${func.name} [label="${func.name}"];\n`
        })
      })
    })

    /* Edges */
    dot_content += `edge  [arrowhead="oarrow"];\n`

    classes.forEach((classe: Class) => {
      if (classe.inheritance) {
        const superClasses = classe.inheritance.split(',')
        for (var i = 0; i < superClasses.length; i++) {
          dot_content += `${superClasses[i].trim()} -> ${classe.name};\n`
        }
      }
    })

    dot_content += `edge [arrowhead=none];\n`

    classes.forEach((classe: Class) => {
      classe.functions.forEach((func) => {
        func.decorators?.forEach((decorator) => {
          if (decorator.includes("@usecase")) {
            dot_content += `${classe.name} -> ${func.name};\n`
          }
        })
      })
    })

    dot_content += `edge [arrowtail="vee", label="<<extend>>", style=dashed];\n`

    classes.forEach((classe: Class) => {
      classe.functions.forEach((func) => {
        func.decorators?.forEach((decorator) => {
          if (decorator.includes("@extends")) {
            dot_content += `${decorator.replace(/.*\[(.*?)\].*/, '$1')} -> ${func.name};\n`
          }
        })
      })
    })

    dot_content += `edge [arrowtail="vee", label="<<include>>", style=dashed];\n`

    classes.forEach((classe: Class) => {
      classe.functions.forEach((func) => {
        func.decorators?.forEach((decorator) => {
          if (decorator.includes("@include")) {
            dot_content += `${decorator.replace(/.*\[(.*?)\].*/, '$1')} -> ${func.name};\n`
          }
        })
      })
    })


    let dot_code = `digraph G {rankdir="LR";labelloc="b";peripheries=0;\n\n${dot_content}\n}`
    //console.log(dot_code);


    return dot_code
  }

  // Função PRINCIPAL para alterar o texto
  const setTextManipulated = (codePython: string): void => {

    // Faz a extração dos dados das classes a partir de um código em Python
    const classes: Class[] = getClassDataPythonCode(codePython);

    //let dot_code = drawClassDiagram(classes);

    let dot_code = drawUseCaseDiagram(classes);

    setText(dot_code);
  };

  return [text, setTextManipulated];
}

export default useTextManipulation;
