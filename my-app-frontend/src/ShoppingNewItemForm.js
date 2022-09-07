import React, {useState} from "react";

function ShoppingNewItemForm({ shoppingCategories, onNewShoppingItemFormSubmit}) {
   
    const [newItemTitle, setNewItemTitle] = useState("")
    const [newItemCategoryId, setNewItemCategoryId] = useState("")
    const [newItemUserEmail, setNewItemUserEmail] = useState("")

    const categoriesWithoutAll = shoppingCategories.filter((category) => (category !== "All"))
    const options = categoriesWithoutAll.map((category) => {
        return (
            <option key={category} value={category}>{category}</option>
          )
        })

    function handleSelectedCategory(event) {
        setNewItemCategoryId(shoppingCategories.indexOf(event.target.value))
    }

    function handleTitleChange(event) {
        setNewItemTitle(event.target.value)
    }

    function handleEmailChange(event) {
        setNewItemUserEmail(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()
        fetch("http://localhost:9292/shopping_items", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: newItemTitle,
              shopping_category_id: newItemCategoryId,
              email_address: newItemUserEmail
            }),
          })
            .then((r) => r.json())
            .then((newItem) => {
                onNewShoppingItemFormSubmit(newItem);
                setNewItemTitle("");
            });
    }
   
    return (
        <div>
        <form onSubmit={handleSubmit} className="new-shopping-item-form">
            <label>
                Title: <input type="text" onChange={handleTitleChange} value={newItemTitle}></input>
            </label>
            <label>
                Email: <input type="email" onChange={handleEmailChange} value={newItemUserEmail}></input>
            </label>
                <label> Category: <select onChange={handleSelectedCategory}>
                <option value="default" selected disabled hidden>Choose a Category</option>
                        {options}
                    </select>
                </label>
            <input type="submit" value="Add Item"></input>
        </form>
        </div>
    )
    
}

export default ShoppingNewItemForm;