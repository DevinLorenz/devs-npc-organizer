let getRealms = document.querySelector('#collections-button')

const BASE_URL = 'https://devno.herokuapp.com'

const addRegion = (realm_id) => {
    localStorage.setItem('realm_id', realm_id)
    
    window.location = `./displays/create-region.html`
}

const addTown = (realm_id) => {
    localStorage.setItem('realm_id', realm_id)

    window.location = `./displays/create-town.html`
}

const viewRealm = (realm_id) => {
    localStorage.setItem('realm_id', realm_id)
    
    window.location = `./viewRealm.html`
}

const createRealmCard = (realm) => {
    console.log(realm.realm_id)
    let realmsList = document.getElementsByClassName('realms-list')
    let realmCard = document.createElement('div')
    realmCard.classList.add('realm-card')
    realmCard.innerHTML = `
<div id="realm-container">
    <div class="getRealmsList">
        ${realm.realm_name}      
        </div>
        <button class="view-realm-button" onclick='viewRealm(${realm.realm_id})'>View Realm</button>
        <button class="add-region-button" onclick='addRegion(${realm.realm_id})'>Add Region</button>
        <button class="add-town-button" onclick='addTown(${realm.realm_id})'>Add Town</button>
        
<div>       
    `
    realmsList[0].appendChild(realmCard)

}


const getRealmsHandler = (e) => {
    e.preventDefault();
    axios.get(`${BASE_URL}/realm`)
        .then(res => {
            res.data.forEach(realm => {
                createRealmCard(realm)
            })
        })
        .catch(err => console.log(err))

}







window.addEventListener('load', getRealmsHandler);
