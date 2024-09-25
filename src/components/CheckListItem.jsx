import React, { useState } from "react";
import Button from "@mui/material/Button";
import { pink } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";

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
        <Checkbox
          sx={{ color: pink[800], "&.Mui-checked": { color: pink[600] } }}
          checked={completed}
          onChange={() => handleCheckboxChange(id)}
        />
        <div className='card-buttons'>
          <Button
            size='small'
            variant='outlined'
            sx={{ borderColor: pink[800], color: pink[800] }}
            className='card-button'
            onClick={() => handleDeleteItem(id)}
          >
            Delete
          </Button>
          {isEditing ? (
            // Display Save button when in edit mode
            <Button
              size='small'
              variant='outlined'
              sx={{ borderColor: pink[800], color: pink[800] }}
              className='card-button'
              onClick={() => handleSaveEdit(id)}
            >
              Save
            </Button>
          ) : (
            // Display Edit button when not in edit mode
            <Button
              size='small'
              variant='outlined'
              sx={{ borderColor: pink[800], color: pink[800] }}
              className='card-button'
              onClick={() => handleEditItem(id)}
            >
              Edit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CheckListItem;
