import { Box, Button } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Advert from "../components/Advert";
import CustomAppBar from "../components/CustomAppBar";
import * as constants from "../utilities/constants";

export default function AdvertList({ adverts, buttonLabel, handleAction, setAdvert }) {
  return (
    <div>
      {adverts == null || adverts.length < 1 ? (
        <div>
          <h1>No adverts</h1>
        </div>
      ) : (
        adverts.map((advert) => (
            <Advert
              advert={advert}
              setAdvert={setAdvert}
              buttonLabel={buttonLabel}
              handleAction={handleAction}
            />
        ))
      )}
    </div>
  );
}
