import React, { useState } from 'react';
import { Button, Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { ThemeProvider } from '@emotion/react';
import { deepPurple } from '@mui/material/colors';
import { createTheme } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const theme = createTheme({
  palette: {
    primary: deepPurple,
  },
});

const useStyles = makeStyles((theme) => ({
  video: {
    position: "fixed",
    top: 0,
    left: 0,
    minWidth: "100%",
    minHeight: "100%",
    zIndex: -1,
    background: "#110313",
    mixBlendMode: "overlay",
  },
  centeredImage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "40px",
    paddingBottom: "20px",
  },
  container: {

  }
}));

function Login() {
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const validateEmail = () => {
    const reMail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    setEmailError(!reMail.test(email));
  };

  const validatePassword = () => {
    const rePassword = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
    setPasswordError(!rePassword.test(password));
  };

  const userLogin = async () => {
    // Perform login action
    if (emailError || passwordError) {
      alert("Please fix the highlighted errors before submitting the form.");
    } else {
      // Proceed with login
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <Container style={{ maxWidth: "500px", border: '1px solid black', borderRadius: '4px', backgroundColor: "white", minHeight: "250px" }}>
          <div style={{ display: "grid" }}>
            <FormControl>
              <TextField
                style={{ paddingBottom: "10px", marginTop: "40px" }}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail}
                error={emailError}
              />
            </FormControl>
            <FormControl style={{ paddingBottom: "10px" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'password' : 'text'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={validatePassword}
                error={passwordError}
              />
            </FormControl>

            <Button variant="contained" onClick={userLogin}>
              Sign In
            </Button>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: "10px", color: "black", fontSize: "22px" }}>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                Don't have an account? Register
              </Link>
            </div>
          </div>
        </Container>
      </>
    </ThemeProvider>
  );
}

export default Login;
