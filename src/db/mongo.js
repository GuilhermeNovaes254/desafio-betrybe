const mongoose = require("mongoose");
require('dotenv').config()
// const uri = `mongodb://localhost:27017/${process.env.DB_MONGO_NAME}` //For local tests
const uri = `${process.env.DB_URL}${process.env.DB_NAME}` 

module.exports = () => {
   // DB Connection
   // mongoose.connect(environment.db.url, { useNewUrlParser: true })
   mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
       console.log("Connected to MongoDB") 
    });

   // Evento de erro do mongoose
   mongoose.connection.on("error", (e) => {
      console.log(`db: mongodb error ${e}`, "DB");
   });

   // Evento ativado quando o banco de dados é conectado
   mongoose.connection.on("connected", () => {
      console.log(`db: mongodb is connected: ${uri}`, "DB");
   });

   // Evento ativado quando o banco de dados é desconectando
   mongoose.connection.on("disconnecting", () => {
      console.log("db: mongodb is disconnecting!!!", "DB");
   });

   // Evento ativado quando o banco de dados é desconectado
   mongoose.connection.on("disconnected", () => {
      console.log("db: mongodb is disconnected!!!", "DB");
   });

   // Evento ativado quando o banco de dados é reconectado
   mongoose.connection.on("reconnected", () => {
      console.log(`db: mongodb is reconnected: ${uri}`, "DB");
   });

   // Evento ativado quando ocorre timeout na conexão com o banco
   mongoose.connection.on("timeout", (e) => {
      console.log(`db: mongodb timeout ${e}`, "DB");
   });
};