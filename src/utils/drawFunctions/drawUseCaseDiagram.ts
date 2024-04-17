import { ClassInterface } from './../../hooks/usePythonCodeAnalyzer';

function drawUseCaseDiagram(classes: ClassInterface[]): string {
    let dot_content = ""

    /* Actor Nodes */
    dot_content += `node [shape=plaintext];\n`

    classes.forEach((classe: ClassInterface) => {
        dot_content += `subgraph cluster${classe.name} {label="${classe.name}";\n
      ${classe.name}};\n${classe.name} [label="", height=1 image="stick.png"];\n`
    })

    /* Use Case Nodes */
    dot_content += `node [shape=ellipse, style=solid];\n`

    classes.forEach((classe: ClassInterface) => {
        classe.functions.forEach((func) => {
            func.decorators?.forEach(() => {
                dot_content += `${func.name} [label="${func.name}"];\n`
            })
        })
    })

    /* Edges */
    dot_content += `edge  [arrowhead="oarrow"];\n`

    classes.forEach((classe: ClassInterface) => {
        if (classe.inheritance) {
            const superClasses = classe.inheritance.split(',')
            for (var i = 0; i < superClasses.length; i++) {
                if (superClasses[i]) {
                    dot_content += `${superClasses[i].trim()} -> ${classe.name};\n`
                }
            }
        }
    })

    dot_content += `edge [arrowhead=none];\n`

    classes.forEach((classe: ClassInterface) => {
        classe.functions.forEach((func) => {
            func.decorators?.forEach((decorator) => {
                if (decorator.includes("@usecase")) {
                    dot_content += `${classe.name} -> ${func.name};\n`
                }
            })
        })
    })

    dot_content += `edge [arrowtail="vee", dir=back, label="<<extend>>", style=dashed];\n`

    classes.forEach((classe: ClassInterface) => {
        classe.functions.forEach((func) => {
            func.decorators?.forEach((decorator) => {
                if (decorator.includes("@extends")) {
                    const _f = decorator.replace(/.*\[(.*?)\].*/, '$1')
                    if (_f) {
                        dot_content += `${func.name} -> ${_f};\n`
                    }
                }
            })
        })
    })

    dot_content += `edge [arrowtail="vee",  dir=back, label="<<include>>", style=dashed];\n`

    classes.forEach((classe: ClassInterface) => {
        classe.functions.forEach((func) => {
            func.decorators?.forEach((decorator) => {
                if (decorator.includes("@include")) {
                    const _f = decorator.replace(/.*\[(.*?)\].*/, '$1')
                    if (_f) {
                        dot_content += `${_f} -> ${func.name};\n`
                    }

                }
            })
        })
    })


    let dot_code = `digraph G {overlap=prism; layout=neato; labelloc=b;peripheries=0;\n\n${dot_content}\n}`

    return dot_code
}


export default drawUseCaseDiagram;