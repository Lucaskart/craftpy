import React, { useEffect, useState, useCallback } from "react";
import exampleList from '../utils/examples/code'
import { usePythonCodeAnalyzer } from '../hooks/usePythonCodeAnalyzer';
import ClassDiagram from './diagrams/ClassDiagram'
import UseCaseDiagram from './diagrams/UseCaseDiagram'
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import html2canvas from 'html2canvas';
import * as Select from '@radix-ui/react-select';
import drawClassDiagram from '../utils/drawFunctions/drawClassDiagram'
import drawUseCaseDiagram from '../utils/drawFunctions/drawUseCaseDiagram'
import { Box, Button, Grid, Flex } from '@radix-ui/themes';
import { CodeIcon, DownloadIcon, ChevronDownIcon, ChevronUpIcon, CheckIcon } from '@radix-ui/react-icons'

const CLASS_DIAGRAM_NAME = "Diagrama de Classe"
const USE_CASE_NAME = "Casos de Uso"


function Home() {

    const [codeText, setCodeText, classData] = usePythonCodeAnalyzer("")
    const [chooseDiagram, setChooseDiagram] = useState<string>(CLASS_DIAGRAM_NAME);

    const [valueComboBox, setValueComboBox] = useState('Exemplos');

    useEffect(() => {
        const code = exampleList.find((c) => c.desciption == valueComboBox)
        if (code) {
            setCodeText(code.code)
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

    const handleDownloadDot = async () => {
        var dotCode;
        if (chooseDiagram == CLASS_DIAGRAM_NAME) {
            dotCode = drawClassDiagram(classData)
        } else {
            dotCode = drawUseCaseDiagram(classData)
        }

        const blob = new Blob([dotCode], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `${chooseDiagram}.dot`;
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
        <Flex direction="column" gap="3" >
            <Box position="static" p="3" width="100%">
                <Grid columns="3" gap="3">
                    <Flex gap="3" justify="start">
                        <Select.Root value={valueComboBox} onValueChange={setValueComboBox}>
                            <Select.Trigger
                                className="min-w-44 inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white border-blue-200 border-2 text-blue-950 shadow-[0_2px_10px] shadow-black/10 hover:bg-blue-200  focus:border-blue-600 data-[placeholder]:text-red outline-none"
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
                        <Button accessKey='1' size="2" className="w-44" onClick={handleDownloadCode} >
                            <CodeIcon width="16" height="16" /> Salvar Código
                        </Button>
                    </Flex>
                    <Flex gap="1" justify="center">
                        <Button accessKey='2' size="2" className="w-44"
                            variant={chooseDiagram == CLASS_DIAGRAM_NAME ? "solid" : "soft"}
                            onClick={() => setChooseDiagram(CLASS_DIAGRAM_NAME)}>
                            {CLASS_DIAGRAM_NAME}
                        </Button>
                        <Button accessKey='3' size="2" className="w-44"
                            variant={chooseDiagram == USE_CASE_NAME ? "solid" : "soft"}
                            onClick={() => setChooseDiagram(USE_CASE_NAME)}>
                            {USE_CASE_NAME}
                        </Button>
                    </Flex>
                    <Flex gap="3" justify="end">
                        <Button accessKey='' size="2" className="w-44" onClick={handleDownloadDot}>
                            <DownloadIcon width="16" height="16" /> Salvar .dot
                        </Button>
                        <Button accessKey='3' size="2" className="w-44" onClick={handleDownloadImage}>
                            <DownloadIcon width="16" height="16" /> Salvar Diagrama
                        </Button>
                    </Flex>
                </Grid>
            </Box>
            <Box p="3" width="100%">
                <Grid columns="2" gap="5">
                    <Flex direction="column" gap="3">
                        <Box width="100%">
                            <CodeMirror
                                value={codeText}
                                height="750px"
                                width="100%"
                                theme="dark"
                                extensions={[python()]}
                                onChange={onChangeCode}
                                placeholder="# Bem-vindo ao Py2UML..."
                            />
                        </Box>
                    </Flex>
                    <Flex justify="center">
                        {chooseDiagram == CLASS_DIAGRAM_NAME && <ClassDiagram classData={[...classData]} />}
                        {chooseDiagram == USE_CASE_NAME && <UseCaseDiagram classData={[...classData]} />}
                    </Flex>
                </Grid>
            </Box>
        </Flex>
    );
}

export default Home;