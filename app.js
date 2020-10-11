var express = require("express"),
    app     = express(),
    path    = require("path"),
    bodyParser = require('body-parser');
    url = require('url');
    require('dotenv').config();


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
    
    let url = "http://www.omdbapi.com/?t="+movie+"&apikey="+api+"&plot=full";
    

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
