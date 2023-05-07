const express = require('express');
const path = require("path");
const cors = require('cors')
// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
const dataRouter = require('./routes/data')
const anotherDataRouter = require('./routes/allPokemon')

// const getDataRouter= require("./routes/getData")

const PORT = 5000;
const app = express();

// const anotherdata = async () => {
//     return 'hey how are you'
// }


// middleware
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));




// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/getData', getDataRouter);
// app.use('/getData2', getDataRouter2);
app.use('/data', dataRouter)
app.use('/anotherdata', anotherDataRouter);
// app.use('/anotherdata', anotherdata());


app.listen(PORT || 5000, () => console.log(`Any Port:${PORT} in a S T O R M !!`))

module.exports = app;
