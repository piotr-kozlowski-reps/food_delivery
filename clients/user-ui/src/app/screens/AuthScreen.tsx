import React, { useState } from "react";
import Login from "../shared/Auth/Login";
import Signup from "../shared/Auth/Signup";

const AuthScreen = () => {
  const [activeState, setActiveState] = useState("Login");

  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-screen bg-[#00000032]">
      <div className="w-[500px]  bg-slate-900 rounded shadow-sm p-3">
        {activeState === "Login" && <Login setActiveState={setActiveState} />}
        {activeState === "Signup" && <Signup setActiveState={setActiveState} />}
      </div>
    </div>
  );
};

export default AuthScreen;
