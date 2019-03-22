import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import Projects from "./Components/Projects";

import { fetchProjects } from "./store/actions";

import "./App.css";

class App extends Component {
  componentDidMount() {
    this.props.fetchProjects();
  }

  render() {
    return (
      <div>
        <Projects {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.projects,
  error: state.error
});

export default connect(
  mapStateToProps,
  { fetchProjects }
)(App);
