import { useEffect, useState } from "react";
import exampleList from '../utils/examples/code'
import { usePythonCodeAnalyzer } from '../hooks/usePythonCodeAnalyzer';
import * as Select from '@radix-ui/react-select';
import drawClassDiagram from '../utils/drawFunctions/drawClassDiagram'
import drawUseCaseDiagram from '../utils/drawFunctions/drawUseCaseDiagram'
import drawEntityRelationshipDiagram from '../utils/drawFunctions/drawEntityRelationshipDiagram'
import { Button } from '@radix-ui/themes';
import { FileIcon, ImageIcon, ChevronDownIcon, ChevronUpIcon, CheckIcon } from '@radix-ui/react-icons'
import { LiaProjectDiagramSolid, LiaSave } from "react-icons/lia";
import { SiActigraph } from "react-icons/si";
import { BsDiagram3 } from "react-icons/bs";
import { ref_class_diagram, ref_usecase, ref_der } from './diagrams/_refDiagrams';

import Editor from '@monaco-editor/react';

import RenderDiagram, { ID } from './RenderDiagram'

function Home() {

    const IMG_Agent = `xlink:href="data:image/png;charset=utf-8;base64,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"`

    const [codeText, setCodeText, classData] = usePythonCodeAnalyzer("")
    const [chooseDiagram, setChooseDiagram] = useState<{ name: string, id: string }>(ref_class_diagram);

    const [valueComboBox, setValueComboBox] = useState('Exemplos de Códigos');

    useEffect(() => {
        const code = exampleList.find((c) => c.desciption == valueComboBox)
        if (code) {
            setCodeText(code.code)
        }

    }, [valueComboBox]);

    function handleEditorChange(value: any) {
        setCodeText(value);
    }

    const handleDownloadCode = async () => {
        //const fileData = JSON.stringify(codeText);
        const blob = new Blob([codeText], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `${valueComboBox.replace(/\s/g, '_')}.py`;
        link.href = url;
        link.click();
    };

    const handleDownloadDot = async () => {
        var dotCode;
        switch (chooseDiagram.name) {
            case ref_class_diagram.name:
                dotCode = drawClassDiagram(classData)
                break
            case ref_usecase.name:
                dotCode = drawUseCaseDiagram(classData)
                break
            case ref_der.name:
                dotCode = drawEntityRelationshipDiagram(classData)
                break
            default:
                dotCode = ""
        }
        const blob = new Blob([dotCode], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `${chooseDiagram.name.replace(/\s/g, '_')}.dot`;
        link.href = url;
        link.click();
    };

    const handleDownloadImage = async () => {
        // Seleciona o elemento SVG dentro da div
        const svgElement = document.querySelector(`#${ID} svg`); // div que contém o SVG
        if (svgElement) {
            var svgContent = svgElement.outerHTML; // Captura apenas o conteúdo do <svg>...</svg>

            svgContent = svgContent.replace(/xlink:href="stick.png"/g, IMG_Agent);
            
            // Cria um Blob com o conteúdo do SVG
            const blob = new Blob([svgContent], { type: 'image/svg+xml' });

            // Cria um link para download
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `downloaded-image-${chooseDiagram.name.replace(/\s/g, '_')}`; // Nome do arquivo SVG que será baixado
            
            document.body.appendChild(link); 
            link.click();
            document.body.removeChild(link);
        } else {
            console.log('Elemento SVG não encontrado');
        }
    };


    const ActionBar = () => (
        <div className="flex flex-row justify-around items-center py-4">
            <div className="flex flex-row gap-1 justify-center items-center">
                <Select.Root value={valueComboBox} onValueChange={setValueComboBox}>
                    <Select.Trigger
                        className="w-12 xl:w-56 inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white border-blue-200 border-2 text-blue-950 shadow-[0_2px_10px] shadow-black/10 hover:bg-blue-200  focus:border-blue-600 data-[placeholder]:text-red outline-none"
                        aria-label="Examples"
                        title="Exemplos de Códigos"
                    >
                        <div className="hidden xl:flex">
                            <Select.Value placeholder="Exemplos de Códigos" />
                        </div>

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
                <Button title="Salvar Código" accessKey='1' size="2" className="w-12 xl:w-48" onClick={handleDownloadCode} >
                    <LiaSave width="16" height="16" />
                    <span className="hidden xl:flex">
                        Salvar Código
                    </span>
                </Button>
            </div>
            <div className="flex flex-row gap-1 justify-center items-center">
                <Button color="mint" title={ref_class_diagram.name} accessKey='2' size="2" className="w-12 xl:w-48"
                    variant={chooseDiagram == ref_class_diagram ? "solid" : "soft"}
                    onClick={() => setChooseDiagram(ref_class_diagram)}
                >
                    <LiaProjectDiagramSolid width="16" height="16" />
                    <span className="hidden xl:flex">
                        {ref_class_diagram.name}
                    </span>

                </Button>
                <Button color="mint" title={ref_usecase.name} accessKey='3' size="2" className="w-12 xl:w-48"
                    variant={chooseDiagram == ref_usecase ? "solid" : "soft"}
                    onClick={() => setChooseDiagram(ref_usecase)}>
                    <SiActigraph width="16" height="16" />
                    <span className="hidden xl:flex">
                        {ref_usecase.name}
                    </span>
                </Button>
                <Button color="mint" title={ref_der.name} accessKey='4' size="2" className="w-12 xl:w-48"
                    variant={chooseDiagram == ref_der ? "solid" : "soft"}
                    onClick={() => setChooseDiagram(ref_der)}>
                    <BsDiagram3 width="16" height="16" />
                    <span className="hidden xl:flex">
                        {ref_der.name}
                    </span>
                </Button>

            </div>
            {/* Salvar arquivos */}
            <div className="flex flex-row gap-1 justify-center items-center">
                <Button title="Salvar .dot" accessKey='5' size="2" className="w-12 xl:w-48" onClick={handleDownloadDot}>
                    <FileIcon width="16" height="16" />
                    <span className="hidden xl:flex">
                        Salvar .dot
                    </span>
                </Button>
                <Button title="Salvar Diagrama" accessKey='6' size="2" className="w-12 xl:w-48" onClick={handleDownloadImage}>
                    <ImageIcon width="16" height="16" />
                    <span className="hidden xl:flex">
                        Salvar Diagrama
                    </span>
                </Button>
            </div>
        </div>
    )


    return (
        <div className="flex flex-col h-full">
            <ActionBar />
            <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                <div className="flex-1 flex flex-col">
                    <Editor
                        className="overflow-auto"
                        value={codeText}
                        height="100%"
                        width="100%"
                        defaultLanguage="python"
                        defaultValue="# Bem-vindo ao CRAFTPy..."
                        options={{
                            ariaLabel: "Campo do Código Python"
                        }}
                        onChange={handleEditorChange}
                    />
                </div>

                <RenderDiagram classData={[...classData]} diagram={chooseDiagram.name} />

            </div>
        </div>
    );
}

export default Home;