import { Box, Grid, Flex, IconButton } from '@radix-ui/themes';
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import * as Separator from '@radix-ui/react-separator';
import { Outlet, Link } from "react-router-dom";
import '../styles/styles.css';

function NavigationBar() {

    return (
        <Box position="sticky" top="0" width="100%">
            <Grid style={{ background: 'var(--blue-a2)', borderRadius: 'var(--radius-3)' }} px="3" py="1" columns="2" gap="3">
                <Flex gap="3" justify="start">
                    <img
                        src="logo.png"
                        alt="Py2UML Logo"
                        style={{
                            objectFit: 'cover',
                            width: '80px',
                            height: '42px',
                            borderRadius: 'var(--radius-2)',
                        }}
                    />
                </Flex>
                <Flex gap="3" justify="end" align={'center'} mr="5">
                    <Link to="/py2uml/" className="MenuLink">Py2UML</Link>
                    <Separator.Root
                        className="SeparatorRoot"
                        decorative
                        orientation="vertical"
                        style={{ margin: '0 15px' }}
                    />
                    <Link to="/examples" className="MenuLink">Exemplos</Link>
                    <Separator.Root
                        className="SeparatorRoot"
                        decorative
                        orientation="vertical"
                        style={{ margin: '0 15px' }}
                    />
                    <Link to="/py2uml/help" className="MenuLink">Ajuda</Link>
                    <Separator.Root
                        className="SeparatorRoot"
                        decorative
                        orientation="vertical"
                        style={{ margin: '0 15px' }}
                    />
                    <Link to="https://github.com/Lucaskart/Py2UML" className="MenuLink">
                        <IconButton variant="ghost">
                            <GitHubLogoIcon width="25" height="25" />
                        </IconButton>
                    </Link>
                </Flex>
            </Grid>
            <Separator.Root className="SeparatorRoot" style={{ margin: '0' }} />
            <Outlet />
        </Box>
    );
  }
  
  export default NavigationBar
  