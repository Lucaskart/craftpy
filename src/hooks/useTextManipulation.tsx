import { useState } from 'react';

// Definindo interfaces em TypeScript
interface Class {
  name: string;
  inheritance: string | null;
  content: string;
  functions: Function[];
}

interface Function {
  name: string;
  decorators: string[] | null;
  params: string;
  content: string;
}

// Hook personalizado para manipulação de texto
function useTextManipulation(): [string, (newText: string) => void] {
  const [text, setText] = useState<string>('');

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
        functions.push({ name: functionName, decorators: decorators, params: functionParams, content: functionContent });
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

  function classDataExtraction(code: string): Class[] {
    const codePython = removePythonComments(code)

    // Array para armazenar as classes
    const classes: Class[] = extractPythonCodeInfo(codePython);

    console.log(classes);


    return classes;
  }

  function drawClassDiagram(classes: Class[]): string {
    let dot_content = ""

    let dot_code = "digraph ClassDiagram {graph[rankdir=\"TB\"] node[shape=record,style=filled,fillcolor=gray95] edge[dir=back, arrowtail=empty]\n" + dot_content + "}\n";
    return dot_code
  }

  // Função PRINCIPAL para alterar o texto
  const setTextManipulated = (codePython: string): void => {

    // Faz a extração dos dados das classes a partir de um código em Python
    const classes: Class[] = classDataExtraction(codePython);

    const dot_code = drawClassDiagram(classes);
    setText(dot_code);
  };

  return [text, setTextManipulated];
}

export default useTextManipulation;
