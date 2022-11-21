import "./styles/App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Feed from "./pages/Feed";
import Country from "./pages/Country";
import InfoPage from "./pages/InfoPage";
import React, { useEffect, useState } from "react";
import ThemeToggle from './context/ThemeToggle';
import { Box } from "@mui/material";
import { useRecoilState } from "recoil";
import { toggleColorTheme } from "./states/states";

interface IThemeContext {
  theme: string;
  setTheme: any;
}

export const ThemeContext = React.createContext({} as IThemeContext);

function App() {
  const [theme, setTheme] = useState('dark');
  const [toggleColor, setToggleColor] = useRecoilState(toggleColorTheme);

  useEffect(() => {
    setToggleColor(theme === 'dark' ? '#ffffff' : '#000000');
  }, [theme]);
  
  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
    <main className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/country" element={<Country />} />
          <Route path="/info-page" element={<InfoPage />} />
        </Routes>
      </Router>
      <Box sx={{ mb: "200px", mt: "20px", color: toggleColor}}><ThemeToggle /></Box>
    </main>
    </ThemeContext.Provider>
  );
}

export default App;
