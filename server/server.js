const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

const { seed } = require('./db');
const { makeRealm, getRealms, makeRegion } = require('./controller');

app.use(express.static('public'));



app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/landing.html'));
})




app.post('/seed', seed)
app.post('/realm', makeRealm)
app.get('/realm', getRealms)
app.post('/realm/region', makeRegion)




const PORT = process.env.PORT || 4523;

app.listen(PORT, () => {
    console.log(`Server is jamming on port ${PORT}`);
});