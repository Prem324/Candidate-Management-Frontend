// CandidateTable.jsx
import { MdDeleteOutline } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import React from "react";
import "./CandidateTable.css";

const CandidateTable = ({ candidates, onEdit, onDelete }) => {
  return (
    <div className="table-container">
      <table className="candidate-table">
        <thead>
          <tr>
            <th>Candidate Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Current Experience</th>
            <th>Skills/Technology</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {candidates.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No candidates found
              </td>
            </tr>
          ) : (
            candidates.map((candidate) => (
              <tr key={candidate._id}>
                <td className="name-style">{candidate.name}</td>
                <td>{candidate.email}</td>
                <td>{candidate.phone}</td>
                <td>{candidate.experience}</td>
                <td>{candidate.skills.join(", ")}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => onEdit(candidate)}
                  >
                    <FaUserEdit className="icon" />
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => onDelete(candidate._id)}
                  >
                    <MdDeleteOutline className="icon" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateTable;
