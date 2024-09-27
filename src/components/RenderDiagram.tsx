import { useEffect, useRef, useState } from "react";
import { graphviz } from "d3-graphviz";
import { ClassInterface } from '../hooks/usePythonCodeAnalyzer'
import { ref_class_diagram, ref_usecase, ref_der } from './diagrams/_refDiagrams';
import drawClassDiagram from '../utils/drawFunctions/drawClassDiagram'
import drawUseCaseDiagram from '../utils/drawFunctions/drawUseCaseDiagram'
import drawEntityRelationshipDiagram from '../utils/drawFunctions/drawEntityRelationshipDiagram'


interface IProps {
    classData: ClassInterface[];
    diagram: string;
}

function RenderDiagram({ classData, diagram }: IProps) {

    const ID = 'graphvizID'

    const [dotText, setDotText] = useState<string>('digraph {}');

    const [dimensoes, setDimensoes] = useState({ width: 0, height: 0 });
    const refComponente = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        getExtractDotCode();
        createGraph();
    }, [dotText, classData]);

    function getExtractDotCode() {
        var dotCode;
        switch (diagram) {
            case ref_class_diagram.name:
                dotCode = drawClassDiagram(classData)
                break
            case ref_usecase.name:
                dotCode = drawUseCaseDiagram(classData)
                break
            case ref_der.name:
                dotCode = drawEntityRelationshipDiagram(classData)
                break
            default:
                dotCode = ""
        }
        setDotText(dotCode);
    }

    const createGraph = () => {
        graphviz(`#${ID}`)
            .zoom(false)
            .addImage("stick.png", "40px", "100px")
            .fit(true)
            .width(dimensoes.width)
            .height(dimensoes.height)
            .dot(dotText)
            .render();
    }

    const atualizarDimensoes = () => {
        if (refComponente.current) {
            const { width, height } = refComponente.current.getBoundingClientRect();
            setDimensoes({ width, height });
        }
    };

    useEffect(() => {
        atualizarDimensoes();
        window.addEventListener('resize', atualizarDimensoes);

        return () => {
            window.removeEventListener('resize', atualizarDimensoes);
        };
    }, []);

    return (
        <div ref={refComponente} className="flex-1 overflow-auto" >
            <div id={ID}>
            </div>
        </div >);
}

export default RenderDiagram;