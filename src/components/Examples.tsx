import { Box, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

function Examples() {

    const example1 = `class Patient:
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

    return (
        <Grid columns="3" p="3">
            <Flex gap="3">
            </Flex>
            <Flex direction="column" gap="3" justify="center" align="center">
                <Heading mb="2" size="7">Exemplos</Heading>
                <Text mb="4">A seguir temos alguns exemplos de códigos em Python prontos para mostrar como ocorre o processo de geração de diagramas.</Text>
                
                <Heading mb="2" size="5">Exemplo 1</Heading>
                <Text mb="4">Realizar Exame</Text>
                <Box width="100%">
                    <CodeMirror
                        value={example1}
                        height="520px"
                        width="100%"
                        theme="dark"
                        readOnly
                        extensions={[javascript({ jsx: true })]}
                    />
                </Box>
            </Flex>
            <Flex gap="3">
            </Flex>
        </Grid>
    );
}
  
export default Examples