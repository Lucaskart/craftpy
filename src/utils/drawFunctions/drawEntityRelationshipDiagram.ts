import { ClassInterface } from './../../hooks/usePythonCodeAnalyzer';

function drawEntityRelationshipDiagram(classes: ClassInterface[]): string {
    let dot_content = ""

    /* Entity Nodes */
    classes.forEach((classe: ClassInterface) => {

        var weakEntity = true

        //Capturar o conteúdo das classes sem as funções.
        let regexFuncao = /def\s+\w+\s*\([^)]*\):\s*([\s\S]*?)(?=def|$)/g;
        let textoSemFuncoes = classe.content.replace(regexFuncao, '');
        const regex = /^\s*([a-zA-Z_]\w*)(?:\s*:\s*(list\[)?([a-zA-Z_]\w*)\]?)?(?:\s*=\s*(.*))?\s*$/gm;

        let match;
        while ((match = regex.exec(textoSemFuncoes)) !== null) {
            const tipo = match[3] || null;

            if (tipo) {
                dot_content += createAttribute(classe.name, match[1], true)
                weakEntity = false
            }
        }

        if(weakEntity === false){
            dot_content += `${classe.name} [shape=box, style=solid, label="${classe.name}"];\n`
        } else {
            dot_content += `${classe.name} [shape=box, style=solid, peripheries=2, label="${classe.name}"];\n`
        }
    })

    console.log(classes);

    /* Attribute Nodes */
    classes.forEach((classe: ClassInterface) => {
        classe.attributes?.forEach((attr) => {
            // Adiciona atributos da classe sem relacionamento.
            if (attr.type && (attr.type[0] !== attr.type[0].toUpperCase())) {
                if (!attr.type.includes('list[')) {
                    // Como duas entidades podem ter o mesmo atributo (Nome) o nome do nó se transforma no nome da classe + o nó para evitar conflitos!
                    dot_content += createAttribute(classe.name, attr.name, false)
                }
            } else { 
                dot_content += `${attr.name} [shape=diamond, style=solid, label="${attr.name.toUpperCase()}"];\n`
                dot_content += `${classe.name} -> ${attr.name} [arrowtail=none]\n`;
                dot_content += `${attr.name} -> ${attr.type} [arrowtail=none]\n`;
            }
        })
    })

    let dot_code = `digraph G {overlap=prism; layout=neato; labelloc=b; peripheries=0; concentrate="true";\n\n${dot_content}\n}`

    return dot_code
}

function createAttribute(className: string, attrName: string, primaryKey: boolean){
    let dot_code = "";
    if(primaryKey === true){
        dot_code += `${className}${attrName} [shape=ellipse, style=solid, label=<<u>${attrName}</u>>];\n`
    } else {
        dot_code += `${className}${attrName} [shape=ellipse, style=solid, label="${attrName}"];\n`
    }
    dot_code += `${className} -> ${className}${attrName} [arrowhead=none];\n`
    return dot_code;
}


export default drawEntityRelationshipDiagram;