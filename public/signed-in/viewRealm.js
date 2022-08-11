const BASE_URL = 'http://localhost:4523';
let dropDown = document.querySelector('#region-select')
let townDropDown = document.querySelector('#town-select')
realm_name = localStorage.getItem('realm_name')
realm_id = localStorage.getItem('realm_id')
let addTownBtn = document.querySelector('#addTown')
addNPCBtn = document.querySelector('#npc-create-button')
let town_Select = document.querySelector('#town-select')

const getRegionsHandler = () => {
    
    axios.get(`${BASE_URL}/realm/region/${realm_id}`)
    .then(res => {
            
            
            res.data.forEach(region => {
                console.log(region.region_name)
                let regionSelect = document.createElement('option')
                regionSelect.setAttribute('value', region['region_id'])
                regionSelect.textContent = region.region_name
                console.log(region['region_id'])
                dropDown.appendChild(regionSelect)
            })
        })
        .catch(err => console.log(err))
}







const getTownHandler = () => {
    
    region_id = dropDown.value
    axios.get(`${BASE_URL}/realm/region/town/${region_id}`)
    .then(res => {
        townDropDown.innerHTML = '<option value="selectTownDrop">--Select Town--</option>'
            res.data.forEach(town => {
                console.log(town.town_name)
                let townSelect = document.createElement('option')
                townSelect.setAttribute('value', town['town_id'])
                townSelect.textContent = town.town_name
                console.log(town['town_id'])
                townDropDown.appendChild(townSelect)})
        
            
        }    
    )
    

        .catch(err => console.log(err))
}

    
const getNPCHandler = () => {
        
        town_id = townDropDown.value
        axios.get(`${BASE_URL}/realm/region/town/npc/${town_id}`)
        .then(res => {
            let npcList = document.querySelector('#npc-list')
            
            npcList.innerHTML = ''
            res.data.forEach(npcs => {

                let npcCard = document.createElement('div')
                npcCard.setAttribute('class','npcCard')
                npcCard.setAttribute('data-id', npcs.npc_id)
                npcCard.innerHTML = `
                ${npcs.npcfirstname} ${npcs.npclastname} ---- ${npcs.npcoccupation}
                <button class="view-btn" data-id='${npcs.npc_id}'>View</button>
                `
                npcList.appendChild(npcCard)
                
                
            })        
            const viewBtns = document.querySelectorAll('.view-btn')    
            for(const btn of viewBtns) {
                btn.addEventListener('click', (e) => {
                    let npc_id = e.target.dataset.id
                    console.log(e.target.dataset.id)
                    showNPCHandler(e, npc_id)
                })
            }
    })
    .catch(err => console.log(err))
}


const showNPCHandler = (e, npc_id) => {
    e.preventDefault()
    
    console.log(npc_id)
    let displayBox = document.querySelector('.display-box')
    axios.get(`${BASE_URL}/realm/region/npc/${npc_id}`)
    
    .then(res => {

        displayBox.innerHTML = ''
        console.log(res.data)
        let npcDetails = document.createElement('div')
        npcDetails.setAttribute('class','npcDetails')
        npcDetails.innerHTML = `
        <hr id="display-black-line">
        <h1>${res.data[0].npcfirstname} ${res.data[0].npclastname}</h1>
        <h3>${res.data[0].npcgender} ${res.data[0].npcrace} | ${res.data[0].npcoccupation}</h3>
        <div class="npc-display-stats">
        <h4>STR: ${res.data[0].strength}</h4>
        <h4>DEX: ${res.data[0].dexterity}</h4>
        <h4>CON: ${res.data[0].constitution}</h4>
        <h4>INT: ${res.data[0].intelligence}</h4>
        <h4>WIS: ${res.data[0].wisdom}</h4>
        <h4>CHA: ${res.data[0].charisma}</h4>
        </div>
        `
        displayBox.appendChild(npcDetails)
    })
    .catch(err => console.log(err))
}

 




townDropDown.addEventListener('change', getNPCHandler)

dropDown.addEventListener('change', () => {
    if(townDropDown !== dropDown.value){
        townDropDown.innerHTML = '<option value="selectTownDrop">--Select Town--</option>'
    }
})

town_Select.addEventListener('change', () => {
    localStorage.setItem('town_id', document.querySelector('#town-select').value)
})
getRegionsHandler()
dropDown.addEventListener('change', getTownHandler)