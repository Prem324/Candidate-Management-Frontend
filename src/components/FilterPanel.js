// FilterPanel.jsx
import React from "react";

const FilterPanel = ({ filters, setFilters }) => {
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prev) => ({ ...prev, [name]: checked ? name : "" }));
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

  return (
    <div className="filter-panel">
      <h3>Filter</h3>
      <div className="filter-group">
        <label>Gender</label>
        <div>
          <input
            type="checkbox"
            name="gender"
            value="Male"
            checked={filters.gender === "Male"}
            onChange={handleCheckboxChange}
          />{" "}
          Male
        </div>
        <div>
          <input
            type="checkbox"
            name="gender"
            value="Female"
            checked={filters.gender === "Female"}
            onChange={handleCheckboxChange}
          />{" "}
          Female
        </div>
        <div>
          <input
            type="checkbox"
            name="gender"
            value="Other"
            checked={filters.gender === "Other"}
            onChange={handleCheckboxChange}
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
          <option value="5">5</option>
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
          <input type="checkbox" value="Python" onChange={handleSkillChange} />{" "}
          Python
        </div>
        <div>
          <input type="checkbox" value="React" onChange={handleSkillChange} />{" "}
          React
        </div>
        <div>
          <input type="checkbox" value="HTML" onChange={handleSkillChange} />{" "}
          HTML
        </div>
        <div>
          <input type="checkbox" value="Angular" onChange={handleSkillChange} />{" "}
          Angular
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
