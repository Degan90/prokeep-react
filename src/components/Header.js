import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
export default function Header({ loggedIn, handleLogout, userInfo }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link className="link" to="/">
              Prokeep
            </Link>
          </Typography>

          
          {userInfo && (
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              You are signed in as: {userInfo.username}
            </Typography>
          )}

          {loggedIn ? (
            <>
              <Link to="/">
                <Button color="inherit">
                  <Link to="/" onClick={handleLogout} className="link">
                    Log Out
                  </Link>{" "}
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Button color="inherit">
                <Link className="link" to="/login">
                  Login
                </Link>{" "}
              </Button>
            </>
          )}

          {/* <Button color="inherit"><Link className="link" to="/login">Login</Link> </Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
