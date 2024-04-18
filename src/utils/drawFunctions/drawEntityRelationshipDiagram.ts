import { ClassInterface } from './../../hooks/usePythonCodeAnalyzer';

function drawEntityRelationshipDiagram(classes: ClassInterface[]): string {
    let dot_content = ""

    /* Entity Nodes */
    dot_content += `node [shape=box, style=solid];\n`

    classes.forEach((classe: ClassInterface) => {
        dot_content += `${classe.name} [label="${classe.name}"];\n`
    })

    console.log(classes);

    /* Attribute Nodes */
    dot_content += `edge [arrowhead=none];\n`

    classes.forEach((classe: ClassInterface) => {
        classe.attributes?.forEach((attr) => {
            // Adiciona atributos da classe sem relacionamento.
            if (attr.type && (attr.type[0] !== attr.type[0].toUpperCase())) {
                if (!attr.type.includes('list[')) {
                    // Como duas entidades podem ter o mesmo atributo (Nome) o nome do nó se transforma no nome da classe + o nó para evitar conflitos!
                    dot_content += `${classe.name}${attr.name} [shape=ellipse, style=solid, label="${attr.name}"];\n`
                    dot_content += `${classe.name} -> ${classe.name}${attr.name};\n`
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


export default drawEntityRelationshipDiagram;