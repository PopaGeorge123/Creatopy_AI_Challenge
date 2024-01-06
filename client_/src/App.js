import React, { useState, useEffect } from 'react';
import './App.css';
import { defaultAd } from './data.js';
import styles from './style';

//ChatOpenAI



function App() {

  const [inputValue, setInputValue] = useState('');

  const [selectedAspectRatio, setSelectedAspectRatio] = useState(null);
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [responseData, setResponseData] = useState([{}]);

  let { container, title, description, button } = styles.temp1;

  const generateAd = async () => {
      setButtonDisabled(true);
    
      fetch(`http://localhost:3001/api/generate?prompt=${inputValue}`)
        .then(response => response.json())
        .then(data => {
          
          setButtonDisabled(false);
          setResponseData(data);
        })
        .catch(error => {
          console.error('Error:', error);
          setButtonDisabled(false);
        });
  };

  // Define aspect ratios and corresponding dimensions
  const aspectRatios = {
    'Instagram Post (500 x 500px)': { width: 500, height: 500 ,temp:"temp1"},
    'Twitter Header (1500 x 500px)': { width: 750, height: 250,temp:"temp2" },
    'Story (1080 x 1920px)': { width: 360, height: 660 ,temp:"temp3"},
  };

  // Function to handle button click and set the selected aspect ratio
  const handleButtonClick = (aspectRatio) => {
    setSelectedAspectRatio(aspectRatio);
    // console.log(aspectRatios[selectedAspectRatio].temp)
  };

  useEffect(() => {
    setSelectedAspectRatio('Instagram Post (500 x 500px)');
    setButtonDisabled(false);
    setResponseData(defaultAd);
  }, []);

  
  if (aspectRatios[selectedAspectRatio] && aspectRatios[selectedAspectRatio].temp === "temp1") {
    ({ container, title, description, button } = styles.temp1);
  }
  if (aspectRatios[selectedAspectRatio] && aspectRatios[selectedAspectRatio].temp === "temp2") {
    ({ container, title, description, button } = styles.temp2);
  }
  if (aspectRatios[selectedAspectRatio] && aspectRatios[selectedAspectRatio].temp === "temp3") {
    ({ container, title, description, button } = styles.temp3);
  }
  
  

  return (
    <div className="App">
      <div className='main-container'>
        <div className="aspect-ratio-select">
          <h2>Choose Template</h2>
          {Object.keys(aspectRatios).map((aspectRatio) => (
            <button
              key={aspectRatio}
              className={`aspect-ratio-button ${selectedAspectRatio === aspectRatio ? 'selected-button' : ''}`}
              onClick={() => {
                handleButtonClick(aspectRatio);
                // console.log(adBkgImage);
                // console.log(responseData.data.imageUrl);
              }}
            >
              {aspectRatio}
            </button>
          ))}
        </div>


        <div className="banner-preview">
              {
                // Object.keys(responseData === undefined ? defaultAd[0] : responseData).map((key)=>{
                  responseData.map((key)=>{
                  return (
                      <div className={container} style={
                        selectedAspectRatio
                  ? {
                      width: `${aspectRatios[selectedAspectRatio].width}px`,
                      height: `${aspectRatios[selectedAspectRatio].height}px`,

                      backgroundImage:`url(${key.imageUrl})`
                    }
                  : {}
                      }>
                      <div><h1 className={title}>{key.adTitle}</h1></div>
                      <div><h2 className={description}>{key.adDescription}</h2></div>
                      <div><button className={button}>{key.adButtonCallToAction}</button></div>
                    </div>
                  );
                })
              }
        </div>
        {/* /* {
          Object.keys(responseData.data === undefined?defaultAd.data:responseData.data).map((key)=>{
            return (
            
              
                <p key={key}>
                  {key}: {defaultAd.data[key]}
                </p>
              </div>
            
          );
        })} */ }
        
        


        <div className="user-input">
          <h2>Generate Ad</h2>
          <label htmlFor="">Describe your ad</label>

          <textarea className="ad-description-input" type="text" 
          id='input_textarea'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          />

          <button className="generate-button" onClick={generateAd} isButtonDisabled>{isButtonDisabled?'Generating...':'Generate'}</button>
        </div>
      </div>
    </div>
  );
}

export default App;
