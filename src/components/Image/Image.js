import React from 'react';
import './image.css'


const Image = ({ imageUrl, box }) => {
  return (
    <div className= "center ma">
      <div className= "absolute">
        <img id= "inputImage" src= {imageUrl} alt= {"facial detection"} width= "500px" height= "auto"/> 
        <div className= "bounding-box" style= {{left: box.leftCol, top: box.topRow, right: box.rightCol, bottom: box.bottomRow}}>
        </div>
      </div>
    </div>
  )
}

export default Image;