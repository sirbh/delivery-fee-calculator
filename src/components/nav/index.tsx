import { AppBar, Container, Toolbar, Box } from '@mui/material';
import WoltLogo from '../../svg/wolt-logo';

function Navbar() {
    return (
        <AppBar
            position="static"
            sx={{
                width: '100%',
                backgroundColor: 'white',
                borderBottom: '1px solid #D3D3D3',
                boxShadow: 'none',
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <WoltLogo />
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { md: 'flex' },
                            justifyContent: 'end',
                        }}
                    />
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;
