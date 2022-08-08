const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');



app.use(express.static('public'));

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/landing.html'));
})


const { seed } = require('./db');

app.post('/seed', seed)




const PORT = process.env.PORT || 4523;

app.listen(PORT, () => {
    console.log(`Server is jamming on port ${PORT}`);
});