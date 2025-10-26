import React, { useEffect, useState } from "react";
import { setFilter } from "../../../Store/filter";
import { useDispatch, useSelector } from "react-redux";
import { getapi, getdelete, getupdate } from "../../Config/api";
import pic2 from "../../assets/delete.jpg";

const TodoApp = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await getapi();
      setData(res.Data);
    } catch (error) {
      alert("Error fetching tasks. Please try again later.");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const toggle = async (task) => {
    const updatedTask = { ...task, completed: !task.completed };
    await getupdate(task._id, updatedTask);
    getData();
  };
  const removeTask = (id) => {
    setData((prev) => prev.filter((t) => t._id !== id));
  };

  const filteredTasks = data.filter((task) => {
    if (filter === "completed") return task.completed === true;
    if (filter === "pending") return task.completed === false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">💙 My Tasks</h1>
        <p className="text-gray-600 mt-1">October 26, 2025</p>
      </header>
      <div className="flex justify-center gap-4 mb-6">
        <div
          className={`px-4 py-2 rounded-lg cursor-pointer transition-colors duration-300 ${
            filter === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
          onClick={() => dispatch(setFilter("all"))}
        >
          All
        </div>

        <div
          className={`px-4 py-2 rounded-lg cursor-pointer transition-colors duration-300 ${
            filter === "pending"
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
          onClick={() => dispatch(setFilter("pending"))}
        >
          Pending
        </div>

        <div
          className={`px-4 py-2 rounded-lg cursor-pointer transition-colors duration-300 ${
            filter === "completed"
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
          onClick={() => dispatch(setFilter("completed"))}
        >
          Completed
        </div>
      </div>
      <div className="max-w-3xl mx-auto">
        {filteredTasks.length > 0 ? (
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
                <img
                  src={pic2}
                  alt="delete"
                  onClick={async () => {
                    await getdelete(t._id);
                    getData();
                  }}
                  className="w-7 h-7 cursor-pointer hover:scale-110 transition"
                />
                <span
                  className={`${
                    t.completed ? "text-gray-400 line-through" : "text-gray-800"
                  }`}
                >
                  {t.title}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-10">
            <div className="text-5xl mb-3">📝</div>
            <p className="text-gray-500">
              No tasks yet. Add one to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoApp;
