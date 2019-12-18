import React, { Component } from 'react';
import './App.css';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Input from './components/Input/Input';
import Rank from './components/Rank/Rank';
import Image from './components/Image/Image';
import Particles from 'react-particles-js';

const app = new Clarifai.App({
  apiKey: '7813f68ee8c54ab3b510d96b07d019bd'
 });
 
const particlesOptions = {
  particles: {
    number: {
      value: 200,
      density: {
        enable: true,
        value_area: 700
      }
    }
  }
}

// function App() {   //new syntax

class App extends Component {
  constructor() {
    super();
    this.state = {
      entry: "",
      imageUrl: ""
    }
  }

  onEntryChange = (event) => {
    this.setState({entry: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.entry});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.entry)
    .then(
      function(response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        // do something with response
      },
      function(err) {
        console.log(err);
        // there was an error
      }
    );  
  }

  render(){
    return (
      <div className="App">
        <Particles className= "particles"
          params={particlesOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <Input onEntryChange= {this.onEntryChange} onButtonSubmit= {this.onButtonSubmit}/>
        <Image imageUrl= {this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;