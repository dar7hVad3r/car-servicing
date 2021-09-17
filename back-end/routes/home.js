const { response } = require('express')
const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('', (req, res)=>{
    res.send("hello")
})

router.post('/login', (req, res)=>{
    const {email, password} = req.body;
    const query = `select * from user where email = '${email}' && password = '${password}'`
    db.query(query, (error, result)=>{
        if ( error ) res.send("failed")
        else{
            res.send({
                'status':'success',
                'data':result[0]
            })
        }
    })
})

router.post('/signup', (req, res)=>{
    const {name, email, password, phone, address} = req.body
    const query = `insert into user values(0, '${name}', '${email}', '${password}', '${phone}', '${address}', 'user')`
    db.query(query, (error, result)=>{
        if (error) res.send({"status":"failed"})
        else res.send({"status":"success"})
    })
})

router.delete('/user/:id',(req, res)=>{
    const {id} = req.params
    let query = `delete from schedule where user_id = '${id}'`
    db.query(query, (error, result)=>{
        query = `delete from user where id = '${id}'`
        db.query(query, (error, result)=>{
            if (error) res.send({"status":"failed"})
            else res.send({"status":"success"})
        })
    })
})

router.post('/schedule/:id', (req, res)=>{
    const {id} = req.params
    const {vehicle_type, s_date, s_time, wash} = req.body
    const query = `insert into schedule values(0, ${id}, '${vehicle_type}', '${s_date}', '${s_time}', '${wash}')`
    db.query(query, (error, result)=>{
        if(error) res.send({"status":"failed"})
        else{
            res.send({"status":"success"})
        }
    })
})

router.get('/schedule/:id', (req, res)=>{
    const {id} = req.params
    const query = `select * from schedule where user_id = ${id}`
    db.query(query, (error, result)=>{
        if(error) res.send({"status":"failed"})
        else{
            res.send({"status":result[0]})
        }
    })
})

module.exports = router