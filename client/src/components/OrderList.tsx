import React, { useState } from "react";

type OrderProps = {
    name: string,
    table: string,
    school: string,
    items: Array<string>,
    id: string
}

export default function OrderList() {
    let cards: Array<React.ReactNode> = [];
    
    setInterval(() => {
        fetch("https://api.stratfordtourney.griffsvoid.org/order_list")
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            data.map((order: OrderProps) => {
                cards.push(
                    <OrderCard
                        name={order.name}
                        school={order.school}
                        id={order.id}
                        items={order.items}
                        table={order.table}
                    />
                )
            })
        })
    }, 10000)

    return (
        <div id="order-card-wrapper">
            {cards}
        </div>
    )
}

function OrderCard (props: OrderProps) {
    const [hide, setHide] = useState(false);
    let items: Array<React.ReactNode> = [];
    
    props.items.map((item) => { 
        items.push(<li>{item}</li>)
    })

    function complete() {
        fetch("https://api.stratfordtourney.griffsvoid.org/complete", {
            method: "POST",
            body: props.id
        })
    }

    return (
        <div className="order-card" key={props.id} style={{display: hide ? "none" : "block"}}>
            <p><b>Name:</b> {props.name}</p>
            <p><b>School: </b> {props.school} (table {props.table})</p>
            <p><b>Item{props.items.length > 1 ? "s" : ""} ordered:</b></p>
            <ul>{items}</ul>
            <p><a href="#" onClick={complete}>Click to complete order</a></p>
        </div>
    )
}