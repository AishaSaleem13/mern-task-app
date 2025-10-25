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
    dispatch(clearupdate())
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
    <div className="hero bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex flex-col md:flex-row items-center justify-center p-6 gap-12">
      <div className="card bg-base-100 w-full max-w-md shadow-2xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Task 📝</h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="label block mb-1">Title:</label>
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label block mb-1">Task:</label>
            <textarea
              placeholder="Enter description"
              value={tasks}
              onChange={(e) => setTasks(e.target.value)}
              className="textarea textarea-bordered w-full h-24"
            />
          </div>

          <button type="submit" className="btn bg-blue-600 w-full mt-4">
            {taskToEdit ? "Update" : "Save"}
          </button>
        </form>
       
      </div>
      <div className="ml-4">
       <PandaKeyboard/>




<BlurText
  text="Work now,Procrastinate later!!"
  delay={150}
  animateBy="words"
  direction="top"
  className="text-2xl mb-8 text-blue-700 font-extrabold tracking-wider"
/>
       </div>
    </div>
  );
}

export default Hero1;
