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

    seed: (req,res)=>{
        sequelize.query(`

drop table if exists npcs;
drop table if exists town;
drop table if exists region;
drop table if exists realm;  

        create table realm (
            realm_id serial primary key, 
            realm_name varchar(255),
            realm_notes varchar(10000) 
            );
        
            
        
        create table region (
            region_id serial primary key,
            region_name varchar(255),
            region_notes varchar(10000),
            realm_id int not null references realm(realm_id)
            );
            
            
       

        create table town (
            town_id serial primary key,
            town_name varchar(255),
            town_notes varchar(10000),
            region_id int not null references region(region_id)
        );

        
        create table npcs (
            npc_id serial primary key,
            npcFirstName varchar(30),
            npcLastName varchar(30),
            npcRace varchar(30),
            npcGender varchar(30),
            npcOccupation varchar(30),
            strength int,
            dexterity int,
            constitution int,
            intelligence int,
            wisdom int,
            charisma int,
            hitPoints int,
            armorClass int,
            proficiency varChar(255),
            notes varchar(10000),
            description varchar(2000),
            background varchar(2000),
            town_id int not null references town(town_id)
        );`
        ).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    },


}
