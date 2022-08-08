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
            name varchar(255),
            notes varchar(2000) 
            );
        
            
        
        create table region (
            region_id serial primary key,
            name varchar(255),
            notes varchar(2000),
            realm_id int not null references realm(realm_id)
            );
            
            
       

        create table town (
            town_id serial primary key,
            name varchar(255),
            notes varchar(2000),
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
            notes varchar(2000),
            description varchar(2000),
            background varchar(2000),
            town_id int not null references town(town_id)
        );`
        ).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    },

    makeRealm: (req,res)=>{
        sequelize.query(`
        insert into realm (name, notes) values ('${req.body.name}', '${req.body.notes}')`
        ).then(() => {
            console.log('Realm created!')
            res.sendStatus(200)
        }).catch(err => console.log('error creating realm', err))
    },

    makeRegion: (req,res)=>{
        sequelize.query(`
        insert into region (name, notes, realm_id) values ('${req.body.name}', '${req.body.notes}', ${req.body.realm_id})`
        ).then(() => {
            console.log('Region created!')
            res.sendStatus(200)
        }).catch(err => console.log('error creating region', err))
    },

    makeTown: (req,res)=>{
        sequelize.query(`
        insert into town (name, notes, region_id) values ('${req.body.name}', '${req.body.notes}', ${req.body.region_id})`
        ).then(() => {
            console.log('Town created!')
            res.sendStatus(200)
        }).catch(err => console.log('error creating town', err))
    },

    makeNPC: (req,res)=>{
        sequelize.query(`
        insert into npcs (npcFirstName, npcLastName, npcRace, npcGender, npcOccupation, strength, dexterity, constitution, intelligence, wisdom, charisma, hitPoints, armorClass, proficiency, notes, description, background, town_id) 
        
        values ('${req.body.npcFirstName}', '${req.body.npcLastName}', '${req.body.npcRace}', '${req.body.npcGender}', '${req.body.npcOccupation}', ${req.body.strength}, ${req.body.dexterity}, ${req.body.constitution}, ${req.body.intelligence}, ${req.body.wisdom}, ${req.body.charisma}, ${req.body.hitPoints}, ${req.body.armorClass}, '${req.body.proficiency}', '${req.body.notes}', '${req.body.description}', '${req.body.background}', ${req.body.town_id})`
        ).then(() => {
            console.log('NPC created!')
            res.sendStatus(200)
        }).catch(err => console.log('error creating NPC', err))
    },

    getRealms: (req,res)=>{
        sequelize.query(`
        select * from realm`
        ).then(results => {
            res.json(results[0])
        }).catch(err => console.log('error getting realms', err))
    },

    getRegions: (req,res)=>{
        sequelize.query(`
        select * from region`
        ).then(results => {
            res.json(results[0])
        }).catch(err => console.log('error getting regions', err))
    },

    getTowns: (req,res)=>{
        sequelize.query(`
        select * from town`
        ).then(results => {
            res.json(results[0])
        }).catch(err => console.log('error getting towns', err))
    },

    getNPCs: (req,res)=>{
        sequelize.query(`
        select * from npcs`
        ).then(results => {
            res.json(results[0])
        }).catch(err => console.log('error getting NPCs', err))
    },
    
    editRealm: (req,res)=>{
        sequelize.query(`
        update realm set name = '${req.body.name}', notes = '${req.body.notes}' where realm_id = ${req.body.realm_id}`
        ).then(() => {
            console.log('Realm updated!')
            res.sendStatus(200)
        }).catch(err => console.log('error updating realm', err))
    },

    editRegion: (req,res)=>{
        sequelize.query(`
        update region set name = '${req.body.name}', notes = '${req.body.notes}', realm_id = ${req.body.realm_id} where region_id = ${req.body.region_id}`
        ).then(() => {
            console.log('Region updated!')
            res.sendStatus(200)
        }).catch(err => console.log('error updating region', err))
    },

    editTown: (req,res)=>{
        sequelize.query(`
        update town set name = '${req.body.name}', notes = '${req.body.notes}', region_id = ${req.body.region_id} where town_id = ${req.body.town_id}`
        ).then(() => {
            console.log('Town updated!')
            res.sendStatus(200)
        }).catch(err => console.log('error updating town', err))
    },

    editNPC: (req,res)=>{
        sequelize.query(`
        update npcs set npcFirstName = '${req.body.npcFirstName}', npcLastName = '${req.body.npcLastName}', npcOccupation = '${req.body.npcOccupation}', hitPoints = ${req.body.hitPoints}, armorClass = ${req.body.armorClass}, proficiency = '${req.body.proficiency}', notes = '${req.body.notes}', description = '${req.body.description}', background = '${req.body.background}', town_id = ${req.body.town_id} where npc_id = ${req.body.npc_id}`
        ).then(() => {
            console.log('NPC updated!')
            res.sendStatus(200)
        }).catch(err => console.log('error updating NPC', err))
    },

    deleteRealm: (req,res)=>{
        sequelize.query(`
        delete from realm where realm_id = ${req.body.realm_id}`
        ).then(() => {
            console.log('Realm deleted!')
            res.sendStatus(200)
        }).catch(err => console.log('error deleting realm', err))
    },

    deleteRegion: (req,res)=>{
        sequelize.query(`
        delete from region where region_id = ${req.body.region_id}`
        ).then(() => {
            console.log('Region deleted!')
            res.sendStatus(200)
        }).catch(err => console.log('error deleting region', err))
    },

    deleteTown: (req,res)=>{
        sequelize.query(`
        delete from town where town_id = ${req.body.town_id}`
        ).then(() => {
            console.log('Town deleted!')
            res.sendStatus(200)
        }).catch(err => console.log('error deleting town', err))
    },

    deleteNPC: (req,res)=>{
        sequelize.query(`
        delete from npcs where npc_id = ${req.body.npc_id}`
        ).then(() => {
            console.log('NPC deleted!')
            res.sendStatus(200)
        }).catch(err => console.log('error deleting NPC', err))
    },


}


