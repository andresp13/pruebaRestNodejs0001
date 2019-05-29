const mysql = require('mysql');

connection = mysql.createConnection({

    host: 'instancia001.c8flsbeb0huq.us-east-2.rds.amazonaws.com',
    user: 'root',
    password: '38eh2129wiq',
    database: 'db_empleado'

    /*
    host: 'localhost',
    user: 'root',
    password: '123456SD',
    database: 'db_empleado'
    */
});

let userModel = {};

userModel.getUsers = (callback) => {

    if (connection)
    {
        connection.query('Select * from tbl_empleado', (err,rows) =>{
            if (err)
            {
                throw err;
            }else{
                callback(null,rows);
            }
        })
    }
};

userModel.insertUser = (userData, callback) => {

    if (connection){
        connection.query('INSERT INTO tbl_empleado SET ?', userData, (err,result) =>{
            if(err){
                throw err;
            }
            else{
                callback(null,{
                    'insertId': result.insertId
                })
            }
        })
    }
};

userModel.updateUser = (userData, callback) =>{

    if (connection){

        const sql = `UPDATE tbl_empleado SET 
        nombre =  ${connection.escape(userData.nombre)}, 
        cargo = ${connection.escape(userData.cargo)}, 
        salario = ${connection.escape(userData.salario)} 
        where id_Empleado = ${connection.escape(userData.id_Empleado)}
        `
        connection.query(sql, (err,result) =>{
            if(err){
                throw err;
            }
            else{
                callback(null,{
                    "msg": "success"
                });
            } 
        })
    }
};

userModel.deleteUser = (id_Empleado, callback) =>{
    
    if (connection){

        sql = `DELETE FROM tbl_empleado WHERE id_Empleado = ${id_Empleado}`;

        connection.query(sql,(err,result) =>{
            if(err){
                throw err;
            }
            else{
                callback(null,{
                    "msg": "eliminado"
                });
            } 
        })
    }
};



module.exports = userModel;