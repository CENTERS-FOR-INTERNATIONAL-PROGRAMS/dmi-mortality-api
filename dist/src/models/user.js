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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importDefault(require("express"));
const config = __importDefault(require("../../config"));
const userRoutePath = __importDefault(require("../routes/userRoutes"));
const cors = __importDefault(require("cors"));
const connection = __importDefault(require("../db/connection"));
const sequelize = require('sequelize');
const mysql = require('mysql');
class Server {
    constructor() {
        this.app = (0, express.default)();
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection.default.authenticate();
                console.log('Database connected');
            }
            catch (error) {
                console.error(error, 'Error connecting to DB');
            }
        });
    }
    middlewares() {
        this.app.use((0, cors.default)());
        this.app.use(express.default.json());
        this.app.use(express.default.static('public'));
    }
    routes() {
        this.app.use('/users',userRoutePath.default);
        
    }
    listen() {
        this.app.listen(config.default.port, () => {
            console.log(`Server up and running at port: ${config.default.port}`);
        });
    }
}

/*const User = sequelize.define('User', { //column ids in database
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });*/
  
exports.default = Server;
