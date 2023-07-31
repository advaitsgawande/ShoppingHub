//import { useEffect } from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// pages
import { Home, Cart } from "./pages/index";
// components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Provider } from "react-redux";
import store from "./store/store";
import LoginPage from "./pages/Login/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import { ThemeProvider, createTheme } from "@mui/material";
import { red } from "@mui/material/colors";
import { ToastContainer } from "react-toastify";
import { Auth0Provider } from "@auth0/auth0-react";
// import { gapi } from "gapi-script";

function App() {
  const theme = createTheme({
    status: {
      danger: red,
    },
  });
  return (
    <Auth0Provider
      domain="dev-3h28rirk7eqi7fhw.us.auth0.com"
      clientId="LXs9TnASf15jhFISwaNR3RyStjQrYUuF"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <div className="App">
        <ToastContainer />
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route index path="/login" element={<LoginPage />} />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                  }
                />
              </Routes>
              <Footer />
            </BrowserRouter>
          </Provider>
        </ThemeProvider>
      </div>
    </Auth0Provider>
  );
}

export default App;
