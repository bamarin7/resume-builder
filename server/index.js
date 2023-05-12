//Setting up a Node.js server using Express.js

const { Configuration, OpenAIApi } = require('openai');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { randomUUID } = require('crypto');
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const configuration = new Configuration({
  apiKey: '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',
})

const openai = new OpenAIApi(configuration);

let database = [];

const GPTFunction = async (text) => {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    // model: 'gpt-3.5-turbo',
    prompt: text,
    temperature: 0.6,
    max_tokens: 250,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  });
  return response.data.choices[0].text;
};

app.post('/resume/create', async (req, res) => {
  const {
    fullName,
    currentPosition,
    currentLength,
    currentTechnologies,
    workHistory,
  } = req.body;

  const workArray = JSON.parse(workHistory);

  const newEntry = {
    id: randomUUID(),
    fullName,
    currentPosition,
    currentLength,
    currentTechnologies,
    workHistory: workArray,
  };
  
  // Job description prompt
  const prompt1 = `I'm currently working on my resume and need a succinct yet impactful professional summary. Here are some key details about me: \n- Name: ${fullName} \n- Current Role: ${currentPosition} \n- Experience in Role: ${currentLength} years \n- Key Technologies: ${currentTechnologies}. \nCould you craft a compelling 30-word description that can sit at the top of my resume? Please maintain a first-person narrative.`;


  // Job responsibilities prompt
  const prompt2 = `I'm refining the 'Skills & Expertise' section of my resume and could use your assistance. Here's some information about me: \n- Name: ${fullName} \n- Current Role: ${currentPosition} \n- Experience in Role: ${currentLength} years \n- Key Technologies: ${currentTechnologies}. \nCould you help me articulate 5 key strengths or areas of expertise that align with my role and experience?`;


  const remainderText = () => {
    let stringText = '';
    for (let i = 0; i < workArray.length; i++) {
      stringText += `${workArray[i].name} as a ${workArray[i].position}.`;
    }
    return stringText;
  };

  // Job achievements prompt
  const prompt3 = `I'm currently detailing my work experience on my resume. Here are the important points: \n- Name: ${fullName} \n- Current Role: ${currentPosition} \n- Experience in Role: ${currentLength} years. \n- Number of Companies Worked at: ${workArray.length} \n- Additional Details: ${remainderText} \nCould you assist me in creating a concise 25-word description for each company I've worked at? Please number them according to my chronological progression and maintain a first-person perspective.`;


  // generate a GPT3 result
  const objective = await GPTFunction(prompt1);
  const keypoints = await GPTFunction(prompt2);
  const jobResponsibilities = await GPTFunction(prompt3);
  // put them together into an object
  const chatgptData = { objective, keypoints, jobResponsibilities };
  const data = {...newEntry, ...chatgptData };
  database.push(data);

  res.json({
    message: 'Request successful!',
    data,
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});