const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
let initialPath = path.join(__dirname, "public");
let app = express();

app.use(express.static(initialPath));
app.use(express.json());
app.use(cors({
    origin: "https://127.0.0.1:5500",
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(initialPath, "index.html"))
})

app.post('/mail', (req, res) => {
    const { firstname, lastname, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    const mailOptions = {
        from: 'rathodmanoj247@gmail.com',
        to: 'rathodmanoj247@gmail.com',
        subject: 'Portfolio',
        text: `First name: ${firstname}, \nLast name: ${lastname}, \nEmail: ${email}, \nMessage: ${message}`
    }
    
    transporter.sendMail(mailOptions, (err, result) => {
        if(err){
            console.log(err);
            res.json('❗ Opps! it seems like some error occured, please try again.')
        } else{
            res.json('Email sent👍.')
        }
    })
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
})