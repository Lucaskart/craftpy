import React from 'react';
import useTextManipulation from '../hooks/useTextManipulation';
import { Graphviz } from 'graphviz-react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { Box, Button, Grid, Flex, Heading, TextArea } from '@radix-ui/themes';
import { GearIcon } from '@radix-ui/react-icons'

function DiagramGenerator() {
    const [code, setCode] = React.useState(`class Doctor:
def __init__(self, name: str, numberCRM: str):
    self.name = name
    self.numberCRM = numberCRM

def issue(void):
    return void

def select(void):
    return void


class Resident(Doctor):
def __init__(self, yearResidence: str):
    self.yearResidence = yearResidence


class Teacher(Doctor):
def __init__(self, academicTitle: str):
    self.academicTitle = academicTitle
`);
    const [manipulatedText, setManipulatedText] = useTextManipulation();

    const [logtext, setLogtext] = React.useState("Textarea for logs.");

    const handleError = (errorMessage: string) => {
        //let line = errorMessage.replace(/.*error in line ([0–9]*) .*\n/, '$1');
        setLogtext(errorMessage);
    }

    const handleButtonClick = () => {
        setManipulatedText(code);
    };
    const onChange = React.useCallback((val: React.SetStateAction<string>) => {
        console.log('val:', val);
        setCode(val);
    }, []);

    return (
        <Box p="3" width="100%">
            <Grid columns="2" gap="5">
                <Flex direction="column" gap="3">
                    <Box width="100%">
                        <CodeMirror
                            value={code}
                            height="520px"
                            width="100%"
                            theme="dark"
                            extensions={[javascript({ jsx: true })]}
                            onChange={onChange}
                        />
                    </Box>
                    <Box width="2">
                        <Button size="2" onClick={handleButtonClick}>
                            <GearIcon width="16" height="16" /> Compilar
                        </Button>
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
                    <Box width="100%">
                        {manipulatedText != "" && <Graphviz options={{width: "100%", zoom: true, onerror: handleError}} dot={manipulatedText} />}
                    </Box>
                </Flex>
            </Grid>
        </Box>
    );
  }
  
  export default DiagramGenerator