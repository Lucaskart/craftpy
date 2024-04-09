import React from "react";
import usePythonCodeAnalyzer from '../hooks/usePythonCodeAnalyzer';
import { Graphviz } from 'graphviz-react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { Box, Button, Grid, Flex, Heading, TextArea } from '@radix-ui/themes';
import { CodeIcon, DownloadIcon, GearIcon } from '@radix-ui/react-icons'
import exampleList from '../utils/examples/code'
import html2canvas from 'html2canvas';

//Commit for deploy.

function DiagramGenerator() {
    let codeTextExample = exampleList[2].code;

    const [codeText, setCodeText, classDiagram] = usePythonCodeAnalyzer(codeTextExample)

    const [logtext, setLogtext] = React.useState("");

    const handleError = (errorMessage: string) => {
        //let line = errorMessage.replace(/.*error in line ([0–9]*) .*\n/, '$1');
        setLogtext(errorMessage);
        console.error(errorMessage)
    }

    const handleButtonClick = () => {
        if (codeText != "") {
            //setManipulatedText(code);
            setCodeText(codeText)

        } else {
            setLogtext("No code identified in the code field.")
        }
    };

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
                        <Button accessKey='2' size="2" onClick={handleButtonClick}>
                            <GearIcon width="16" height="16" /> Compilar
                        </Button>
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