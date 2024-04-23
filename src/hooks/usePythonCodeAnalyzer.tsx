import React, { useState } from 'react';

/** 
 * Custom Hook usePythonCodeAnalyzer
 * 
 * Extrai informações de string contendo um código em python e 
 *  retorna um conjunto de objetos do tipo ClassInterface. 
 * 
 * A partir desse conjunto de objetos é possível construir os diagramas de Classes e Casos de uso.
 * 
 */


// Definindo interfaces em TypeScript
export interface ClassInterface {
    name: string;
    inheritance: string | null;
    content: string;
    functions: FunctionInterface[];
    attributes?: AttributeInterface[]

}

export interface AttributeInterface {
    access: string | null,
    name: string,
    type: string | null,
    value?: string | null
}

export interface FunctionInterface {
    access: string | null,
    name: string;
    decorators: string[] | null;
    params: string;
    content: string;
}

export function setAccessElement(name: string): string {
    return name.substring(0, 2) === "__" ? "-" : "+"
}
export function setNameElement(name: string): string {
    return name.replace("__", "")
}

export function usePythonCodeAnalyzer(pythonCode: string): [string, React.Dispatch<React.SetStateAction<string>>, ClassInterface[] | any] {
    const [codeText, setCodeText] = useState<string>(pythonCode);
    const [classData, setClassData] = useState<ClassInterface[]>([]);

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

    const extractPythonCodeInfo = (code: string): ClassInterface[] => {
        // Usando regex para encontrar as definições de classe com ou sem herança
        const classPattern = /(?<!\w)class\b\s+(\w+)\s*(\((.*?)\))?:\s*(.*?)\s*(?=class\b|$)/gs;
        const classMatches = [...code.matchAll(classPattern)];

        // Array para armazenar os objetos de classe
        const classes: ClassInterface[] = [];

        // Expressão regular para encontrar definições de função dentro do conteúdo da classe
        const functionPattern = /.*?def\s+([\w\-]+)\s*\((.*?)\):([\s\S]*?)(?=\s*(?!.*\bclass[\w\d])@|def|\s*$)/gs;
        //const functionPattern = /.*?(?:@\w+\s*)*def\s+(\w+)\s*\((.*?)\):([\s\S]*?)(?=\s*(?!.*\bclass[\w\d])def|\s*$)/gs


        // Dividindo o código em partes com base nas definições de classe
        for (const match of classMatches) {
            const className = match[1];
            const inheritance = match[3];
            const classContent = match[4];

            // Encontrando todas as funções dentro do conteúdo da classe
            const functions: FunctionInterface[] = [];
            let functionMatch;
            while ((functionMatch = functionPattern.exec(classContent)) !== null) {
                const functionName = functionMatch[1];
                const functionParams = functionMatch[2].replace(/ /g, "");
                const functionContent = functionMatch[3].trim().replace(/ /g, "");
                const functionContentWithDecorator = functionMatch[0].trim().replace(/ /g, "");

                //Extração dos decoradores
                const decorators = functionContentWithDecorator.match(/^@.*$/gm)
                const attr: FunctionInterface = {
                    access: functionName == "__init__" ? null : setAccessElement(functionName),
                    name: functionName == "__init__" ? functionName : setNameElement(functionName),
                    decorators: decorators,
                    params: functionParams,
                    content: functionContent
                }
                functions.push(attr);
            }

            // Construindo o objeto da classe
            const classObj: ClassInterface = {
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

    function addMoreInfo(classes: ClassInterface[]): ClassInterface[] {
        classes.forEach((classe: ClassInterface) => {
            const construtor = classe.functions.find((func) => func.name == '__init__')

            if (construtor) {
                // extrai as variáveis parâmetros
                const parametros_match = construtor.params.match(/(\w+):(list\[(\w+)\]|\w+)/g);
                const parametros: AttributeInterface[] = [];
                if (parametros_match != null) {
                    for (const param of parametros_match) {
                        const [nome, tipo] = param.split(':').map(item => item.trim());
                        const v: AttributeInterface = {
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
                const internas: AttributeInterface[] = [];

                while ((match = regex.exec(construtor.content)) !== null) {
                    const p: AttributeInterface = {
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
                                } else {
                                    if (p.value[0] == "[" || p.value == "list()") {
                                        p.type = 'list'
                                    } else {
                                        if (p.value[0] == "(") {
                                            p.type = 'tuple'
                                        } else {

                                            if (p.value[0] == "{") {
                                                p.type = 'dict'
                                            } else {
                                                // um objeto
                                                if (p.value[0] == p.value[0].toUpperCase()) {
                                                    //Obtem o tipo com base no nome da instância
                                                    const regex = /(\w+)\s*\(.*$/gm;
                                                    while ((match = regex.exec(p.value)) !== null) {
                                                        p.type = match[1]
                                                    }
                                                } else {
                                                    // variável sem tipo
                                                    p.type = 'null'
                                                }
                                            }

                                        }
                                    }
                                }
                            }
                        }
                    } else { // Variáveis sem tipo e sem atribuição
                        if(!p.type){
                            p.type = 'null'
                        } 
                        if(!p.value){
                            p.value = 'null'
                        } 
                    }
                    
                    // adiciona as variáveis internas ao construtor
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

    function getClassDataPythonCode(code: string): ClassInterface[] {

        // Remove todos os tipos de comentários no código
        const codePython = removePythonComments(code)

        // Extrai as informações básicas (que originam os relacionamentos)
        let classes: ClassInterface[] = extractPythonCodeInfo(codePython);

        classes = addMoreInfo(classes)

        return classes;
    }

    // Função execução do hook
    const buildDotDiagrams = (pythonCode: string) => {
        // Faz a extração dos dados das classes a partir de um código em Python
        const classes = getClassDataPythonCode(pythonCode);
        setClassData([...classes])
    };

    // Chama splitString sempre que a string inicial mudar
    React.useEffect(() => {
        buildDotDiagrams(codeText);
    }, [codeText]);

    return [codeText, setCodeText, classData];
}