import React, { useContext } from "react";
import BeerList from "../../components/list.component";
import { BeerContext } from "../../contexts/BeerContext";

function ListPage() {

  const { beers,myBeers,addBeers,loading } = useContext(BeerContext);

  return (
    <div>
        <BeerList
          beers={beers}
          addBeers={addBeers}
          myBeers={myBeers}
        />
    </div>
  );
}

export default ListPage;