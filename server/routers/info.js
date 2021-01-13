const express = require('express');
const app = express();
const Datos = require('../models/info');


app.get('/caja', function(req, res) {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let hasta = req.query.hasta || 10;
    hasta = Number(hasta);
    let requerimiento = "";
    let fechita = req.query.fecha || null;
    let horita = req.query.hora || null;
    
    if (fechita === null && horita === null) {
        requerimiento = {

        }
    }if (fechita != null && horita != null) {
        requerimiento = {
            fecha: fechita,
            hora: horita
        }
    }if (fechita != null && horita === null) {
        requerimiento = {
            fecha: fechita
        }
    }if (horita != null && fechita === null) {
        requerimiento = {
            hora: horita
        }
    }

    //console.log(solicitud);
    Datos.find(requerimiento, 'caja fecha hora')
        .skip(desde)
        .limit(hasta)
        .exec((err, cajas) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            Datos.count(requerimiento, (err, conteo) => {
                res.json({
                    ok: true,
                    registros: conteo,
                    cajas
                })
            })
        })
})

app.post('/caja', function(req, res) {
    let date = new Date()
    let body = req.body;
    let info = new Datos({
        caja: body.caja,
        fecha: date.getDate() + "/" + date.getMonth() + 1 + "/" + date.getFullYear(),
        hora: date.getHours() + ":" + date.getMinutes()
    })
    info.save((err, cajaDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            })
        } else {
            res.json({
                ok: true,
                informacion: cajaDB
            })
        }

    })
})



app.delete('/caja/:id', function(req, res) {
    let id = req.params.id;

    Datos.findByIdAndDelete(id, (err, regCajaEliminado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (regCajaEliminado === null) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Este registro no existe'
                }
            })
        }
        res.json({
            ok: true,
            usuario: regCajaEliminado
        })
    })
})

module.exports = app