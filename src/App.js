import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Input from './components/Input/Input';
import Rank from './components/Rank/Rank';
import Image from './components/Image/Image';
import Particles from 'react-particles-js';

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
const initialState = {
  entry: "",
  imageUrl: "",
  box: {},
  route: "loggedOut",
  isSignedIn: false,
  user: {
    id: "",
    email: "",
    name: "",
    entries: 0,
    joined: ""
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      email: data.email,
      name: data.name,
      entries: data.entries,
      joined: data.joined
    }
    })
  } 

  // componentDidMount() {
  //   fetch("http://localhost:3001")
  //   .then(response => response.json())
  //   .then(console.log)
  // }

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
    fetch("https://api-facerecognition.herokuapp.com/imageurl", {
          method: "post",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            entry: this.state.entry
          })
        })
        .then(response => response.json())
        // .catch(err =>{console.log(err)})
    .then(response => {
      if(response){
        fetch("https://api-facerecognition.herokuapp.com/image", {
          method: "put",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
        .catch(err => console.log(err))
      }
      this.displayFaceBox(this.calculateFaceLocation(response));
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === "loggedIn") {
      this.setState({isSignedIn: true})
    } else {
      this.setState(initialState)
    }
    this.setState({route: route})
  }

  render() {
    const { isSignedIn, imageUrl, box, route } = this.state;
    const { name, entries } = this.state.user; 
    return (
      <div className= "App">
        <Particles className= "particles"
          params={particlesOptions}
        />
        <Navigation isSignedIn= {isSignedIn} onRouteChange= {this.onRouteChange}/>
        { route === "loggedIn"
          ? <div>
            <Logo />
            <Rank name= {name} entries= {entries} />
            <Input onEntryChange= {this.onEntryChange} onButtonSubmit= {this.onButtonSubmit}/>
            <Image box= {box} imageUrl= {imageUrl}/>
            </div>  
          : (
            route === "loggedOut"
            ? <SignIn loadUser= {this.loadUser} onRouteChange= {this.onRouteChange}/>
            : <Register loadUser= {this.loadUser} onRouteChange= {this.onRouteChange}/>
          )            
        }
      </div>
    );
  }
};

export default App;