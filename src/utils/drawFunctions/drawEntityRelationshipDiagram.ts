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
        var i = 1;
        classe.functions.forEach((func) => {
            func.decorators?.forEach((decorator) => {
                var _m = null;

                //Tipos de Relacionamento
                if (decorator.includes("@relationship")) {
                    if (func.decorators != null && func.decorators[1] != undefined && func.decorators[1].includes("@multiplicity")) {
                        const regex = /.*\[(.*?)\].*/g;
                        _m = regex.exec(func.decorators[1]);
                    }

                    const regex = /.*\[(.*?)\].*/g;
                    const _f = regex.exec(decorator);
                    if (_f != null && _f[1]) {
                        dot_content += createRelationship(classe.name, _f[1], func.name, i, func.params, _m)
                        i++;
                    }
                } else if (decorator.includes("@identifyingrelationship")) {
                    if (func.decorators != null && func.decorators[1] != undefined && func.decorators[1].includes("@multiplicity")) {
                        const regex = /.*\[(.*?)\].*/g;
                        _m = regex.exec(func.decorators[1]);
                    }

                    const regex = /.*\[(.*?)\].*/g;
                    const _f = regex.exec(decorator);
                    if (_f != null && _f[1]) {
                        dot_content += createRelationship(classe.name, _f[1], func.name, i, func.params, _m, "yes")
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

function createRelationship(className: string, targetClassName: string, relationshipName: string, number: number, relationshipAttributes: string, multiplicity: any, identifying?: string){
    let dot_code = "";
    var classes = [className, targetClassName]
    var headpart = ""; var tailpart = "";

    classes.sort();
    var relationshipId = `${classes[0]}${classes[1]}${number}`

    if (multiplicity != null && multiplicity[1] != null && multiplicity[1].split(':')){
        var parts = multiplicity[1].split(':');
        console.log(parts)
        var headpart = "label=\"" + parts[0] + "\",";
        var tailpart = "label=\"" + parts[1] + "\",";
    }

    //Losango do relacionamento
    if(identifying === "yes"){
        dot_code += `${relationshipId} [shape=diamond, style=solid, peripheries=2, height=0.8, label="${relationshipName.toUpperCase()}"];\n`
    } else {
        dot_code += `${relationshipId} [shape=diamond, style=solid, height=0.8, label="${relationshipName.toUpperCase()}"];\n`
    }

    //Conexões do losango
    if(className === targetClassName){
        dot_code += `${className} -> ${relationshipId} [${headpart} arrowhead=none, arrowtail=none, len=2, headport=e]\n`;
        dot_code += `${targetClassName} -> ${relationshipId} [${tailpart} arrowhead=none, arrowtail=none, len=2, headport=w]\n`;
    } else{
        dot_code += `${className} -> ${relationshipId} [${headpart} arrowhead=none, arrowtail=none, len=2]\n`;
        if(identifying === "yes"){
            dot_code += `${targetClassName} -> ${relationshipId} [${tailpart} color="black:invis:black", arrowhead=none, arrowtail=none, len=2]\n`;
        } else {
            dot_code += `${targetClassName} -> ${relationshipId} [${tailpart} arrowhead=none, arrowtail=none, len=2]\n`;
        }
    }

    //Atributos do relacionamento
    var types = relationshipAttributes.split(',');
    types.forEach((type: string) => {
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