const app = require('express')();
const http = require('http').Server(app);
const client = new net.Socket();
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/trying", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("successfull connection");
}).catch((error) => {
    console.log(error);
})
var arrComp=[],arrMech=[],arrElec=[],arrIT=[]
app.get('/myThing',(req,res)=>{
    const val=req.query.X;
    switch(val) {
        case "Computer" :
            
    }
});