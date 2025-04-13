import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import CandidateTable from "./components/CandidateTable";
import CandidateForm from "./components/CandidateForm";
import SearchBar from "./components/SearchBar";
import FilterPanel from "./components/FilterPanel";
import ConfirmModal from "./components/ConfirmModal";
import { TfiMenuAlt } from "react-icons/tfi";
import { CiFilter } from "react-icons/ci";
import { IoMdSearch } from "react-icons/io";
import { IoPersonAddOutline } from "react-icons/io5";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoChevronForwardOutline } from "react-icons/io5";
import { RiListIndefinite } from "react-icons/ri";

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

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="App">
      <h1 className="heading">Candidates Management Portal</h1>
      <div className="header">
        <div className="header-section">
          <h1 className="header-heading">Candidates</h1>
          <button className="add-btn" onClick={() => setShowForm(!showForm)}>
            <IoPersonAddOutline className="icon" /> Add Candidate
          </button>
        </div>

        <div className="header-actions">
          <div className="menus-list">
            <TfiMenuAlt className="icon menu" />
            <RiListIndefinite className="icon list" />
          </div>
          <div className="filters-section">
            <div className="search-container">
              <IoMdSearch className="search-icon" />
              <SearchBar
                className="search-input"
                search={search}
                setSearch={setSearch}
              />
            </div>

            {/* Pagination */}
            <div className="pagination">
              <span className="page-no">
                {page} / {totalPages}
              </span>
              <button
                className="page-nav-btn"
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
              >
                <IoChevronBackOutline className="icon" />
              </button>

              <button
                className="page-nav-btn"
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
              >
                <IoChevronForwardOutline className="icon" />
              </button>
            </div>
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="filter-toggle"
            >
              <CiFilter className="filter-icon" />
            </button>
          </div>
        </div>
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

      <div className="main-content">
        <div className="table-form">
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
        {showFilter && (
          <FilterPanel filters={filters} setFilters={setFilters} />
        )}
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
