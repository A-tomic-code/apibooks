const database = require('../database');


function getLibro(req, res) {
    let response;
    
    let sql;
    
    if(req.query.id_libro && req.query.id_usuario){
        sql = 
        `SELECT * FROM libros
        WHERE (id_libro = ${req.query.id_libro} && id_usuario = ${req.query.id_usuario})`
    }else if (req.query.id_libro) {
        sql = `SELECT * FROM libros WHERE (id_libro = ${req.query.id_libro})`
    }else if (req.query.id_usuario){
        sql = `SELECT * FROM libros WHERE (id_usuario = ${req.query.id_usuario})`;
    }else {
        sql = `SELECT * FROM libros`;
    }
    
    console.log(sql)


    database.connect( (error) => {
        if (error) {

            response = {
                error: true,
                code: 400,
                message: 'Error connecting to DB --> ' + err.message
            }

            res.send(response);

        } else {
            
            database.query(sql, (error, result) => {
                if (error) {

                    response = {
                        error: true,
                        code: 400,
                        message: 'Error --> ' + error.message
                    }

                    res.send(response);

                } else {
                    
                    response = {
                        error: false,
                        code: 200,
                        message: 'COLLECTION OK !',
                        data: result
                    }

                    res.send(response);

                }
            });
        }
    });
}

function postLibro(req, res) {
    let response;

    let id_usuario = req.body.id_usuario;
    let titulo = req.body.titulo;
    let tipo = req.body.tipo;
    let autor = req.body.autor;
    let precio = req.body.precio;
    let foto = req.body.foto;

    const sql =
        `INSERT INTO libros (id_usuario, titulo, tipo, autor, precio, foto)
        VALUES (?, ?, ?, ?, ?, ?)`;

    const params = [id_usuario, titulo, tipo, autor, precio, foto];

    database.connect((err) => {

        if (err) {

            response = {
                error: true,
                code: 400,
                message: 'Error connecting to DB --> ' + err.message
            }

            res.send(response)

        } else {

            database.query(sql, params, (error, result) => {

                if (error) {

                    response = {
                        error: true,
                        code: 400,
                        message: 'Error --> ' + error.message
                    }

                    res.send(response)

                } else {

                    response = {
                        error: false,
                        code: 400,
                        message: 'INSERTION OK',
                        data: result
                    }
                    
                    res.send(response)

                }

            })
        }

    });
}

function putLibro(req, res){
    let response;
    
    let sql = `UPDATE libros SET`

    if (req.body.titulo) {
        sql += ` titulo = '${req.body.titulo}',`
    }
    
    if (req.body.tipo) {
        sql += ` tipo = '${req.body.tipo}',`
    }
    
    if (req.body.autor) {
        sql += ` autor = '${req.body.autor}',`
    }
    
    if (req.body.precio) {
        sql += ` precio = ${req.body.precio},`
    }
    
    if (req.body.foto) {
        sql += ` foto = '${req.body.foto}',`
    }

    sql = sql.slice(0, -1)

    sql += ` WHERE (id_libro = ${req.body.id})`
    console.log(sql);
    
    database.connect( (err) => {

        if (err) {

            response = {
                error: true,
                code: 400,
                message: 'Error connecting to DB --> ' + err.message
            }

            res.send(response);

            } else { 

                database.query(sql, (error, result) => {

                    if(error){

                        response = {
                            error: true,
                            code: 400,
                            message: 'Error --> ' + error.message
                        }

                        res.send(response)

                    } else {

                        response = {
                            error: false,
                            code: 200,
                            message: 'MODIFICATION OK ! ',
                            data: result
                        }

                    }

                    res.send(response)
                });
            }
        }
    );
}

function deleteLibro(req, res){
    let response

    let sql = `DELETE FROM libros WHERE (id_libro = ${req.body.id})`;
    console.log(sql)
    
    database.connect( (err) => {
        if (err) {

            response = {
                error: true,
                code: 400,
                message: err.message,
            }

            res.send(response);

        } else {

            database.query(sql, (error, result) => {

                
                if (error){

                    response = {
                        error: true,
                        code: 400,
                        message: 'ERROR --> ' + error.message,
                        data: result
                    }

                }else{

                    response = {
                        error: false,
                        code: 200,
                        message: 'DELETION OK !',
                        data: result
                    }

                }

                res.send(response);
            })
        }
    })

}
module.exports = { getLibro, postLibro, putLibro, deleteLibro }    