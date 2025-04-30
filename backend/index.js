const path = require('path')
const express = require("express")
const cors = require('cors')
const dbConnect = require('./utils/db.js')
const userRouter = require('./router/user.router.js')
const listingRouter = require('./router/listing.router.js');
const upload = require('./middleware/fileUpload.middleware.js')


// for dotenv
require('dotenv').config();

// // create application/x-www-form-urlencoded parser
// const urlencodedParser = bodyParser.urlencoded()


const app = express()
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// router.put('/:id', verifyToken,urlencodedParser,updateListing);




app.get("/",(req,res)=>{
    res.send("Welcome to my blog")
})

app.post("/",upload.single('myImage'), (req, res)=>{
    // console.log(req)
    console.log(req.file)
    res.send("Okay");
})

// app.use(userRouter)
app.use("/users", userRouter)
app.use('/listings', listingRouter);


app.listen(PORT , function(){
    console.log(`Server is running at http://localhost:${PORT}`)
    dbConnect();
})