const database = require('../database')

function login(req, res){
    let response;

    let username = req.body.nombre;
    let password = req.body.password;

    let sql = `SELECT * FROM usuarios WHERE (nombre = ? && password = ?)`;
    let params = [username, password];

    database.connect( (err) =>{
        if (err){

            response = {
                error : true,
                code : 400,
                message : 'Error connecting to DB --> ' + err.message
            }
            
            res.send(response)
        }else{

            database.query(sql, params, (error, result) => {
                
                if(error){

                    response = {
                        error: true,
                        code: 400,
                        message: 'Error --> ' + err.message
                    }

                    res.send(response)

                } else {

                    if(result.length > 0){
                        
                        response = {
                            error: false,
                            code: 400,
                            message: 'Auth OK',
                            data: result
                        }

                    }else{

                        response = {
                            error: false,
                            code: 400,
                            message: 'Auth FAIL',
                        }

                    }

                    res.send(response)
                }
            });
        }
    });
}

module.exports = {login}