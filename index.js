// api/index.js
const express = require("express")
const mysql = require("mysql")
const bodyParser = require("body-parser")
const cors = require("cors")
const serverless = require("serverless-http")
const { v4 } = require("uuid")
const app = express()

const db = mysql.createConnection({
  host: "b8udu00ubkpcim7ehlf2-mysql.services.clever-cloud.com",
  user: "ukql7djzzzygrdqb",
  password: "jC4Rj8oVEOjOJQhNXxkq",
  database: "b8udu00ubkpcim7ehlf2",
})

db.connect((err) => {
  if (err) throw err
  console.log("Connected to MySQL database")
})

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.options("*", cors())

app.get("/home", (req, res) => {
  res.status(200).json("Welcome, your app is working well")
})

app.get("/api/v1/todos", (req, res) => {
  const sql = "select * from todos"
  db.query(sql, (err, result) => {
    if (err) throw err
    res.json({ todos: result })
  })
})

const port = 3306 || 3001
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
module.exports = app
module.exports.handler = serverless(app)
