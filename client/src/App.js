// import 'bootstrap/dist/css/bootstrap.css'
import React from "react";
import Navbar from "./components/layout/Navbar"
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { About } from "./pages/About";
import Contact from "./pages/Contact";
import Signin from "./components/forms/Signin";
import Signup from "./components/forms/Signup";
import { Provider } from "react-redux";
import store from "./store/store";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Provider>
    </>
  )
}

export default App