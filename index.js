import dotenv from 'dotenv';
import express from 'express';
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import ribbonsRoute from './routes/ribbons.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import Stripe from "stripe";




const app = express()
dotenv.config()

const connect = async() =>{
try{
    await mongoose.connect(process.env.MONGO,{ useNewUrlParser: true });
    console.log('connected to mongoDB.')
} catch (error) {
  throw error

}
};

mongoose.connection.on('disconnected',()=>{
    console.log('mongoDB disconnected!')
})

//middle ware 
app.use(cors());
app.use(cookieParser())
app.use(express.json());



app.use('/api/auth',authRoute);
app.use('/api/users',usersRoute);
app.use('/api/ribbons',ribbonsRoute);


app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
   return res.status(errorStatus).json({
    success:false,
    status:errorStatus,
    message:errorMessage,
    stack:err.stack,
   })

})

app.post("/api/payment", cors(), async (req, res) => {
	let { amount, id } = req.body
	try {
		const stripe = new Stripe(process.env.STRIPE_SECRET_TEST);
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			description: "purchase",
			payment_method: id,
			confirm: true,

        
		})
		console.log("Payment:", payment)
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error:", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})

app.listen(3001,()=>{
    connect()
    console.log("connect to the backend!")
})
