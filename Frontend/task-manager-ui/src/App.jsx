import Dashboard from "./pages/Dashboard";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./component/Register.jsx";
import Login from "./component/Login.jsx";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
              path="/register"
              element={<Register />}
          />

          <Route
              path="/dashboard"
              element={<Dashboard />}
          />
        </Routes>
      </BrowserRouter>
  );
  // return <>
  //   <Dashboard />
  //
  //   <ToastContainer
  //       position="top-right"
  //       autoClose={3000}
  //   />
  // </>;

}

export default App;