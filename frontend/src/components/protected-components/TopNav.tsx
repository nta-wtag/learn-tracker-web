import React from "react";
import Button from "../base-components/Button";
import { useNavigate } from "react-router-dom";

function TopNav() {
  const navigate = useNavigate();

  return (
    <div className="w-full py-4 px-8 flex justify-end sticky top-0 z-10 shadow bg-white">
      <Button text="Enroll on a course" onClick={() => navigate("/courses")} />
    </div>
  );
}

export default TopNav;
