import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Paper, Typography, TextField, Button } from "@mui/material";
import "./Login.scss";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "password") {
      localStorage.setItem("username", username);
      toast.success("Login successful!", { position: "top-center" });
      navigate("/");
    } else {
      toast.error("Invalid username or password", { position: "top-center" });
    }
  };

  return (
    <>
      <div className={"login-page"}>
        <Paper elevation={10} className={"paper"}>
          <Typography variant="h5" className={"title"}>
            Sign in
          </Typography>
          <form className={"form"}>
            <TextField
              label="Username"
              variant="outlined"
              className={"input"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              className={"input"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
              className={"button"}
              fullWidth
            >
              Sign in
            </Button>
            <Typography
              variant="body2"
              color="textSecondary"
              className={"link"}
            >
              By logging in, you accept our terms and conditions !
            </Typography>
            <div>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  const credentials = jwt_decode(credentialResponse.credential);
                  console.log("credentials", typeof credentials);
                  localStorage.setItem(
                    "userDetails",
                    JSON.stringify(credentials)
                  );
                  toast.success(`welcome ${credentials.name}`, {
                    position: "top-center",
                  });
                  navigate("/");
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
                useOneTap
              />
            </div>
          </form>
        </Paper>
        <ToastContainer></ToastContainer>
      </div>
    </>
  );
};

export default LoginPage;
