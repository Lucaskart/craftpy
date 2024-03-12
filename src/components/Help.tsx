import { Box, Card, Flex, Grid, Heading, Kbd, Text } from '@radix-ui/themes';

function Help() {

    return (
        <Grid columns="3" p="3">
            <Flex gap="3">
            </Flex>
            <Flex direction="column" gap="3" justify="center" align="center">
                <Heading mb="2" size="7">Comandos</Heading>
                <Text>A seguir temos uma lista de comandos para auxiliar no uso de Py2UML.</Text>
                <Card style={{ maxWidth: 600 }}>
                    <Flex gap="3" align="center">
                        <Box>
                            <Kbd>Shift + Enter</Kbd>
                            <Text as="div" size="2" color="gray">
                                Pressione a tecla Shift e a tecla Enter simultaneamente para compilar o código Python e gerar o diagrama.
                            </Text>
                        </Box>
                    </Flex>
                </Card>
                <Card style={{ maxWidth: 600 }}>
                    <Flex gap="3" align="center">
                        <Box>
                            <Kbd>Shift + S</Kbd>
                            <Text as="div" size="2" color="gray">
                                Pressione a tecla Shift e a tecla S simultaneamente para salvar o código Python do diagrama.
                            </Text>
                        </Box>
                    </Flex>
                </Card>
                <Card style={{ maxWidth: 600 }}>
                    <Flex gap="3" align="center">
                        <Box>
                            <Kbd>Shift + D</Kbd>
                            <Text as="div" size="2" color="gray">
                                Pressione a tecla Shift e a tecla D simultaneamente para realizar o download do diagrama em formato de imagem.
                            </Text>
                        </Box>
                    </Flex>
                </Card>
                <Card style={{ maxWidth: 600 }}>
                    <Flex gap="3" align="center">
                        <Box>
                            <Kbd>Shift + A</Kbd>
                            <Text as="div" size="2" color="gray">
                                Pressione a tecla Shift e a tecla A simultaneamente para exibir a janela de ajuda com as instruções da ferramenta.
                            </Text>
                        </Box>
                    </Flex>
                </Card>
                <Card style={{ maxWidth: 600 }}>
                    <Flex gap="3" align="center">
                        <Box>
                            <Kbd>Shift + E</Kbd>
                            <Text as="div" size="2" color="gray">
                                Pressione a tecla Shift e a tecla E simultaneamente para exibir os exemplos disponiveis na ferramenta.
                            </Text>
                        </Box>
                    </Flex>
                </Card>
                <Card style={{ maxWidth: 600 }}>
                    <Flex gap="3" align="center">
                        <Box>
                            <Kbd>Shift + P</Kbd>
                            <Text as="div" size="2" color="gray">
                                Pressione a tecla Shift e a tecla P simultaneamente para retornar ao gerador de diagramas.
                            </Text>
                        </Box>
                    </Flex>
                </Card>
            </Flex>
            <Flex gap="3">
            </Flex>
        </Grid>
    );
}
  
export default Help