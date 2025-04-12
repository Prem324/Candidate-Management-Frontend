// CandidateTable.jsx
import React from "react";

const CandidateTable = ({
  candidates,
  page,
  setPage,
  total,
  limit,
  onEdit,
  onDelete,
}) => {
  const totalPages = Math.ceil(total / limit);

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
                <td>{candidate.name}</td>
                <td>{candidate.email}</td>
                <td>{candidate.phone}</td>
                <td>{candidate.experience}</td>
                <td>{candidate.skills.join(", ")}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => onEdit(candidate)}
                  >
                    ✎
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => onDelete(candidate._id)}
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          ◀
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default CandidateTable;
