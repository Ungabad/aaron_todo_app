import React from "react";
import "../../public/styles.css"; // External styles
import todoData from "./todoData.jsx";

// Reusable CheckListItem component
function CheckListItem({ text, completed }) {
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
      <input type='checkbox' checked={completed} readOnly />
    </div>
  );
}

// Main component that renders CheckListItem components using map
function MainC() {
  const checklistItems = todoData.map((todo) => (
    <CheckListItem key={todo.id} text={todo.text} completed={todo.completed} />
  ));

  return <main className='main-container'>{checklistItems}</main>;
}
export default MainC;
