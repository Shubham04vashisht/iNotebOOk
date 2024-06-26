import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NoteState from '../src/context/notes/NoteState'
import Alert from "./components/Alert";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { useState } from "react";
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  return (
    <>
    <NoteState>
        <BrowserRouter>
          <Navbar></Navbar>
          <Alert alert={alert}/>
          <Routes>
            <Route path="/" element={<Home showAlert={showAlert}/>}></Route>
            <Route path="/login" element={<Login showAlert={showAlert}/>}></Route>
            <Route path="/signup" element={<SignUp showAlert={showAlert}/>}></Route>
          </Routes>
        </BrowserRouter>
    </NoteState>
    </>
  );
}
export default App;
