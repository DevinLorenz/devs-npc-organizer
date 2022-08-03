const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
require('dotenv').config();



app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/home.html'));
})


const PORT = process.env.PORT || 4523;

app.listen(PORT, () => {
    console.log(`Server is jamming on port ${PORT}`);
});