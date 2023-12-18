import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const useDataContext = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [sharedData, setSharedData] = useState("");
  const [favData, setFavData] = useState("");

  const handleDataChange = (newData) => {
    setSharedData(newData);
  };
  const handleFavChange = (newData) => {
    setFavData(newData);
  };

  return (
    <DataContext.Provider
      value={{ sharedData, handleDataChange, favData, handleFavChange }}
    >
      {children}
    </DataContext.Provider>
  );
};
