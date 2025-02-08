import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await axios.get("http://localhost:5000/items");
    setItems(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`http://localhost:5000/items/${editingId}`, {
        name,
        description,
      });
    } else {
      await axios.post("http://localhost:5000/items", { name, description });
    }
    setName("");
    setDescription("");
    setEditingId(null);
    fetchItems();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/items/${id}`);
    fetchItems();
  };

  const handleEdit = (item: any) => {
    setName(item.name);
    setDescription(item.description);
    setEditingId(item.id);
  };

  return (
    <div className="container">
      <h1>MERN CRUD App (Local Backend)</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <button type="submit">{editingId ? "Update" : "Create"}</button>
      </form>
      <ul>
        {items.map((item: any) => (
          <li key={item.id}>
            {item.name} - {item.description}
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
