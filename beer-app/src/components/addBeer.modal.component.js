import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as yup from 'yup'; // Import Yup
import { useFormik } from 'formik'; // Import useFormik
import '../styles/global.styles.css'; // Import AddBeerModalStyles.css
import beerImage from '../assets/images/HouzzBeer.png';

// Validation schema using Yup
const validationSchema = yup.object({
  name: yup.string().required('Beer Name is required'),
  genre: yup.string().required('Genre is required'),
  description: yup.string().required('Description is required'),
});

function AddBeerModal({ isOpen, onClose, onSave }) {
  const formik = useFormik({
    initialValues: {
      name: '',
      genre: '',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSave(values);

      // Clear the input fields
      formik.resetForm();

      // Close the modal
      onClose();
    },
  });

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Add a New Beer</DialogTitle>
      <DialogContent>
        {/* Image */}
        <img alt="Beer" src={beerImage} className="beer-image" />
        {/* Form inputs */}
        <TextField
          label="Beer Name*"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          variant="outlined"
          margin="normal"
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          label="Genre*"
          name="genre"
          value={formik.values.genre}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          variant="outlined"
          margin="normal"
          error={formik.touched.genre && Boolean(formik.errors.genre)}
          helperText={formik.touched.genre && formik.errors.genre}
        />
        <TextField
          label="Description*"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />
        {/* Button container */}
        <div className="modal-button-container">
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={formik.handleSubmit}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddBeerModal;
