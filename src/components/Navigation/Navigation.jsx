import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link as RouterLink, useLocation } from "react-router-dom";

import { selectIsLoggedIn } from "../../redux/auth/selectors"
import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography, Link } from "@mui/material";

import AccountCircle from '@mui/icons-material/AccountCircle';
import { logOut } from "../../redux/auth/operations";
import UserMenu from "../UserMenu/UserMenu";


const Navigation = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const location = useLocation();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleLogout = () => {
      dispatch(logOut());
      handleClose();
    };

  return (
    <AppBar color="primary" sx={{ mb: '2rem' }}>
      <Toolbar sx={{color: "rgb(250, 250, 250)"}}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {location.pathname === '/' && isLoggedIn && (
            <Typography variant="h6" component="span">
              Home
            </Typography>
          )}
          {location.pathname === '/contacts' && (
            <Typography variant="h6" component="span">
              Contacts
            </Typography>
          )}
        </Typography>
        <UserMenu/>
        {isLoggedIn && (
        <> 
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
            >
            <AccountCircle fontSize='large' />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            >
            {location.pathname === '/' && (
              <MenuItem onClick={handleClose}>
                <Link
                  component={RouterLink}
                  to="/contacts"
                  color="inherit"
                  sx={{ textDecoration: 'none', fontWeight: 'bold' }}
                  >
                  Contacts
                </Link>
              </MenuItem>
            )}
            {location.pathname === '/contacts' && (
              <MenuItem onClick={handleClose}>
                <Link
                  component={RouterLink}
                  to="/"
                  color="inherit"
                  sx={{ textDecoration: 'none', fontWeight: 'bold' }}
                  >
                  Home
                </Link>
              </MenuItem>
            )}
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </>
        )}
      </Toolbar>
    </AppBar> 
  );
};

export default Navigation