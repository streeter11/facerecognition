import React from 'react';


const Image = ({ imageUrl }) => {
  return (
    <div>
      <img src={imageUrl} alt={"facial detection"} width= "500px" height= "auto"/> 
    </div>
)
}

export default Image;