var express = require("express"),
    app     = express(),
    path    = require("path"),
    bodyParser = require('body-parser');
    url = require('url');
    require('dotenv').config();
var request= require('request');
var Insta = require('instamojo-nodejs');
Insta.setKeys('e6803a9ac4edcb6e61ef95bd0aa61427','ce5969c8bf1e754f966d19adb29e2c08');
Insta.isSandboxMode(true);


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
    var data = new Insta.PaymentData();
 
    data.purpose = purpose            // REQUIRED
    data.amount = amount                  // REQUIRED
    data.email = email
    data.buyer_name   = name
    
    
    Insta.createPayment(data, function(error, response) {
    if (error) {
        console.log(error);
    } else {
        console.log(response);
    }
    });
//     var headers = { 'X-Api-Key': 'e6803a9ac4edcb6e61ef95bd0aa61427', 'X-Auth-Token': 'ce5969c8bf1e754f966d19adb29e2c08'}
//     var payload = {
//             purpose: purpose,
//             amount: amount,
//             buyer_name: name,
//             redirect_url: 'http://www.google.com',
//             send_email: true,
//             webhook: 'http://www.example.com/webhook/',
//             email: email,
//             allow_repeated_payments: false
//     }
//     console.log(payload);
//     request.post('https://www.test.instamojo.com/api/1.1/payment-requests/', {form: payload,  headers: headers}, function(error, response, body){
//   if(!error && response.statusCode == 201){
//     console.log(body);
//   }
// })
})

app.get('/form',(req,res)=>{
        
        res.render('form.ejs');

        
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
    


        
    
   var port = process.env.PORT || 3000
    app.listen(port, () => {
    console.log(`Server live at port: ${port}`)
    })
