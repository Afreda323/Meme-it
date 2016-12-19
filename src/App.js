import React, { Component } from 'react';
import Input from './input.js';
//   https://memegen.link/api/templates/
class App extends Component {
  render() {
    return (
      <div className="App">
        <nav>
          <h1>Meme-It <span>Made by <a href="antfreda.com">Anthony Freda</a></span></h1>
        </nav>
        <Input />
      </div>
    );
  }
}

export default App;
