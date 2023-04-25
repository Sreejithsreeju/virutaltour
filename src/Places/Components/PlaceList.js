import React from "react";

import './PlaceList.css'

import Card from "../../Shared/Components/UIElements/Card";
import PlaceItem from "./PlaceItem";

const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h1>No places found</h1>
          <button>Share place</button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map(place => 
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
          onDelete={props.onDelete}
//onDelete={}

        />
      )}
    </ul>
  );
};

export default PlaceList;
