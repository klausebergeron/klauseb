import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/system/Box";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import "./styles/navBar.less";
import "./styles/common.css";
import "./styles/fonts.css";

import { Link } from "react-router-dom";
import { Container, Menu, MenuItem } from "@mui/material";
import logo from "./assets/klause-b-logo-circled.png";

interface HeaderBarProps {
  activePage: string;
}

const HeaderBar: React.FC<HeaderBarProps> = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const pages = ["art", "writing", "projects"];
  return (
    <AppBar position="absolute" className="bar" sx={{ flexGrow: 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters className="flex between">
          <Box sx={{ display: "flex" }}>
            <Link to="/" className="logo-link">
              <img src={logo} className="logo" />
            </Link>
            <Link to="/">
              <h3 className="caveat-basic">claudia bergeron</h3>
            </Link>
          </Box>
          {/*Mobile and small screen menu*/}
          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none", p: 0 } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link to={"/" + page}>{page}</Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/*Desktop and large page menu*/}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={handleCloseNavMenu}
              >
                <Link to={"/" + page}>{page}</Link>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default HeaderBar;
