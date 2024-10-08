import React, { useState, useEffect } from "react";
import "../../public/styles.css"; // External styles
import todoData from "./todoData.jsx";
import CheckListItem from "./CheckListItem.jsx";
import Button from "@mui/material/Button";
import { pink } from "@mui/material/colors";
import TextField from "@mui/material/TextField";

// Use the correct backend URL for the Express server
// const apiUrl =
//   import.meta.env.VITE_API_URL || "https://aaron-todo-backend.onrender.com";

// Main component that renders CheckListItem components using map
function MainC() {
  const [checklistItems, setChecklistItems] = useState([]);
  const [newItemText, setNewItemText] = useState("");
  const [editItemId, setEditItemId] = useState(null);
  const [editInputValue, setEditInputValue] = useState("");
  // Use the correct backend URL for the Express server
  const apiUrl =
    import.meta.env.VITE_API_URL || "https://aaron-todo-backend.onrender.com";

  useEffect(() => {
    // Define an async function to fetch data from the server
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/todo`);
        const data = await response.json();
 
        if (data.todos && data.todos.length > 0) {
          console.log("data", data.todos)
          console.log("Successfully fetched initial todos")
          setChecklistItems(data.todos);
        } else {
          console.error("No data received from the server.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleCheckboxChange = async (id) => {
    setChecklistItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, completed: !item.completed } : item
      )
    );
    const response = await fetch(`${apiUrl}/edit-item/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      body: JSON.stringify({
        text: editInputValue,
        completed: todo.completed, // Keep the completed status unchanged
      }),
    });
  };

  // Handle new item input change
  const handleInputChange = (e) => {
    setNewItemText(e.target.value);
  };

  // Handle adding a new item to the list
  const addNewItem = async () => {
    console.log("newItemText", newItemText)
    if (newItemText.trim()) {
    
      const newItem = {
        text: newItemText
      };
      const response = await fetch(`${apiUrl}/add-todo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      if (!response.ok) {
        console.error("Failed to add");
      }
      const createdItem= await response.json()
      setChecklistItems((prevItems) => [...prevItems, createdItem]);
      setNewItemText(""); // Reset the input field
    }
  };

  // Function to handle deleting an item from the list
  const handleDeleteItem = async (id) => {
    const updatedItems = checklistItems.filter((item) => item._id !== id);
    const response = await fetch(`${apiUrl}/delete-item/${id}`, {
      method: "DELETE",
    });
    setChecklistItems(updatedItems);
  };

  // Switch to edit mode for a specific item
  const handleEditItem = (id) => {
    const itemToEdit = checklistItems.find((item) => item._id === id);
    setEditItemId(id);
    setEditInputValue(itemToEdit.text);
  };

  // Save the edited item and exit edit mode
  const handleSaveEdit = async (id) => {
    setChecklistItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, text: editInputValue } : item
      )
    );
    const response = await fetch(`${apiUrl}/edit-item/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      body: JSON.stringify({
        text: editInputValue,
        completed: todo.completed, // Keep the completed status unchanged
      }),
    });
    setEditItemId(null); // Exit edit mode
    setEditInputValue("");
  };

  // Update the input value while editing
  const handleEditInputChange = (value) => {
    setEditInputValue(value);
  };

  const checklistComponents = checklistItems.map((todo) => (
    <CheckListItem
      key={todo._id}
      _id={todo._id}
      text={todo.text}
      completed={todo.completed}
      isEditing={editItemId === todo._id} // Check if this item is in edit mode
      handleCheckboxChange={handleCheckboxChange}
      handleDeleteItem={handleDeleteItem}
      handleEditItem={handleEditItem}
      handleSaveEdit={handleSaveEdit}
      handleEditInputChange={handleEditInputChange}
      editInputValue={editInputValue}
    />
  ));
  return (
    <main className='main-container' style={{ boxShadow: "0 4px 6px black" }}>
      {/* Render existing checklist items */}
      {checklistComponents}

      {/* Input field and button to add a new item */}
      <div className='card' style={{ marginTop: "20px" }}>
        <TextField
          type='text'
          placeholder='Add new item...'
          value={newItemText}
          onChange={(e)=>handleInputChange(e)}
        />
        <Button
          size='small'
          variant='outlined'
          sx={{ borderColor: pink[800], color: pink[800] }}
          className='card-button'
          onClick={()=>addNewItem()}
          style={{ marginLeft: "20px" }}
        >
          Add Item
        </Button>
      </div>
    </main>
  );
}

export default MainC;
