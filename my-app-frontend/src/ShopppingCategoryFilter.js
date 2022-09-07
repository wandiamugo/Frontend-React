import React from "react";


function ShoppingCategoryFilter({ shoppingCategories, selectedCategory, onCategorySelected }) {
    
    const categoryButtons = shoppingCategories.map((category) => {
        const className = (category === selectedCategory ? "selected" : null)
        return (<button
            key={category}
            onClick={() => (onCategorySelected(category))}
            className={className}
            >
          {category}
          </button>)
    })
    return <div> {categoryButtons} </div>   
}

export default ShoppingCategoryFilter;