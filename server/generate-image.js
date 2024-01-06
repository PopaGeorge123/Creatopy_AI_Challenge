const OpenAI = require('openai');
require('dotenv').config();

const myapiKey = process.env.CHATOPENAIKEY;

const openai = new OpenAI({ apiKey: myapiKey });

function extractTextByKey(key, inputString) {
    const regex = new RegExp(`${key}\\{(.*?)\\}`, 'g');
    const matches = [];
    let match;
  
    while ((match = regex.exec(inputString)) !== null) {
      matches.push(match[1]);
    }
  
    return matches[0];
  }

const genImg = async (prompt)=>{
    try {
        const image = await openai.images.generate({ 
        model: "dall-e-3", 
        prompt: prompt,
      });
      //  console.log("DATA : ",image);
        return image.data[0].url
        } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const genTitle = async (prompt)=>{
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: prompt + "Suggest me only one title for my ad.Please return data by format 'TITLE{suggested title}'. The result must not contain word 'ad' and maximum length of 4 words"}],
            model: "gpt-3.5-turbo",
        });
      console.log("TITLE : ",completion.choices[0].message.content);
        const title = extractTextByKey("TITLE" , completion.choices[0].message.content)

        return title
        } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const genDescription = async (prompt)=>{
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: prompt + "Suggest me only one description for my ad.Please only return data by format 'DESCRIPTION{your description}'. The result must not contain word 'ad' and must be > 5 words but < 10"}],
            model: "gpt-3.5-turbo",
        });
        // console.log("DATA : ",completion.choices[0].message.content);
        const description = extractTextByKey("DESCRIPTION" , completion.choices[0].message.content);

        // console.log(description);
        return description
        } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const genCalltA = async (prompt)=>{
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: prompt + "Suggest me only one good Call to Action content for the button for my ad.Please only return data by format CTA{response}. The result must not contain word 'ad' and must be max 3 words"}],
            model: "gpt-3.5-turbo",
        });
        console.log("CTA : ",completion.choices[0].message.content);
        const cta = extractTextByKey("CTA" , completion.choices[0].message.content)

        return cta
        } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {
    genImg,
    genTitle,
    genDescription,
    genCalltA
}