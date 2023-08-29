import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../styles/global.styles.css'; // Import AddBeerModalStyles.css
import beerImage from '../assets/images/HouzzBeer.png'


function AddBeerModal({ isOpen, onClose, onSave }) {
    const [beerData, setBeerData] = useState({
        name: '',
        genre: '',
        description: '',
      });
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBeerData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSave = () => {
        onSave(beerData);
    
        // Clear the input fields
        setBeerData({
          name: '',
          genre: '',
          description: '',
        });
    
        // Close the modal
        onClose();
      };
    
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Add a New Beer</DialogTitle>
      <DialogContent>
        {/* Image */}
        <img
          alt="Beer"
          src={beerImage}
          className="beer-image"
        />
        {/* Form inputs */}
        <TextField
          label="Beer Name"
          name="name"
          value={beerData.name}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <TextField
          label="Genre"
          name="genre"
          value={beerData.genre}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={beerData.description}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
        />
        {/* Save button */}
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default AddBeerModal;
