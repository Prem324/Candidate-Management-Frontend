import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CandidateForm.css";

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
      setFormData({
        ...candidate,
        skills: candidate.skills || [], // Ensure skills is an array
      });
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
    const selectedSkills = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setFormData((prev) => ({ ...prev, skills: selectedSkills }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = candidate
      ? `https://candidate-mangament-backend.onrender.com/api/candidates/${candidate._id}`
      : "https://candidate-mangament-backend.onrender.com/api/candidates";

    try {
      if (candidate) {
        await axios.put(url, formData);
      } else {
        await axios.post(url, formData);
      }
      onAdd();
      onClose();
    } catch (err) {
      console.error("❌ Error submitting candidate:", err);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="modal-heading">
          {candidate ? "Edit Candidate" : "Add Candidate"}
        </h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <input
            className="form-input"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Name"
          />
          <input
            className="form-input"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Phone"
          />
          <input
            className="form-input"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email"
          />

          <select
            className="form-select"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <select
            className="form-select"
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

          <label>Skills (Hold Ctrl/Cmd to select multiple)</label>
          <select
            className="form-select"
            multiple
            value={formData.skills}
            onChange={handleSkillChange}
          >
            <option value="JavaScript">JavaScript</option>
            <option value="React">React</option>
            <option value="Node.js">Node.js</option>
            <option value="Python">Python</option>
            <option value="SQL">SQL</option>
          </select>

          <div className="form-buttons">
            <button className="form-button" type="submit">
              {candidate ? "Update" : "Add"}
            </button>
            <button className="form-button" type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CandidateForm;
