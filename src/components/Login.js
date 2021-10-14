import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";


export default function Login({ handleSetLoggedIn }) {
  const initialFormData = {
    email: "",
    password: "",
  };
  const history = useHistory();
  const [formData, setFormData] = useState(initialFormData);
  const handleChange = (event) => {
    setFormData((prevState) => {
      return { ...prevState, [event.target.id]: event.target.value };
    });
  };

  const _handleLogin = async (event) => {
    event.preventDefault();
    try {
      const API_ENDPOINT = "http://127.0.0.1:8000/token/login";
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      handleSetLoggedIn(data.auth_token);
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      className="box"
    >
      <h1>Login in your Account</h1>
      <form onSubmit={_handleLogin}>
        <div>
          <TextField
            id="outlined-name"
            label="Email"
            defaultValue={formData.email}
            onChange={handleChange}
            required
            type="email"
          />
        </div>
        <div>
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            defaultValue={formData.password}
            required
            autoComplete="current-password"
            onChange={handleChange}
          />
        </div>
        <div>
          <Button
            className="button"
            type="Submit"
            variant="outlined"
            size="large"
          >
            Log In
          </Button>
        </div>
      </form>
      <p>Don't have an account? </p>
      <Link to="/signup">Sign UP</Link>
    </Box>
  );
}
