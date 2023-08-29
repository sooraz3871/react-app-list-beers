import React, { useContext, useState } from "react";

// import ProductList from "../../components/ProductList";
// import ProductFormDrawer from "../../components/ProductFormDrawer";
// import { ProductContext } from "../../contexts/ProductContext";
import BeerList from "../../components/list.component";
import { BeerContext } from "../../contexts/BeerContext";

function ListPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { beers,addBeers } = useContext(BeerContext);
  const [itemsToShow, setItemsToShow] = React.useState(3); // Number of items to display initially

  const loading = false


  // Function to handle adding a new product to the list
  const handleAddProduct = (newProduct) => {
    // addProducts(newProduct);
    // handleCloseDrawer();
  };


  return (
    <div>
      {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
            {/* <CircularProgress /> */}
          </div>
        ):(<>
        <BeerList
          beers={beers}
          itemsToShow={itemsToShow}
        />
      </>
      )}
    </div>
  );
}

export default ListPage;