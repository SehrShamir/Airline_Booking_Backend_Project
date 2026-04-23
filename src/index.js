const express = require('express');


const { PORT } = require('./config');

const app = express();

app.listen(PORT, () => {
    console.log(`successfully stated the sever on port ${PORT}`);
})
