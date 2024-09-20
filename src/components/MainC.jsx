import React, { useState } from "react";
import "../../public/styles.css"; // External styles
import todoData from "./todoData.jsx";

// Reusable CheckListItem component
function CheckListItem({
  id,
  text,
  completed,
  handleCheckboxChange,
  handleDeleteItem,
}) {
  // Inline styles for individual checklist item
  const inlineStyles = {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
    fontSize: "14px",
    gap: "25px",
  };

  return (
    <div style={inlineStyles}>
      <h1>{text}</h1>
      <input
        type='checkbox'
        checked={completed}
        onChange={() => handleCheckboxChange(id)}
      />
      <button onClick={() => handleDeleteItem(id)}>Delete</button>
    </div>
  );
}

// Main component that renders CheckListItem components using map
function MainC() {
  const [checklistItems, setChecklistItems] = useState(todoData);
  const [newItemText, setNewItemText] = useState("");
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
  const addNewItem = () => {
    if (newItemText.trim()) {
      const newItem = {
        id: checklistItems.length + 1,
        text: newItemText,
        completed: false,
      };
      setChecklistItems((prevItems) => [...prevItems, newItem]);
      setNewItemText(""); // Reset the input field
    }
  };

  // Function to handle deleting an item from the list
  const handleDeleteItem = (id) => {
    const updatedItems = checklistItems.filter((item) => item.id !== id);
    setChecklistItems(updatedItems);
  };

  const checklistComponents = checklistItems.map((todo) => (
    <CheckListItem
      key={todo.id}
      id={todo.id}
      text={todo.text}
      completed={todo.completed}
      handleCheckboxChange={handleCheckboxChange}
      handleDeleteItem={handleDeleteItem}
    />
  ));

  return (
    <main className='main-container'>
      {/* Render existing checklist items */}
      {checklistComponents}

      {/* Input field and button to add a new item */}
      <div style={{ marginTop: "20px" }}>
        <input
          type='text'
          placeholder='Add new item...'
          value={newItemText}
          onChange={handleInputChange}
        />
        <button onClick={addNewItem}>Add Item</button>
      </div>
    </main>
  );
}
export default MainC;
