import React, { createContext, useState, useEffect } from "react";

import axiosClient from "../axios";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

export const BeerContext = createContext();

const BeerContextProvider = ({ children }) => {
  const [beers, setBeers] = useState([]);
  const [myBeers, setMyBeers] = useState([]);

  // Snackbar
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    // Fetch beers from the API when the component mounts
    fetchBeers();
  }, [setBeers]);

  const fetchBeers = async () => {
    try {
      const response = await axiosClient.get("/beers");
      const beersData = response?.data;
      setBeers(beersData);
    } catch (error) {

      showSnackbar("Error fetching beers", "error");
    }
  };

  const addBeers = async (item) => {
    try {
      setMyBeers([...myBeers, item]);
      showSnackbar("Your Beer Was Successfully Added", "success");
    } catch (error) {
      showSnackbar("Error while adding a beer", "error");
    }
  };


  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setIsSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <BeerContext.Provider
      value={{
        beers,
        addBeers,
        myBeers
      }}
    >
      {children}
      {/* Snackbar alert */}
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </BeerContext.Provider>
  );
};

export default BeerContextProvider;