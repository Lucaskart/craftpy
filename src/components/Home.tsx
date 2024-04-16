import React, { useEffect, useState, useCallback } from "react";
import exampleList from '../utils/examples/code'
import { usePythonCodeAnalyzer } from '../hooks/usePythonCodeAnalyzer';
import ClassDiagram from './diagrams/ClassDiagram'
import UseCaseDiagram from './diagrams/UseCaseDiagram'
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { Button } from '@radix-ui/themes';
import { CodeIcon, DownloadIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import html2canvas from 'html2canvas';
import * as Select from '@radix-ui/react-select';

const CLASS_DIAGRAM_NAME = "Diagrama de Classe"
const USE_CASE_NAME = "Casos de Uso"

function Home() {

    const [codeText, setCodeText, classData] = usePythonCodeAnalyzer("")
    const [chooseDiagram, setChooseDiagram] = useState<string>(CLASS_DIAGRAM_NAME);

    const [valueComboBox, setValueComboBox] = useState('Exemplos');

    useEffect(() => {
        const code = exampleList.find((c) => c.desciption == valueComboBox)
        if (code) {
            //setCodeText(code.code)

            // Insere no usePythonCodeAnalyzer um caractere por vez para simular a digitação
            const text = code.code
            let textSet = ""
            for (let i = 0; i < text.length; i++) {
                const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
                sleep(1000).then(() => {
                    // Do something after the sleep!
                    textSet = textSet + text[i]
                    setCodeText(textSet)
                });
            }
        }

    }, [valueComboBox]);

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
        <div className="min-h-full flex flex-col items-center justify-start gap-6 p-4">
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
            <div className="w-full flex flex-row ">
                <div className="w-1/2  flex flex-col max-w-2/3 gap-2 justify-start items-start">
                    <Select.Root value={valueComboBox} onValueChange={setValueComboBox}>
                        <Select.Trigger
                            className="inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white border-blue-200 border-2 text-blue-950 shadow-[0_2px_10px] shadow-black/10 hover:bg-blue-200  focus:border-blue-600 data-[placeholder]:text-red outline-none"
                            aria-label="Examples"
                        >
                            <Select.Value placeholder="Exemplos" />
                            <Select.Icon className="">
                                <ChevronDownIcon />
                            </Select.Icon>
                        </Select.Trigger>
                        <Select.Portal>
                            <Select.Content className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
                                <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-blue-950 cursor-default">
                                    <ChevronUpIcon />
                                </Select.ScrollUpButton>
                                <Select.Viewport className="p-[5px]">
                                    <Select.Group>
                                        {exampleList.map((example) => (
                                            <Select.Item
                                                key={example.desciption}
                                                value={example.desciption}
                                                className="text-[13px] leading-none text-blue-950 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-blue-200 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-blue-200 data-[highlighted]:text-blue-500'">
                                                <Select.ItemText>{example.desciption}</Select.ItemText>
                                                <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                                                    <CheckIcon />
                                                </Select.ItemIndicator>
                                            </Select.Item>
                                        ))}
                                    </Select.Group>
                                </Select.Viewport>
                                <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
                                    <ChevronDownIcon />
                                </Select.ScrollDownButton>
                            </Select.Content>
                        </Select.Portal>
                    </Select.Root>
                    <CodeMirror
                        value={codeText}
                        height="700px"
                        minWidth="900px"
                        theme="dark"
                        extensions={[python()]}
                        onChange={onChangeCode}
                        placeholder="Bem-vindo ao Py2UML..."
                    />
                </div>

                <div className='w-full flex flex-col justify-start items-center pt-10'>
                    {chooseDiagram == CLASS_DIAGRAM_NAME && <ClassDiagram classData={[...classData]} />}
                    {chooseDiagram == USE_CASE_NAME && <UseCaseDiagram classData={[...classData]} />}
                </div>
            </div>
        </div>
    );
}

export default Home;