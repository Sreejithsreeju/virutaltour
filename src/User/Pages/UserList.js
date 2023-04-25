import React from "react";
import "./UsersList.css";
import UserItem from "./UserItem";

const UserList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No user found</h2>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {props.items.map((item) => {
        return (
          
          
          <UserItem
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            placeCount={item.places.length}
          />
          
        );
      })}
    </ul>
  );
};

export default UserList;
