const app = require('./app');

const PORT = app.get('PORT');

app.listen(PORT, () => {
    console.log('API Running on localhost:' + PORT)
})