import { ClassInterface } from './../../hooks/usePythonCodeAnalyzer';
import '../../styles/styles.css';

function drawEntityRelationshipDiagram(classes: ClassInterface[]): string {
    let dot_content = ""

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
                var attrType = checkMultiValue(tipo);
                dot_content += createAttribute(classe.name, attName, attrType, keyType)
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
                dot_content += createAttribute(classe.name, attr.name, attr.type)
            }
        })
    })

    /* Relationship Nodes */
    classes.forEach((classe: ClassInterface) => {
        classe.functions.forEach((func) => {
            func.decorators?.forEach((decorator) => {
                if (decorator.includes("@relationship")) {
                    dot_content += createRelationship(classe.name, func.name)

                    var types = func.params.split(',');
                    types.forEach((type) => {
                        var parts = type.split(':');
                        var tipo = parts[1] || null;
                        if (tipo != null){
                            if(tipo == classe.name){
                                dot_content += `${func.name} -> ${tipo} [arrowhead=none, arrowtail=none, tailport=w]\n`;
                            } else {
                                dot_content += `${func.name} -> ${tipo} [arrowhead=none, arrowtail=none]\n`;
                            }
                        }
                    })
                } else if (decorator.includes("@identifyingrelationship")) {
                    dot_content += createRelationship(classe.name, func.name, "yes")

                    var types = func.params.split(',');
                    types.forEach((type) => {
                        var parts = type.split(':');
                        dot_content += `${func.name} -> ${parts[1]} [color="black:invis:black", arrowhead=none, arrowtail=none, len=2]\n`;
                    })
                }
            })
        })
    })

    /* Relationship Attribute Nodes */
    classes.forEach((classe: ClassInterface) => {
        classe.functions.forEach((func) => {
            func.decorators?.forEach((decorator) => {
                if (decorator.includes("@relationship") || decorator.includes("@identifyingrelationship")) {
                    var relationshipattr = func.content.split('\n');
                    relationshipattr.forEach((shipattr) => {
                        const attrMatch = shipattr.match(/\s*(\w+):(\s)*((\w+){1})/g);
                        var parts = shipattr.split(':');
                        var attrName = parts[0] || null;
                        var attrType = checkMultiValue(parts[1] || "");
                        console.log(attrType)
                        if (attrMatch != null && attrName != null){
                            dot_content += createAttribute(func.name, attrName, attrType)
                        }
                    })
                }
            })
        })
    })


    let dot_code = `digraph G {overlap=prism; layout=neato; labelloc=b; peripheries=0; splines = true;\n\n${dot_content}\n}`

    return dot_code
}

//Metódo de criação de atributos, o contrutor precisa do nome da classe, nome do atributo e da informação se é chave primária.
function createAttribute(className: string, attrName: string, attrType: string, key?: string){
    console.log(attrType)
    let dot_code = "";
    var extraInfo = "";
    if (attrType == "list" || attrType == "dict" || attrType == "tuple" || attrType == "multivalue"){
        var extraInfo = "peripheries=2,";
    }

    // Como duas entidades podem ter o mesmo atributo (Nome) o nome do nó se transforma no nome da classe + o nó para evitar conflitos!
    if(key === "primary" || key === "foreign"){
        dot_code += `${className}${attrName} [shape=ellipse, ${extraInfo} style=solid, label=<<u>${attrName}</u>>];\n`
    } else {
        dot_code += `${className}${attrName} [shape=ellipse, ${extraInfo} style=solid, label="${attrName}"];\n`
    }
    dot_code += `${className} -> ${className}${attrName} [arrowhead=none, len=1.5];\n`
    return dot_code;
}

function createRelationship(className: string, relationshipName: string, identifying?: string){
    let dot_code = "";

    if(identifying === "yes"){
        dot_code += `${relationshipName} [shape=diamond, style=solid, peripheries=2, height=0.8, label="${relationshipName.toUpperCase()}"];\n`
    } else {
        dot_code += `${relationshipName} [shape=diamond, style=solid, height=0.8, label="${relationshipName.toUpperCase()}"];\n`
    }
    dot_code += `${className} -> ${relationshipName} [arrowhead=none, arrowtail=none, len=2]\n`;

    return dot_code;
}

function checkMultiValue(value: string){
    if (value == "[" || value == "list()" || value == "(" || value == "{"){
        return "multivalue"
    }
    return "single"
}

export default drawEntityRelationshipDiagram;