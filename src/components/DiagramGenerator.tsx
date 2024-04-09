import React from "react";
import usePythonCodeAnalyzer from '../hooks/usePythonCodeAnalyzer';
import { Graphviz } from 'graphviz-react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { Box, Button, Grid, Flex, Heading, TextArea, DropdownMenu } from '@radix-ui/themes';
import { CodeIcon, DownloadIcon, CaretDownIcon, CaretUpIcon } from '@radix-ui/react-icons'
import exampleList from '../utils/examples/code'
import html2canvas from 'html2canvas';

//Commit for deploy.

function DiagramGenerator() {
    let codeTextExample = exampleList[2].code;

    const [codeText, setCodeText, classDiagram/*, useCaseDiagram*/] = usePythonCodeAnalyzer(codeTextExample)

    const [logtext, setLogtext] = React.useState("");

    //const [dotText, setDotText] = React.useState(classDiagram);

    const [isOpen, setIsOpen] = React.useState(false);

    const [selectedValue, setSelectedItem] = React.useState("Diagrama de Classe");

    const handleError = (errorMessage: string) => {
        //let line = errorMessage.replace(/.*error in line ([0–9]*) .*\n/, '$1');
        setLogtext(errorMessage);
        console.error(errorMessage)
    }

    const onChange = React.useCallback((val: React.SetStateAction<string>) => {
        setCodeText(val);
    }, []);

    const handleDownloadImage = async () => {
        const element = document.getElementById('print')!,
            canvas = await html2canvas(element),
            data = canvas.toDataURL('image/jpg'),
            link = document.createElement('a');

        link.href = data;
        link.download = 'downloaded-image.jpg';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDownloadCode = async () => {
        //const fileData = JSON.stringify(codeText);
        const blob = new Blob([codeText], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "user-info.txt";
        link.href = url;
        link.click();
    };


    function setItem(e: Event) {
        const target = e.target as HTMLDivElement;
        setSelectedItem(target.textContent ?? "unknown");
        /* if (target.textContent == "Diagrama de Classe") {
            setDotText(classDiagram)
        } else {
            setDotText(useCaseDiagram)
        } */
    }

    return (
        <Flex direction="column" gap="3">
            <Box position="static" p="3" width="100%">
                <Grid columns="3" gap="3">
                    <Flex gap="3" justify="start">
                        <Button accessKey='1' size="2" onClick={handleDownloadCode}>
                            <CodeIcon width="16" height="16" /> Salvar Código
                        </Button>
                    </Flex>
                    <Flex gap="1" justify="center">
                        <DropdownMenu.Root onOpenChange={setIsOpen}>
                            <DropdownMenu.Trigger>
                                <Button variant="soft">
                                    {selectedValue} {isOpen ? <CaretUpIcon /> : <CaretDownIcon />}
                                </Button>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content>
                                <DropdownMenu.Item onSelect={setItem} accessKey='2'>Diagrama de Classe</DropdownMenu.Item>
                                <DropdownMenu.Item onSelect={setItem}>Casos de Uso</DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    </Flex>
                    <Flex gap="3" justify="end">
                        <Button accessKey='3' size="2" onClick={handleDownloadImage}>
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
                                height="520px"
                                width="100%"
                                theme="dark"
                                extensions={[python()]}
                                onChange={onChange}
                            />
                        </Box>
                        <Box width="100%">
                            <Flex justify="center">
                                <Heading>Painel de Logs</Heading>
                            </Flex>
                        </Box>
                        <Box width="100%">
                            <TextArea variant="surface" style={{ height: 150 }} value={logtext} />
                        </Box>
                    </Flex>
                    <Flex>
                        <Box id="print" width="100%">
                            {classDiagram != "" && <Graphviz options={{ height: 750, width: "100%", zoom: false, onerror: handleError }} dot={classDiagram} />}
                        </Box>
                    </Flex>
                </Grid>
            </Box>
        </Flex>
    );
}

export default DiagramGenerator