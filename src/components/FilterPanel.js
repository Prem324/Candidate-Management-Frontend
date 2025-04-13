// FilterPanel.jsx
import React from "react";
import "./FilterPanel.css";

const FilterPanel = ({ filters, setFilters }) => {
  const handleGenderChange = (e) => {
    const { value, checked } = e.target;
    setFilters((prev) => ({ ...prev, gender: checked ? value : "" }));
  };

  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    setFilters((prev) => {
      const skills = checked
        ? [...prev.skills, value]
        : prev.skills.filter((s) => s !== value);
      return { ...prev, skills };
    });
  };

  const clearFilters = () => {
    setFilters({
      gender: "",
      experience: "",
      skills: [],
    });
  };

  return (
    <div className="filter-panel">
      <h3>Filters</h3>
      <div className="filter-group">
        <label>Gender</label>
        <div>
          <input
            type="checkbox"
            value="Male"
            checked={filters.gender === "Male"}
            onChange={handleGenderChange}
          />{" "}
          Male
        </div>
        <div>
          <input
            type="checkbox"
            value="Female"
            checked={filters.gender === "Female"}
            onChange={handleGenderChange}
          />{" "}
          Female
        </div>
        <div>
          <input
            type="checkbox"
            value="Other"
            checked={filters.gender === "Other"}
            onChange={handleGenderChange}
          />{" "}
          Other
        </div>
      </div>

      <div className="filter-group">
        <label>Experience (Years)</label>
        <select
          value={filters.experience}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, experience: e.target.value }))
          }
        >
          <option value="">All</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5+</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Skills</label>
        <div>
          <input
            type="checkbox"
            value="JavaScript"
            onChange={handleSkillChange}
          />{" "}
          JavaScript
        </div>
        <div>
          <input type="checkbox" value="React" onChange={handleSkillChange} />{" "}
          React
        </div>
        <div>
          <input type="checkbox" value="Node.js" onChange={handleSkillChange} />{" "}
          Node.js
        </div>
        <div>
          <input type="checkbox" value="Python" onChange={handleSkillChange} />{" "}
          Python
        </div>
        <div>
          <input type="checkbox" value="SQL" onChange={handleSkillChange} /> SQL
        </div>
      </div>
      <button className="clear-button" onClick={clearFilters}>
        Clear Filters
      </button>
    </div>
  );
};

export default FilterPanel;
