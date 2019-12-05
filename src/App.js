import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Input from './components/Input/Input';
import Rank from './components/Rank/Rank';
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

function App() {
//   constructor() {
//     super();
//     this.state = {
//       entry: "",
//     }
//   }

// onEntryChange = (event) => {
//   console.log(event);
// } 

  return (
    <div className="App">
      <Particles className= "particles"
        params={particlesOptions}
      />
      <Navigation />
      <Logo />
      <Rank />
      <Input />
      {/* {      <Image />} */}

    </div>
  );
}

export default App;