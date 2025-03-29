import React from "react";
import "./Card.css";
import ImageGalery from "./ImageGalery";
import ReactFlipCard from "reactjs-flip-card";

const Card = () => {
  return (
    <div className="container">
      <div className="stack">
        <div className="row">
          {/* <ReactFlipCard
            containerStyle={{
              width: "100%",
              height: "100%",
              marginBottom: "50px",
            }}
            frontComponent={
              <>
                <p className="na">Anh chị/Bạn</p>
                <img
                  className="img-fluid"
                  src={"card-front.PNG"}
                  alt="Card Front"
                />
              </>
            }
            backComponent={
              <>
                <p className="na-back">Anh chị/Bạn</p>
                <img
                  className="img-fluid"
                  src={"card-back.PNG"}
                  alt="Card Back"
                />
              </>
            }
          /> */}
          <>
            <p className="na-back">Anh chị/Bạn</p>
            <img className="img-fluid" src={"card-back.PNG"} alt="Card Back" />
          </>
        </div>
        <ImageGalery />
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1003335.1117007717!2d106.729799!3d10.790024!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752eb1ff47fbb3%3A0xee2fc764c10f81d7!2zTkjDgCBIw4BORyBUSeG7hkMgQ8av4buaSSBOYW0gQuG7mQ!5e0!3m2!1sen!2sus!4v1743219211079!5m2!1sen!2sus"
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
