const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { items, email } = req.body

        const transformedItems = items.map(items => ({
            quantity: 1,
            price_data: {
                currency: "inr",
                unit_amount: items.price * 100,
                product_data: {
                    name: items.title,
                    description: items.description,
                    images: [items.image],
                }
            }
        }))

        try {
            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                shipping_options: [
                    {
                        shipping_rate: 'shr_1LxQeUSCKKdvhsX0gQ3Ag3qc',
                    }
                ],
                shipping_address_collection: {
                    allowed_countries: ['GB', 'US', 'CA'],
                },
                line_items: transformedItems,
                mode: 'payment',
                success_url: `${process.env.HOST}/success`,
                cancel_url: `${req.headers.origin}/?canceled=true`,
                metadata: {
                    email,
                    images: JSON.stringify(items.map(item => item.image))
                }
            });
            res.status(200).json({ id: session.id })
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}