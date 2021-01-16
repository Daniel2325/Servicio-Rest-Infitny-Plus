const express = require('express');
const app = express();
const Datos = require('../models/info');




app.post('/caja', function(req, res) {
    let body = req.body;
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

    let hasta = req.query.hasta || 20;
    hasta = Number(hasta);
    let fecha_inicio = req.body.aniodesde || 2021;
    fecha_inicio = Number(fecha_inicio);


    let requerimientos = req.body.requerimientos || '';

    Datos.find({requerimientos:caja,anio:fecha_inicio}, 'caja fecha hora')
        .skip(desde)
        .limit(hasta)
        .exec((err, cajas) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            Datos.count({requerimientos:caja,anio:fecha_inicio}, (err, conteo) => {
                res.json({
                    ok: true,
                    registros: conteo,
                    cajas
                })
            })
        })
})

module.exports = app