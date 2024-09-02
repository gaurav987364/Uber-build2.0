const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51Pu9NVCR7xdE1BYxyzA2t6Br4eaRwxSwhdbCqoGIUB9H6Bfrf4PoFtGNsjejx1L2Grnh45Q46ifNvA0kG939Sjh8002d7UAO8O');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/api/create-checkout-session', async (req, res) => {
    try {
        const { product } = req.body;
         // Extract product details
         const { name, price, image, description } = product;
         console.log(price, image);
         
         // Convert price to cents (e.g., 665 for $6.65)
        //const unitAmount = Math.round(parseFloat(price) * 100)
        

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd', // Adjust as needed
                    product_data: {
                        name,
                        images: [image], // Image URL must be publicly accessible
                        description,
                    },
                    unit_amount: Math.floor(Math.random() * 60) * 100,
                },
                quantity: 1, // Adjust quantity as needed
            }],
            mode: 'payment',
            success_url: 'http://localhost:5173/success',
            cancel_url: 'http://localhost:5173/cancel'
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Stripe Error:', error.message, error.stack);
        res.status(500).json({ error: error.message });
    }
});

app.listen(7000, () => {
    console.log('Server is running on port 7000');
});
