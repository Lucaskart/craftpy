import React from "react";
import useTextManipulation from '../hooks/useTextManipulation';
import { Graphviz } from 'graphviz-react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { Box, Button, Grid, Flex, Heading, TextArea } from '@radix-ui/themes';
import { CodeIcon, DownloadIcon, GearIcon } from '@radix-ui/react-icons'
import exampleList from '../utils/examples/code'
import html2canvas from 'html2canvas';
import { usePython } from 'react-py'

//Commit for deploy.

function DiagramGenerator() {
    let codeText = exampleList[0].code;

    // Use the usePython hook to run code and access both stdout and stderr
    const { runPython, stdout, stderr, isLoading, isRunning } = usePython()


    const [code, setCode] = React.useState(codeText);
    const [manipulatedText, setManipulatedText] = useTextManipulation();


    const handleButtonClick = () => {
        if (code != "") {
            setManipulatedText(code);
            runPython(code)
            console.log(stdout)
            console.log(stderr);
        }
    };

    const onChange = React.useCallback((val: React.SetStateAction<string>) => {
        setCode(val);
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
                        <Button accessKey='1' size="2" onClick={handleDownloadCode}  >
                            <CodeIcon width="16" height="16" /> Salvar Código
                        </Button>
                    </Flex>
                    <Flex gap="1" justify="center">
                        <Button accessKey='2' size="2" onClick={handleButtonClick} disabled={isLoading || isRunning}>
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
                                value={code}
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
                            {isLoading ? <p>Loading...</p> : <p>Ready!</p>}
                            <TextArea variant="surface"
                                style={{ height: 150 }}
                                value={stderr} />
                        </Box>
                    </Flex>
                    <Flex>
                        <Box id="print" width="100%">
                            {manipulatedText != "" && <Graphviz options={{ height: 750, width: "100%", zoom: false}} dot={manipulatedText} />}
                        </Box>
                    </Flex>
                </Grid>
            </Box>
        </Flex>
    );
}

export default DiagramGenerator