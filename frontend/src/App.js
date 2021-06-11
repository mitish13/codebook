import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";

import Posts from "./components/Post/Posts";
import CreatePost from "./components/Post/CreatePost";
import Footer from "./components/Footer";
import Login from "./components/User/Login";
import Register from "./components/User/Signup";

import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Router>
        <Route component={Navbar} path="/" />
        <Route component={Login} path="/user/login" />
        <Route component={Register} path="/user/signup" />

        <Route component={CreatePost} path="/post/add" />
        <Route component={CreatePost} path="/post/edit/:id" exact />
        <Route component={Posts} path="/" exact />
        <Route component={Footer} path="/" exact />
      </Router>
    </div>
  );
};

export default App;
