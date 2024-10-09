import { Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [openCategory, setOpenCategory] = useState(null);

  const categories = [
    "Sales & Marketing",
    "Creative",
    "Human Resource",
    "Administration",
    "Digital Marketing",
    "Development",
    "Engineering",
  ];

  const toggleCategory = (index) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div>
      <button
        className="float-end m-4 bg-red-400 px-4 py-2 rounded-md"
        onClick={handleLogout}
      >
        Logout
      </button>
      <div className="flex flex-col gap-4 items-center">
        <h1>HomePage</h1>
        <Button variant="contained" onClick={() => navigate("/jobs")}>
          Go to Jobs Page
        </Button>
      </div>
      {/* <div className=""> */}
      <div className="container px-48 mb-10  mt-10">
  
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">
            BROWSE OPEN POSITIONS BY CATEGORY
          </h1>
          <p className="text-lg text-gray-500">
            We are always on the lookout for talented people
          </p>
        </div>

   
        <div className="mt-10 space-y-4">
          {categories.map((category, index) => (
            <div key={index} className="border border-gray-300 rounded-lg">
              <div
                className="flex justify-between items-center p-4 cursor-pointer"
                onClick={() => toggleCategory(index)}
              >
                <h2 className="text-lg font-semibold">{category}</h2>
                <span className="text-2xl">
                  {openCategory === index ? "-" : "+"}
                </span>
              </div>
              {openCategory === index && (
                <div className="px-4 pb-4 text-gray-600">
              
                  <p>Open positions for {category}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>

    // </div>e
  );
};

export default Home;
