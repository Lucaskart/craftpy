import React, { useEffect, useRef } from "react";
import { select as d3Select, Selection } from 'd3-selection';
import 'd3-graphviz';

function DiagramGenerator() {


    var dotSrc = `digraph  {
        a[image="./logo.png"];
        b[image="https://martin.elwin.com/blog/wp-content/uploads/2008/05/stick.png"]; 
         a -> b}`;

    const divRef: { current: Selection<HTMLElement, any, any, any> | null } = { current: null };
    const graphviz = useRef<any>(null);


    useEffect(() => {
        divRef.current = d3Select<HTMLElement, any>("#graph");
        createGraph();
    }, []);


    const createGraph = () => {
        if (divRef.current) {
            graphviz.current = divRef.current
                .graphviz()
                .on('initEnd', () => renderGraph())
        }        
    }

    const renderGraph = () => {
        if (graphviz.current) {
            graphviz.current.addImage("https://martin.elwin.com/blog/wp-content/uploads/2008/05/stick.png", "400px", "300px")
            graphviz.current.addImage("./logo.png", "400px", "300px")
            graphviz.current.renderDot(dotSrc);        
        }
    }


    return (
        <React.Fragment>
            <div id="graph">

            </div>
        </React.Fragment >
    );
}

export default DiagramGenerator