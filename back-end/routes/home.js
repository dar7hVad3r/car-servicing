const { response } = require('express')
const cors = require('cors')
const express = require('express')
const app = express()
app.use(cors('*'))
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
    const query = `insert into schedule values(0, ${id}, '${vehicle_type}', '${s_date}', '${s_time}', '${wash}', 'pending', 'pending')`
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
            res.send({
                "status":"success",
                "data":result
            })
        }
    })
})

router.delete('/schedule/:id', (req, res)=>{
    const {id} = req.params
    const query = `delete from schedule where user_id = ${id}`
    db.query(query, (error, result)=>{
        if ( error ) res.send({"status":"failed"})
        else{
            res.send({"status":"success"})
        }
    })
})

router.get('/list', (req, res)=>{
    const query = `select u.id, u.name, u.phone, s.vehicle_type, s.s_date, s.s_time, s.wash, s.payment, s.wash_status from user u inner join schedule s on u.id = s.user_id`
    db.query(query, (error, result)=>{
        if (error) res.send({"status":"failed"})
        else{
            res.send({
                "status":"success",
                "data":result
            })
        }
    })
})

router.post('/payment/:id', (req, res)=>{
    const {payment} = req.body
    console.log(payment)
    const {id} = req.params
    const query = `update schedule set payment = '${payment}' where user_id = ${id}`
    db.query(query, (error, result)=>{
        if (error) res.send({"status":"failed", "error":error})
        else{
            res.send({"status":"success"})
        }
    })
})

router.post('/washstatus/:id', (req, res)=>{
    const {washstatus} = req.body
    const {id} = req.params
    const query = `update schedule set wash_status = '${washstatus}' where user_id = ${id}`
    db.query(query, (error, result)=>{
        if (error) res.send({"status":"failed", "error":error})
        else{
            res.send({"status":"success"})
        }
    })
})

router.get('/prices', (req, res)=>{
    const query = `select type, price from c_service`
    db.query(query, (error, result)=>{
        if (error) res.send({"status":"failed", "error":error})
        else{
            res.send({
                "status":"success",
                "data":result
            })
        }
    })
})

module.exports = router