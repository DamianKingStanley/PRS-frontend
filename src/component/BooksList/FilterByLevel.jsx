// FilterByLevel.js
import React from "react";

const levels = ["", "100", "200", "300", "400", "500", "600", "phd", "msc"];

const FilterByLevel = ({ onChange }) => {
  const handleChange = (e) => {
    onChange("level", e.target.value);
  };

  return (
    <div>
      <select id="makeAchoice" name="level" onChange={handleChange}>
        {levels.map((level) => (
          <option key={level} value={level}>
            {level || "Select Level"}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterByLevel;
