import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const TaskPage = () => {
  return (
    <div>
      <Header />

      <aside>
        <Sidebar />
      </aside>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default TaskPage;
