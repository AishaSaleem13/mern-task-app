import React, { useState, useEffect } from "react";
import { postapi, getupdate } from "../../Config/api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearupdate } from "../../../Store/update";
import PandaKeyboard from "./Panda";
import BlurText from "./BlurText";

function Hero1() {
  const dispatch = useDispatch();
  const taskToEdit = useSelector((state) => state.updateTask);
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || "");
      setTasks(taskToEdit.tasks || "");
    }
  }, [taskToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !tasks) {
      alert("Please fill in all fields");
      return;
    }

    try {
      if (taskToEdit) {
        await getupdate(taskToEdit._id, { title, tasks });
        dispatch(clearupdate());
        alert("Task updated successfully!");
      } else {
        await postapi({ title, tasks });
        alert("Task added successfully!");
      }

      navigate("/mainpage");
    } catch (error) {
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="hero bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen flex flex-col md:flex-row items-center justify-center p-8 gap-12">
      
      {/* Form Card */}
      <div className="card bg-white w-full md:w-2/5 shadow-2xl p-8 rounded-2xl border border-gray-200">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
          {taskToEdit ? "Update Task 📝" : "Add Task 📝"}
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="label block mb-2 text-lg font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full text-lg px-4 py-3 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="label block mb-2 text-lg font-medium text-gray-700">
              Task
            </label>
            <textarea
              placeholder="Enter description"
              value={tasks}
              onChange={(e) => setTasks(e.target.value)}
              className="textarea textarea-bordered w-full h-36 text-lg px-4 py-3 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="btn bg-blue-600 hover:bg-blue-700 w-full py-3 text-lg font-semibold rounded-lg transition-all duration-200"
          >
            {taskToEdit ? "Update" : "Save"}
          </button>
        </form>
      </div>
      <div className="flex flex-col items-center md:ml-16">
        {/* panda pic  */}
        <div className="w-72 md:w-96">
          <PandaKeyboard />
        </div>
        <BlurText
          text="Work now, nap like a champ!"
          delay={100}
          animateBy="words"
          direction="top"
          className="text-xl md:text-2xl mt-6 text-blue-700 font-mono text-center"
        />
      </div>
    </div>
  );
}

export default Hero1;
