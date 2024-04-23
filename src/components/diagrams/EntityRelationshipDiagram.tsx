import { ClassInterface } from './../../hooks/usePythonCodeAnalyzer';
import drawEntityRelationshipDiagram from '../../utils/drawFunctions/drawEntityRelationshipDiagram'
import { useEffect, useState } from "react";
import { graphviz } from "d3-graphviz";
import { ref_der } from './_refDiagrams';
import '../../styles/styles.css';

interface IProps {
    classData: ClassInterface[];
}

function EntityRelationshipDiagram({ classData }: IProps) {

    const [dotText, setDotText] = useState<string>('digraph {}');

    useEffect(() => {
        const dot = drawEntityRelationshipDiagram(classData)
        setDotText(dot)
        createGraph();
    }, [dotText, classData]);

    const createGraph = () => {
        graphviz(`#${ref_der.id}`)
            .zoom(false)
            .dot(dotText)
            .render();
    }

    return (<div className="graphvizElement" id={ref_der.id}>
    </div>);
}

export default EntityRelationshipDiagram;