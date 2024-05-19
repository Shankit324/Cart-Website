import React, { useState, useEffect } from 'react'
import "./Cart.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function Cart(props) {
    let arr1 = props.arr;
    function Create(name, price) {
        this.product = name;
        this.price = price;
        this.quantity = 0;
    }
    const [total, setTotal] = useState(0);
    const [newarr, setNewarr] = useState([]);
    if (arr1.length !== newarr.length) {
        arr1.forEach((val) => {
            let obj = new Create(val.product, val.price);
            let i = 0;
            newarr.forEach((val) => {
                if (val.product === obj.product) i++;
            })
            if (i === 0) setNewarr([...newarr, obj])
        });
    }
    useEffect(() => {
        setTotal(0);
        let sum = 0;
        newarr.forEach((val) => {
            sum += ((val.price) * (val.quantity))
        })
        setTotal(sum);
    }, [newarr])
    function set(val, val3) {
        let arr2 = newarr.filter((val2) => {
            if (val2.product === val.product) {
                val2["quantity"] = String(val3);
                return val2;
            }
            return val2;
        });
        setNewarr(arr2)
    }
    function Delete(val) {
        arr1 = arr1.filter(val1 => (val1.product !== val.product))
        setNewarr(newarr.filter(val1 => (val1.product !== val.product)));
    }
    return (
        <main id="m1">
            {
                (props.arr.length === 0) ? <h5 id="h"><b>Product list is empty...</b></h5> : <ol>{arr1.map((val, i) => {
                    return (<li key={i} id={val.product}><div id='d'>
                        <div>
                            <div><b>Name of produt: </b>{val.product}</div>
                            <div><b>Price: </b>{val.price}</div>
                            <div>
                                <button type="button" className="btn btn-danger" onClick={(e) => {
                                    e.preventDefault();
                                    if (parseInt(document.getElementById("button" + String(i)).textContent) > 0) {
                                        let val3 = (parseInt(document.getElementById("button" + String(i)).textContent));
                                        val3--
                                        document.getElementById("button" + String(i)).textContent = String(val3);
                                        set(val, val3);
                                    }
                                }}>-</button>
                                <button id={"button" + String(i)} type="button" className="btn btn-warning">0</button>
                                <button type="button" className="btn btn-success" onClick={(e) => {
                                    e.preventDefault();
                                    if (parseInt(document.getElementById("button" + String(i)).textContent) >= 0) {
                                        let val3 = (parseInt(document.getElementById("button" + String(i)).textContent));
                                        val3++
                                        document.getElementById("button" + String(i)).textContent = String(val3);
                                        set(val, val3);
                                    }
                                }}>+</button>
                            </div>
                        </div>
                        <button id="del" type="button" className="btn btn-dark" onClick={(e) => {
                            e.preventDefault();
                            Delete(val);
                            document.getElementById(val.product).remove();
                        }}>Delete</button>
                    </div></li>)
                })}</ol>
            }
            <form action="/cart" method="POST">
                <div><label for="disabled-input"><b>TOTAL AMOUNT IS: Rs. </b></label><input type="text" id="t" name="val" value={total} /></div>
                <button id="btn" type="submit" onClick={async () => {
                    try {
                        const response = await fetch('/cart', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(newarr) 
                        });

                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }

                        const result = await response.json();
                        console.log('Success:', result);
                    } catch (error) {
                        console.error('Error:', error);
                    }
                }}><b><i>GO TO CART</i></b></button>
            </form>
        </main>
    )
}
