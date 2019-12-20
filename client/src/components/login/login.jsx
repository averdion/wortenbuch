import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
var store = require('./store.js');


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 1 };
  }
  render() {
    return (
      <Link to="/about">About</Link>
    );
  }
}
export default Login;