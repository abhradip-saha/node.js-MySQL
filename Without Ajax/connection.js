var mysql=require("mysql");
var con=mysql.createConnection({
    host:"127.0.0.1",
    // host:"localhost",
    user: "root",
    password:"",
    database:"student1"
});
module.exports=con;