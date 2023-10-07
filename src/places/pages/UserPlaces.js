import React, { useEffect, useState } from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hooks";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const UserPlaces = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState();

  //   useParams().userId; - useParams() function returns an object containing the url params.
  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      let response;
      try {
        response = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/places/user/" + userId
        );

        setLoadedPlaces(response.places);
      } catch (err) {}
    };

    fetchPlaces();
  }, [sendRequest]); // it will only run once. as sendRequest object will be created once and wrapped within useHttpClient

  const placeDeletedHandler = (deletedPlacesId) => {
    setLoadedPlaces((prevPlaces) => {
      return prevPlaces.filter((place) => place.id != deletedPlacesId);
    });
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDelete={placeDeletedHandler} />
      )}
    </React.Fragment>
  );
};

export default UserPlaces;
