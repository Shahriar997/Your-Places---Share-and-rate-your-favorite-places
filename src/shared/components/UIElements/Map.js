import React from "react";

import "./Map.css";

const Map = props => {
    return (
        <div> 
            <h4>
                Here, it was suppose to be a google map. But I don't have a Credit Card! :)
            </h4>
            <p>
                lat: {props.center.lat}, lng:{props.center.lng} & zoom: {props.lng}
            </p>
        </div>
    );
}

export default Map;