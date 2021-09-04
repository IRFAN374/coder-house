require('dotenv').config();
const express = require('express');
const router = require('../routes/route');
const dbConnect = require('../db/dbConnect');
const cors = require('cors');
const cookieParser = require('cookie-parser')

const app = express();

app.use(cookieParser())
const corsOption ={
      credentials: true,
      origin: ['http://localhost:3000']
}

app.use(cors(corsOption));
app.use('/storage', express.static('storage'));
app.use(express.json({limit:"30mb", extended: true}));
app.use(express.urlencoded({limit:"30mb", extended:true}))



app.use(router);

const PORT = process.env.PORT || 5000;


dbConnect(process.env.DB_URL);
app.listen(PORT, ()=>{
      console.log(`Server is listening: http://localhost:${PORT}`)
})
