var app=require('./app');


app.get('/',function(req,res){
    res.sendFile('index.html');
});


app.get('/:date',function(req,res){
    res.json({date:req.params.date});
})