import React, { useState, useContext } from "react";
import axios from "axios";

import "./Auth.css";
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/FormElements/Input";
import Button from "../../shared/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const Auth = (props) => {
  const auth = useContext(AuthContext);
  const [isLogInMode, setIsLogInMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLogInMode) {

    } else {
      let response;
      try {
        setIsLoading(true);
        response = await axios.post('http://localhost:5000/api/users/signup', {
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          password: formState.inputs.password.value
        }, {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        setIsLoading(false);
        auth.login();
      } catch(err) {
        setIsLoading(false);
        setError(err.response? err.response.data.message : 'Something Went Wrong. Please Try Again');
      }
    }
  };

  const switchModeHandler = () => {
    if (!isLogInMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData({
          ...formState.inputs,
          name: {
            value: '',
            isValid: false,
          },
        },
        false
      );
    }
    setIsLogInMode((prevMode) => !prevMode);
  };

  const errorHandler = () => {
    setError(null);
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay/>}
        <h2>Login Required</h2>
        <form onSubmit={authSubmitHandler}>
          {!isLogInMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Enter a valid email"
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Enter a valid password, at least 5 character"
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLogInMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {!isLogInMode ? "LOGIN" : "SIGNUP"}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
