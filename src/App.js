import React, { Component } from 'react';
import './App.css';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Input from './components/Input/Input';
import Rank from './components/Rank/Rank';
import Image from './components/Image/Image';
import Particles from 'react-particles-js';

const app = new Clarifai.App({
  apiKey: "7813f68ee8c54ab3b510d96b07d019bd"
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
      imageUrl: "",
      box: {},
      route: "loggedOut",
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const detectedFace = (data.outputs[0].data.regions[0].region_info.bounding_box);
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: detectedFace.left_col * width, 
      topRow: detectedFace.top_row * height,
      rightCol: width - (detectedFace.right_col * width),
      bottomRow: height - (detectedFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box});
  } 

  onEntryChange = (event) => {
    this.setState({entry: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.entry});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.entry)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === "loggedIn") {
      this.setState({isSignedIn: true})
    } else {
      this.setState({isSignedIn: false})
    }
    this.setState({route: route})
  }

  render() {
    const { isSignedIn, imageUrl, box, route } = this.state; 
    return (
      <div className= "App">
        <Particles className= "particles"
          params={particlesOptions}
        />
        <Navigation isSignedIn= {isSignedIn} onRouteChange= {this.onRouteChange}/>
        { route === "loggedIn"
          ? <div>
            <Logo />
            <Rank />
            <Input onEntryChange= {this.onEntryChange} onButtonSubmit= {this.onButtonSubmit}/>
            <Image box= {box} imageUrl= {imageUrl}/>
            </div>  
          : (
            route === "loggedOut"
            ? <SignIn onRouteChange= {this.onRouteChange}/>
            : <Register onRouteChange= {this.onRouteChange}/>
          )            
        }
      </div>
    );
  }
};

export default App;