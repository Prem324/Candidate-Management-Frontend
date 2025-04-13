import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import CandidateTable from "./components/CandidateTable";
import CandidateForm from "./components/CandidateForm";
import SearchBar from "./components/SearchBar";
import FilterPanel from "./components/FilterPanel";
import ConfirmModal from "./components/ConfirmModal";
import "./App.css";

function App() {
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    gender: "",
    experience: "",
    skills: [],
  });
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editCandidate, setEditCandidate] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const limit = 10;

  const fetchCandidates = useCallback(async () => {
    const params = {
      search,
      experience: filters.experience,
      ...filters,
      skills: filters.skills.join(","),
      page,
      limit,
    };
    console.log("Filters:", filters);

    const res = await axios.get(
      "https://candidate-mangament-backend.onrender.com/api/candidates",
      {
        params,
      }
    );
    setCandidates(res.data.candidates);
    setTotal(res.data.total);
  }, [search, filters, page]);

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  const handleDelete = async () => {
    await axios.delete(
      `https://candidate-mangament-backend.onrender.com/api/candidates/${deleteId}`
    );
    setShowConfirm(false);
    setDeleteId(null);
    fetchCandidates();
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Candidate Management</h1>
        <div className="header-actions">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="filter-toggle"
          >
            🔍 Filter
          </button>
        </div>
      </div>

      <SearchBar search={search} setSearch={setSearch} />

      <div className="main-content">
        {showFilter && (
          <FilterPanel filters={filters} setFilters={setFilters} />
        )}

        <div className="table-form">
          <div className="top-bar">
            <button className="add-btn" onClick={() => setShowForm(!showForm)}>
              ➕ Add Candidate
            </button>
          </div>

          {showForm && (
            <CandidateForm
              onAdd={() => {
                fetchCandidates();
                setShowForm(false);
              }}
              candidate={editCandidate}
              clearEdit={() => setEditCandidate(null)}
              onClose={() => {
                setShowForm(false);
                setEditCandidate(null);
              }}
            />
          )}

          <CandidateTable
            candidates={candidates}
            page={page}
            setPage={setPage}
            total={total}
            limit={limit}
            onEdit={(candidate) => {
              setEditCandidate(candidate);
              setShowForm(true);
            }}
            onDelete={(id) => {
              setDeleteId(id);
              setShowConfirm(true);
            }}
          />
        </div>
      </div>

      <ConfirmModal
        isOpen={showConfirm}
        onConfirm={handleDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
}

export default App;
