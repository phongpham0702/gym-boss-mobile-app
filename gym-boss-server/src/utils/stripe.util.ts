import { STRIPE_SECRET_KEY } from "@/config";
import Stripe from "stripe";

const stripe = new Stripe(STRIPE_SECRET_KEY)

async function createPaymentIntent(amount:number):Promise<String>{
    
    // create a PaymentIntent
    const paymentIntent:Stripe.PaymentIntent = await stripe.paymentIntents.create({
        amount: amount, 
        currency: 'vnd',
    });

    // Return the secret
    return paymentIntent.client_secret;
 
}

async function checkPaymentIntent(paymentIntentSecret:String){

}

export {createPaymentIntent}