import React, { useState, useEffect } from "react";
import "../../public/styles.css"; // External styles
import todoData from "./todoData.jsx";
import CheckListItem from "./CheckListItem.jsx";
import Button from "@mui/material/Button";
import { pink } from "@mui/material/colors";
import TextField from "@mui/material/TextField";

// Main component that renders CheckListItem components using map
function MainC() {
  const [checklistItems, setChecklistItems] = useState(todoData);
  const [newItemText, setNewItemText] = useState("");
  const [editItemId, setEditItemId] = useState(null);
  const [editInputValue, setEditInputValue] = useState("");

  // Use the correct backend URL for the Express server
  const apiUrl =
    import.meta.env.VITE_API_URL || "https://aaron-todo-backend.onrender.com";

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${apiUrl}/todo`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://unga-todo.netlify.app",
        },
      });
      const data = await response.json();
      if (data.todo.length > 0) {
        setChecklistItems(data.todo);
      } else {
        console.error("No data received from the server.");
      }
    };
    fetchData();
  }, []);

  const handleCheckboxChange = (id) => {
    setChecklistItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // Handle new item input change
  const handleInputChange = (e) => {
    setNewItemText(e.target.value);
  };

  // Handle adding a new item to the list
  const addNewItem = async () => {
    if (newItemText.trim()) {
      const newItem = {
        id: checklistItems.length + 2,
        text: newItemText,
        completed: false,
      };
      const response = await fetch(`${apiUrl}/add-todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://unga-todo.netlify.app",
        },
        body: JSON.stringify(newItem),
      });
      if (!response.ok) {
        console.error("Failed to add");
      }
      setChecklistItems((prevItems) => [...prevItems, newItem]);
      setNewItemText(""); // Reset the input field
    }
  };

  // Function to handle deleting an item from the list
  const handleDeleteItem = async (id) => {
    const updatedItems = checklistItems.filter((item) => item.id !== id);
    const response = await fetch(`${apiUrl}/delete-todo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://unga-todo.netlify.app",
      },
    });
    setChecklistItems(updatedItems);
  };

  // Switch to edit mode for a specific item
  const handleEditItem = (id) => {
    const itemToEdit = checklistItems.find((item) => item.id === id);
    setEditItemId(id);
    setEditInputValue(itemToEdit.text);
  };

  // Save the edited item and exit edit mode
  const handleSaveEdit = async (id) => {
    setChecklistItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, text: editInputValue } : item
      )
    );
    const response = await fetch(`${apiUrl}/delete-todo/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://unga-todo.netlify.app",
      },
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
      key={todo.id}
      id={todo.id}
      text={todo.text}
      completed={todo.completed}
      isEditing={editItemId === todo.id} // Check if this item is in edit mode
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
          onChange={handleInputChange}
        />
        <Button
          size='small'
          variant='outlined'
          sx={{ borderColor: pink[800], color: pink[800] }}
          className='card-button'
          onClick={addNewItem}
          style={{ marginLeft: "20px" }}
        >
          Add Item
        </Button>
      </div>
    </main>
  );
}

export default MainC;
