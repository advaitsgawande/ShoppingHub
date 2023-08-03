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
import { GoogleOAuthProvider } from "@react-oauth/google";
import "@stripe/stripe-js";
import Success from "./pages/Success/Success";
import Cancel from "./pages/Cancel/Cancel";
function App() {
  const theme = createTheme({
    status: {
      danger: red,
    },
  });
  return (
    <GoogleOAuthProvider clientId="853499335497-o0v7ho2cgj21tkjclb7evevhr3nncec5.apps.googleusercontent.com">
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
                <Route path="/success" element={<Success />} />
                <Route path="/cancel" element={<Cancel />} />
              </Routes>
              <Footer />
            </BrowserRouter>
          </Provider>
        </ThemeProvider>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
