var express=require('express');
var app=express();

app.use(express.static(__dirname+'/public'));

app.get('/',function(req,res){
    res.sendFile('index.html');
});


app.get('/:date',function(req,res){
    var date=decodeURI(req.params.date);

    var dateRegex=/^(\w)*\s(\d){1,2},\s(\d){4}$/;

    var timestampRegex=/(\d){1,}/;


    if(dateRegex.test(date)){
        res.json({unix:Date.parse(date),date:date});
    }
    else if(timestampRegex.test(date)){
       var ts=date;
       var date=new Date(parseInt(date));
       var months={
        "01":"January",
        "02":"February",
        "03":"March",
        "04":"April",
        "05":"May",
        "06":"June",
        "07":"July",
        "08":"August",
        "09":"September",
        "10":"October",
        "11":"November",
        "12":"December",
       }
       var day=parseInt(date.getDate())+1

       var formatedDate=months[date.getMonth()+1]+' '+day+', '+date.getFullYear();

       res.json({unix:Date.parse(date),date:formatedDate});
    }else{
        res.json({unix:null,date:null});
    }


});


app.listen(3000,function(){
    console.log('Server is listening');
})

module.exports=app;