import React, { useEffect, useState } from "react";
import { setFilter } from "../../../Store/filter";
import { useDispatch, useSelector } from "react-redux";
import { getapi, getdelete, getupdate } from "../../Config/api";
import pic2 from "../../assets/delete.jpg";

const TodoApp = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all tasks
  const getData = async () => {
    setLoading(true);
    try {
      const res = await getapi();
      setData(res.Data);
    } catch (error) {
      alert("Error fetching tasks. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Toggle task completion
  const toggle = async (task) => {
    const updatedTask = { ...task, completed: !task.completed };
    try {
      await getupdate(task._id, updatedTask);
      // Optimistically update local state
      setData((prev) =>
        prev.map((t) => (t._id === task._id ? updatedTask : t))
      );
    } catch (error) {
      alert("Error updating task. Please try again.");
    }
  };

  // Delete task
  const removeTask = async (id) => {
    try {
      await getdelete(id);
      // Optimistically remove from local state
      setData((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      alert("Error deleting task. Please try again.");
    }
  };

  // Apply filter
  const filteredTasks = data.filter((task) => {
    if (filter === "completed") return task.completed === true;
    if (filter === "pending") return task.completed === false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">💙 My Tasks</h1>
        <p className="text-gray-600 mt-1">October 26, 2025</p>
      </header>

      {/* Filter buttons */}
      <div className="flex justify-center gap-4 mb-6">
        {["all", "pending", "completed"].map((f) => (
          <div
            key={f}
            className={`px-4 py-2 rounded-lg cursor-pointer transition-colors duration-300 ${
              filter === f ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"
            }`}
            onClick={() => dispatch(setFilter(f))}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </div>
        ))}
      </div>

      {/* Task list */}
      <div className="max-w-3xl mx-auto">
        {loading ? (
          <p className="text-center text-gray-500 animate-pulse">Loading tasks...</p>
        ) : filteredTasks.length > 0 ? (
          filteredTasks.map((t) => (
            <div
              key={t._id}
              className="flex items-center justify-between bg-white p-4 mb-3 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => toggle(t)}
                  className="w-5 h-5 cursor-pointer accent-blue-600"
                />
                <span
                  className={`${
                    t.completed ? "text-gray-400 line-through" : "text-gray-800"
                  }`}
                >
                  {t.title}
                </span>
              </div>
              <img
                src={pic2}
                alt="delete"
                onClick={() => removeTask(t._id)}
                className="w-7 h-7 cursor-pointer hover:scale-110 transition"
              />
            </div>
          ))
        ) : (
          <div className="text-center mt-10">
            <div className="text-5xl mb-3">📝</div>
            <p className="text-gray-500">No tasks yet. Add one to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoApp;
