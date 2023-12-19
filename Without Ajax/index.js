var con = require('./connection');
var express = require("express");
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')




app.get('/', function (req, res) {
  res.sendFile(__dirname + '/register.html');
});


app.post('/', function (req, res) {
  // console.log(req.body)
  var name = req.body.name;
  var email = req.body.email;
  var mno = req.body.mno;
  // console.log(mno)
  con.connect(function (error) {
    if (error)
      console.log(error)
    var sql = "insert into student(Name,Email,Phone) values('" + name + "','" + email + "','" + mno + "')";
    con.query(sql, function (error, result) {
      if (error)
        console.log(error)
      // res.send("Success ");
      res.redirect('/student')
    })
  })
})



app.get('/student', function (req, res) {
  con.connect(function (error) {
    if (error) {
      console.log(error)
    }
    var sql = "select * from student";
    con.query(sql, function (error, result) {
      if (error) {
        console.log(error)
      }
      // console.log(result)
      res.render(__dirname + "/students", { student: result })
    })
  })
});


app.get('/delete-student',function(req,res){
  con.connect(function (error) {
    if (error) {
      console.log(error)
    }
    var sql = "delete from student where id=?";
    var id=req.query.id;
    con.query(sql, [id],function (error, result) {
      if (error) {
        console.log(error)
      }
      // console.log(result)
      res.redirect('/student')
    })
  })
})

app.get('/update-student',function(req,res){
  con.connect(function (error) {
    if (error) {
      console.log(error)
    }
    var sql = "select * from student where id=?";
    var id=req.query.id;
    con.query(sql, [id],function (error, result) {
      if (error) {
        console.log(error)
      }
      // console.log(result)
      res.render(__dirname + "/update-student", { student: result })
    })
  })
})

app.post('/update-student',function(req,res){
  var name = req.body.name;
  var email = req.body.email;
  var mno = req.body.mno;
  var id=req.body.id;
  con.connect(function (error) {
    if (error) {
      console.log(error)
    }
    var sql = "update student set Name=?,Email=?,Phone=? where id=?";
   
    con.query(sql, [name,email,mno,id],function (error, result) {
      if (error) {
        console.log(error)
      }
      // console.log(result)
      res.redirect('/student')
    })
  })
})

app.get('/search-students',function(req,res){
  con.connect(function (error) {
    if (error) 
      console.log(error)
    
    var sql = "select * from student";
   
    con.query(sql,function (error, result) {
      if (error) {
        console.log(error)
      }
   
      res.render(__dirname + "/search-students", { student: result })
    })
  })
})

app.get('/search',function(req,res){
    var name=req.query.name;
    var email=req.query.email;
    var mno=req.query.mno;
  con.connect(function (error) {
    if (error) 
      console.log(error)
    
    var sql = "select * from student where name like '%"+name+"%' and email like '%"+email+"%'  and phone like '%"+mno+"%'" ;
   
    con.query(sql,function (error, result) {
      if (error) {
        console.log(error)
      }
   
      res.render(__dirname + "/search-students", { student: result })
    })
  })
})

app.listen(3001);