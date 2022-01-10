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
