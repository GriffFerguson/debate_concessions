
"use client";
import addToCart from "@/app/lib/addToCart";
import "@/styles/ItemCard.css";
import { useState } from "react";

type ItemCardProps = {
    name: string,
    price: string,
    id: string
}

export default function Item(props: ItemCardProps) {
    let [clicked, setClicked] = useState(false);

    function ordered() {
        setClicked(true);
        addToCart(props.id);
        setTimeout(() => {
            setClicked(false);
        },2000)
    }

    return (
        <div className="item-card">
            <p className="name">{props.name}</p>
            <p>${props.price}</p>
            <button
                onClick={ordered}
                disabled={clicked}
            >{clicked ? "✔ Added!" : "Add to Order"}</button>
        </div>
    )
}