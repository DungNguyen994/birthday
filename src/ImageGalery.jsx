import React, { useEffect } from "react";
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";

const ImageGalery = () => {
  const [goToSlide, setGoToSlide] = React.useState(0);
  setTimeout(() => {
    setGoToSlide((prev) => prev + 1);
  }, 5000);
  const slides = Array.from({ length: 30 }, (v, i) => ({
    key: i + 1,
    content: (
      <img
        src={`my${i + 1}.JPG`}
        alt={i + 1}
        onClick={() => setGoToSlide(i)}
        style={{ maxWidth: "333px" }}
      />
    ),
  }));

  return (
    <div style={{ width: "80%", height: "500px", margin: "0 auto" }}>
      <Carousel
        slides={slides}
        goToSlide={goToSlide}
        offsetRadius={2}
        showNavigation={false}
        animationConfig={config.gentle}
      />
    </div>
  );
};
export default ImageGalery;
