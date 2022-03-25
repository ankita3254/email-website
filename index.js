const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https =require("https");
const { request } = require("express");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname  + "/new.html");
})

app.post("/",function(req,res){
    var name = req.body.name;
    var email = req.body.email;
    res.send("name is " + name + " and email is " + email);

    const data ={
        members :[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:name
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);
    const url ="https://us14.api.mailchimp.com/3.0/lists/db8f577926";
    const options ={
        method :"POST",
        auth:"ankitaa:6d237f24b3f448273e9d6b61810a03b6-us14"
    }
   const request= https.request(url,options,function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
})
app.listen(process.env.PORT||566,function()=>{
    console.log(`server runs at 566`);
})

//api ke
//6d237f24b3f448273e9d6b61810a03b6-us14

//id
//db8f577926