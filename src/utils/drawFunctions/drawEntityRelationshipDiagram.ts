import { ClassInterface } from './../../hooks/usePythonCodeAnalyzer';
import '../../styles/styles.css';

function drawEntityRelationshipDiagram(classes: ClassInterface[]): string {
    let dot_content = ""

    dot_content += `ranksep=0.3;\n`
    dot_content += `nodesep=0.3;\n`

    /* Entity and Primary Keys */
    classes.forEach((classe: ClassInterface) => {

        var weakEntity = true

        //Capturar o conteúdo das classes sem as funções.
        let regexFuncao = /def\s+\w+\s*\([^)]*\):\s*([\s\S]*?)(?=def|$)/g;
        let textoSemFuncoes = classe.content.replace(regexFuncao, '');
        const regex = /^\s*([a-zA-Z_]\w*)(?:\s*:\s*(list\[)?([a-zA-Z_]\w*)\]?)?(?:\s*=\s*(.*))?\s*$/gm;

        let match;
        while ((match = regex.exec(textoSemFuncoes)) !== null) {
            var keyType = "primary";
            var attName = match[1];
            if (attName.substring(0, 1) === "_") {
                attName = attName.replace("_", "");
                keyType = "foreign";
            }

            const tipo = match[3] || null;

            if (tipo) {
                dot_content += createAttribute(classe.name, attName, keyType)
                if (keyType === "primary"){
                    weakEntity = false
                }
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
            if (attr.type) {
                dot_content += createAttribute(classe.name, attr.name, "")
            }
        })
    })

    /* Relationship Nodes */
    classes.forEach((classe: ClassInterface) => {
        classe.functions.forEach((func) => {
            func.decorators?.forEach((decorator) => {
                if (decorator.includes("@relationship")) {
                    dot_content += `${func.name} [shape=diamond, style=solid, height=0.8, label="${func.name.toUpperCase()}"];\n`
                    dot_content += `${classe.name} -> ${func.name} [arrowhead=none, arrowtail=none]\n`;

                    var types = func.params.split(',');
                    types.forEach((type) => {
                        var parts = type.split(':');
                        dot_content += `${func.name} -> ${parts[1]} [arrowhead=none, arrowtail=none]\n`;
                    })


                    if (classe) {
                        //dot_content += createRelationship(classe.name, relationshipName)
                    }
                }
            })
        })
    })

    let dot_code = `digraph G {overlap=prism; layout=neato; labelloc=b; peripheries=0; concentrate="true";\n\n${dot_content}\n}`

    return dot_code
}

//Metódo de criação de atributos, o contrutor precisa do nome da classe, nome do atributo e da informação se é chave primária.
function createAttribute(className: string, attrName: string, key: string){
    let dot_code = "";

    // Como duas entidades podem ter o mesmo atributo (Nome) o nome do nó se transforma no nome da classe + o nó para evitar conflitos!
    if(key === "primary" || key === "foreign"){
        dot_code += `${className}${attrName} [shape=ellipse, style=solid, label=<<u>${attrName}</u>>];\n`
    } else {
        dot_code += `${className}${attrName} [shape=ellipse, style=solid, label="${attrName}"];\n`
    }
    dot_code += `${className} -> ${className}${attrName} [arrowhead=none];\n`
    return dot_code;
}

function createRelationship(className: string, relationshipName: string, attrType: string){
    let dot_code = "";

    dot_code += `${relationshipName} [shape=diamond, style=solid, label="${relationshipName.toUpperCase()}"];\n`
    dot_code += `${className} -> ${relationshipName} [arrowhead=none, arrowtail=none]\n`;
    dot_code += `${relationshipName} -> ${attrType} [arrowhead=none, arrowtail=none]\n`;

    return dot_code;
}

export default drawEntityRelationshipDiagram;