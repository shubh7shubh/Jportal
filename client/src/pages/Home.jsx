import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div>
      <button
        className="float-end m-4 bg-red-400 px-5 py-3 rounded-md"
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
    </div>
  );
};

export default Home;
