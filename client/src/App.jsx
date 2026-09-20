import { useState, useEffect } from "react";
import BugForm from "./components/BugForm";
import SearchFilter from "./components/SearchFilter";
import BugList from "./components/BugList";
import Dashboard from "./components/Dashboard";
import {
  getBugs,
  createBug,
  updateBugStatus as updateBugStatusApi,
  deleteBug as deleteBugApi
} from "./api/bugApi";
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
      const data = await getBugs();

       setBugs(data.bugs);

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
   const response = await createBug(
  title,
  description,
  priority
);

      // Display backend success message
      setMessage(response.message);


      // Clear the form after successful submission
      setTitle("");
      setDescription("");
      setPriority("High");


      // Fetch latest bugs so the newly created bug
      // appears immediately without refreshing the browser
      await fetchBugs();


    } catch (error) {

      // Display error message if POST request fails
     console.error("Error creating bug:", error);

  console.error("Server response:", error.response?.data);

  setMessage("Failed to create bug");

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

    await updateBugStatusApi(
      bugId,
      newStatus
    );

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

    await deleteBugApi(bugId);

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

// Count bugs by status
const statusStats = {
  open: bugs.filter(
    (bug) => bug.status === "Open"
  ).length,

  inProgress: bugs.filter(
    (bug) => bug.status === "In Progress"
  ).length,

  resolved: bugs.filter(
    (bug) => bug.status === "Resolved"
  ).length,

  closed: bugs.filter(
    (bug) => bug.status === "Closed"
  ).length
};
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
  statusStats={statusStats}
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