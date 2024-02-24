import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import './styles/navBar.less';
import './styles/common.css';

export default function HeaderBar() {


    return (
        <AppBar position='absolute' sx={{ flexGrow: 1 }} className='bar'>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                >
                    <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
    )
}