export default function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search by name, phone, or email"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{
        width: "100%",
        maxWidth: "400px",
        padding: "8px",
        marginBottom: "15px",
      }}
    />
  );
}
