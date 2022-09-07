import React from "react";

function ShoppingItem({ category, title, itemId, onDeleteItem }) {

    function handleClick() {
        fetch(`http://localhost:9292/shopping_items/${itemId}`, {
            method: "DELETE"
        });
        onDeleteItem(itemId)}
        
    return (
        <div className="shopping-item">
            <div className={"shopping-cat"}>{category}</div>
            <div className={"shopping-item-title"}>{title}</div>
            <button className="delete-button" onClick={handleClick}>X</button>
        </div>
    )
}

export default ShoppingItem;