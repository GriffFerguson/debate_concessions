import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_KEY!, {

})

export async function createSession(items:Array<string>) {
    let checkout_items = [];
    
    for (var item of items) {
        checkout_items.push({
            price: item,
            quantity: 1
        })
    }

    const session = stripe.checkout.sessions.create({
        ui_mode: "embedded",
        line_items: checkout_items,
        mode: "payment",
        return_url: "http://localhost:3000/?success",

        custom_fields: [
            {
                key: "name",
                label: {
                    type: "custom",
                    custom: "Full name"
                },
                optional: false,
                type: "text"
            },{
                key: "school",
                label: {
                    type: "custom",
                    custom: "School"
                },
                optional: false,
                type: "text"
            }, {
                key: "table",
                label: {
                    type: "custom",
                    custom: "Table #"
                },
                optional: false,
                type: "numeric"
            }
        ]
    })

    return {clientSecret: (await session).client_secret};
}