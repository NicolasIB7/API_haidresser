const server = require('./app.ts');
import db from './db';

const PORT = 6000

db.conn.sync({force:true}).then(() => {
    console.log('DB connected');
    server.listen(PORT, ()=>{
        console.log('listening on port ' + PORT)
})

});

