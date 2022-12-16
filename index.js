let express = require('express');
let multer = require('multer')
let methodOverride = require('method-override')
let fs = require('fs')
let app = express()
app.set('view engine', 'ejs')
app.use(methodOverride('_method'))


//-------------------------------------Multer Upload Setting--------------------------------------------->
let upload = multer({
    //-------------------Storage Setting in Multer-------------------------------------------->
    storage: multer.diskStorage({

        destination: './public/images',        //directory (folder)/Storge setting ---- Currently Storing in Local System -- Not noe in DataBase

        filename: (req, file, cb) => {                  // file name setting
            cb(null, file.fieldname+'_'+Date.now())     
        }                               
    }),
    
    fileFilter: (req, file, cb) => {      //------- Optinal -- If want to Apply filter in Files
        if ( file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/gif') {
            cb(null, true)
        }
        else {
            cb(null, false);
            cb(new Error('Only jpeg,  jpg , png, and gif Image are allowed'))
        }
    }

})



//-----------------------------SINGALE IMAGE UPLODING--------------------------------------------->
app.post('/singlepost',upload.single('single_input_field'), (req, res)=>{    // Passing Upload Function as a Middleware with Singal Function
    let file=req.file
    res.send({msg:"Sucesfully Uploaded" ,Data:file})         // ^ Singal input ki gagah par ---- Field/ key name Ayega 
})


//-------------------------------------mULTIPLE IMAGE UPLODING---------------------------------------->
app.post('/multiplepost', upload.array('multiple_input_field', 5), (req, res) => {
    let file=req.files                               // Passing Upload Function as a Middleware With Array(Multi) Function
    res.send({msg:"Sucesfully Uploaded" ,Data:file})
})                                       // ^ multiole_input ki gagah par ---- Field/ key ka key name Ayega 



app.get('/', (req, res) => {
    res.render('index')
})

app.listen(3000, () => {
    console.log('3000 Port Working')
})