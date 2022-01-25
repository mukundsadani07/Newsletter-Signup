const express = require("express");
const bodyParser = require("body-parser");
const request = require("request"); 
const https = require("https");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
 
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  // console.log(firstName, lastName, email);
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        },

      }
    ]
  };
  
  const jsonData = JSON.stringify(data);
  const url = 'https://us20.api.mailchimp.com/3.0/lists/ab2f30a555';
  
  const options = {
    method: "POST",
    auth: "mukundsadani_:988abe609937e01b4034c2a163933053-us20",
  }
  // var isOk = true;
  const request = https.request(url,options,function(response){
    console.log(response.statusCode);

    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }else{
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })
  // res.send();
  request.write(jsonData);
  request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started at port 3000");
});


//API Key
// 988abe609937e01b4034c2a163933053-us20

//Audience ID
//ab2f30a555