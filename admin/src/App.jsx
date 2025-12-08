import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
function App() {
  const url = "https://cravex-a-food-app-backend.onrender.com";
  return (
    <>
      <div className="app">
        <Navbar />

        <div className="app-body">
          <Sidebar />

          <div className="app-content">
            <Routes>
              <Route path="/add" element={<Add url={url} />} />
              <Route path="/list" element={<List url={url} />} />
              <Route path="/orders" element={<Orders url={url} />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
