"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbmodels = void 0;
const sequelize_1 = require("sequelize");
//Initializing database
const sequelize = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: '../db.sqlite'
});
//Database start function
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sequelize.authenticate();
            console.log("Connected to the database");
            return true;
        }
        catch (_a) {
            console.log("Cannot connect to database");
            return false;
        }
    });
}
exports.default = start;
exports.dbmodels = {
    User: sequelize.define('User', {
        role: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            defaultValue: "user"
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        gender: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        }
    })
};
//Syncing and dropping previous models
sequelize.sync({ force: true });