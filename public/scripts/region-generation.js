const BASE_URL = 'https://devno.herokuapp.com';

let makeRegion = document.querySelector('#generate-region')




const addRegionHandler = (e) => {
    e.preventDefault();
    region_name = document.getElementById('region');
    region_notes = document.getElementById('region-notes');
    realm_id = localStorage.getItem('realm_id')

    if (region_name === '') {
        alert('Please fill in all fields')
        throw(err)
    } else {
        axios.post(`${BASE_URL}/realm/region`, {
            region_name : region_name.value,
            region_notes : region_notes.value,
            realm_id : realm_id
        })
            .then((response) => {
                console.log(response)
                
                alert(`${region_name.value} has been added.`)
                region_name.value = '';
                region_notes.value = '';

            })
            .catch((err) => console.log(err))

    }
}


makeRegion.addEventListener('click', addRegionHandler)