const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

const { seed } = require('./db');
const { makeRealm, getRealms, makeRegion, getRegion, getAllRegion, addTown, getTown, getTownsRegion, makeNPC, getNPC,showNPC } = require('./controller');

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
app.get('/realm/region/:realm_id', getRegion)
app.get('/realm/regions/:realm_id', getTownsRegion)
app.get('/realm/getAllRegions', getAllRegion)
app.post('/realm/region/town', addTown)
app.get('/realm/region/town/:region_id', getTown)
app.post('/realm/region/town/npc', makeNPC)
app.get('/realm/region/town/npc/:town_id', getNPC)
app.get('/realm/region/npc/:npc_id', showNPC)

const PORT = process.env.PORT || 4523;

app.listen(PORT, () => {
    console.log(`Server is jamming on port ${PORT}`);
});