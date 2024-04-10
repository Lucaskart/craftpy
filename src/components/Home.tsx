import { useEffect } from "react";
import exampleList from '../utils/examples/code'
import { usePythonCodeAnalyzer } from '../hooks/usePythonCodeAnalyzer';
import ClassDiagram from './diagrams/ClassDiagram'
import UseCaseDiagram from './diagrams/UseCaseDiagram'

import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';

import { Button, TextArea } from '@radix-ui/themes';
import { CodeIcon, DownloadIcon, CaretDownIcon, CaretUpIcon } from '@radix-ui/react-icons'


function Home() {


    const codeTextExample = exampleList[0].code;

    const [codeText, setCodeText, classData] = usePythonCodeAnalyzer(codeTextExample)

    useEffect(() => {
        setCodeText(codeTextExample)
    }, []);
    return (
        <div className="min-h-full flex flex-col items-center justify-start p-4 gap-6">
            <div className="w-full flex flex-row justify-around items-center">
                <Button accessKey='1' size="2">
                    <CodeIcon width="16" height="16" /> Salvar Código
                </Button>
                <div>
                    ... diagramas ....
                </div>
                <Button accessKey='3' size="2" >
                    <DownloadIcon width="16" height="16" /> Salvar Diagrama
                </Button>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
                <CodeMirror
                    className="w-full"
                    value={codeText}
                    height="600px"
                    width="100%"
                    theme="dark"
                    extensions={[python()]}
                />
                <div className='w-2/3 flex flex-col justify-center items-center'>
                    <ClassDiagram classData={[...classData]} />
                    {/*  <UseCaseDiagram classData={[...classData]} /> */}
                </div>
            </div>
            <TextArea className="w-full h-[150px]" placeholder="Painel de Logs…" variant="surface" disabled={true} />
        </div>
    );
}

export default Home;