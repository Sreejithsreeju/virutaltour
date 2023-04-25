import React, { useState, useContext } from "react";

import Card from "../../Shared/Components/UIElements/Card";
import Input from "../../Shared/Components/FormElements/Input";
import Button from "../../Shared/Components/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../Shared/Util/validators";
import { useForm } from "../../Shared/Hooks/form-hook";
import { AuthContext } from "../../Shared/context/auth-context";
import ErrorModal from '../../Shared/Components/UIElements/ErrorModal'
import LoadingSpinner from '../../Shared/Components/UIElements/LoadingSpinner'
import "./Auth.css";
import {useHttpClient} from "../../Shared/Hooks/http-hook"
import ImageUpload from "../../Shared/Components/FormElements/ImageUpload";

const Auth = () => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const{isLoading, error, sendRequest,clearError}=useHttpClient()

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: " ",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: null,
          image:null
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: undefined,
            isValid: false,
          },
          image:{
            value:null,
            isValid:false
          }
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (e) => {
    e.preventDefault();
     //console.log(formState.inputs);
     //setIsLoading(true);

    if (isLoginMode) {
      try {
        const responseData= await sendRequest("http://localhost:5000/api/users/login", 
           "POST",
           JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        
        
        auth.login(responseData.userId,responseData.token);

        
        
      } catch (err) {
        // console.log(err);
        // setIsLoading(false);
        // setError(err.message || "Something went wrong, please try again later");
      }
    } else {
      try {


        const formData=new FormData();
        formData.append('name',formState.inputs.name.value)
        formData.append('email',formState.inputs.email.value)
        formData.append('password',formState.inputs.password.value)
        formData.append('image',formState.inputs.image.value)


        const responseData= await sendRequest("http://localhost:5000/api/users/signup", 
           "POST",
          formData
            //body http hook
          //  JSON.stringify({
          //   name: formState.inputs.name.value,
          //   email: formState.inputs.email.value,
          //   password: formState.inputs.password.value,
          // }),
          //  {
          //   "Content-Type": "application/json",
          // },
          
        );

        
        
        auth.login(responseData.userId,responseData.token);
       
        
      } catch (err) {
        // console.log(err);
        // setIsLoading(false);
        // setError(err.message || "Something went wrong, please try again later");
      }
   }

  };

  

  return (
    <>
    <ErrorModal error={error} onClear = {clearError}/>
    <Card className="authentication">
      {isLoading && <LoadingSpinner asOverLay />}
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            element="input"
            id="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE]}
            errorText="Please enter a name."
            onInput={inputHandler}
          ></Input>
        )}
        {!isLoginMode && <ImageUpload id='image' center onInput={inputHandler} errorText="please provide an image" />}
        <Input
          element="input"
          id="email"
          type="email"
          label="Email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address"
          onInput={inputHandler}
        ></Input>
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password"
          onInput={inputHandler}
        ></Input>
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? "LOGIN" : "SIGNUP"}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
      </Button>
    </Card>
    </>
    
  );
};

export default Auth;