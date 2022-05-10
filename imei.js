const express = require('express');
const bodyParser=require('body-parser');
const path=require('path');

const app=express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const staticPath=path.join(__dirname, "../public");
app.set("view engine", "hbs");

app.use(express.static(staticPath));

function sumDig(n)
    {
        let a = 0;
        while (n > 0)
        {
            a = a + n % 10;
            n = parseInt(n / 10, 10);
        }
        return a;
    }

    function isValidIMEI(n)
    {
 
        // Converting the number into
        // String for finding length
        let s = n.toString();
        let len = s.length;
 
        if (len != 15)
            return false;
 
        let sum = 0;
        for(let i = len; i >= 1; i--)
        {
          let d = (n % 10);
 
          // Doubling every alternate digit
          if (i % 2 == 0)
              d = 2 * d;
 
          // Finding sum of the digits
          sum += sumDig(d);
          n = parseInt(n / 10, 10);
        }
 
        return (sum % 10 == 0);
    }


app.get('/',function(req,res){
    res.render("welcome");
});


app.get('/api/checkimei' , (req,res)=>{
    res.sendFile(__dirname +'/LoginPage.html');
})
app.post('/api/checkimei', (req, res) => {
    
    var imeinumber = req.body.id;


if( isValidIMEI(imeinumber) )
{
		res.render('result');
}
else
{
	return res.status(400).json({ message: 'Something Went Wrong' });
}



}) 

app.listen((3000), () => {
    console.log("Server is Running at Port 3000");
})



