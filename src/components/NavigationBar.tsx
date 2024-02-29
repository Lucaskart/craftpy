import { Box, Grid, Flex, Button } from '@radix-ui/themes';
import { CodeIcon, DownloadIcon, GearIcon, QuestionMarkIcon, ReaderIcon } from '@radix-ui/react-icons'

function NavigationBar() {


    return (
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
                    <Button size="2">
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
    );
  }
  
  export default NavigationBar
  