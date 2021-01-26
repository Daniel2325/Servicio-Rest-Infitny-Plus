const express = require('express');
const app = express();
const Datos = require('../models/info');
const dateTime = require('node-datetime');




app.post('/caja', function(req, res) {
    let body = req.body;
    let dt = dateTime.create();
    let date = new Date()
    let fecha = dt.format('Y-m-d');
    let anio = dt.format('Y');
    let mes = dt.format('m');
    let dia = dt.format('d');
    let hora = date.getHours() + ":" + date.getMinutes()

    let info = new Datos({
        caja: body.caja,
        fecha: fecha,
        anio: anio,
        mes: mes,
        dia: dia,
        hora: hora
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
            message: 'Registro eliminado correcto'
        })
    })
})

app.get('/caja', function(req, res) {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let hasta = req.query.hasta || 5;
    hasta = Number(hasta);
    /*let fecha_inicio = req.body.aniodesde || 2020;
    fecha_inicio = Number(fecha_inicio);

    let aniohasta = req.body.aniohasta || 2021;
    aniohasta = Number(aniohasta);
*/
    
    let caja = req.body.informacion || '';

    Datos.find({}, 'caja fecha hora')
        .skip(desde)
        .limit(hasta)
        .exec((err, cajas) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                })
            }

            Datos.countDocuments({}, (err, conteo) => {
                res.json({
                    ok: true,
                    registros: conteo,
                    cajas
                })
            })
        })
})

module.exports = app