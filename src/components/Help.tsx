import { Box, Card, Code, Flex, Grid, Heading, Kbd, Link, Text } from '@radix-ui/themes';

function Help() {

    return (
        <Grid columns="2" p="3">
            <Flex direction="column" gap="3" justify="start" align="center">
                <Heading mb="2" size="7">Atalhos</Heading>
                <Text align="center" as="div">A seguir temos uma lista de atalhos para auxiliar no uso de Py2UML. 
                    Os atalhos a seguir estão presentes nos navegadores mais comuns, para mais detalhes, acesse esse link:<br/>
                    <Link href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/accesskey">
                        https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/accesskey</Link>
                </Text>
                <Card style={{ maxWidth: 600 }}>
                    <Flex gap="3" align="center">
                        <Box>
                            <Text size="2">Windows: </Text><Kbd>Alt + 1</Kbd> <Text size="2"> Mac: </Text><Kbd>Crtl + Option + 1</Kbd>
                            <Text as="div" size="2" color="gray">
                                Pressione a tecla Alt e a tecla 1 simultaneamente para salvar o código Python do diagrama.
                            </Text>
                        </Box>
                    </Flex>
                </Card>
                <Card style={{ maxWidth: 600 }}>
                    <Flex gap="3" align="center">
                        <Box>
                            <Text size="2">Windows: </Text><Kbd>Alt + 2</Kbd> <Text size="2"> Mac: </Text><Kbd>Crtl + Option + 2</Kbd>
                            <Text as="div" size="2" color="gray">
                                Pressione a tecla Alt e a tecla 2 simultaneamente para compilar o código Python e gerar o diagrama.
                            </Text>
                        </Box>
                    </Flex>
                </Card>
                <Card style={{ maxWidth: 600 }}>
                    <Flex gap="3" align="center">
                        <Box>
                            <Text size="2">Windows: </Text><Kbd>Alt + 3</Kbd> <Text size="2"> Mac: </Text><Kbd>Crtl + Option + 3</Kbd>
                            <Text as="div" size="2" color="gray">
                                Pressione a tecla Alt e a tecla 3 simultaneamente para realizar o download do diagrama em formato de imagem.
                            </Text>
                        </Box>
                    </Flex>
                </Card>
                <Card style={{ maxWidth: 600 }}>
                    <Flex gap="3" align="center">
                        <Box>
                            <Text size="2">Windows: </Text><Kbd>Alt + 4</Kbd> <Text size="2"> Mac: </Text><Kbd>Crtl + Option + 4</Kbd>
                            <Text as="div" size="2" color="gray">
                                Pressione a tecla Alt e a tecla 4 simultaneamente para retornar ao gerador de diagramas.
                            </Text>
                        </Box>
                    </Flex>
                </Card>
                <Card style={{ maxWidth: 600 }}>
                    <Flex gap="3" align="center">
                        <Box>
                            <Text size="2">Windows: </Text><Kbd>Alt + 5</Kbd> <Text size="2"> Mac: </Text><Kbd>Crtl + Option + 5</Kbd>
                            <Text as="div" size="2" color="gray">
                                Pressione a tecla Alt e a tecla 5 simultaneamente para exibir os exemplos disponiveis na ferramenta.
                            </Text>
                        </Box>
                    </Flex>
                </Card>
                <Card style={{ maxWidth: 600 }}>
                    <Flex gap="3" align="center">
                        <Box>
                            <Text size="2">Windows: </Text><Kbd>Alt + 6</Kbd> <Text size="2"> Mac: </Text><Kbd>Crtl + Option + 6</Kbd>
                            <Text as="div" size="2" color="gray">
                                Pressione a tecla Alt e a tecla 6 simultaneamente para exibir a janela de ajuda com as instruções da ferramenta.
                            </Text>
                        </Box>
                    </Flex>
                </Card>
            </Flex>
            <Flex direction="column" gap="3" justify="center" align="center">
                <Heading mb="2" size="7">Comandos</Heading>
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
                            <Text size="2">Agregação e Composição: </Text>
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
            </Flex>
        </Grid>
    );
}
  
export default Help