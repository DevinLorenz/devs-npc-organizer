require('dotenv').config()
const { DATABASE_URL } = process.env;
const Sequelize = require("sequelize");
const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});



module.exports = {


makeRealm : (req,res) => {
    const { realm_name, realm_notes} = req.body;
    sequelize
        .query(
            `INSERT INTO realm (realm_name, realm_notes) VALUES ('${realm_name}', '${realm_notes}')`
        )
        .then((dbRes) => {
            
            res.status(200).send(dbRes[0])
        })
        .catch((err) => console.log(err))
    },

    
    getRealms : (req,res) => {
        sequelize
            .query(
                `SELECT * FROM realm`
            )
            .then((dbRes) => {
                
                res.status(200).send(dbRes[0])
            })
            .catch((err) => console.log(err))
        },

        

        makeRegion : (req,res) => {
            const { region_name, region_notes, realm_id} = req.body;
            sequelize
                .query(
                    `INSERT INTO region (region_name, region_notes, realm_id) VALUES ('${region_name}', '${region_notes}', '${realm_id}') RETURNING *`
                )
                .then((dbRes) => {
                    
                    res.status(200).send(dbRes[0])
                })
                .catch((err) => console.log(err))
            },

            getRegion : (req,res) => {
                const { realm_id } = req.params;
                sequelize
                    .query(
                        `SELECT * FROM region WHERE realm_id = ${realm_id}`
                    )
                    .then((dbRes) => {
                        
                        res.status(200).send(dbRes[0])
                    })
                    .catch((err) => console.log(err))
                },

                getTownsRegion : (req,res) => {
                    const { realm_id } = req.params;
                    sequelize
                        .query(
                            `SELECT * FROM region WHERE realm_id = ${realm_id}`
                        )
                        .then((dbRes) => {
                            res.status(200).send(dbRes[0])
                        })
                        .catch((err) => console.log(err))
                    },

                getAllRegion : (req,res) => {
                    sequelize
                        .query(
                            `SELECT * FROM region`
                        )
                        .then((dbRes) => {
                            
                            res.status(200).send(dbRes[0])
                        })
                        .catch((err) => console.log(err))
                    },


                    addTown : (req,res) => {
                        const { town_name, town_notes, region_id} = req.body;
                        sequelize
                            .query(
                                `INSERT INTO town (town_name, town_notes, region_id) VALUES ('${town_name}', '${town_notes}', '${region_id}') RETURNING *`
                            )
                            .then((dbRes) => {
                                
                                res.status(200).send(dbRes[0])
                            })
                            .catch((err) => console.log(err))
                        },
                   

                    getTown : (req,res) => {
                        const { region_id } = req.params;
                        sequelize
                            .query(
                                `SELECT * FROM town WHERE region_id = ${region_id}`
                            )
                            .then((dbRes) => {
                                
                                res.status(200).send(dbRes[0])
                            })
                            .catch((err) => console.log(err))
                        },

                        makeNPC : (req,res) => {
                            const { npcfirstname, npclastname, npcrace, npcgender, npcoccupation,strength, dexterity, constitution, intelligence, wisdom, charisma, town_id } = req.body;
                            sequelize
                                .query(
                                    `INSERT INTO npcs (npcfirstname, npclastname, npcrace, npcgender, npcoccupation,strength, dexterity, constitution, intelligence, wisdom, charisma, town_id) VALUES ('${npcfirstname}', '${npclastname}', '${npcrace}', '${npcgender}', '${npcoccupation}','${strength}', '${dexterity}', '${constitution}', '${intelligence}', '${wisdom}',
                                   ' ${charisma}', '${town_id}') RETURNING *`
                                )
                                .then((dbRes) => {
                                    
                                    res.status(200).send(dbRes[0])
                                })
                                .catch((err) => console.log(err))
                            },

                            getNPC : (req,res) => {
                                const { town_id } = req.params;
                                sequelize
                                    .query(
                                        `SELECT * FROM npcs WHERE town_id = ${town_id}`
                                    )
                                    .then((dbRes) => {
                                        
                                        res.status(200).send(dbRes[0])
                                    })
                                    .catch((err) => console.log(err))
                                },

                                showNPC : (req,res) => {
                                    const { npc_id } = req.params;
                                    sequelize
                                        .query(
                                            `SELECT * FROM npcs WHERE npc_id = ${npc_id}`
                                        )
                                        .then((dbRes) => {
                                            
                                            res.status(200).send(dbRes[0])
                                        })
                                        .catch((err) => console.log(err))
                                    }
                                }







    


