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

    




town_Select.addEventListener('change', () => {
    localStorage.setItem('town_id', document.querySelector('#town-select').value)
})
getRegionsHandler()
dropDown.addEventListener('change', getTownHandler)