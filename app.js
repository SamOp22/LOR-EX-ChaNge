const express = require("express");
const app = express();
// const hbs=require("hbs");
const path = require("path");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
var mongoose = require("mongoose");
const { resolveSoa } = require("dns");
mongoose.connect("mongodb://localhost:27017/trying", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("successfull connection");
}).catch((error) => {
    console.log(error);
})
var sturecieveSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    rollno: {
        type: String,
        required:true,
    },
    message: {
        type: String,
        required: true,
    },
    teacher: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    month: {
        type: String,
        required: true,
    },
    dateyear: {
        type: String,
        required: true,
    }
})
// const templatepath=path.join(__dirname,'../views');
var studentSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    teacher: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    rollno: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    messagee: {
        type: String,
        required: false,
    },
    date: {
        type: String,
        required: true,
    },
    month: {
        type: String,
        required: true,
    },
    dateyear: {
        type: String,
        required: true,
    }
})
var dropboxSchema = new mongoose.Schema({
    branch: {
        type: String,
        required: true,
    },
    teacher: {
        type: String,
        required: true,
    }
})
var teacherSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cpassword: {
        type: String,
        required: true,
    }
})
var adminSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cpassword: {
        type: String,
        required: true,
    }
})
var detailSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    rollno: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cpassword: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: false,
    }
})
const Detail = mongoose.model('Detail', detailSchema);
const Studetail = mongoose.model('Studetail', studentSchema);
const Teachdetail = mongoose.model('Teachdetail', teacherSchema);
const Dropdetail = mongoose.model('Dropdetail', dropboxSchema);
const Admindetail = mongoose.model('Admindetail', adminSchema);
const Sturecievedetail = mongoose.model('sturecievedetail', sturecieveSchema);
const port = 3000;
app.set("view-engine", "egs");
app.set("views", path.join(__dirname, "views"))
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/home.html');
})
app.get("/dropdata", (req, res) => {
    res.sendFile(__dirname + '/dropdata.html');
})
app.get("/registeradmin", (req, res) => {
    res.sendFile(__dirname + '/registeradmin.html');
})
app.post("/registeradmin", (req, res) => {
    const p = req.body.password;
    const cp = req.body.cpassword;
    if (p === cp) {
        var myData = new Admindetail({
            Name: req.body.Name,
            branch: req.body.branch,
            email: req.body.email,
            dob: req.body.dob,
            phone: req.body.phone,
            username: req.body.username,
            password: p,
            cpassword: cp,
        })

    }
    // myData.Name=req.body.Name
    myData.save()
        .then(() => {
            res.send("Registered Successfully!");
        })
        .catch((error) => {
            res.send("error");
        })
})
app.post("/dropdata", (req, res) => {
    var myDropdata = new Dropdetail({
        teacher: req.body.teacher,
        branch: req.body.branch,
    });
    myDropdata.save()
        .then(() => {
            res.send("drop data saved!");
        })
        .catch((err) => {
            res.send("errrr");
        })
})
app.get("/history", (req, res) => {
    res.sendFile(__dirname + '/history.html');
})
// app.get("/teacher", (req, res) => {
//     res.sendFile(__dirname + '/teacher.html');
// })
app.get("/register", (req, res) => {
    res.sendFile(__dirname + '/register.html');
});
app.get("/login", (req, res) => {
    res.sendFile(__dirname + '/loginpage.html');
})
app.post("/register", (req, res) => {
    const p = req.body.password;
    const cp = req.body.cpassword;
    if (p === cp) {
        var myData = new Detail({
            Name: req.body.Name,
            branch: req.body.branch,
            rollno: req.body.rollno,
            email: req.body.email,
            dob: req.body.dob,
            phone: req.body.phone,
            username: req.body.username,
            password: p,
            cpassword: cp,
            year: req.body.year,
            message: " ",
            teacher: "Kavita Shelke",
        });
    }
    // myData.Name=req.body.Name
    myData.save()
        .then(() => {
            res.send("Registered Successfully!");
        })
        .catch((error) => {
            res.send("error");
        })
})
app.get("/registerteacher", (req, res) => {
    res.sendFile(__dirname + '/registerteacher.html');
})
app.post("/registerteacher", (req, res) => {
    const p = req.body.password;
    const cp = req.body.cpassword;
    if (p === cp) {
        var myDataa = new Teachdetail({
            Name: req.body.Name,
            dob: req.body.dob,
            phone: req.body.phone,
            username: req.body.username,
            password: p,
            cpassword: cp,
        });
    }
    myDataa.save()
        .then(() => {
            res.send("Registered Successfully!");
        })
        .catch((error) => {
            res.send("error");
        })
})
// Dropdetail.find({}, { branch: 1 })
//     .then((dataaa) => {
//         console.log(dataaa)
//     })
app.post('/login', (req, res) => {
    const currusername = req.body.username;
    const currpassword = req.body.password;
    const useris = Detail.findOne({ username: currusername })
        .then((data) => {
            if (data.password === currpassword) {
                var sturoll=data.rollno;
                console.log(sturoll)
                res.render('student.ejs', {
                    student1: data.Name,
                });
                
                app.get('/historystu', (req,res)=> {
                    console.log(sturoll)
                    Studetail.find({rollno:sturoll})
                    .then( (detailofstu)=> {
                        res.render('historystu.ejs', {
                            recieved : detailofstu,
                            student2:data.Name,
                        })
                    })
                    .catch ( ()=> {
                        res.send("no detail to display")
                    })
                })
                app.post('/student', (req, res) => {
                    var d = new Date();
                    var myDataa = new Studetail({
                        Name: data.Name,
                        rollno: data.rollno,
                        year: data.year,
                        message: req.body.message,
                        branch: req.body.branch,
                        teacher: req.body.teacher,
                        messagee: req.body.messagee,
                        date: d.getDate(),
                        dateyear: d.getFullYear(),
                        month: d.getMonth()
                    });
                    myDataa.save()
                        .then(() => {
                            res.send("message saved!");
                        })
                        .catch(() => {
                            res.send("error!");
                        })
                })
                app.get('/menu',(req,res)=> {
                    Sturecievedetail.find({rollno : data.rollno})
                    .then( (lor)=> {
                        console.log(lor)
                        res.render('menu.ejs', {
                            recieved : lor,
                            student1: data.Name
                        })
                    })
                    .catch( ()=>{
                        res.send("No LOR to display");
                    })
                })
            }
            else {
                res.send("invalid details");
            }
        })
        .catch((err) => {
            const teacheris = Teachdetail.findOne({ username: currusername })
                .then((dataT) => {
                    if (dataT.password == currpassword) {
                        Studetail.find({ teacher: dataT.Name })
                            .then((datastu) => {
                                res.render('teacher.ejs', {
                                    teacher1: dataT.Name,
                                    records: datastu,
                                });
                                app.get('/student_req', (req, res) => {
                                    res.render('student_req.ejs', {
                                        teacher1: dataT.Name,
                                        records: datastu,
                                    });
                                })
                                var d = new Date();
                                app.post('/student_req', (req, res) => {
                                    var myDataaT = new Sturecievedetail({
                                        Name: req.body.Name,
                                        rollno:req.body.rollno,
                                        message: req.body.messageteacher,
                                        teacher: dataT.Name,
                                        date: d.getDate(),
                                        dateyear: d.getFullYear(),
                                        month: d.getMonth()
                                    });
                                    myDataaT.save()
                                        .then(() => {
                                            res.send("message saved!");
                                        })
                                        .catch(() => {
                                            res.send("error!");
                                        })
                                })
                            })
                    }
                    else{
                        res.send("invalid details");
                    }
                })
                .catch(() => {
                    const adminis = Admindetail.findOne({ username: currusername })
                        .then((dataA) => {
                            if (dataA.password == currpassword) {
                                Studetail.find({ branch: dataA.branch })
                                    .then((datarec) => {
                                        res.render('admin.ejs', {
                                            admin1: adminis.Name,
                                            records: datarec
                                        })
                                    })
                            }
                            else {
                                res.send("invalid details");
                            }
                        })
                        .catch(() => {
                            res.send("invalid details");
                        })
                })

        })

})

// app.get('/student', (req,res)=>{
//     res.sendFile(__dirname + '/student.html');
// })
// app.post('/student' , (req,res)=>{
//     console.log(req.body.student1)
//     console.log(req.body.message)
// })

// app.get('/student_req', (req, res) => {
//     const check1 = Detail.findOne({ Name: "pratham" })
//         .then((data) => {
//             const check2 = Studetail.findOne({ message: "hello mam this is pratham shah from comp b" })
//                 .then((data2) => {
//                     res.render('student_req.ejs', {
//                         name1: data.Name,
//                         dept1: data.branch,
//                         year1: data.year,
//                         roll1: data.rollno,
//                         message1: data2.message
//                     });
//                 })
//                 .catch(() => {
//                     res.send("error");
//                 })
//         })
//         .catch((err) => {
//             console.log(err);
//         })
//     // const check2=Studetail.findOne({message:"i am"})
//     // console.log(check1.rollno);
// })

app.get('/aboutus', (req, res) => {
    res.sendFile(__dirname + '/aboutus.html')
})
app.listen(port, () => {
    // console.log(`website is running at port : ${port}`);
});
// module.export =Studetail;