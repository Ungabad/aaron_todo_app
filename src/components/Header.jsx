import React from "react";
import "../../public/styles.css"; // External styles

function Header() {
  return (
    <header>
      <h1 style={{ color: "black" }}>Welcome to Todo App</h1>
      <p style={{ color: "black" }}>
        This is a simple Todo App using React and Vite.
      </p>
    </header>
  );
}

export default Header;
