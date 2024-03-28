import React from "react";
import useTextManipulation from '../hooks/useTextManipulation';
import { Graphviz } from 'graphviz-react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { Box, Button, Grid, Flex, Heading, TextArea } from '@radix-ui/themes';
import { CodeIcon, DownloadIcon, GearIcon } from '@radix-ui/react-icons'
import html2canvas from 'html2canvas';

//Commit for deploy.

function DiagramGenerator() {
    let codeText = `
class Person:
    __bankacc: list[BankAccount] = list()
    address: Address
    def __init__(self, name: str, age: int, job: Job):
        self.name: str = name
        self.age: int = age
        self.__job: Job = job
        self.var_const_tipo:int = 10
        self.var_const_semtipo = 10
        self.var_string_semtipo = "djafkdsljfdlkdsj"
        self.var_string_tipo:str = "djafkdsljfdlkdsj"

class BankAccount:
    def __init__(self, number:int):
        self.number: int = number
    
    @meu_decorator
    def minha_funcao():
        print("Minha função está sendo chamada")

class Address:
    def __init__(self, street: str, city: str):
        self.street: str = street
        self.city: str = city

class Job:
    def __init__(self, position: str, salary: float):
        self.__position: str = position
        self.salary: float = salary

# Herança: Student é uma subclasse de Person
class Student(Person):
    def __init__(self, name: str, age: int, school: str):
        super().__init__(name, age)
        self.school: str = school

class ComposicaoClass:
    def __init__(self):
        self.__person = Person("Fulano", 18)
        self.jobFulano:Job = Job()
class MyClass:
    @classmethod
    def my_method(cls, x):
        print(x)

    def __init__(self):
        pass

    def my_function(self, y):
        print(y)
    
class AnotherClass(MyClass):
    @staticmethod
    def static_method(z):
        print(z)
  `
  codeText = `
  class Carro(Automovel):
    def __init__(self, marca:str, cor:str, roda:Roda):
        self.marca = marca
        self.cor:str = cor
        self.roda:Roda = roda
    
    @usecase
    @namedsadasdsadasdas
    def andar(self):
        self.posicao += 1
    
    @extends
    def desgastePneu(self):
        self.posicao += 1
    
    @include
    def aumentarKM(self):
        self.km +=1

class Roda:
    def __init__(self, quantidade:int):
        self.quantidade: quantidade
    
    def desgaste(self):
        pass

class Automovel:
    def __init__(self):
        pass
`;
    const [code, setCode] = React.useState(codeText);
    const [manipulatedText, setManipulatedText] = useTextManipulation();

    const [logtext, setLogtext] = React.useState("");

    const handleError = (errorMessage: string) => {
        //let line = errorMessage.replace(/.*error in line ([0–9]*) .*\n/, '$1');
        setLogtext(errorMessage);
    }

    const handleButtonClick = () => {
        if (code != "") {
            setManipulatedText(code);
        } else {
            setLogtext("No code identified in the code field.")
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
                            <TextArea variant="surface" style={{ height: 150 }} value={logtext} />
                        </Box>
                    </Flex>
                    <Flex>
                        <Box id="print" width="100%">
                            {manipulatedText != "" && <Graphviz options={{ height: 750, width: "100%", zoom: false, onerror: handleError }} dot={manipulatedText} />}
                        </Box>
                    </Flex>
                </Grid>
            </Box>
        </Flex>
    );
}

export default DiagramGenerator