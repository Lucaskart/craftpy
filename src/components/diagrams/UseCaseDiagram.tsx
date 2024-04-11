import { ClassInterface } from './../../hooks/usePythonCodeAnalyzer';
import drawUseCaseDiagram from '../../utils/drawFunctions/drawUseCaseDiagram'

import { useEffect, useState } from "react";
import { select as d3Select } from 'd3-selection';
import 'd3-graphviz';


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
        d3Select<HTMLElement, any>(`#${ID}`)
            .graphviz()
            .zoom(false)
            .addImage("stick.png", "40px", "100px")
            .dot(dotText)
            .render()
    }

    return (<div id={ID}>
    </div>);
}

export default UseCaseDiagram;