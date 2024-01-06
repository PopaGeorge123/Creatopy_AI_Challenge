const express = require('express')
const cors = require('cors');

const AImodule = require('./generate-image');

const app = express()
const port = process.env.PORT || 3001;

app.use(cors()); //ENABLE Cross Origin Requests

//IN CASE
app.get('/', async (req, res) => {
  res.send("THIS API GENERATE AI ADS")
});

app.get('/api/generate', async (req, res) => {
  console.log("Fetched");
  const requestPromot = req.query.prompt;
  //console.log("REQUEST : ", requestPromot);


  const responseData = [{
      imageUrl : await AImodule.genImg(requestPromot),
      adTitle : await AImodule.genTitle(requestPromot),
      adDescription : await AImodule.genDescription(requestPromot),
      adButtonCallToAction : await AImodule.genCalltA(requestPromot)
    }];
  
  //console.log(responseData);
  res.json(responseData);

});

app.listen(port , ()=>{console.log(`Server running on port ${port}`)})
