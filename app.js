var express = require("express"),
    app     = express(),
    path    = require("path"),
    bodyParser = require('body-parser');
    url = require('url');
    require('dotenv').config();

    const axios = require('axios');
// var request= require('request');
// var Insta = require('instamojo-nodejs');
// // Insta.setKeys('e6803a9ac4edcb6e61ef95bd0aa61427','ce5969c8bf1e754f966d19adb29e2c08');



    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.use(express.static('public'))
    app.set('view engine', 'ejs')
    app.set('views', path.join(__dirname, 'views'))
    app.use(express.static(path.join(__dirname, 'views')))
    
    const fetch = require('node-fetch');

    app.get('/',(req,res)=>{
        
        res.redirect('/index');

        
    });

app.post('/pay',(req,res) =>{
    var name = req.body.name;
    var email = req.body.email;
    var purpose = req.body.purpose;
    var amount = req.body.amount;
//     var data = new Insta.PaymentData();
 
//     data.purpose = purpose            // REQUIRED
//     data.amount = amount                  // REQUIRED
//     data.email = email
//     data.buyer_name   = name
//     data.currency = 'INR';
//     data.phone = 9674561602;
//     data.send_sms= true;
//     data.send_email= true;
//     data.redirect_url= 'http://www.google.com';
    
    
//     Insta.createPayment(data, function(error, response) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log(response);
//     }
//     });
    var headers = { 'X-Api-Key': 'e6803a9ac4edcb6e61ef95bd0aa61427', 'X-Auth-Token': 'ce5969c8bf1e754f966d19adb29e2c08'}
    var payload = {
            purpose: purpose,
            amount: amount,
            buyer_name: name,
            redirect_url: 'http://moviess-reviewss.herokuapp.com/form',
            send_email: true,
            email: email,
            allow_repeated_payments: false
    }
    console.log(payload);
    axios.post('https://www.instamojo.com/api/1.1/payment-requests/', {form: payload,  headers: headers}).then (function(response, body){
    if(response.statusCode == 201){
    console.log(body);
  }
})
        .catch(function (error) {
    console.log(error);
  });
})

app.post('/getid',(req,res)=>{
        
        var buyer= req.body.email;
        var status= req.body.status;
        var id = req.body.payment_id;
        console.log(buyer,status,id);
        console.log(req.body);
        res.send(buyer,status);

        
    });

    app.get('/index',(req,res)=>{
        res.render('index.ejs');
    })

    app.post('/result',(req,res)=>{
    
    var movie= req.body.movie;
    api= process.env.API_KEY;
    
    let url = "http://www.omdbapi.com/?t="+movie+"&apikey=df123052&plot=full";
    

    let settings = { method: "Get" };
    fetch(url, settings)
    .then(res => res.json())
    .then((result) => {

        res.render('result.ejs',{data:result});
        
        
    });

        
    });
    

    app.get('/form',(req,res) =>{
        res.render('form.ejs');
    })
        
    
   var port = process.env.PORT || 3000
    app.listen(port, () => {
    console.log(`Server live at port: ${port}`)
    })
