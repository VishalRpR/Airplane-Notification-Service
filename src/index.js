const express = require('express');
const amqplib=require('amqplib')

async function connectQueue(){
    try {

        const connection=await amqplib.connect("amqp://localhost");
       
        const channel = await connection.createChannel();
        await channel.assertQueue("noti-queue");
        channel.consume("noti-queue",async(data)=>{
            console.log(`${Buffer.from(data.content)}`);
        })
        
    } catch (error) {
        
        
    }
}





const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    await connectQueue();
    console.log("queue is up")
});
