import { useEffect, useState, useCallback } from "react";
import exampleList from '../utils/examples/code'
import { usePythonCodeAnalyzer } from '../hooks/usePythonCodeAnalyzer';
import ClassDiagram from './diagrams/ClassDiagram'
import UseCaseDiagram from './diagrams/UseCaseDiagram'
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { Button, TextArea } from '@radix-ui/themes';
import { CodeIcon, DownloadIcon } from '@radix-ui/react-icons'
import html2canvas from 'html2canvas';

const CLASS_DIAGRAM_NAME = "Diagrama de Classe"
const USE_CASE_NAME = "Casos de Uso"

function Home() {

    const codeTextExample = exampleList[1].code;

    const [codeText, setCodeText, classData] = usePythonCodeAnalyzer(codeTextExample)
    const [chooseDiagram, setChooseDiagram] = useState<string>(CLASS_DIAGRAM_NAME);

    useEffect(() => {
        setCodeText(codeTextExample)
    }, []);

    const onChangeCode = useCallback((newCode: React.SetStateAction<string>) => {
        setCodeText(newCode);
    }, []);

    const handleDownloadCode = async () => {
        //const fileData = JSON.stringify(codeText);
        const blob = new Blob([codeText], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "user-info.py";
        link.href = url;
        link.click();
    };

    const handleDownloadImage = async () => {
        const element = document.getElementById(chooseDiagram == CLASS_DIAGRAM_NAME ? "graphClass" : "graphUseCase")!,
            canvas = await html2canvas(element),
            data = canvas.toDataURL('image/jpg'),
            link = document.createElement('a');

        link.href = data;
        link.download = 'downloaded-image.jpg';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-full flex flex-col items-center justify-start p-4 gap-6">
            <div className="w-full flex flex-row justify-around items-center">
                <Button accessKey='1' size="2" onClick={handleDownloadCode} >
                    <CodeIcon width="16" height="16" /> Salvar Código
                </Button>
                <div className="flex flex-row justify-center items-center gap-x-1">
                    <Button accessKey='2' size="2"
                        variant={chooseDiagram == CLASS_DIAGRAM_NAME ? "solid" : "soft"}
                        onClick={() => setChooseDiagram(CLASS_DIAGRAM_NAME)}>
                        {CLASS_DIAGRAM_NAME}
                    </Button>
                    <Button accessKey='3' size="2"
                        variant={chooseDiagram == USE_CASE_NAME ? "solid" : "soft"}
                        onClick={() => setChooseDiagram(USE_CASE_NAME)}>
                        {USE_CASE_NAME}
                    </Button>
                </div>
                <Button accessKey='4' size="2" onClick={handleDownloadImage}>
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
                    onChange={onChangeCode}
                />
                <div className='w-2/3 flex flex-col justify-center items-center'>
                    {chooseDiagram == CLASS_DIAGRAM_NAME && <ClassDiagram classData={[...classData]} />}
                    {chooseDiagram == USE_CASE_NAME && <UseCaseDiagram classData={[...classData]} />}
                </div>
            </div>
            <TextArea className="w-full h-[150px]" placeholder="Painel de Logs…" variant="surface" disabled={true} />
        </div>
    );
}

export default Home;