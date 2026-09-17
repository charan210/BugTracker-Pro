// =========================================================
// BUG CARD COMPONENT
// =========================================================
//
// Displays one bug.
//
// The parent component gives this component:
// 1. bug             → bug information
// 2. updateBugStatus → function to update status
// 3. deleteBug       → function to delete the bug
//
// =========================================================

function BugCard({
  bug,
  updateBugStatus,
  deleteBug
}) {

  return (

    <div>

      {/* Bug title */}
      <h3>{bug.title}</h3>


      {/* Bug description */}
      <p>{bug.description}</p>


      {/* Bug priority */}
      <p>
        Priority: {bug.priority}
      </p>


      {/* Bug status */}
      <label>Status: </label>

      <select
        value={bug.status}
        onChange={(event) =>
          updateBugStatus(
            bug.id,
            event.target.value
          )
        }
      >

        <option>Open</option>
        <option>In Progress</option>
        <option>Resolved</option>
        <option>Closed</option>

      </select>


      {/* Delete button */}
      <button
        type="button"
        onClick={() => deleteBug(bug.id)}
      >
        Delete
      </button>

    </div>

  );
}

export default BugCard;