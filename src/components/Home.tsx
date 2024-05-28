import { useEffect, useState } from "react";
import exampleList from '../utils/examples/code'
import { usePythonCodeAnalyzer } from '../hooks/usePythonCodeAnalyzer';
import ClassDiagram from './diagrams/ClassDiagram'
import UseCaseDiagram from './diagrams/UseCaseDiagram'
import EntityRelationshipDiagram from "./diagrams/EntityRelationshipDiagram";
import html2canvas from 'html2canvas';
import * as Select from '@radix-ui/react-select';
import drawClassDiagram from '../utils/drawFunctions/drawClassDiagram'
import drawUseCaseDiagram from '../utils/drawFunctions/drawUseCaseDiagram'
import drawEntityRelationshipDiagram from '../utils/drawFunctions/drawEntityRelationshipDiagram'
import {  Button } from '@radix-ui/themes';
import { FileIcon, ImageIcon, ChevronDownIcon, ChevronUpIcon, CheckIcon } from '@radix-ui/react-icons'
import { LiaProjectDiagramSolid, LiaSave } from "react-icons/lia";
import { SiActigraph } from "react-icons/si";
import { BsDiagram3 } from "react-icons/bs";
import { ref_class_diagram, ref_usecase, ref_der } from './diagrams/_refDiagrams';

import Editor from '@monaco-editor/react';

function Home() {

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
        const element = document.getElementById(chooseDiagram.id)!,
            canvas = await html2canvas(element),
            data = canvas.toDataURL('image/jpg'),
            link = document.createElement('a');

        link.href = data;
        link.download = `downloaded-image-${chooseDiagram.name.replace(/\s/g, '_')}.jpg`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div >
            {/* Barra de ações */}
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
                    <Button title={ref_class_diagram.name} accessKey='2' size="2" className="w-12 xl:w-48"
                        variant={chooseDiagram == ref_class_diagram ? "solid" : "soft"}
                        onClick={() => setChooseDiagram(ref_class_diagram)}
                    >
                        <LiaProjectDiagramSolid width="16" height="16" />
                        <span className="hidden xl:flex">
                            {ref_class_diagram.name}
                        </span>

                    </Button>
                    <Button title={ref_usecase.name} accessKey='3' size="2" className="w-12 xl:w-48"
                        variant={chooseDiagram == ref_usecase ? "solid" : "soft"}
                        onClick={() => setChooseDiagram(ref_usecase)}>
                        <SiActigraph width="16" height="16" />
                        <span className="hidden xl:flex">
                            {ref_usecase.name}
                        </span>
                    </Button>
                    <Button title={ref_der.name} accessKey='4' size="2" className="w-12 xl:w-48"
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
            {/* Gráfica */}
            <div className="flex flex-col xl:flex-row">
                <div className="w-full h-[450px] xl:w-1/2">
                    <Editor
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
                <div className="flex flex-col mx-auto">
                    {chooseDiagram == ref_class_diagram && <ClassDiagram classData={[...classData]} />}
                    {chooseDiagram == ref_usecase && <UseCaseDiagram classData={[...classData]} />}
                    {chooseDiagram == ref_der && <EntityRelationshipDiagram classData={[...classData]} />}
                </div>
            </div>
        </div>
    );
}

export default Home;