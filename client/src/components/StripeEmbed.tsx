"use client";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { createSession } from "@/app/lib/checkout";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PUBLISHABLE_KEY!);

export default async function StripeEmbed({cart}: {cart: Array<string>}) {
    const client_secret = await createSession(cart).then(secret => secret);
    console.log(client_secret);

    return (
        <EmbeddedCheckoutProvider stripe={stripePromise} options={client_secret}>
            <EmbeddedCheckout/>
        </EmbeddedCheckoutProvider>
    )
}