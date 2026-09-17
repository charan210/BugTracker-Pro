// =========================================================
// BUG FORM COMPONENT
// =========================================================
//
// This component is responsible for displaying the form
// used to create a new bug.
//
// The actual form data and submit logic are controlled by
// the parent App component.
//
// =========================================================

function BugForm({
  title,
  setTitle,
  description,
  setDescription,
  priority,
  setPriority,
  handleSubmit,
  loading,
  message
}) {

  return (

    <div>

      <h2>Report New Bug</h2>


      {/* =================================================
          CREATE BUG FORM
          ================================================= */}

      <form onSubmit={handleSubmit}>

        {/* ---------- Title ---------- */}

        <div>

          <label>Title</label>

          <br />

          <input
            type="text"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
          />

        </div>


        <br />


        {/* ---------- Description ---------- */}

        <div>

          <label>Description</label>

          <br />

          <textarea
            rows="4"
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
          />

        </div>


        <br />


        {/* ---------- Priority ---------- */}

        <div>

          <label>Priority</label>

          <br />

          <select
            value={priority}
            onChange={(event) =>
              setPriority(event.target.value)
            }
          >

            <option>High</option>
            <option>Medium</option>
            <option>Low</option>

          </select>

        </div>


        <br />


        {/* ---------- Submit Button ---------- */}

        <button
          type="submit"
          disabled={loading}
        >

          {loading
            ? "Creating Bug..."
            : "Submit Bug"
          }

        </button>


        {/* Success / Error message */}

        <p>{message}</p>

      </form>

    </div>

  );
}

export default BugForm;