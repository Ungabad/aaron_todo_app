import React, { useState } from "react";

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
  return (
    <div className='main-container'>
      <div className='card'>
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
        <div className='card-buttons'>
          <button className='card-button' onClick={() => handleDeleteItem(id)}>
            Delete
          </button>
          {isEditing ? (
            // Display Save button when in edit mode
            <button className='card-button' onClick={() => handleSaveEdit(id)}>
              Save
            </button>
          ) : (
            // Display Edit button when not in edit mode
            <button className='card-button' onClick={() => handleEditItem(id)}>
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CheckListItem;
