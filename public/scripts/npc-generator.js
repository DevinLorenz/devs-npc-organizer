let BASED_URL = 'https://devsnpc.com';
let topDropDown = document.querySelector('#town-select')
let generateNPC = document.querySelector('#generate-npc')
region_name = localStorage.getItem('region_name')
region_id = localStorage.getItem('region_id')





// const getNPCTownHandler = () => {
    
//     axios.get(`${BASE_URL}/realm/regions/towns/:${town_id}`)
//     .then(res => {
            
            
//             res.data.forEach(town => {
//                 console.log(town.town_name)
//                 let townSelect = document.createElement('option')
//                 )
//             })
//         })
//         .catch(err => console.log(err))
// }



const addNPCHandler = (e) => {
    e.preventDefault();
    
   
    npcfirstname = document.getElementById('npc-firstName');
    npclastname = document.getElementById('npc-lastName');
    npcrace = document.getElementById('npc-race');
    npcgender = document.getElementById('npc-gender');
    npcoccupation = document.getElementById('npc-occupation');
    strength = document.getElementById('npc-strength');
    dexterity = document.getElementById('npc-dexterity');
    constitution = document.getElementById('npc-constitution');
    intelligence = document.getElementById('npc-intelligence');
    wisdom = document.getElementById('npc-wisdom');
    charisma = document.getElementById('npc-charisma');
    town_id = localStorage.getItem('town_id');
    

    
        axios.post(`${BASED_URL}/realm/region/town/npc`, {
            npcfirstname: npcfirstname.value,
            npclastname: npclastname.value,
            npcrace: npcrace.value,
            npcgender: npcgender.value,
            npcoccupation: npcoccupation.value,
            strength: strength.value,
            dexterity: dexterity.value,
            constitution: constitution.value,
            intelligence: intelligence.value,
            wisdom: wisdom.value,
            charisma: charisma.value,
            town_id: town_id
            
        })
            .then((response) => {
                console.log(response)
                
                alert(`${npcfirstname.value} ${npclastname.value}` + ` has been added.`)
                npcfirstname.value = ''
                npclastname.value = ''
                npcrace.value = ''
                npcgender.value = ''
                npcoccupation.value = ''
                strength.value = ''
                dexterity.value = ''
                constitution.value = ''
                intelligence.value = ''
                wisdom.value = ''
                charisma.value = ''
                
                
            })
            .catch((err) => console.log(err))

    }


// getTownsRegionsHandler()

generateNPC.addEventListener('click', addNPCHandler)