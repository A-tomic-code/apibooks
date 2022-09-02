function errorHandling(err, req, res, next){
    res.status(500).json({
        mesasge : err.mesasge
    });
}

module.exports = errorHandling;