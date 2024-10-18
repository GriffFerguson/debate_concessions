"use client";
import { useState } from "react";
import checkPassword from "../lib/auth";
import OrderList from "@/components/OrderList";

export default function Page() {
    const [auth, setAuth] = useState(false);
    let ws;
    
    async function authenticate(data: FormData) {
        setAuth(await checkPassword(data));
    }

    return (
        <>
            {!auth && <form action={authenticate} method="POST">
                <input type="password" placeholder="Password" name="password" />
                <input type="submit" value="Submit" />
            </form>}
            {auth && <>
                <OrderList/>
            </>}
        </>
    )
}