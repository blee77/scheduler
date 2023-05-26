import { useState } from 'react';

const useVisualMode = (initialMode) => {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);
  
  const transition = (newMode, replace = false) => {
    setMode(newMode);
    setHistory((prevHistory) => {
      if (replace) {
        const newHistory = [...prevHistory];
        newHistory.pop();
        return [...newHistory, newMode];
      } else {
        return [...prevHistory, newMode];
      }
    });
  };
  

  const back = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
     
      setMode(newHistory[newHistory.length - 1]);
    } 
    
  };
  return {
    mode,
    transition,
    back,
  };
};

export default useVisualMode;
