var express=require('express');
var app=express();

app.use(express.static(__dirname+'/public'));
app.set('view engine','ejs');

app.get('/',function(req,res){
    res.render('index',{hostname:req.headers.host});
});


app.get('/:date',function(req,res){
    var date=decodeURI(req.params.date);

    var dateRegex=/^(\w)*\s(\d){1,2},\s(\d){4}$/;

    var timestampRegex=/(\d){1,}/;


    if(dateRegex.test(date)){
        res.json({unix:Date.parse(date),natural:date});
    }
    else if(timestampRegex.test(date)){
       var ts=date;
       var date=new Date(parseInt(date));
       var months={
        "1":"January",
        "2":"February",
        "3":"March",
        "4":"April",
        "5":"May",
        "6":"June",
        "7":"July",
        "8":"August",
        "9":"September",
        "10":"October",
        "11":"November",
        "12":"December",
       }
       var day=parseInt(date.getDate());

       var formatedDate=months[date.getMonth()+1]+' '+day+', '+date.getFullYear();

       res.json({unix:Date.parse(date),natural:formatedDate});
    }else{
        res.json({unix:null,date:null});
    }


});


app.listen(3000,function(){
    console.log('Server is listening');
})

module.exports=app;