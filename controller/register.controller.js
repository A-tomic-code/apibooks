const database = require('../database')

function register(req, res) {
    let response

    let nombre = req.body.nombre;
    let apellidos = req.body.apellidos;
    let correo = req.body.correo;
    let foto = req.body.foto;
    let password = req.body.password;

    let params = [nombre, apellidos, correo, foto, password];

    let sql = `INSERT INTO usuarios (nombre, apellidos, correo, foto, password) VALUES (?, ?, ?, ?, ?)`;

    database.connect((err) => {

        if (err) {

            response = {
                error: true,
                code: 400,
                message: 'Error conecting to DB --> ' + err.message
            }

            res.send(response);

        } else {

            database.query(sql, params, (error, result) => {

                if(error){

                    response = {
                        error: true,
                        code: 400,
                        message: 'Error --> ' + error.message
                    }

                }else{

                    response = {
                        error: false,
                        code: 200,
                        message: 'User registered',
                        data: result
                    }

                }

                res.send(response);
            })

        }

    })
}

module.exports = { register };