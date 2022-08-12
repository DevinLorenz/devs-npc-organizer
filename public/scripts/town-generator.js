const BASE_URL = 'https://devsnpc.com';
let dropDown = document.querySelector('#region-select-town')
let generateTown = document.querySelector('#generate-town')
realm_name = localStorage.getItem('realm_name')
realm_id = localStorage.getItem('realm_id')





const getTownsRegionsHandler = () => {
    
    axios.get(`${BASE_URL}/realm/regions/${realm_id}`)
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



const addTownHandler = (e) => {
    e.preventDefault();
    town_name = document.getElementById('town');
    town_notes = document.getElementById('town-notes');
    region_id = dropDown.value
    

    if (town_name === '') {
        alert('Please fill in all fields')
        throw(err)
    } else {
        axios.post(`${BASE_URL}/realm/region/town`, {
            town_name : town_name.value,
            town_notes : town_notes.value,
            region_id : dropDown.value,
        })
            .then((response) => {
                console.log(response)
                
                alert(`${town_name.value} has been added.`)
                town_name.value = '';
                town_notes.value = '';

            })
            .catch((err) => console.log(err))

    }
}

getTownsRegionsHandler()

generateTown.addEventListener('click', addTownHandler)