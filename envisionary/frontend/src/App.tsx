import "./styles/App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Feed from "./pages/Feed";
import Country from "./pages/Country";
import InfoPage from "./pages/InfoPage";
import React, { createContext, useState } from "react";

interface IThemeContext {
  theme: string;
  setTheme: any;
}

export const ThemeContext = React.createContext({} as IThemeContext);

function App() {
  const [theme, setTheme] = useState('dark');
  
  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/country" element={<Country />} />
          <Route path="/info-page" element={<InfoPage />} />
        </Routes>
      </Router>
    </div>
    </ThemeContext.Provider>
  );
}

export default App;
