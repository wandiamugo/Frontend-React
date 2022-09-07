import React from "react";
import ShoppingItem from "./ShoppingItem";
import ShoppingCategoryFilter from "./ShoppingCategoryFilter";
import ShoppingNewItemForm from "./ShoppingNewItemForm";



function ShoppingList ({onDeleteItem, items, shoppingCategories, categoryNames, selectedCategory, onCategorySelected, onNewShoppingItemFormSubmit}) {

    const shoppingElements = items.map((item) => {
        const categoryId = item.shopping_category_id
        return (
            <ShoppingItem 
                title={item.title}
                key={item.title}
                category={categoryNames[categoryId]}
                onDeleteItem={onDeleteItem}
                itemId={item.id}
                className={item}
            />
        )
    })

    return (
        <div>
            <ShoppingNewItemForm shoppingCategories={categoryNames} onNewShoppingItemFormSubmit={onNewShoppingItemFormSubmit} />
            <br></br>
            <ShoppingCategoryFilter shoppingCategories={categoryNames} selectedCategory={selectedCategory} onCategorySelected={onCategorySelected} />
            <div>{shoppingElements}</div>
        </div>
        )
}

export default ShoppingList;