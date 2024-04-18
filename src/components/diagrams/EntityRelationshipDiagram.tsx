import { ClassInterface } from './../../hooks/usePythonCodeAnalyzer';
import drawEntityRelationshipDiagram from '../../utils/drawFunctions/drawEntityRelationshipDiagram'
import { useEffect, useState } from "react";
import { graphviz } from "d3-graphviz";


interface IProps {
    classData: ClassInterface[];
}

const ID = 'graphEntityRelationship'

function EntityRelationshipDiagram({ classData }: IProps) {

    const [dotText, setDotText] = useState<string>('digraph {}');

    useEffect(() => {
        const dot = drawEntityRelationshipDiagram(classData)
        setDotText(dot)
        createGraph();
    }, [dotText, classData]);

    const createGraph = () => {
        graphviz(`#${ID}`)
            .zoom(false)
            .dot(dotText)
            .render();
    }

    return (<div id={ID}>
    </div>);
}

export default EntityRelationshipDiagram;