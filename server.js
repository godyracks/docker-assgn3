const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());

let posts = [];
let responses = [];

app.post('/postmessage', (req, res) => {
  const { topic, data } = req.body;
  const newPost = {
    id: posts.length + 1,
    topic,
    data,
    timestamp: new Date(),
  };
  posts.push(newPost);
  res.json({ success: true, id: newPost.id });
});

app.post('/postresponse', (req, res) => {
  const { postId, data } = req.body;
  const newResponse = {
    id: responses.length + 1,
    postId,
    data,
    timestamp: new Date(),
  };
  responses.push(newResponse);
  res.json({ success: true, id: newResponse.id });
});

app.get('/alldata', (req, res) => {
  res.json({ posts, responses });
});

// Serve the posting.html file
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'posting.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
