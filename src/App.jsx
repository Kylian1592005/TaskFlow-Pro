import { useState } from "react";

function App() {
  const initialForm = {
    title: "",
    description: "",
  };
  const [formInput, setFormInput] = useState(initialForm);
  const submitForm = () => {
    console.log("form is submitted");
    setFormInput(initialForm);
  };

  const handleInputChange = (value, id) => {
    setFormInput((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  return (
    <div>
      <h1>Kanban Task Manager</h1>
      <div>
        <form action={submitForm}>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            placeholder="e.g., learn react"
            required
            value={formInput.title}
            onChange={(e) => handleInputChange(e.target.value, e.target.id)}
          />
          <label htmlFor="desc">Description:</label>
          <input
            id="description"
            type="text"
            placeholder="Write something"
            required
            value={formInput.description}
            onChange={(e) => handleInputChange(e.target.value, e.target.id)}
          />
          <button onClick="submit">Add</button>
        </form>
      </div>
    </div>
  );
}

export default App;
