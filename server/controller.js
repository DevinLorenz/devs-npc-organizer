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
            }

}





    


