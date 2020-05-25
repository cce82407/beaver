import React, { Component } from 'react';
import { render } from 'react-dom';

const API = 'https://acme-users-api-rev.herokuapp.com/api/'

class App extends Component {
  constructor(){
    super()
    this.state = {
      products = [],
      companies = [],
      offerings = []
    }
  }
  render() {
    return <h1>Welcome to the JSX world...</h1>
  }
}

const root = document.querySelector('#root')
render(<App />, root)