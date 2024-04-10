import { ClassInterface } from './../../hooks/usePythonCodeAnalyzer';
import drawClassDiagram from '../../utils/drawFunctions/drawClassDiagram'
import { useEffect, useState } from "react";
import { select as d3Select } from 'd3-selection';
import 'd3-graphviz';


interface IProps {
    classData: ClassInterface[];
}

const ID = 'graphClass'

function ClassDiagram({ classData }: IProps) {

    const [dotText, setDotText] = useState<string>('digraph {}');

    useEffect(() => {
        const dot = drawClassDiagram(classData)
        setDotText(dot)
        createGraph();
    }, [dotText, classData]);

    const createGraph = () => {
        d3Select<HTMLElement, any>(`#${ID}`)
            .graphviz()
            .dot(dotText)
            .render()
    }

    return (<div id={ID}>
    </div>);
}

export default ClassDiagram;