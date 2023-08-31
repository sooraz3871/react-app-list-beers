import React, { Fragment, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import '../styles/global.styles.css'
import AddBeerModal from './addBeer.modal.component';
import { Box, Button } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import beerImage from '../assets/images/HouzzBeer.png'
import Tooltip from '@mui/material/Tooltip';
import NoBeerComponent from './noBeer.component';


export default function BeerList({ beers ,addBeers,myBeers}) {

  const [selectedTab, setSelectedTab] = React.useState(0);
  const [itemsToShow, setItemsToShow] = React.useState(10); // Number of items to display initially
  const [isModalOpen, setIsModalOpen] = useState(false);
  const listItemRef = React.useRef(null);



  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };


  const handleAddBeer = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveBeer = (beerData) => {
    const newBeer = {
      id: uuidv4(),
      image_url: beerImage,
      ...beerData
    };
    addBeers(newBeer)
  };


  const handleAddBeerClick = () => {
    setIsModalOpen(true);
  };

  const filteredData = selectedTab === 0 ? beers : myBeers;

  return (
    <div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 10 }}>
        <Box sx={{ width: '100%', maxWidth: 720, display: 'flex' }}>
          <Tabs value={selectedTab} onChange={handleTabChange} >
            <Tab label="All Beers" style={{ textTransform: 'none' }} />
            <Tab label="My Beers" style={{ textTransform: 'none' }} />
          </Tabs>
          {selectedTab === 1 && (
            <Button variant="contained" onClick={handleAddBeer} sx={{ marginLeft: 'auto',textTransform: 'none' }} size='small' >
              Add a new beer
            </Button>
          )}
        </Box>
       {filteredData.length === 0 && (
          <NoBeerComponent onAddBeerClick={handleAddBeerClick} />
        )}  
        <List sx={{ width: '100%', maxWidth: 720, bgcolor: 'background.paper' }}>
          {filteredData.slice(0, itemsToShow).map((beer, index) => (
            <React.Fragment key={beer?.id}>
              <ListItem alignItems="flex-start"
              className="list-item" 
                ref={index === 0 ? listItemRef : null}
                key={beer.id}
                sx={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                  marginBottom: '10px'
                }}>
                <Tooltip title="Ingredients: hopes,water grains" placement="top" arrow
                  sx={{
                    width: 30
                  }}
                >
                  <ListItemAvatar>
                    <div
                      alt={beer?.name}
                      style={{
                        width: '40px',
                        height: '150px',
                        overflow: 'hidden',
                        borderRadius: '8px',
                        background: `url(${beer.image_url}) no-repeat center center`,
                        backgroundSize: 'cover',
                      }}
                    />
                  </ListItemAvatar>
                </Tooltip>
                <ListItemText
                  primary={
                    <Typography
                      component="span"
                      variant="body1"
                      color="text.primary"
                      sx={{ fontWeight: 'bold' }}
                    >
                      {beer.name}
                    </Typography>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline', color: 'orange' }}
                        component="span"
                        variant="body2"
                      >
                        {beer?.ingredients?.yeast || beer?.genre}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {beer?.description}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
        {
          itemsToShow < filteredData.length && (
            <div
              style={{
                marginTop: '16px',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={() => setItemsToShow(itemsToShow + 10)}
            >
              <Typography
                variant="body2"
                color="primary"
                sx={{ marginRight: '8px', display: 'flex', alignItems: 'center' }}
              >
                Load More
                <ArrowDropDownIcon />
              </Typography>
            </div>
          )
        }
      </div >

      {/* Add Beer Modal */}
      < AddBeerModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveBeer}
      />
    </div >
  );
}
