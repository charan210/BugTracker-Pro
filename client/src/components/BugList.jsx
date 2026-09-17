// =========================================================
// BUG LIST COMPONENT
// =========================================================
//
// This component displays the filtered bugs.
//
// App.jsx handles:
// - API calls
// - State
// - Filtering
// - Updating and deleting bugs
//
// BugList.jsx handles:
// - Displaying the list
// - Showing the empty-state message
//
// =========================================================

import BugCard from "./BugCard";

function BugList({
  filteredBugs,
  updateBugStatus,
  deleteBug
}) {
  return (
    <div>
      <h2>All Bugs</h2>

      {filteredBugs.length === 0 ? (
        <p>No bugs found.</p>
      ) : (
        filteredBugs.map((bug) => (
          <BugCard
            key={bug.id}
            bug={bug}
            updateBugStatus={updateBugStatus}
            deleteBug={deleteBug}
          />
        ))
      )}
    </div>
  );
}

export default BugList;