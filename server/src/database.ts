import {Sequelize, DataTypes} from "sequelize";

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: '../db.sqlite'
});

//To initialize the database
export default async function start(){
	try {
		await sequelize.authenticate();
		console.log("Connected to the database");
		return true;
	} catch {
		console.log("Cannot connect to database")
		return false;
	}
}

//To access the database models from other modules
export const dbmodels = {
	User: sequelize.define('User', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false
		},
		gender: {
			type: DataTypes.STRING,
			allowNull: false
		},
		age: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}),


	Review: sequelize.define('Review', {
		author: {
			type: DataTypes.STRING,
			allowNull: false
		},
		rate: {
			type: DataTypes.FLOAT,
			allowNull: false
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		game_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	})
}

//Syncing and dropping previous models
sequelize.sync({ force: true });
