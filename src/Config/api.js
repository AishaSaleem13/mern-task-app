 export  const getapi= async () => {
  try {
      const res= await fetch("https://todo-backend-app-lilac.vercel.app/api/tasks")
    const data= await res.json()
    return data
  } catch (error) {
    console.error('Error in get api :', error);
  }
}

export const postapi= async (postData) => {
    try {
            const res = await fetch("https://todo-backend-app-lilac.vercel.app/api/tasks", {
      method: "POST",
    
      headers: {
        // Authorization: `Bearer ${userToken}` 
       'Content-Type': 'application/json',
      },
      body: JSON.stringify({
                title: postData.title,
                tasks:postData.tasks,
            })
    });
     const result = await res.json()
        return result

  


    } catch (error) { 
        alert('Something went wrong',error);
    }
 }


export const getdelete = async (id) => {
  try {
    const res = await fetch(`https://todo-backend-app-lilac.vercel.app/api/tasks${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};
export const getupdate = async (id,updatedData) => {
  try {
    const res = await fetch(`https://todo-backend-app-lilac.vercel.app/api/tasks${id}`, {
      method: "PUT",
       headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData), 
    });
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error IN UPDATING TASK task:", error);
  }
};

