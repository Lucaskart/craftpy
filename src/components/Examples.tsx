import { Box, Card, Code, Flex, Grid, Heading, Text } from '@radix-ui/themes';

function Examples() {

    return (
        <Grid columns="3" gap="5" p="3">
            <Flex direction="column" gap="3" align="center">
                <Heading mb="2" size="7">Exemplos para Diagrama de Classes</Heading>
                <Text align="center" as="div">A seguir temos uma lista de instruções em código Python para gerar classes, atributos, 
                funções e relacionamentos em diagramas de classe.</Text>
                <Card style={{ maxWidth: 600 }}>
                    <Flex gap="3" align="center">
                        <Box>
                            <Text size="2">Classe: </Text>
                            <Text as="div" size="2" color="gray">
                                Para a criação de uma classe no diagrama, é necessário iniciar uma classe Python.
                            </Text>
                            <Text as="div" size="2" color="gray">
                                Para adicionar atributos a classe, é necessário criar um construtor para a classe através do método 
                                '__init__', ou seja, subtraço subtraço init subtraço subtraço.
                            </Text>
                            <Text as="div" size="2" color="gray">
                                Para adicionar funções a classe, é necessário definir as funções dentro do escopo da classe.
                            </Text>
                            <Text as="div" size="2" color="gray">
                                É possível criar atributos e métodos privados atráves de dois subtraços.
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
                            &nbsp; __pneu: list[Pneu] = list()<br/>
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
                            &nbsp; def __init__(self, marca:str, cor:str, janelas:list[Janela]):<br/>
                            &nbsp;&nbsp; self.marca = marca<br/>
                            &nbsp;&nbsp; self.cor:str = cor<br/>
                            &nbsp;&nbsp; self.janelas:list[Janela] = janelas<br/>
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
                            &nbsp;&nbsp; self.propietario: Propietario = Propietario(nome = "Marcos")<br/>
                            </Code>
                        </Box>
                    </Flex>
                </Card>
            </Flex>
            <Flex direction="column" gap="3" align="center">
                <Heading mb="2" size="7" align="center">Exemplos para Diagrama de Casos de Uso</Heading>
                <Text align="center" as="div">A seguir temos uma lista de instruções em código Python para gerar atores, casos de uso
                e relacionamentos em diagramas de caso de uso.</Text>
                <Card style={{ maxWidth: 600 }}>
                    <Flex gap="3" align="center">
                        <Box>
                            <Text size="2">Ator: </Text>
                            <Text as="div" size="2" color="gray">
                                Para a criação de um ator no diagrama, é necessário iniciar uma classe Python.
                            </Text>
                            <Text as="div" mt="2" size="2" color="gray">
                                Exemplo:
                            </Text>
                            <Code size="2">
                            class Carro:<br/>
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
                            <Text size="2">Caso de Uso: </Text>
                            <Text as="div" size="2" color="gray">
                                Para a criação de um caso de uso no diagrama, é necessário definir uma função com o decorador @usecase antes da função ser declarada.
                            </Text>
                            <Text as="div" mt="2" size="2" color="gray">
                                Exemplo:
                            </Text>
                            <Code size="2">
                            @usecase<br/>
                            def aumentarKM(self):<br/>
                            &nbsp; pass<br/>
                            </Code>
                        </Box>
                    </Flex>
                </Card>
                <Card style={{ maxWidth: 600 }}>
                    <Flex gap="3" align="center">
                        <Box>
                            <Text size="2">Função 'Include': </Text>
                            <Text as="div" size="2" color="gray">
                                Para a criação de um relacionamento 'include' entre dois casos de uso no diagrama, 
                                é necessário definir um decorador adicional @include contendo o nome do caso de uso que será relacionado entre colchetes.
                            </Text>
                            <Text as="div" mt="2" size="2" color="gray">
                                Exemplo:
                            </Text>
                            <Code size="2">
                            @usecase<br/>
                            @include[aumentarKM]<br/>
                            def acelerar(self):<br/>
                            &nbsp; pass<br/>
                            </Code>
                        </Box>
                    </Flex>
                </Card>
                <Card style={{ maxWidth: 600 }}>
                    <Flex gap="3" align="center">
                        <Box>
                            <Text size="2">Função 'Extend': </Text>
                            <Text as="div" size="2" color="gray">
                                Para a criação de um relacionamento 'extend' entre dois casos de uso no diagrama, 
                                é necessário definir um decorador adicional @extends contendo o nome do caso de uso que será relacionado entre colchetes.
                            </Text>
                            <Text as="div" mt="2" size="2" color="gray">
                                Exemplo:
                            </Text>
                            <Code size="2">
                            @usecase<br/>
                            @extends[acelerar]<br/>
                            def dirigir(self):<br/>
                            &nbsp; pass<br/>
                            </Code>
                        </Box>
                    </Flex>
                </Card>
            </Flex>
            <Flex direction="column" gap="3" align="center">
                <Heading mb="2" size="7" align="center">Exemplos para Diagrama de Entidade-Relacionamento</Heading>
                <Text align="center" as="div">A seguir temos uma lista de instruções em código Python para gerar entidades, atributos e relacionamentos em DERs.</Text>
                <Card style={{ maxWidth: 600 }}>
                    <Flex gap="3" align="center">
                        <Box>
                            <Text size="2">Entidade: </Text>
                            <Text as="div" size="2" color="gray">
                                Para a criação de uma entidade no diagrama, é necessário iniciar uma classe Python.
                            </Text>
                            <Text as="div" size="2" color="gray">
                                Para adicionar atributos a entidade, é necessário criar um construtor para a classe através do método 
                                '__init__', ou seja, subtraço subtraço init subtraço subtraço.
                            </Text>
                            <Text as="div" size="2" color="gray">
                                Atributos que são listas, tuplas e dicionários são automaticamente classificados como atributos multivalor.
                            </Text>
                            <Text as="div" size="2" color="gray">
                                Para a criação de chaves primárias, é necessário iniciar um objeto fora do construtor. 
                                Para chaves estrangeiras, é necessário que sua variavél começe com dois subtraços.
                            </Text>
                            <Text as="div" size="2" color="gray">
                                Uma entidade é definida como uma entidade fraca automaticamente caso ela não possua uma chave primária.
                            </Text>
                            <Text as="div" mt="2" size="2" color="gray">
                                Exemplo:
                            </Text>
                            <Code size="2">
                            class Carro:<br/>
                            &nbsp; _chave:str<br/>
                            &nbsp; def __init__(self, marca:str):<br/>
                            &nbsp;&nbsp; self.marca = marca<br/>
                            </Code>
                        </Box>
                    </Flex>
                </Card>
                <Card style={{ maxWidth: 600 }}>
                    <Flex gap="3" align="center">
                        <Box>
                            <Text size="2">Relacionamento: </Text>
                            <Text as="div" size="2" color="gray">
                                Para a criação de um relacionamento entre duas entidades no diagrama, 
                                é necessário definir um decorador @relationship contendo o nome da entidade que será relacionada entre colchetes.
                            </Text>
                            <Text as="div" size="2" color="gray">
                                Para definir a multiplicidade do relacionamento, 
                                é necessário definir um decorador @multiplicity contendo a multiplicidade das duas partes do relacionamento separadas por dois pontos.
                            </Text>
                            <Text as="div" mt="2" size="2" color="gray">
                                Exemplo:
                            </Text>
                            <Code size="2">
                            @relationship[Pneu]<br/>
                            @multiplicity[1:4]<br/>
                            def contem():<br/>
                            &nbsp; pass<br/>
                            </Code>
                        </Box>
                    </Flex>
                </Card>
                <Card style={{ maxWidth: 600 }}>
                    <Flex gap="3" align="center">
                        <Box>
                            <Text size="2">Relacionamento Indentificador: </Text>
                            <Text as="div" size="2" color="gray">
                                Para a criação de um relacionamento indentificador entre duas entidades no diagrama, 
                                é necessário definir um decorador @identifyingrelationship contendo o nome da entidade que será relacionada entre colchetes.
                            </Text>
                            <Text as="div" size="2" color="gray">
                                Para definir a multiplicidade do relacionamento, 
                                é necessário definir um decorador @multiplicity contendo a multiplicidade das duas partes do relacionamento separadas por dois pontos.
                            </Text>
                            <Text as="div" mt="2" size="2" color="gray">
                                Exemplo:
                            </Text>
                            <Code size="2">
                            @identifyingrelationship[Janela]<br/>
                            @multiplicity[1:n]<br/>
                            def contem():<br/>
                            &nbsp; pass<br/>
                            </Code>
                        </Box>
                    </Flex>
                </Card>
            </Flex>
        </Grid>
    );
}
  
export default Examples