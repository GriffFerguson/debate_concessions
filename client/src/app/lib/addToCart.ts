"use server";
import { cookies } from "next/headers";

export default async function addToCart(id: string) {
    const cookieStore = cookies();
    let cart;
    if (cookieStore.get("cart")) {
        cart = JSON.parse(cookieStore.get("cart")!.value);
        cart.push(id);
    } else {
        cart = [id];
    }
    cookieStore.set("cart", JSON.stringify(cart));
}