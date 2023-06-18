import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { apiUrl } from "./api/apiUrl";
import TopNav from "./components/navigation/topNav";
import SideNav from "./components/navigation/sideNav";
import Home from "./pages/home";
import Footer from "./components/footer";
import Movies from "./pages/movies";
import Genres from "./pages/genres";

import "./App.scss";

export const NavigationContext = React.createContext();

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <div className="app-container">
        <BrowserRouter>
          <NavigationContext.Provider value={{ showSidebar, setShowSidebar }}>
            <SideNav />
            <TopNav apiUrl={apiUrl} />
          </NavigationContext.Provider>

          <Routes>
            <Route path="/" element={<Home apiUrl={apiUrl} />} />
            <Route path="/movies" element={<Movies apiUrl={apiUrl} />} />
            <Route path="/genres" element={<Genres apiUrl={apiUrl} />} />
          </Routes>

          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
