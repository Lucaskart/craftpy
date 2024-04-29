import { ClassInterface } from './../../hooks/usePythonCodeAnalyzer';
import '../../styles/styles.css';

function drawEntityRelationshipDiagram(classes: ClassInterface[]): string {
    let dot_content = ""

    console.log(classes);

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
                var i = 1;
                if (decorator.includes("@relationship")) {
                    const _f = decorator.replace(/.*\[(.*?)\].*/, '$1')
                    if (_f) {
                        dot_content += createRelationship(classe.name, _f, func.name, i, func.params)
                        i++;
                    }
                } else if (decorator.includes("@identifyingrelationship")) {
                    const _f = decorator.replace(/.*\[(.*?)\].*/, '$1')
                    if (_f) {
                        dot_content += createRelationship(classe.name, _f, func.name, i, func.params, "yes")
                        i++;
                    }
                }
            })
        })
    })

    let dot_code = `digraph G {overlap=scalexy; layout=neato; labelloc=b; peripheries=0; splines = true;\n\n${dot_content}\n}`

    return dot_code
}

//Metódo de criação de atributos, o contrutor precisa do nome da classe, nome do atributo e da informação se é chave primária.
function createAttribute(className: string, attrName: string, attrType: string, key?: string){
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

function createRelationship(className: string, targetClassName: string, relationshipName: string, number: number, relationshipAttributes: string, identifying?: string){
    let dot_code = "";
    var classes = [className, targetClassName]

    classes.sort();
    var relationshipId = `${classes[0]}${classes[1]}${number}`

    if(identifying === "yes"){
        dot_code += `${relationshipId} [shape=diamond, style=solid, peripheries=2, height=0.8, label="${relationshipName.toUpperCase()}"];\n`
    } else {
        dot_code += `${relationshipId} [shape=diamond, style=solid, height=0.8, label="${relationshipName.toUpperCase()}"];\n`
    }

    if(className === targetClassName){
        dot_code += `${className} -> ${relationshipId} [arrowhead=none, arrowtail=none, len=2, headport=e]\n`;
        dot_code += `${targetClassName} -> ${relationshipId} [arrowhead=none, arrowtail=none, len=2, headport=w]\n`;
    } else{
        dot_code += `${className} -> ${relationshipId} [arrowhead=none, arrowtail=none, len=2]\n`;
        if(identifying === "yes"){
            dot_code += `${targetClassName} -> ${relationshipId} [color="black:invis:black", arrowhead=none, arrowtail=none, len=2]\n`;
        } else {
            dot_code += `${targetClassName} -> ${relationshipId} [arrowhead=none, arrowtail=none, len=2]\n`;
        }
    }

    var types = relationshipAttributes.split(',');
    types.forEach((type: string) => {
        console.log(type)
        var parts = type.split(':');
        var attrName = parts[0] || null;
        var attrType = checkMultiValue(parts[1] || "");
        if (attrName != null){
            dot_code += createAttribute(relationshipId, attrName, attrType)
        }
    })

    return dot_code;
}

function checkMultiValue(value: string){
    if (value == "[" || value == "list()" || value == "(" || value == "{"){
        return "multivalue"
    }
    return "single"
}

export default drawEntityRelationshipDiagram;