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

  function generate_dot_code(class_info: Record<string, ClassInfo>): string {
    let dot_code = "";
    /* for (const [name, info] of Object.entries(class_info)) {
      dot_code += addClass_and_attributes_and_methods(
        name, info.attributes, info.methods);

    } */
    return dot_code;
  }


  // Função para alterar o texto
  const setTextManipulated = (newText: string): void => {
    let userList = "";
    const code = removerComentariosPython(newText)
    const classes: Class[] = splitClasses(code);

    classes.forEach((classe, index) => {
      console.log(`Classe ${index + 1}:`);
      console.log(`Nome: ${classe.name}`);
      console.log(`Herança: ${classe.inheritance ? classe.inheritance : 'Nenhuma'}`);
      console.log(`Funções:`);
      classe.functions.forEach((func, i) => {
        console.log(`    ${i + 1}. ${func.name}(${func.params}):`);
        console.log(func.content);
      });
      console.log(`Conteúdo:\n${classe.content}\n`);
    });

    userList = "digraph ClassDiagram {graph[rankdir=\"TB\"] node[shape=record,style=filled,fillcolor=gray95] edge[dir=back, arrowtail=empty]\n" + userList + "}\n";

    setText(userList);
  };

  return [text, setTextManipulated];
}

export default useTextManipulation;
