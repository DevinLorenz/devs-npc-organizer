const BASE_URL = 'http://localhost:4523'

let makeRealm = document.querySelector('#generate-realm')
let getRealms = document.querySelector('#collections-button')



const addRealmHandler = (e) => {
    e.preventDefault();
    realm_name = document.getElementById('realm');
    realm_notes = document.getElementById('realm-notes');

    if (realm_name === '') {
        alert('Please fill in all fields')
    } else {
        axios.post(`${BASE_URL}/realm`, {
            realm_name : realm_name.value,
            realm_notes : realm_notes.value
        })
            .then((response) => {
                console.log(response)
                alert(`${realm_name.value} has been added.`)
                realm_name.value = '';
                realm_notes.value = '';
            })
            .catch((err) => console.log(err))
    }
}


makeRealm.addEventListener('click', addRealmHandler)