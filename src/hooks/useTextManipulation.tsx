import { useState } from 'react';

interface ClassInfo {
  name?: string;
  attributes: [string, string][];
  methods: string[];
  inheritance: string[] | null;
  association: string[];
  aggregation: [string, string][];
  composition: [string, string][];
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


  const splitClasses = (code: string) => {
    // Usando regex para encontrar as definições de classe com ou sem herança
    const classPattern = /class\s+(\w+)\s*(\((.*?)\))?:\s*(.*?)\s*(?=class|$)/gs;
    const classMatches = [...code.matchAll(classPattern)];

    // Array para armazenar os objetos de classe
    const classes = [];

    // Dividindo o código em partes com base nas definições de classe
    for (const match of classMatches) {
      const className = match[1];
      const inheritance = match[3];
      const classContent = match[4];

      // Construindo o objeto da classe
      const classObj = {
        name: className,
        inheritance: inheritance ? inheritance : null,
        content: classContent.trim()
      };

      // Adicionando o objeto da classe ao array
      classes.push(classObj);
    }

    return classes;
  }



  // Função para alterar o texto
  const setTextManipulated = (newText: string): void => {
    let userList = "";
    const code = removerComentariosPython(newText)
    const splitClass = splitClasses(code);
    /* for (const i in splitClass) {
      if (splitClass[i].slice(0, 5) === "class") {
        //console.log(splitClass[i])
        const class_name = identificar_nome_da_classe(splitClass[i]);
        const variables = encontrar_atributos(splitClass[i]);
        const inheritances = encontrar_heranca(splitClass[i]);
        const associations = identificar_associacoes(splitClass[i]);
        const aggregations = identificar_agregacoes(splitClass[i]);
        const objects = encontrar_criacao_objetos(splitClass[i]);
        const methods = identificar_nomes_metodos(splitClass[i]);
        const class_info: Record<string, ClassInfo> = {};
        class_info[class_name] = {
          attributes: variables,
          methods: methods,
          inheritance: inheritances,
          association: associations,
          aggregation: aggregations,
          composition: objects
        };

        const dotcode = generate_dot_code(class_info);

        userList = userList + " " + dotcode
      }
    } */

    userList = "digraph ClassDiagram {graph[rankdir=\"TB\"] node[shape=record,style=filled,fillcolor=gray95] edge[dir=back, arrowtail=empty]\n" + userList + "}\n";

    setText(userList);
  };

  return [text, setTextManipulated];
}

export default useTextManipulation;
