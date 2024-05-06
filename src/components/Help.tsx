import { Box, Card, Flex, Grid, Heading, Kbd, Link, Text } from '@radix-ui/themes';

function Help() {

    return (
        <Grid columns="3" p="3">
            <Flex gap="3">
            </Flex>
            <Flex direction="column" gap="3" justify="start" align="center">
                <Heading mb="2" size="7">Atalhos</Heading>
                <Text align="center" as="div">A seguir temos uma lista de atalhos para auxiliar no uso de CRAFTPy. Os atalhos a seguir estão presentes nos navegadores mais comuns, para mais detalhes, acesse esse link:<br/>
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
                                Pressione a tecla Alt e a tecla 2 simultaneamente para compilar o código Python e gerar um diagrama de classe.
                            </Text>
                        </Box>
                    </Flex>
                </Card>
                <Card style={{ maxWidth: 600 }}>
                    <Flex gap="3" align="center">
                        <Box>
                            <Text size="2">Windows: </Text><Kbd>Alt + 3</Kbd> <Text size="2"> Mac: </Text><Kbd>Crtl + Option + 3</Kbd>
                            <Text as="div" size="2" color="gray">
                                Pressione a tecla Alt e a tecla 3 simultaneamente para compilar o código Python e gerar um diagrama de casos de uso.
                            </Text>
                        </Box>
                    </Flex>
                </Card>
                <Card style={{ maxWidth: 600 }}>
                    <Flex gap="3" align="center">
                        <Box>
                            <Text size="2">Windows: </Text><Kbd>Alt + 4</Kbd> <Text size="2"> Mac: </Text><Kbd>Crtl + Option + 4</Kbd>
                            <Text as="div" size="2" color="gray">
                                Pressione a tecla Alt e a tecla 4 simultaneamente para realizar o download do diagrama em formato de imagem.
                            </Text>
                        </Box>
                    </Flex>
                </Card>
                <Card style={{ maxWidth: 600 }}>
                    <Flex gap="3" align="center">
                        <Box>
                            <Text size="2">Windows: </Text><Kbd>Alt + 5</Kbd> <Text size="2"> Mac: </Text><Kbd>Crtl + Option + 5</Kbd>
                            <Text as="div" size="2" color="gray">
                                Pressione a tecla Alt e a tecla 5 simultaneamente para retornar ao gerador de diagramas.
                            </Text>
                        </Box>
                    </Flex>
                </Card>
                <Card style={{ maxWidth: 600 }}>
                    <Flex gap="3" align="center">
                        <Box>
                            <Text size="2">Windows: </Text><Kbd>Alt + 6</Kbd> <Text size="2"> Mac: </Text><Kbd>Crtl + Option + 6</Kbd>
                            <Text as="div" size="2" color="gray">
                                Pressione a tecla Alt e a tecla 6 simultaneamente para exibir os exemplos disponiveis na ferramenta.
                            </Text>
                        </Box>
                    </Flex>
                </Card>
                <Card style={{ maxWidth: 600 }}>
                    <Flex gap="3" align="center">
                        <Box>
                            <Text size="2">Windows: </Text><Kbd>Alt + 7</Kbd> <Text size="2"> Mac: </Text><Kbd>Crtl + Option + 7</Kbd>
                            <Text as="div" size="2" color="gray">
                                Pressione a tecla Alt e a tecla 7 simultaneamente para exibir a janela de ajuda com as instruções da ferramenta.
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