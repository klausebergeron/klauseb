import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/system/Box";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import "./styles/navBar.less";
import "./styles/common.less";
import "./styles/fonts.css";

import { Link } from "react-router-dom";
import { Container, Menu, MenuItem } from "@mui/material";
import logo from "./assets/klause-b-logo-circled.png";

interface HeaderBarProps {
  activePage: string;
}

const HeaderBar: React.FC<HeaderBarProps> = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const activePage = props.activePage;

  useEffect(() => {
    const activeButton = document.getElementById("page" + activePage);
    activeButton?.classList.add("active");
  }, [activePage]);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const pages = ["art", "writing", "projects", "home"];
  return (
    <AppBar position="fixed" className="bar" sx={{ flexGrow: 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters className="flex toolbar">
          <Box sx={{ display: "flex" }}>
            <Link to="/" className="logo-link">
              <img src={logo} className="logo" />
            </Link>
            <Link to="/">
              <h3 className="caveat-basic name-link">claudia bergeron</h3>
            </Link>
          </Box>
          {/*Mobile and small screen menu*/}
          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
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
                <MenuItem
                  key={"menuitem" + page}
                  className={page === activePage ? "active" : ""}
                  onClick={handleCloseNavMenu}
                >
                  <Link key={"dropdownlinkitem" + page} to={"/" + page}>
                    {page}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/*Desktop and large page menu*/}
          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link key={"barlinkitem" + page} to={"/" + page}>
                <Button
                  key={"button" + page}
                  id={page + "page"}
                  sx={{ my: 2, color: "white", display: "block" }}
                  className={page === activePage ? "active" : ""}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default HeaderBar;
