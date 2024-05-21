import { useEffect, useState } from "react";
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

    useEffect(() => {
        /* const dot = drawEntityRelationshipDiagram(classData)
        setDotText(dot)
        createGraph(); */
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
            .fit(true)
            .dot(dotText)
            .render();
    }

    return (
        <div className="overflow-auto" >
            <div  id={ID}>
            </div>
        </div>);
}

export default RenderDiagram;