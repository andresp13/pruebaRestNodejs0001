const User = require('../models/user');


module.exports = function (app){

    app.get('/',(req,res)=>{

        User.getUsers((err,data) =>{
            res.status(200).json(data);
        });
    });



    app.post('/usuarios/:nombre/:cargo/:salario', (req,res)=>{

        console.log(req.body);


        const usuarioDatos ={
            /*
            id_Empleado: null,
            nombre: req.body.nombre,
            cargo: req.body.cargo,
            salario: req.body.salario
            */
            id_Empleado: null,
            nombre: req.params.nombre,
            cargo: req.params.cargo,
            salario: req.params.salario
        };

        User.insertUser(usuarioDatos, (err,data) =>{
            if(data && data.insertId){
                res.json({
                    success: true,
                    msg: 'Usuario ingresado',
                    data:data

                })
            }else{
                res.status(500).json({
                    success: false,
                    msg: 'Error al  ingreso',
                });
            }
        });
    });


    app.put('/actualizar/:id_Empleado/:nombre/:cargo/:salario', (req,res)=>{

        const userData = {

            id_Empleado: req.params.id_Empleado,
            nombre: req.params.nombre,
            cargo: req.params.cargo,
            salario: req.params.salario
            
            /*
            nombre: req.body.nombre,
            cargo: req.body.cargo,
            salario: req.body.salario
            */
        }

        User.updateUser(userData, (err,data) =>{

            if(data && data.msg){
                res.json(data);
            } else{
                res.json({
                    success: false,
                    msg: 'error'
                });
            }

        });

    });

    app.delete('/eliminar/:id',(req,res)=>{

        User.deleteUser(req.params.id, (err,data) =>{
            if(data && data.msg === 'eliminado'){
                res.json({
                    success: true,
                    data
                })
            }
            else{

                res.status(500).json({
                    msg: "Error"
                })


            }

        });
    });


}

/*
const express = require('express');
const route = express.route();

router.get('/',(req,res)=>{
    res.json([]);
});

module.exports = router;
*/

