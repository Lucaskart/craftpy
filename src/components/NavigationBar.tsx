import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { Outlet, Link } from "react-router-dom";
import '../styles/styles.css';


import * as Separator from '@radix-ui/react-separator';
import { Box, Grid, Flex, IconButton } from '@radix-ui/themes';


const navigation = [
    { name: 'Início', id: 'home', href: '/craftpy/', accessKey: '5', current: true },
    { name: 'Exemplos', id: 'example', href: '/craftpy/examples', accessKey: '6', current: false },
    { name: 'Ajuda', id: 'help', href: '/craftpy/help', accessKey: '7', current: false },
]


function NavigationBar() {

    return (
        <Box position="sticky" top="0" width="100%">
            <Grid style={{ background: 'var(--blue-a2)', borderRadius: 'var(--radius-3)' }} px="3" py="1" columns="3" gap="3">
                <Flex gap="3" justify="start">
                    <img
                        src="logo.png"
                        alt="CRAFTPy Logo"
                        style={{
                            objectFit: 'cover',
                            width: '61px',
                            height: '47px',
                            borderRadius: 'var(--radius-2)',
                        }}
                    />
                </Flex>
                <Flex gap="9" justify="center" align="center" mr="5">
                    {navigation.map((item) => (
                        <Link key={item.id} id={item.id} accessKey={item.accessKey} to={item.href}
                            className="MenuLink hover:font-semibold">
                            {item.name}
                        </Link>
                    ))}
                </Flex>
                <Flex gap="3" justify="end" align="center" mr="5">
                    <Link to="https://github.com/Lucaskart/CRAFTPy" className="MenuLink">
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
