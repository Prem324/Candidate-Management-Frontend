import React, { useEffect, useState } from "react";
import axios from "axios";

const CandidateForm = ({ onAdd, candidate, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "Male",
    experience: "1 Year",
    skills: [],
  });

  useEffect(() => {
    if (candidate) {
      setFormData(candidate);
    }
  }, [candidate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSkillChange = (e) => {
    const { options } = e.target;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) selected.push(options[i].value);
    }
    setFormData((prev) => ({ ...prev, skills: selected }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (candidate) {
      await axios.put(
        `https://candidate-mangament-backend.onrender.com/api/candidates/${candidate._id}`,
        formData
      );
    } else {
      await axios.post(
        "https://candidate-mangament-backend.onrender.com/api/candidates",
        formData
      );
    }
    onAdd();
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{candidate ? "Edit Candidate" : "Add Candidate"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Name"
          />
          <input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Phone"
          />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email"
          />

          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
          >
            <option>1 Year</option>
            <option>2 Years</option>
            <option>3 Years</option>
            <option>4 Years</option>
            <option>5+ Years</option>
          </select>

          <select multiple value={formData.skills} onChange={handleSkillChange}>
            <option value="JavaScript">JavaScript</option>
            <option value="React">React</option>
            <option value="Node.js">Node.js</option>
            <option value="Python">Python</option>
            <option value="SQL">SQL</option>
          </select>

          <div className="form-buttons">
            <button type="submit">{candidate ? "Update" : "Add"}</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CandidateForm;
