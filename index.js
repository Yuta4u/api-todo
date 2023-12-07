// api/index.js
const express = require("express")
const mysql = require("mysql")
const serverless = require("serverless-http")
const app = express()

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
})

connection.connect((err) => {
  if (err) throw err
  console.log("Connected to MySQL database")
})

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.options("*", cors())

// app.post("/api/data", (req, res) => {
//   const { dataField1, dataField2 } = req.body

//   if (!dataField1 || !dataField2) {
//     res.status(400).json({ error: "Missing required fields" })
//     return
//   }

//   const insertQuery = "INSERT INTO your_table (field1, field2) VALUES (?, ?)"
//   const values = [dataField1, dataField2]

//   connection.query(insertQuery, values, (error, results, fields) => {
//     if (error) {
//       res.status(500).json({ error })
//       return
//     }
//     res.json({ success: true, insertedId: results.insertId })
//   })
// })
app.get("/v1/todos", (req, res) => {
  const sql = "select * from todos"
  db.query(sql, (err, result) => {
    if (err) throw err
    res.json({ todos: result })
  })
})

// Your Express routes and MySQL connection code here...

module.exports = app
module.exports.handler = serverless(app)
