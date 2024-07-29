const express = require('express');

const app = express();
const PORT = 4500;

app.get('/', (req, res) => {
    res.send("OK");
});


app.listen(PORT, ()=> console.log(`Listening from http://127.0.0.1:${PORT}`));