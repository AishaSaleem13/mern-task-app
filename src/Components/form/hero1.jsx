import React, { useState } from "react";

import BlurText from "./BlurText";
import PandaKeyboard from "./Panda";
 import { postapi } from "../../Config/api";
 import { useNavigate } from "react-router-dom";
function Hero1() {
const [task,settask]=useState("")
const [title,settitle]=useState("")

const navigate=useNavigate()
const getdata = async (e) => {
  try {
      e.preventDefault();
        if (!title || !task  ) {
            alert('Please fill in all fields');
            return;
        }
    const res= await postapi({task,title})
    console.log(res)
    if(res){
      alert("Task added successfully!");
      settask("");
      settitle("");
      navigate("/mainpage")
      return
    }
  } catch (error) {
    
alert('An error occurred while posting your task. Please try again later.');
  }
}

const handletitle= (e)=>{
  settitle(e.target.value)
}
const handledescription=(e)=>{
  settask(e.target.value)
}



  return (
    <div className="hero bg-gradient-to-br from-gray-50 to-gray-100  min-h-screen flex flex-col md:flex-row items-center justify-center p-6 gap-12">
      {/* Form Card */}
      <div className="card bg-base-100 w-full max-w-md shadow-2xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Task 📝</h2>
        <fieldset className="space-y-5">
          <div>
            <label className="label block mb-1">Title:</label>
            <input
              type="text"
              placeholder="Enter title"
             value={title}
              onChange={handletitle}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label block mb-1">Task:</label>
            <textarea
              placeholder="Enter description"
            value={task}
              onChange={handledescription}
              className="textarea textarea-bordered w-full h-24"
            />
          </div>

        

          {/* Submit Button */}
          <button className="btn bg-blue-600 w-full mt-4"
          onClick={getdata}>Save</button>
        </fieldset>
      </div>

      {/* Panda and motivational line */}
      <div className="flex flex-col items-center md:ml-20">
        <div className="w-72 md:w-96">
          <PandaKeyboard />
        </div>
        <BlurText
          text="Work now, nap like a champ!"
          delay={100}
          animateBy="words"
          direction="top"
          className="text-xl md:text-2xl mt-4 text-blue-600 font-mono text-center"
        />
      </div>
    </div>
  );
}

export default Hero1;
