import React, { createContext, useState, useEffect } from "react";

import axiosClient from "../axios";
// import { Snackbar } from "@mui/material";
// import MuiAlert from "@mui/material/Alert";
// import languages from "../helpers/language";

export const BeerContext = createContext();

const BeerContextProvider = ({ children }) => {
  const [beers, setBeers] = useState([]);
  //loader
  const [loading, setLoading] = useState(false);

  // Snackbar
  // const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  // const [snackbarMessage, setSnackbarMessage] = useState("");
  // const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    // Fetch beers from the API when the component mounts
    fetchBeers();
  }, [setBeers]);

  const fetchBeers = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get("/beers");
      setLoading(false);
      // console.log("<<<<<<beers RESPONSE >>>>", response);
      const beersData = response?.data;
      setBeers(beersData);
      console.log(beersData)
    } catch (error) {
      // setLoading(false);
      // showSnackbar("Error fetching beers", "error");
      // console.error("Error fetching beers:", error);
    }
  };

  const addBeers = async (item) => {
    try {
      const response = await axiosClient.post("/beers", item);
      // console.log("Add Response ", response);
      setBeers([...beers, item]);
      // showSnackbar(language?.success?.ADDED, "success");
    } catch (error) {
      // showSnackbar("Error while adding a beer", "error");
      // console.error("Error adding product:", error);
    }
  };


  // const showSnackbar = (message, severity) => {
  //   setSnackbarMessage(message);
  //   setSnackbarSeverity(severity);
  //   setIsSnackbarOpen(true);
  // };

  // const handleCloseSnackbar = () => {
  //   setIsSnackbarOpen(false);
  // };

  return (
    <BeerContext.Provider
      value={{
        beers,
        addBeers,
        loading,
      }}
    >
      {children}
      {/* Snackbar alert */}
      {/* <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar> */}
    </BeerContext.Provider>
  );
};

export default BeerContextProvider;