import { useState, useEffect } from "react";
import axios from "axios";
import BugForm from "./components/BugForm";
import SearchFilter from "./components/SearchFilter";
import BugList from "./components/BugList";
import Dashboard from "./components/Dashboard";
function App() {

  // =========================================================
  // 1. FORM STATE
  // =========================================================

  // Stores the bug title entered by the user
  const [title, setTitle] = useState("");

  // Stores the bug description entered by the user
  const [description, setDescription] = useState("");

  // Stores the selected priority
  const [priority, setPriority] = useState("High");


  // =========================================================
  // 2. UI STATE
  // =========================================================

  // Displays success/error messages to the user
  const [message, setMessage] = useState("");

  // Tracks whether the bug is currently being submitted
  const [loading, setLoading] = useState(false);

// =========================================================
// 3. BUG DATA & FILTER STATE
// =========================================================

// Stores all bugs received from the backend
const [bugs, setBugs] = useState([]);

// Stores what the user types into the search box
const [searchTerm, setSearchTerm] = useState("");

// Stores the selected priority filter
const [priorityFilter, setPriorityFilter] = useState("All");

// Stores the selected status filter
const [statusFilter, setStatusFilter] = useState("All");

  // =========================================================
  // 4. GET ALL BUGS
  // =========================================================

  // Fetches all bugs from the Express backend
  const fetchBugs = async () => {

    try {

      // Send GET request to backend
      const response = await axios.get(
        "http://localhost:5000/api/bugs"
      );

      // Store the bugs returned by the backend in React state
      setBugs(response.data.bugs);

    } catch (error) {

      // Display error in browser console if API fails
      console.error("Error fetching bugs:", error);

    }
  };


  // =========================================================
  // 5. CREATE A NEW BUG
  // =========================================================

  const handleSubmit = async (event) => {

    // Prevent browser from refreshing the page
    event.preventDefault();


    // ---------- Frontend Validation ----------

    // Check whether title is empty
    if (!title.trim()) {

      setMessage("Title is required");

      return;
    }


    // Check whether description is empty
    if (!description.trim()) {

      setMessage("Description is required.");

      return;
    }


    try {

      // Disable submit button while request is running
      setLoading(true);


      // Send POST request to Express backend
      const response = await axios.post(
        "http://localhost:5000/api/bugs",
        {
          title: title,
          description: description,
          priority: priority
        }
      );


      // Display backend success message
      setMessage(response.data.message);


      // Clear the form after successful submission
      setTitle("");
      setDescription("");
      setPriority("High");


      // Fetch latest bugs so the newly created bug
      // appears immediately without refreshing the browser
      await fetchBugs();


    } catch (error) {

      // Display error message if POST request fails
      setMessage("Failed to create bug");

      console.error("Error creating bug:", error);


    } finally {

      // Re-enable submit button
      setLoading(false);
    }
  };


  // =========================================================
  // 6. UPDATE BUG STATUS
  // =========================================================

  const updateBugStatus = async (bugId, newStatus) => {

    try {

      // Send PUT request to update the selected bug
      await axios.put(
        `http://localhost:5000/api/bugs/${bugId}`,
        {
          status: newStatus
        }
      );


      // Fetch updated data from backend
      await fetchBugs();


    } catch (error) {

      console.error("Error updating bug:", error);

    }
  };



  // =========================================================
// DELETE A BUG
// =========================================================

const deleteBug = async (bugId) => {

  try {

    // Send DELETE request to the backend
    await axios.delete(
      `http://localhost:5000/api/bugs/${bugId}`
    );

    // Get the latest bug list after deletion
    await fetchBugs();

  } catch (error) {

    console.error("Error deleting bug:", error);

  }
};


  // =========================================================
  // 7. SEARCH / FILTER BUGS
  // =========================================================

  // Filter bugs based on the search text.
  //
  // Example:
  //
  // searchTerm = "login"
  //
  // Only bugs whose title contains "login"
  // will be displayed.

  const filteredBugs = bugs.filter((bug) => {

  // Search condition
  const matchesSearch =
    bug.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());


  // Priority condition
  const matchesPriority =
    priorityFilter === "All" ||
    bug.priority === priorityFilter;


  // Status condition
  const matchesStatus =
    statusFilter === "All" ||
    bug.status === statusFilter;


  // Bug must satisfy ALL active conditions
  return (
    matchesSearch &&
    matchesPriority &&
    matchesStatus
  );

});

// =========================================================
// DASHBOARD STATISTICS
// =========================================================

// Total number of bugs
const totalBugs = bugs.length;

// Number of open bugs
const openBugs = bugs.filter(
  (bug) => bug.status === "Open"
).length;

// Number of bugs currently in progress
const inProgressBugs = bugs.filter(
  (bug) => bug.status === "In Progress"
).length;

// Number of resolved bugs
const resolvedBugs = bugs.filter(
  (bug) => bug.status === "Resolved"
).length;

// Number of closed bugs
const closedBugs = bugs.filter(
  (bug) => bug.status === "Closed"
).length;

// =========================================================
// PRIORITY STATISTICS
// =========================================================

// Count bugs by priority
const priorityStats = {
  high: bugs.filter((bug) => bug.priority === "High").length,

  medium: bugs.filter((bug) => bug.priority === "Medium").length,

  low: bugs.filter((bug) => bug.priority === "Low").length
};

  // =========================================================
  // 8. LOAD BUGS WHEN COMPONENT STARTS
  // =========================================================

  useEffect(() => {

    // Fetch bugs when the App component first loads
    fetchBugs();

  }, []);


  // =========================================================
  // 9. USER INTERFACE
  // =========================================================

  return (

    <div>

      {/* Application heading */}
      <h1>🐞 BugTracker Pro</h1>





      {/* =====================================================
    DASHBOARD
    ===================================================== */}

<Dashboard
  totalBugs={totalBugs}
  openBugs={openBugs}
  inProgressBugs={inProgressBugs}
  resolvedBugs={resolvedBugs}
  closedBugs={closedBugs}
/>

{/* =====================================================
    PRIORITY SUMMARY
    ===================================================== */}

<h2>Priority Summary</h2>

<div>

 <p>
  High Priority: {priorityStats.high}
</p>

<p>
  Medium Priority: {priorityStats.medium}
</p>

<p>
  Low Priority: {priorityStats.low}
</p>

</div>

<BugForm
  title={title}
  setTitle={setTitle}

  description={description}
  setDescription={setDescription}

  priority={priority}
  setPriority={setPriority}

  handleSubmit={handleSubmit}

  loading={loading}
  message={message}
/>
    


      {/* =====================================================
          SEARCH BUGS
          ===================================================== */}
<SearchFilter
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}

  priorityFilter={priorityFilter}
  setPriorityFilter={setPriorityFilter}

  statusFilter={statusFilter}
  setStatusFilter={setStatusFilter}
/>
      <BugList
  filteredBugs={filteredBugs}
  updateBugStatus={updateBugStatus}
  deleteBug={deleteBug}
/>

     

    </div>
  );
}


// Export App component
export default App;