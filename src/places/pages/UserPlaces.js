import React from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scraper in the world",
    imageUrl:
      "https://images.unsplash.com/photo-1428366890462-dd4baecf492b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=ben-dumond-VedK8_UlmkY-unsplash.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: "40.7484402",
      lng: "-73.9943977",
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Emp. State Building",
    description: "One of the most famous sky scraper in the world",
    imageUrl:
      "https://images.unsplash.com/photo-1428366890462-dd4baecf492b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=ben-dumond-VedK8_UlmkY-unsplash.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: "40.7484402",
      lng: "-73.9943977",
    },
    creator: "u2",
  },
];

const UserPlaces = () => {
//   useParams().userId; - useParams() function returns an object containing the url params.
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId)
  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
