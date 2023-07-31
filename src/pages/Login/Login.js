import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Paper, Typography, TextField, Button } from "@mui/material";
import "./Login.scss";
import { GoogleLogin } from "react-google-login";
import { useAuth0 } from "@auth0/auth0-react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();

  // const clientId =
  //   "853499335497-o0v7ho2cgj21tkjclb7evevhr3nncec5.apps.googleusercontent.com";

  const handleLogin = () => {
    if (username === "admin" && password === "password") {
      localStorage.setItem("username", username);
      toast.success("Login successful!", { position: "top-center" });
      navigate("/");
    } else {
      toast.error("Invalid username or password", { position: "top-center" });
    }
  };
  const onSuccess = () => {
    toast.success("Login successful!", { position: "top-center" });
    navigate("/");
  };

  const onFailure = () => {
    toast.error("Invalid username or password", { position: "top-center" });
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
              {/* <GoogleLogin onClick={() => loginWithRedirect()}></GoogleLogin> */}
              <Button
                variant="outlined"
                color="secondary"
                onClick={loginWithRedirect}
                className={"button"}
                fullWidth
              >
                Login with google
              </Button>
              {/* 
              <GoogleLogin
                clientId={clientId}
                buttonText="Login with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"sinngle_host_origin"}
                onClick={() => loginWithRedirect()}
              ></GoogleLogin> */}
            </div>
          </form>
        </Paper>
        <ToastContainer></ToastContainer>
      </div>
    </>
  );
};

export default LoginPage;
