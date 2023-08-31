import React from "react";
import '../styles/global.styles.css'

function NoBeerComponent({ onAddBeerClick }) {
  return (
    <div style={{ textAlign: "center" }}>
      <p>Nothing to see yet.</p>
      <p>
        <a
          href="#"
          className="no-data-link"
          onClick={(e) => {
            e.preventDefault(); // Prevent the default behavior of the link
            onAddBeerClick(); // Trigger the provided function
          }}
        >
          Click here
        </a>{" "}
        to add your first beer!
      </p>
    </div>
  );
}

export default NoBeerComponent;
