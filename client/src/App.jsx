import { useState } from "react";
import axios from "axios";

function App() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority,setPriority] =useState("High");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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

  } catch (error) {
     setMessage("Failed to create bug");
    console.log(error);

  }
  finally {
  setLoading(false);
}

};
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

      </form>
    </div>
  );
}

export default App;