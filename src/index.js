const express = require('express');

const { ServerConfig } = require('./config');

const apiRoutes = require('./routes');
const serverConfig = require('./config/server-config');
const mailsender = require('./config/email-config');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);


    const response = await mailsender.sendMail({
        from:serverConfig.GMAIL_EMAIL,
        to: "cmpn2----019@gmail.con", 
        subject: "mail testing",
        text: "kya haal bhai k", 
       
      });
      console.log(response);
});
