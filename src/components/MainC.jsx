import React, { useState } from "react";
import "../../public/styles.css"; // External styles
import todoData from "./todoData.jsx";

// Reusable CheckListItem component
function CheckListItem({
  id,
  text,
  completed,
  isEditing,
  handleCheckboxChange,
  handleDeleteItem,
  handleEditItem,
  handleSaveEdit,
  handleEditInputChange,
  editInputValue,
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
      {isEditing ? (
        // Display input field when in edit mode
        <input
          type='text'
          value={editInputValue}
          onChange={(e) => handleEditInputChange(e.target.value)}
        />
      ) : (
        // Display text normally when not in edit mode
        <h1>{text}</h1>
      )}
      <input
        type='checkbox'
        checked={completed}
        onChange={() => handleCheckboxChange(id)}
      />
      <button onClick={() => handleDeleteItem(id)}>Delete</button>
      {isEditing ? (
        // Display Save button when in edit mode
        <button onClick={() => handleSaveEdit(id)}>Save</button>
      ) : (
        // Display Edit button when not in edit mode
        <button onClick={() => handleEditItem(id)}>Edit</button>
      )}
    </div>
  );
}

// Main component that renders CheckListItem components using map
function MainC() {
  const [checklistItems, setChecklistItems] = useState(todoData);
  const [newItemText, setNewItemText] = useState("");
  const [editItemId, setEditItemId] = useState(null);
  const [editInputValue, setEditInputValue] = useState("");

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

  // Switch to edit mode for a specific item
  const handleEditItem = (id) => {
    const itemToEdit = checklistItems.find((item) => item.id === id);
    setEditItemId(id);
    setEditInputValue(itemToEdit.text);
  };

  // Save the edited item and exit edit mode
  const handleSaveEdit = (id) => {
    setChecklistItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, text: editInputValue } : item
      )
    );
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
