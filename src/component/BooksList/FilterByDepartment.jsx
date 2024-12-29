// FilterByDepartment.js
import React from "react";

const departments = [
  "",
  "computer-science",
  "chemistry",
  "geology",
  "mathematics",
  "physics",
  "statistics",
  "biochemistry",
  "microbiology",
  "plantscience",
  "industrial-relations",
  "human-resource",
  "agribusiness",
  "agrieconomics",
  "agricextension",
  "animalbreeding",
  "animalproduction",
  "human-nutrition",
  "home-science",
  "foodscience",
  "agronomy",
  "planthealth",
  "soil-science",
  "water-resources",
  "adult-education",
  "agric-education",
];

const FilterByDepartment = ({ onChange }) => {
  const handleChange = (e) => {
    onChange("department", e.target.value);
  };

  return (
    <div>
      <select id="makeAchoice" name="department" onChange={handleChange}>
        {departments.map((dept) => (
          <option key={dept} value={dept}>
            {dept || "Select Department"}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterByDepartment;
