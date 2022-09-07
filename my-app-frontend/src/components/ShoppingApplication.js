import React, {useState, useEffect, useContext} from "react"
import { UserContext } from "./UserContext";
import ShoppingList from "./ShoppingList"
import "./ShoppingApplication.css"

function ShoppingApplication() {
    const [items, setItems] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [shoppingCategories, setShoppingCategories] = useState([])
    const [categoryNames, setCategoryNames] = useState([])
    const {user, setUser} = useContext(UserContext);

    useEffect(() => {
        fetch("http://localhost:9292/shopping_items")
          .then((r) => r.json())
          .then(function(data) {
            
            setItems(data.filter((item) => (item.user_id === user.id)))});
      }, []);
    
   
      useEffect(() => {
        fetch("http://localhost:9292/shopping_categories")
          .then((r) => r.json())
          .then(function(data) {
            setShoppingCategories(data)
            const categories_arr = data.map(e => e.name)
            categories_arr.unshift("All")
            setCategoryNames(categories_arr)});
      }, []);
      

    function handleDeleteItem(key) {
        setItems(items.filter((element) => (element.id !== key)))
    }
    
    function handleCategorySelected(category) {
        setSelectedCategory(category)
    }

    function addNewItem(newItem) {
        setItems([...items, newItem])
    }

    const selectedCategoryObj = shoppingCategories.find(obj => {
        return obj.name === selectedCategory
      })

    let selectedItems = []
      if (selectedCategory === "All") {
        selectedItems = items
      } else {
        selectedItems = items.filter((item) => 
        (item.shopping_category_id === selectedCategoryObj.id))
      }

    return (
        <div className="App">
            <h2>Shopping List</h2>
            <ShoppingList onDeleteItem={handleDeleteItem} items={selectedItems} shoppingCategories={shoppingCategories} categoryNames={categoryNames} selectedCategory={selectedCategory} onCategorySelected={handleCategorySelected} onNewShoppingItemFormSubmit={addNewItem}/>
        </div>)
}

export default ShoppingApplication;