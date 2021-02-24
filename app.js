const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
res.sendFile(__dirname +"/signup.html");
});

app.post("/",function(req,res){
	const fname1=req.body.fname;
	const lname1=req.body.lname;
	const email=req.body.email;
    console.log(fname1,lname1,email);
	
	const data={
		members: [
         {
         	email_address: email,
         	status: "subscribed",
         	merge_fields: {
         		FNAME: fname1,
         		LNAME: lname1
         	}
         }
		]
	};
	const jsonData = JSON.stringify(data);

	const url="https://us1.api.mailchimp.com/3.0/lists/688a16015f";
    const options={
    	method: "POST",
    	auth:"sp:c0538c6f6247f425a004212901da77f0-us1"
    }
	const request=https.request(url,options, function(response){
	if(response.statusCode==200){
		res.sendFile(__dirname+"/success.html");
	}else{
		res.sendFile(__dirname+"/failure.html");
	}
    response.on("data",function(data){
    console.log(JSON.parse(data));	
    });
	});
	request.write(jsonData);
	request.end();
});

 app.post("/failure",function(req,res)
 {
 	res.redirect("/");
 });


app.listen(process.env.PORT||3000,function(){
	console.log("my server is running on port 3000");
});

//c0538c6f6247f425a004212901da77f0-us1
//688a16015f
