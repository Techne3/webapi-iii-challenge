// code away!
require('dotenv').config();

const server = require(`./server`)



const port = process.env.PORT || 8888
// const port = 8888

server.listen(port, () => {
    console.log(`\n*****server Running on ${port}******\n`)
})
