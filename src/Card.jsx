import React from "react";
import "./Card.css";
import ImageGalery from "./ImageGalery";
import ReactFlipCard from "reactjs-flip-card";

const Card = () => {
  return (
    <div className="container">
      <div className="stack">
        <div className="row">
          <ReactFlipCard
            containerStyle={{
              width: "100%",
              height: "100%",
              marginBottom: "50px",
            }}
            frontComponent={
              <img
                className="img-fluid"
                src={"card-front.PNG"}
                alt="Card Front"
              />
            }
            backComponent={
              <img
                className="img-fluid"
                src={"card-back.PNG"}
                alt="Card Back"
              />
            }
          />
        </div>
        <ImageGalery />
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.908769319378!2d106.79173878553291!3d10.894537761573053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d8c05b9d312f%3A0xa786b49f0a0bbc38!2zMjYgxJAuIELDoCBIdXnhu4duIFRoYW5oIFF1YW4sIEtodSBwaOG7kSBO4buZaSwgRMSpIEFuLCBCw6xuaCBExrDGoW5nLCBWaWV0bmFt!5e0!3m2!1sen!2sus!4v1716175423630!5m2!1sen!2sus"
          className="maps"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          style={{ marginTop: "50px" }}
        ></iframe>
      </div>
    </div>
  );
};

export default Card;
