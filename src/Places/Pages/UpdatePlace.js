import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Input from "../../Shared/Components/FormElements/Input";
import Button from "../../Shared/Components/FormElements/Button";
import { useForm } from "../../Shared/Hooks/form-hook";
import { useHttpClient } from "../../Shared/Hooks/http-hook";
import ErrorModal from "../../Shared/Components/UIElements/ErrorModal";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Shared/context/auth-context";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../Shared/Util/validators";

import "./PlaceForm.css";

// const PLACES = [
//   {
//     id: "p1",
//     title: "Palakkad Fort",
//     description: "Built by Hyder Ali",
//     image:
//       "https://medium.com/@GoGeoHolidays/walls-of-majesty-a-peep-into-the-story-of-palakkad-fort-fd4280fd7ec4",
//     address: "Kotta Maidanam, Palakkad",
//     creator: "u1",
//     location: {
//       lat: 10.7637057,
//       lng: 76.6549328,
//     },
//   },

//   {
//     id: "p2",
//     title: "Malampuzha Garden",
//     description: "Major Irrigation project in palakkad",
//     image:
//       "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/e0/95/9b/malampuzha-garden-and.jpg?w=1200&h=1200&s=1",
//     address: "Malampuzha, Palakkad",
//     creator: "u2",
//     location: {
//       lat: 10.8419638,
//       lng: 76.6471837,
//     },
//   },

//   {
//     id: "p3",
//     title: "Nelliyampathy",
//     description: "Hill station in palakkad",
//     image:
//       

//     address: "Nelliyampathy, Palakkad",
//     creator: "u2",
//     location: {
//       lat: 10.5346967,
//       lng: 76.6860446,
//     },
//   },
// ];

const UpdatePlace = () => {

  const auth = useContext(AuthContext)

  const navigate = useNavigate()
  const placeId = useParams().pid;

  const [loadedPlaces, setLoadedPlaces] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  //const identifiedPlace = PLACES.find((p) => p.id === placeId);

  useEffect(() => {
    const fetchPlaces = async () => {
      const responseData = await sendRequest(
        `http://localhost:5000/api/places/${placeId}`
      );
      setLoadedPlaces(responseData.place);
      setFormData(
        {
          title: {
            value: responseData.place.title,
            isValid: true,
          },
          description: {
            value: responseData.place.description,
            isValid: false,
          },
        },
        true
      );
    };

    fetchPlaces();
  }, [sendRequest, placeId, setFormData]);

  const updateHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: 'Bearer '+auth.token
        }

      );

      navigate('/'+ auth.userId +'/places')
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isLoading && !error) {
    <div className="center">
      <h2>Place not found</h2>
    </div>;
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlaces && (
        <form className="place-form" onSubmit={updateHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Enter some valid title"
            onInput={inputHandler}
            value={loadedPlaces.title}
            valid={true}
          />

          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Enter some description"
            onInput={inputHandler}
            value={loadedPlaces.description}
            valid={true}
          />

          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </>
  );
};

export default UpdatePlace;