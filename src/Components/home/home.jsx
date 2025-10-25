import React, { useEffect, useState } from "react";
import { getapi, getdelete } from "../../Config/api";
import AnimatedCards from "./cardss";
import pic1 from "../../assets/pen.jpg";
import pic2 from "../../assets/delete.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTask, clearupdate } from "../../../Store/update";

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getData = async () => {
    setLoading(true);
    try {
      const res = await getapi();
      setData(res.Data );
    } catch (error) {
      alert("Error fetching tasks. Please try again later.");
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await getdelete(id);
      getData(); 
    } catch (error) {
      alert("Error deleting task. Please try again later.");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Today’s <span className="text-blue-600">Tasks</span>
        </h1>
        <p className="text-gray-500 mt-2">Stay on top of your goals — one task at a time!</p>
      </div>
      <div className="flex justify-center mb-12">
        <AnimatedCards />
      </div>


      {loading ? (
        <p className="text-gray-500 text-lg font-medium animate-pulse text-center mt-16">
          Loading tasks...
        </p>
      ) : data && data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {data.map((t) => (
            <div
              key={t._id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-3">{t.title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{t.tasks}</p>

              <div className="mt-5 flex justify-end gap-3">
                <img
                  src={pic1}
                  alt="edit"
                  onClick={() => {
                    dispatch(updateTask(t));
                    navigate("/");
                  }}
                  className="w-7 h-7 cursor-pointer hover:scale-110 transition"
                />
                <img
                  src={pic2}
                  alt="delete"
                  onClick={() => handleDelete(t._id)}
                  className="w-7 h-7 cursor-pointer hover:scale-110 transition"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-lg font-medium text-center mt-20">
          No tasks found. Add a new one to get started ✏️
        </p>
      )}

      <button
        className="rounded-full px-8 py-2 text-xl text-white bg-blue-900 fixed bottom-10 right-10"
        onClick={() => {
          dispatch(clearupdate());
          navigate("/");
        }}
      >
        +
      </button>
    </div>
  );
}

export default Home;
