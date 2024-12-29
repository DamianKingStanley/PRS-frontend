// FilterByCollege.js
import React from "react";

const colleges = [
  "",
  "colpas",
  "colnas",
  "colmas",
  "caerse",
  "casap",
  "cafst",
  "ccss",
  "coed",
  "ceet",
  "cnrem",
  "cvm",
  "sgs",
];

const FilterByCollege = ({ onChange }) => {
  const handleChange = (e) => {
    onChange("college", e.target.value);
  };

  return (
    <div>
      <select id="makeAchoice" name="college" onChange={handleChange}>
        {colleges.map((college) => (
          <option key={college} value={college}>
            {college || "Select College"}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterByCollege;
