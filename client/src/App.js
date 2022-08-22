// import 'bootstrap/dist/css/bootstrap.css'
import React from "react";
import Navbar from "./components/layout/Navbar"
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { About } from "./pages/About";
import Contact from "./pages/Contact";
import Signin from "./components/forms/Signin";
import Signup from "./components/forms/Signup";
import { Provider, useSelector } from "react-redux";
import Store from "./store";
import PrivateRoute from "./private/PrivateRoute";
import Dashboard from './pages/Dashboard'
import RouteLinks from "./private/RouteLinks";
import NotFound from "./pages/NotFound";
import CreatePost from "./components/forms/CreatePost";

const App = () => {

  return (
    <>
      <Provider store={Store}>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/signin" element={<Signin />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/create" element={<CreatePost />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Provider>
    </>
  )
}

export default App