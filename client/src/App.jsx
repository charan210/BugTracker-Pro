import { useState, useEffect} from "react";
import axios from "axios";

function App() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority,setPriority] =useState("High");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [bugs, setBugs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = async (event) => {

  event.preventDefault();
  if(!title.trim()){
    setMessage("Title is required");
    return;
  }
  if (!description.trim()) {
  setMessage("Description is required.");
  return;
}

  try {

      setLoading(true);
    const response = await axios.post(
      "http://localhost:5000/api/bugs",
      {
        title: title,
        description: description,
        priority: priority
      }
    );

    setMessage(response.data.message);
  
      setTitle("");
     setDescription("");
     setPriority("High");

     await fetchBugs();

  } catch (error) {
     setMessage("Failed to create bug");
    console.log(error);

  }
  finally {
  setLoading(false);
}

};

const fetchBugs = async () => {

  try {

    const response = await axios.get(
      "http://localhost:5000/api/bugs"
    );

    setBugs(response.data.bugs);

  } catch (error) {

    console.error("Error fetching bugs:", error);

  }

};

const filteredBugs = bugs.filter((bug) =>
  bug.title.toLowerCase().includes(searchTerm.toLowerCase())
);


const updateBugStatus = async (bugId, newStatus) => {

  try {

    await axios.put(
      `http://localhost:5000/api/bugs/${bugId}`,
      {
        status: newStatus
      }
    );

    await fetchBugs();

  } catch (error) {

    console.error("Error updating bug:", error);

  }

};

  useEffect(() => {
    fetchBugs();
  }, []);

  return (
    <div>
      <h1>🐞 BugTracker Pro</h1>

      <h2>Report New Bug</h2>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Title</label>
          <br />

          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Description</label>
          <br />

          <textarea 
            rows="4"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
           >
          </textarea>
        </div>

        <br />

        <div>
          <label>Priority</label>
          <br />

          <select
        value={priority}
          onChange={(event) => setPriority(event.target.value)}
         >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Creaing Bug..... ": "submit Bug"}
        </button>

       <p>{message}</p>
       <h2>All Bugs</h2>

{bugs.map((bug) => (
  <div key={bug.id}>

    <h3>{bug.title}</h3>

    <p>{bug.description}</p>

    <p>Priority: {bug.priority}</p>

    <label>Status: </label>

<select
  value={bug.status}
  onChange={(event) =>
    updateBugStatus(bug.id, event.target.value)
  }
>
  <option>Open</option>
  <option>In Progress</option>
  <option>Resolved</option>
  <option>Closed</option>
</select>

  </div>
))}

      </form>
    </div>
    
  );
}


export default App;