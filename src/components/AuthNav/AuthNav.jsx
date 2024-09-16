import { useState } from "react";
import { Link as RouterLink } from 'react-router-dom';

import { AccountCircle } from "@mui/icons-material";
import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import Link from '@mui/material/Link';

const AuthNav = () => {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
      return (
          <AppBar sx={{ mb: '2rem'}}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link
                  component={RouterLink} 
                  to="/" 
                  color="inherit" 
                  sx={{ textDecoration: 'none', 
                    fontWeight: 'bold', 
                    '&:hover': {color: 'orange',},
                    '&:focus': {color: 'orange',}, 
                  }}
                  >Home
                </Link>
              </Typography>
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
                <MenuItem onClick={handleClose}>
                  <Link
                    component={RouterLink} 
                    to="/register" 
                    color="inherit" 
                    sx={{ textDecoration: 'none', fontWeight: 'bold' }} 
                    >
                    Register
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link
                    component={RouterLink}
                    to="/login" 
                    color="inherit" 
                    sx={{ textDecoration: 'none', fontWeight: 'bold' }} 
                    >
                    Log in
                  </Link>
                </MenuItem>
              </Menu> 
            </Toolbar>
          </AppBar>
      )
}
  
export default AuthNav