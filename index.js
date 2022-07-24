const express = require("express");
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

const transporter = nodemailer.createTransport({
    service: 'yahoo',
    host: 'smtp.mail.yahoo.com',
    port: 465,
    secure: false,
    auth: {
        user: 'yourmail@yahoo.com',
        pass: 'yahoopassword'
        
    },
    logger: true
});

transporter.verify().then(console.log).catch(console.error);

app.get('/', (req, res) => {
    res.send("works");
});

app.get('/mail', (req, res) => {
    const data = {
        username: req.query.username, 
        mobile: req.query.mobile
    }

    let mailOptions = {
        from: 'shaklin_s@yahoo.com',
        to: 'shaklin.syed@gmail.com',
        subject: "Shaklin, Wellthy Angular Assignment",
        text: JSON.stringify(data)
    };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.send({ status: false});
        } else {
          console.log('Email sent: ' + info.response);
          res.send({ status: true});
        }
    });
    
})

app.post('/', (req, res) => {
    res.send({ done: true});
});

app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening on port ${port}`)
})