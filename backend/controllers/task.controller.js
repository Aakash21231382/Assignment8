import Task from "../models/task.model.js";

// Get all tasks
export const getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

// Create task
export const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title required" });
    }
    const task = await Task.create({ title });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update task
export const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(task);
};

// Delete task
export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};

// Toggle status
export const toggleStatus = async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.completed = !task.completed;
  await task.save();
  res.json(task);
};

// Search
export const searchTasks = async (req, res) => {
  const q = req.query.q;
  const tasks = await Task.find({
    title: { $regex: q, $options: "i" },
  });
  res.json(tasks);
};