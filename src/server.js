const app = require('./index');
const connect = require('./config/db');


const start = async () => {
    await connect();
    app.listen(8080, () => {
        console.log("Listening the port 8080");  
    })
}
start();

