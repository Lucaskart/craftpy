import React from 'react';
import useTextManipulation from '../hooks/useTextManipulation';
import { Graphviz } from 'graphviz-react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { Box, Button, Grid, Flex, Heading, TextArea } from '@radix-ui/themes';
import { CodeIcon, DownloadIcon, GearIcon, QuestionMarkIcon, ReaderIcon } from '@radix-ui/react-icons'

//Commit for deploy.

function DiagramGenerator() {
    const codeText = `
    class Patient:
        def __init__(self, id:int, examRequest:ExamRequest, name:str, sex:str, birth:date):
            self.id = id
            self.name = name
            self.sex = sex
            self.birth = birth
            self.exameRequest = examRequest
            
        def calculateAge(void):
            return void
        
        def keep(void):
            return void

        def select(void):
            return void

    class Exam:
        def __init__(self, examName:str, examRequestList:ExamRequest, recommendation:str):
            self.examName = examName
            self.recommendation = recommendation
            self.examRequestList = examRequestList
        
        def keep(void):
            return void

        def select(void):
            return void
        
    class ExamRequest:
        def __init__(self, issueDateTime:date, dateRealization:date, dateTimeCancellation:date, orderStatus:str, PDFFile:str):
            self.issueDateTime = issueDateTime
            self.dateRealization = dateRealization
            self.dateTimeCancellation = dateTimeCancellation
            self.orderStatus = orderStatus
            self.PDFFile = PDFFile
            self.doctor = Doctor(name = "Joao", numberCRM = "1234")
            
        def issue(void):
            return void

        def select(void):
            return void

        def registerExam(void):
            return void

        def cancelOrder(void):
            return void

        def viewPDF(void):
            return void
        
    class ExamReport:
        def __init__(self, description:str, issueDate:str, examRequest:ExamRequest, statusReport:str):
            self.description = description
            self.issueDate = issueDate
            self.statusReport = statusReport
            self.examRequest = examRequest
            self.doctor = Doctor(name = "Joao", numberCRM = "1234")

        def issue(void):
            return void

        def select(void):
            return void

        def review(void):
            return void

    class Doctor:
        def __init__(self, name:str, numberCRM:str):
            self.name = name
            self.numberCRM = numberCRM
        
        def issue(void):
            return void

        def select(void):
            return void
        
    class Resident(Doctor):
        def __init__(self, yearResidence:str):
            self.yearResidence = yearResidence

    class Teacher(Doctor):
        def __init__(self, academicTitle:str):
            self.academicTitle = academicTitle
      `;
    const [code, setCode] = React.useState(codeText);
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
        <Flex direction="column" gap="3">
            <Box position="sticky" style={{ background: 'var(--gray-a2)', borderRadius: 'var(--radius-3)' }} p="3" width="100%">
                <Grid columns="3" gap="3">
                    <Flex gap="3" justify="start">
                        <Button size="2">
                            <CodeIcon width="16" height="16" /> Salvar Código
                        </Button>
                        <Button size="2">
                            <DownloadIcon width="16" height="16" /> Salvar Diagrama
                        </Button>
                    </Flex>
                    <Flex gap="1" justify="center">
                        <Button size="2" onClick={handleButtonClick}>
                            <GearIcon width="16" height="16" /> Compilar
                        </Button>
                    </Flex>
                    <Flex gap="3" justify="end">
                        <Button size="2">
                            <ReaderIcon width="16" height="16" /> Exemplos
                        </Button>
                        <Button size="2">
                            <QuestionMarkIcon width="16" height="16" /> Ajuda
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
                                extensions={[javascript({ jsx: true })]}
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
                        <Box width="100%">
                            {manipulatedText != "" && <Graphviz options={{ width: "100%", zoom: true, onerror: handleError }} dot={manipulatedText} />}
                        </Box>
                    </Flex>
                </Grid>
            </Box>
        </Flex>
    );
}

export default DiagramGenerator