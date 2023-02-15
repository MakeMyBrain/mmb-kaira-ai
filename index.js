const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const config = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(config);

app.get("/", (req, res) => {
  res.send("Welcome to the MMB chat API");
});

app.post("/message", (req, res) => {
  console.log(req.body.message);
  const response = openai.createCompletion({
    model: "text-davinci-003",
    prompt: req.body.message,
    temperature: 0,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 50,
  });
  console.log(response);

  response
    .then((data) => {
      const message = { message: data.data.choices[0].text };
      res.send(message);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(3000, () => console.log("Listening on port 3000"));
