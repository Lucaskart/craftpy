import { ClassInterface, AttributeInterface, setAccessElement, setNameElement } from './../../hooks/usePythonCodeAnalyzer';


function drawClassDiagram(classes: ClassInterface[]): string {
    let dot_content = ""

    classes.forEach((classe: ClassInterface) => {
        let attrs = "";
        let meth = "";

        // Constroi as funções da classe
        classe.functions.forEach((func) => {
            if (func.name != "__init__") {
                meth += `${func.access} ${func.name}()\\l`;

                // Analisa internamente cada função e cria os relacionamentos de Dependência
                const regex = /self\.(\w+)(?::(\w+(?:\[\w+\])?))?(?:\s*=\s*(.+))?$/gm;
                let match;
                while ((match = regex.exec(func.content)) !== null) {

                    const p: AttributeInterface = {
                        access: setAccessElement(match[1]),
                        name: setNameElement(match[1]),
                        type: match[3].replace(/\([^)]*\)/g, '') || null,
                        value: match[3] || null,
                    };

                    dot_content += `${p.type}  ->   ${classe.name} [style=dotted, arrowtail=open, dir=back, label="<<create>>", labeldistance=1.5]\n`;
                }
            }
        })

        // constroi a classe e seus relacionamentos
        classe.attributes?.forEach((attr) => {
            // Adiciona variáveis com tipo iniciando com letra minúscula (variáveis internas ao construtor)
            if (attr.type && (attr.type[0] !== attr.type[0].toUpperCase())) {
                if (!attr.type.includes('list[')) {
                    attrs += `${attr.access} ${attr.name}:${attr.type}\\l`;
                } else { // desenha as agregações em lista
                    const padrao = /\[(.*?)\]/;
                    const resultado = padrao.exec(attr.type);
                    if (resultado) {
                        dot_content += `${classe.name} -> ${resultado[1]} [arrowtail=odiamond, dir=back, label=<<table border="0" cellspacing="10"><tr><td></td></tr></table>>, taillabel=1, headlabel=<<TABLE border="0" cellspacing="3"><tr><td>*</td><td>${attr.access} ${attr.name}</td></tr></TABLE>>, labeldistance=1.5]\n`;
                    }
                }
            } else { // desenha as agregações
                // Adiciona se não tiver atribuições começando com letra maiúscula
                if (attr.value && attr.value[0] !== attr.value[0].toUpperCase()) {
                    dot_content += `${classe.name} -> ${attr.type} [arrowtail=odiamond, dir=back, taillabel="${attr.access} ${attr.name}", labeldistance=2]\n`;
                } else { // desenha as composições
                    // Atribuições iniciadas com letra maiúscula
                    dot_content += `${classe.name} -> ${attr.type} [arrowtail=diamond, dir=back, taillabel="${attr.access} ${attr.name}", labeldistance=2]\n`;
                }
            }
        })

        // desenhas as associações
        dot_content += `${classe.name} [label="{ {${classe.name}} | {${attrs}} | {${meth}} }", shape=record] \n`;

        //desenha o relacionamento de herança
        dot_content += draw_inheritance(classe)

        dot_content += draw_association(classe)
    })

    let dot_code = "digraph ClassDiagram {graph[rankdir=\"TB\"] node[shape=record,style=filled,fillcolor=gray95] edge[dir=back, arrowtail=empty]\n" + dot_content + "}\n";

    return dot_code
}

function draw_inheritance(classe: ClassInterface): string {
    let dot_code = "";
    if (classe.inheritance) {
        const superClasses = classe.inheritance.split(',')
        for (var i = 0; i < superClasses.length; i++) {
            dot_code += `${superClasses[i].trim()} -> ${classe.name} [arrowtail=onormal, dir=back]\n`;
        }
    }
    return dot_code;
}
function draw_association(classe: ClassInterface): string {
    let dot_code = "";

    let regexFuncao = /def\s+\w+\s*\([^)]*\):\s*([\s\S]*?)(?=def|$)/g;
    // Substituir todas as funções por uma string vazia
    let textoSemFuncoes = classe.content.replace(regexFuncao, '');

    const regex = /^\s*([a-zA-Z_]\w*)(?:\s*:\s*(list\[)?([a-zA-Z_]\w*)\]?)?(?:\s*=\s*(.*))?\s*$/gm;

    let match;
    while ((match = regex.exec(textoSemFuncoes)) !== null) {
        var privacySymbol = "+";
        var multiplicity = "1";
        var nome = match[1];
        if (nome.substring(0, 2) === "__") {
            nome = nome.replace("__", "");
            privacySymbol = "-";
        }
        const tipo = match[3] || null;
        if (match[2] == "list[") {
            multiplicity = "*";
        }
        //const atribuicao = match[3] !== undefined ? match[3].trim() : null;

        if (tipo && tipo[0] === tipo[0].toUpperCase()) {
            dot_code += `${classe.name} -> ${tipo} [arrowhead=vee, dir=forward, open="${privacySymbol}${nome}", headlabel="${multiplicity}", labeldistance=2]\n`;
            //variaveis.push({ nome, tipo, atribuicao });
        }
    }
    return dot_code;
}

export default drawClassDiagram;