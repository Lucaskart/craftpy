import { Box, Card, Flex, Grid, Heading, Kbd, Text } from '@radix-ui/themes';

function Help() {

    return (
        <Grid columns="3" p="3">
            <Flex gap="3">
            </Flex>
            <Flex direction="column" gap="3" justify="center" align="center">
                <Heading mb="2" size="7">Comandos</Heading>
                <Text>A seguir temos uma lista de comandos para auxiliar no uso de Py2UML. 
                    (Os comandos podem ser diferentes dependendo do browser e do sistema operacional.)</Text>
                <Card style={{ maxWidth: 600 }}>
                    <Flex gap="3" align="center">
                        <Box>
                            <Text size="2">Windows: </Text><Kbd>Alt + 1</Kbd> <Text size="2"> Mac: </Text><Kbd>Crtl + Alt + 1</Kbd>
                            <Text as="div" size="2" color="gray">
                                Pressione a tecla Alt e a tecla 1 simultaneamente para salvar o código Python do diagrama.
                            </Text>
                        </Box>
                    </Flex>
                </Card>
                <Card style={{ maxWidth: 600 }}>
                    <Flex gap="3" align="center">
                        <Box>
                            <Text size="2">Windows: </Text><Kbd>Alt + 2</Kbd> <Text size="2"> Mac: </Text><Kbd>Crtl + Alt + 2</Kbd>
                            <Text as="div" size="2" color="gray">
                                Pressione a tecla Alt e a tecla 2 simultaneamente para compilar o código Python e gerar o diagrama.
                            </Text>
                        </Box>
                    </Flex>
                </Card>
                <Card style={{ maxWidth: 600 }}>
                    <Flex gap="3" align="center">
                        <Box>
                            <Text size="2">Windows: </Text><Kbd>Alt + 3</Kbd> <Text size="2"> Mac: </Text><Kbd>Crtl + Alt + 3</Kbd>
                            <Text as="div" size="2" color="gray">
                                Pressione a tecla Alt e a tecla 3 simultaneamente para realizar o download do diagrama em formato de imagem.
                            </Text>
                        </Box>
                    </Flex>
                </Card>
                <Card style={{ maxWidth: 600 }}>
                    <Flex gap="3" align="center">
                        <Box>
                            <Text size="2">Windows: </Text><Kbd>Alt + 4</Kbd> <Text size="2"> Mac: </Text><Kbd>Crtl + Alt + 4</Kbd>
                            <Text as="div" size="2" color="gray">
                                Pressione a tecla Alt e a tecla 4 simultaneamente para retornar ao gerador de diagramas.
                            </Text>
                        </Box>
                    </Flex>
                </Card>
                <Card style={{ maxWidth: 600 }}>
                    <Flex gap="3" align="center">
                        <Box>
                            <Text size="2">Windows: </Text><Kbd>Alt + 5</Kbd> <Text size="2"> Mac: </Text><Kbd>Crtl + Alt + 5</Kbd>
                            <Text as="div" size="2" color="gray">
                                Pressione a tecla Alt e a tecla 5 simultaneamente para exibir os exemplos disponiveis na ferramenta.
                            </Text>
                        </Box>
                    </Flex>
                </Card>
                <Card style={{ maxWidth: 600 }}>
                    <Flex gap="3" align="center">
                        <Box>
                            <Text size="2">Windows: </Text><Kbd>Alt + 6</Kbd> <Text size="2"> Mac: </Text><Kbd>Crtl + Alt + 6</Kbd>
                            <Text as="div" size="2" color="gray">
                                Pressione a tecla Alt e a tecla 6 simultaneamente para exibir a janela de ajuda com as instruções da ferramenta.
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