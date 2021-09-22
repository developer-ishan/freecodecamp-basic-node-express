var express = require('express');
var app = express();
var logger = require("./logger");
console.log("Hello World");


// app.get("/", (req, res) => {
//   res.send("Hello Express")
// })
app.use(logger)
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
})

app.get("/json", (req, res) => {
  let message = "Hello json";
  if(process.env["MESSAGE_STYLE"] === "uppercase")
    message = message.toUpperCase();
  res.json({"message": message});
})

app.get("/now", 
  (req,res,next) => {
    req.time = new Date().toString();
    next()
  }, 
  (req, res) => res.json({time: req.time})
)
app.get("/:word/echo", 
  (req, res) => {
    res.json({echo: req.params.word});
  }
)

// app.get("name",
//   (req, res) => {
//     res.json({
//       name: `${req.query.first} ${req.query.last}`
//     })
//   }
// )

app.route("/name")
  .get((req, res) => {
    res.json({
      name: `${req.query.first} ${req.query.last}`
    })
  })
app.use("/public", express.static(__dirname + "/public"));



























 module.exports = app;
