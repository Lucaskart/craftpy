import { Box, Card, Code, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

function Examples() {

    const example1 = `class Patient:
    def __init__(self, id:int, examRequest:ExamRequest, name:str, sex:str, birth:date):
        self.id: int = id
        self.name: str = name
        self.sex: str = sex
        self.birth: date = birth
        self.exameRequest: ExamRequest = examRequest
        
    def calculateAge(void):
        return void
    
    def keep(void):
        return void

    def select(void):
        return void

class Exam:
    def __init__(self, examName:str, examRequestList:ExamRequest, recommendation:str):
        self.examName: str = examName
        self.recommendation: str = recommendation
        self.examRequestList: ExamRequest = examRequestList
    
    def keep(void):
        return void

    def select(void):
        return void
    
class ExamRequest:
    def __init__(self, issueDateTime:date, dateRealization:date, dateTimeCancellation:date, orderStatus:str, pfdFile:str):
        self.issueDateTime: date = issueDateTime
        self.dateRealization: date = dateRealization
        self.dateTimeCancellation: date = dateTimeCancellation
        self.orderStatus: str = orderStatus
        self.pfdFile: str = pfdFile
        self.doctor: Doctor = Doctor(name = "Joao", numberCRM = "1234")
        
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
        self.description: str = description
        self.issueDate: str = issueDate
        self.statusReport: str = statusReport
        self.examRequest: ExamRequest = examRequest
        self.doctor: Doctor = Doctor(name = "Joao", numberCRM = "1234")

    def issue(void):
        return void

    def select(void):
        return void

    def review(void):
        return void

class Doctor:
    address: Address = Address(street = "Main", number = 32)
            
    def __init__(self, name:str, numberCRM:str):
        self.name: str = name
        self.numberCRM: str = numberCRM
    
    def issue(void):
        return void

    def select(void):
        return void
    
class Resident(Doctor):
    def __init__(self, yearResidence:str):
        self.yearResidence: str = yearResidence

class Teacher(Doctor):
    def __init__(self, academicTitle:str):
        self.academicTitle: str = academicTitle

class Address():
    def __init__(self, street:str, number:int):
        self.street: str = street
        self.number: int = number
`;

    return (
        <Grid columns="3" p="3">
            <Flex gap="3">
            </Flex>
            <Flex direction="column" gap="3" justify="center" align="center">
                <Heading mb="2" size="7">Exemplos</Heading>
                <Text align="center" as="div">A seguir temos uma lista de intruções em código Python para gerar certos componentes em diagramas.</Text>
                <Card style={{ maxWidth: 600 }}>
                    <Flex gap="3" align="center">
                        <Box>
                            <Text size="2">Classe: </Text>
                            <Text as="div" size="2" color="gray">
                                Para a criação de uma classe no diagrama, é necessário iniciar uma classe Python.
                            </Text>
                            <Text as="div" size="2" color="gray">
                                Para adicionar atributos a classe, é necessário criar um construtor para a classe através do método '__init__'.
                            </Text>
                            <Text as="div" size="2" color="gray">
                                Para adicionar funções a classe, é necesário definir as funções dentro do escopo da classe.
                            </Text>
                            <Text as="div" size="2" color="gray">
                                É possível criar atributos e métodos privados atráves de subtraços.
                            </Text>
                            <Text as="div" mt="2" size="2" color="gray">
                                Exemplo:
                            </Text>
                            <Code size="2">
                            class Carro:<br/>
                            &nbsp; def __init__(self, marca:str):<br/>
                            &nbsp;&nbsp; self.__marca = marca<br/>
                            &nbsp;<br/>
                            &nbsp; def aumentarKM(self):<br/>
                            &nbsp;&nbsp; pass<br/>
                            </Code>
                        </Box>
                    </Flex>
                </Card>
                <Card style={{ maxWidth: 600 }}>
                    <Flex gap="3" align="center">
                        <Box>
                            <Text size="2">Associação: </Text>
                            <Text as="div" size="2" color="gray">
                                Para a criação de uma associação entre classes no diagrama, é necessário iniciar um objeto dentro de uma classe pertencente a outra classe 
                                fora do construtor para evitar relações de dependencia.
                            </Text>
                            <Text as="div" size="2" color="gray">
                                É possível criar multiplicidade atráves do uso de listas.
                            </Text>
                            <Text as="div" mt="2" size="2" color="gray">
                                Exemplo:
                            </Text>
                            <Code size="2">
                            class Carro:<br/>
                            &nbsp; __bankacc: list[BankAccount] = list()<br/>
                            </Code>
                        </Box>
                    </Flex>
                </Card>
                <Card style={{ maxWidth: 600 }}>
                    <Flex gap="3" align="center">
                        <Box>
                            <Text size="2">Herança: </Text>
                            <Text as="div" size="2" color="gray">
                                É possível que uma classe herde de outra atráves do uso de parenteses quando ela é iniciada.
                            </Text>
                            <Text as="div" mt="2" size="2" color="gray">
                                Exemplo:
                            </Text>
                            <Code size="2">
                            class Carro(Automovel):<br/>
                            </Code>
                        </Box>
                    </Flex>
                </Card>
                <Card style={{ maxWidth: 600 }}>
                    <Flex gap="3" align="center">
                        <Box>
                            <Text size="2">Agregação: </Text>
                            <Text as="div" size="2" color="gray">
                                É possível criar uma agregação entre classes quando uma classe utiliza de objetos de outra classe em seu construtor.
                            </Text>
                            <Text as="div" mt="2" size="2" color="gray">
                                Exemplo:
                            </Text>
                            <Code size="2">
                            class Carro(Automovel):<br/>
                            &nbsp; def __init__(self, marca:str, cor:str, rodas:list[Roda]):<br/>
                            &nbsp;&nbsp; self.marca = marca<br/>
                            &nbsp;&nbsp; self.cor:str = cor<br/>
                            &nbsp;&nbsp; self.roda:list[Roda] = rodas<br/>
                            </Code>
                        </Box>
                    </Flex>
                </Card>
                <Card style={{ maxWidth: 600 }}>
                    <Flex gap="3" align="center">
                        <Box>
                            <Text size="2">Composição: </Text>
                            <Text as="div" size="2" color="gray">
                                É possível criar uma composição entre classes quando uma classe cria um objeto de outra classe em seu construtor.
                            </Text>
                            <Text as="div" mt="2" size="2" color="gray">
                                Exemplo:
                            </Text>
                            <Code size="2">
                            class Carro(Automovel):<br/>
                            &nbsp; def __init__(self, marca:str, cor:str):<br/>
                            &nbsp;&nbsp; self.marca = marca<br/>
                            &nbsp;&nbsp; self.cor:str = cor<br/>
                            &nbsp;&nbsp; self.propietario: Propietario = Propietario(name = "Joao")<br/>
                            </Code>
                        </Box>
                    </Flex>
                </Card>
                <Card style={{ maxWidth: 600 }}>
                    <Flex gap="3" align="center">
                        <Box>
                            <Text size="2">Exemplos Completos: </Text>
                            <Text as="div" size="2" color="gray">
                                A seguir temos alguns exemplos de códigos completos em Python prontos para demostrar como ocorre o processo de geração de diagramas.
                            </Text>
                            <Text as="div" mt="2" size="2" color="gray">
                                Exemplo 1: Realizar Exame
                            </Text>
                            <Card style={{ maxWidth: 580 }}>
                                <CodeMirror
                                    value={example1}
                                    height="520px"
                                    theme="dark"
                                    readOnly
                                    extensions={[javascript({ jsx: true })]}
                                />
                            </Card>
                        </Box>
                    </Flex>
                </Card>
            </Flex>
            <Flex gap="3">
            </Flex>
        </Grid>
    );
}
  
export default Examples