import React, { useEffect, useState } from 'react';
import axios from 'axios';


var monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const Main = () => {

    const [month, setMonth] = useState();

    function getMonthName() {
        var date = new Date();
        var month = date.getMonth();
        setMonth(monthList[month])
    }

    const [data, setData] = useState([]);

    useEffect(() => {
        loadData();
        getMonthName();
    }, []);

    const loadData = () => {

        axios.get('/grocery/getAll').then((res) => {
            setData(res.data);
        }, (err) => {
            console.log(err);
        })
    }
    const [item, setItem] = useState({
        groceryItem: "",
        isPurchased: false
    });

    const inputEvent = (event) => {

        const { name, value } = event.target;
        setItem((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
    }
    const addItem = () => {

        if (item.groceryItem !== "") {
            var newNote = {
                groceryItem: item.groceryItem,
                isPurchased: item.isPurchased
            }
            axios.post('/grocery/add', newNote)

            setData((oldValue) => {
                return [...oldValue, item]
            })

            loadData();

            setItem({ ...item, groceryItem: "" })
        }
        else {
            alert('fill the data');
        }
    }

    const eventHandle = (event) => {
        event.preventDefault()
    }

    const deleteItem = (index, item) => {
        const data = {
            _id: item._id
        }
        axios.delete("/grocery/deleteGroceryItem", {data})

        setData((oldData) =>
            oldData.filter((curdata, indx) => {
                return indx !== index;
            })
        )
    }

    const updatePurchaseStatus = (item) => {

        var element = {
            _id: item._id,
            isPurchased: true
        }
        axios.put("/grocery/updatePurchaseStatus", element)

        setData(oldData =>
            oldData.map((datas) => {
                if (datas._id === item._id){
                    return {
                        ...datas, isPurchased: !datas.isPurchased
                    }
                }
                return datas;
            })
        )
    }

    return <div className="main_div">
        <nav className="nav_styling"><h1>Monthly Grocery Planning App</h1></nav>
        <div className="content_styling">
            <h1>Plan for the month of {month}</h1>
            <form className="data_insertion" onSubmit={eventHandle}>
                <input type="text" name="groceryItem" value={item.groceryItem} onChange={inputEvent} placeholder="Add Shopping Item" />
                <button className="btn" onClick={addItem}>Submit</button>
                {data.length !== 0 &&
                    <ul>
                        {data.map((item, index) => {
                            return <div className="data_styling" key={index}>
                                <li style={{ textDecoration: item.isPurchased ? "line-through" : "none" }}>{item.groceryItem}</li>
                                <div>
                                    <button onClick={() => updatePurchaseStatus(item)}>Purchased</button>
                                    <button onClick={() => deleteItem(index, item)}>X</button>
                                </div>
                            </div>
                        })}
                    </ul>}
            </form>
        </div>
    </div>
}

export default Main

