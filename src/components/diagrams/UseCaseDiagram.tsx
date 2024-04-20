import { ClassInterface } from './../../hooks/usePythonCodeAnalyzer';
import drawUseCaseDiagram from '../../utils/drawFunctions/drawUseCaseDiagram'
import { useEffect, useState } from "react";
import { graphviz } from "d3-graphviz";
import { ref_usecase } from './_refDiagrams';

interface IProps {
    classData: ClassInterface[];
}

function UseCaseDiagram({ classData }: IProps) {

    const [dotText, setDotText] = useState<string>('digraph {}');

    useEffect(() => {
        const dot = drawUseCaseDiagram(classData)
        setDotText(dot)
        createGraph();
    }, [dotText, classData]);

    const createGraph = () => {
        graphviz(`#${ref_usecase.id}`)
            .zoom(false)
            .addImage("stick.png", "40px", "100px")
            .dot(dotText)
            .render()
    }

    return (<div id={ref_usecase.id}>
    </div>);
}

export default UseCaseDiagram;