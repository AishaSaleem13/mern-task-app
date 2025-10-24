import React, { useEffect, useState } from "react";
import { getapi } from "../../Config/api";
import AnimatedCards from "./cardss";
import pic1 from "../../assets/pen.jpg";
import pic2 from "../../assets/delete.jpg";
import { getdelete } from "../../Config/api";
import { getupdate } from "../../Config/api";
function Home() {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(true);

  const getdata = async () => {
    try {
      const res = await getapi();
      console.log(res.Data);
      setdata(res.Data);
    } catch (error) {
      alert("An error occurred while getting your task. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  let getdeletedata = async (id) => {
    try {
        const res = await getdelete(id)
      
        return res
    } catch (error) {
        alert("An error occurred while deleting your task. Please try again later.");
    }
  }

  let updateddat= async (id) => {
    try {
        const res = await getupdate(id)
        console.log(res)
        if (res){
            alert("update your task ")
       getdata()
        }

        return res 

    } catch (error) {
        alert("An error occurred while updating  your task. Please try again later.");
    }
  }
  useEffect(() => {
    getdata();
  }, []);

  useEffect(()=>{
   
  },[getdeletedata])
    useEffect(()=>{
   
  },[updateddat])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-6">
      {/* Header Section */}
      <div className="text-center ">
        <h1 className="text-4xl font-bold text-gray-800">
          Today’s <span className="text-blue-600">Tasks</span>
        </h1>
        <p className="text-gray-500 mt-2">
          Stay on top of your goals — one task at a time!
        </p>
      </div>

      {/* Top Cards (Your 4 Category Cards) */}
      <div className="flex justify-center mb-12">
        <AnimatedCards />
      </div>

      {/* Tasks Display Section */}
      {loading ? (
        <div className="flex justify-center mt-16">
          <p className="text-gray-500 text-lg font-medium animate-pulse">
            Loading tasks...
          </p>
        </div>
      ) : data && data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {data.map((t, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between"
            >
              {/* Task Title */}
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                {t.title}
              </h2>

              {/* Task Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {Array.isArray(t.tasks) ? t.tasks.join(", ") : t.tasks}
              </p>

              {/* Label */}
              <div className="mt-5 flex justify-end">
                  {/* Icons */}
          <div className="flex gap-3 mt-2  justify-end">
            <img
              src={pic1}
              alt="edit"
                  onClick={async () => { await updateddat(t._id); }}
              className="w-7 h-7 cursor-pointer hover:scale-110 transition"
            />
            <img
              src={pic2}
            onClick={async () => { await getdeletedata(t._id); 
               getdata(); } }
              alt="delete"
              className="w-7 h-7 cursor-pointer hover:scale-110 transition"
            />
          </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-20">
          <p className="text-gray-500 text-lg font-medium">
            No tasks found. Add a new one to get started ✏️
          </p>
        </div>
      )}
    </div>
  );
}

export default Home;
