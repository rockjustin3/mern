const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let items = []; // In-memory array to store items
let id = 1; // ID counter for items

// CREATE Item
app.post("/items", (req, res) => {
  const { name, description } = req.body;
  const newItem = { id: id++, name, description };
  items.push(newItem);
  res.json(newItem);
});

// READ Items
app.get("/items", (req, res) => {
  res.json(items);
});

// UPDATE Item
app.put("/items/:id", (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const itemIndex = items.findIndex((item) => item.id == id);
  if (itemIndex !== -1) {
    items[itemIndex] = { id: parseInt(id), name, description };
    res.json(items[itemIndex]);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// DELETE Item
app.delete("/items/:id", (req, res) => {
  const { id } = req.params;
  items = items.filter((item) => item.id != id);
  res.json({ message: "Item deleted" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
