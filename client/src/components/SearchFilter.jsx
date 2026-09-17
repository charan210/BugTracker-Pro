// =========================================================
// SEARCH FILTER COMPONENT
// =========================================================
//
// This component displays:
// 1. Search input
// 2. Priority dropdown
// 3. Status dropdown
//
// The parent App component owns the filter state.
// This component receives the values and setter functions
// through props.
//
// =========================================================

function SearchFilter({
  searchTerm,
  setSearchTerm,
  priorityFilter,
  setPriorityFilter,
  statusFilter,
  setStatusFilter
}) {

  return (

    <div>

      <h2>Search & Filter Bugs</h2>


      {/* =================================================
          SEARCH INPUT
          ================================================= */}

      <input
        type="text"
        placeholder="Search bugs..."
        value={searchTerm}
        onChange={(event) =>
          setSearchTerm(event.target.value)
        }
      />


      {/* =================================================
          PRIORITY FILTER
          ================================================= */}

      <select
        value={priorityFilter}
        onChange={(event) =>
          setPriorityFilter(event.target.value)
        }
      >

        <option value="All">All Priorities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>

      </select>


      {/* =================================================
          STATUS FILTER
          ================================================= */}

      <select
        value={statusFilter}
        onChange={(event) =>
          setStatusFilter(event.target.value)
        }
      >

        <option value="All">All Statuses</option>
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Resolved">Resolved</option>
        <option value="Closed">Closed</option>

      </select>

    </div>

  );
}

export default SearchFilter;