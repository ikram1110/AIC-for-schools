import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Login from "./containers/Login";
import PrivateRoutes from "./routes/PrivateRoutes";
import Main from "./containers/Main";

function App() {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <Helmet>
          <title>AIS for Schools</title>
          <meta
            name="description"
            content="AIS for Schools merupakan Aplikasi Website yang berguna untuk mengelolah data akademik sekolah."
          />
          <meta name="keywords" content="siaka, siakad, sekolah" />
          <meta name="author" content="Binaries Techno Solution" />
        </Helmet>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={
              <PrivateRoutes>
                <Main />
              </PrivateRoutes>
            }
          />
        </Routes>
      </HelmetProvider>
    </BrowserRouter>
  );
}

export default App;
