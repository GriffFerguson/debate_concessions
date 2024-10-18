import React from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import StripeEmbed from "@/components/StripeEmbed";

export default function Page() {
    const cookieStore = cookies();
    let cart;

    if (cookieStore.get("cart")) {
        cart = JSON.parse(cookieStore.get("cart")!.value) as Array<string>;
    } else {
        redirect("/");
    }


    return (
        <main>
            <StripeEmbed cart={cart} />
        </main>
    )
}