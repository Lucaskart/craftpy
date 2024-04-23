import { ClassInterface } from './../../hooks/usePythonCodeAnalyzer';
import drawClassDiagram from '../../utils/drawFunctions/drawClassDiagram'
import { useEffect, useState } from "react";
import { graphviz } from "d3-graphviz";
import { ref_class_diagram } from './_refDiagrams';


interface IProps {
    classData: ClassInterface[];
}

function ClassDiagram({ classData }: IProps) {

    const [dotText, setDotText] = useState<string>('digraph {}');

    useEffect(() => {
        const dot = drawClassDiagram(classData)
        setDotText(dot)
        createGraph();
    }, [dotText, classData]);

    const createGraph = () => {
        graphviz(`#${ref_class_diagram.id}`)
            .zoom(false)
            .dot(dotText)
            .render();
    }

    return (<div className="graphvizElement" id={ref_class_diagram.id}>
    </div>);
}

export default ClassDiagram;