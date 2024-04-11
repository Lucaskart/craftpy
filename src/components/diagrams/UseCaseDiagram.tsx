import { ClassInterface } from './../../hooks/usePythonCodeAnalyzer';
import drawUseCaseDiagram from '../../utils/drawFunctions/drawUseCaseDiagram'
import { useEffect, useState } from "react";
import { graphviz } from "d3-graphviz";

interface IProps {
    classData: ClassInterface[];
}

const ID = 'graphUseCase'

function UseCaseDiagram({ classData }: IProps) {

    const [dotText, setDotText] = useState<string>('digraph {}');

    useEffect(() => {
        const dot = drawUseCaseDiagram(classData)
        setDotText(dot)
        createGraph();
    }, [dotText, classData]);

    const createGraph = () => {
        graphviz(`#${ID}`)
            .zoom(false)
            .addImage("stick.png", "40px", "100px")
            .dot(dotText)
            .render()
    }

    return (<div id={ID}>
    </div>);
}

export default UseCaseDiagram;