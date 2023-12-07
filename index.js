// api/index.js
const express = require("express")
const mysql = require("mysql")
const bodyParser = require("body-parser")
const cors = require("cors")
const serverless = require("serverless-http")
const app = express()

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
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

app.post("/api/v1/todos", (req, res) => {
  const { title, deskripsi, date, check } = req.body
  const sql = "insert into todos (title, deskripsi, date) VALUES (?, ?, ?)"
  db.query(sql, [title, deskripsi, date], (err, result) => {
    if (err) throw err
    res.status(201).json({ msg: "Berhasil post todos" })
  })
})

const port = process.env.DB_PORT || 3001
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
module.exports = app
module.exports.handler = serverless(app)
