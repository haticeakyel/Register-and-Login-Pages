import * as React from 'react';
import { Alert, Snackbar, TextField, createTheme } from '@mui/material';
import { Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { deepPurple } from '@mui/material/colors';
import { ThemeProvider } from '@emotion/react';
import Avatar from '@mui/material/Avatar';
import ShowImg from './ShowImg';
import { useState } from 'react';

const theme = createTheme({
  palette: {
    primary: deepPurple,
  },
});

const useStyles = makeStyles((theme) => ({
  centeredImage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "40px",
    paddingBottom: "20px",
    minHeight: "100px"
  }
}));

const style = {
  field: {
    paddingBottom: "10px",
  },
  first: {
    paddingBottom: "10px",
    marginTop: "40px"
  }
}

function Register({ onRegister }) {
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(true);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [open, setOpen] = useState(false);
  const [isMailAcceptable, setIsMailAcceptable] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: "", status: "" });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordMatchError(e.target.value !== confPassword);
  };

  const handleConfPasswordChange = (e) => {
    setConfPassword(e.target.value);
    setPasswordMatchError(e.target.value !== password);
  };

  const userRegister = async () => {
    if (isMailAcceptable && !passwordMatchError) {
      const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
      if (!passwordRegex.test(password)) {
        setAlert({ open: true, message: "Password should be at least 8 characters long, contain at least one uppercase letter, one special character, and one number.", status: "error" });
        return;
      }

      // Register codes...

    } else if (!isMailAcceptable) {
      setAlert({ open: true, message: "The email you entered is not valid!", status: "error" });
    } else if (passwordMatchError) {
      setAlert({ open: true, message: "Passwords don't match!", status: "error" });
    }
  };

  const handleAvatarChange = (event) => {
    const reader = new FileReader();
  
    reader.onload = () => {
      const base64Image = reader.result;
      setAvatar(base64Image);
      setOpen(true);
    };
  
    if (event.target.files && event.target.files.length > 0) {
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  

  const handleClose = () => {
    setOpen(false);
  };

  const reMail = new RegExp(
    /^(?=.{9,200})(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i
  );

  const handleEmail = (event) => {
    setEmail(event.target.value);

    if (!reMail.test(event.target.value)) {
      setIsMailAcceptable(false);
    } else {
      setIsMailAcceptable(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <ShowImg open={open} close={handleClose} file={avatar} />
        <Container style={{ maxWidth: "500px", border: '1px solid black', borderRadius: '4px', backgroundColor: "white", minHeight: "450px" }}>
          <div style={{ display: "grid" }}>
            {avatar && (
              <div className={classes.centeredImage}>
                <Avatar src={avatar} alt="Avatar" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              id="avatar-input"
              style={{ display: 'none' }}
            />
            <label htmlFor="avatar-input" style={{ paddingTop: "20px" }}>
              <Button variant="outlined" component="span">
                {avatar ? 'Change Profile Picture' : 'Choose Profile Picture'}
              </Button>
            </label>
            <TextField
              style={style.first}
              id="outlined-basic"
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              style={style.field}
              id="outlined-basic"
              label="Surname"
              variant="outlined"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            <form style={{ display: "grid" }}>
              <TextField
                style={style.field}
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => handleEmail(e)}
                label="Email"
              />
              <FormControl style={style.field} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  label="Password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl style={style.field} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={confPassword}
                  onChange={handleConfPasswordChange}
                  label="Confirm Password"
                  error={passwordMatchError}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: '10px' }}
                onClick={userRegister}
              >
                Register
              </Button>
            </form>
            <Alert
              style={{ marginTop: '10px' }}
              variant="filled"
              severity={alert.status}
              open={alert.open}
              onClose={() => setAlert({ open: false, message: "", status: "" })}
            >
              {alert.message}
            </Alert>
            <Link to="/login" style={{ textAlign: 'center' }}>
              Already have an account? Sign in
            </Link>
          </div>
        </Container>
      </>
    </ThemeProvider>
  );
}

export default Register;
