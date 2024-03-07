import React from "react";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import './styles/navBar.less';
import './styles/common.css';
import './styles/fonts.css';
import { Container, Typography } from "@mui/material";
import logo from './assets/klause-b-logo-circled.png';


const HeaderBar: React.FC<{}> = ({ activePage }) => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
      };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const pages = ['art', 'writing', 'research']
    return (
        <AppBar position='absolute' className='bar' sx={{ flexGrow: 1 }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
        
                <img src={logo} className='logo'/>
                <h3 className="caveat-basic">claudia bergeron</h3>

            </Toolbar>
          </Container>
        </AppBar>
    )
}

export default HeaderBar;