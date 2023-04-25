import React from "react";

import Input from "../../Shared/Components/FormElements/Input";
import Button from "../../Shared/Components/FormElements/Button";
import { useForm } from "../../Shared/Hooks/form-hook";
import { AuthContext } from "../../Shared/context/auth-context";
import { useContext } from "react";
import{useHttpClient} from "../../Shared/Hooks/http-hook";
import { useNavigate } from "react-router-dom";

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../Shared/Util/validators";

import "./PlaceForm.css";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";
import ImageUpload from "../../Shared/Components/FormElements/ImageUpload";

const NewPlace = () => {
  const navigate=useNavigate()
  const auth=useContext(AuthContext)
  
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,

      },
      image:{
        value:"",
        isValid:false
      }
    },
    false
  );
  const Auth=useContext(AuthContext)
  const{sendRequest,isLoading}=useHttpClient()
  const addPlaceHandler = async(event) => {
    event.preventDefault();
    //console.log(formState);

    try{
    const formData=new FormData();
    formData.append('title',formState.inputs.title.value)
    formData.append('address',formState.inputs.address.value)
    formData.append('description',formState.inputs.description.value)
    formData.append('creator',Auth.userId)

    formData.append('image',formState.inputs.image.value)
    await sendRequest("http://localhost:5000/api/places",
    "POST",
    formData,
    {Authorization :'Bearer '+ auth.token}
    // JSON.stringify({
    //   title:formState.inputs.title.value,
    //   address: formState.inputs.address.value,
    //   description:formState.inputs.description.value,
    //   creator: Auth.userId
    
    // }),
    

    // {
    //   "Content-Type":"application/json"
    // }
    
    
    )
    navigate('/'+ auth.userId +'/places')
    }catch(err){
      
    }
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <>
      <form className="place-form" onSubmit={addPlaceHandler}>
        <h3>Share place</h3>
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter some value"
          onInput={inputHandler}
        />

        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Please enter some valid description"
          onInput={inputHandler}
        />

        <Input
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter some address"
          onInput={inputHandler}
        />
       <ImageUpload 
       id='image' 
       center 
       onInput={inputHandler} 
       errorText="please  an image"
       />


        <Button type="submit" disabled={!formState.isValid}>
          Add Place
        </Button>
      </form>
    </>
  );
};

export default NewPlace;
