import React, { Component } from 'react';
import axios from "axios";

import Projects from "./Components/Projects";

import './App.css';

class App extends Component {
  state = {
    projects: [],
    actions: []
  }

  componentDidMount() {
    axios.get("http://localhost:5000/projects")
    .then(response => {
      console.log(response);
      this.setState({ projects: response.data })
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        <Projects projects={this.state.projects} />
      </div>
    );
  }
}

export default App;
