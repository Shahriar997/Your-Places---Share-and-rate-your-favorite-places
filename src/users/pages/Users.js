import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import axios from "axios";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState();

  // empty array in the second param because i want it to never rerun
  useEffect(() => {
    // didn't used async directly in the useEffect because it is a bad practise.
    //useEffect do not expect a async function
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/users', {
          headers: {
            "Content-Type": "application/json"
          }
        });
        setLoadedUsers(response.data.users);
        setIsLoading(false);
      } catch(err) {
        setIsLoading(false);
        setError(err.response? err.response.data.message : 'Something Went Wrong. Please Try Again');
      }
    }

    sendRequest();
  }, []);

  const errorHandler = () => {
    setError(null);
  }

  return (
    <React.Fragment>
      <ErrorModal
        error={error}
        onClear={errorHandler}
      />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
