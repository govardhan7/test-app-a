import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { Link, useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Banner.css";

const Banner = () => {
  const [carouseldata, setCarouselData] = useState(null);
  const navigate = useNavigate();

  const handleDivClick = () => {
    navigate("/products");
  };

  useEffect(() => {
    const data = async () => {
      const responseJson = [
        {
          bannerImageUrl: "/static/carouselImages/c3.jpg",
          bannerImageAlt: "Independence Day Deal",
          isActive: false,
          order: 4,
          id: "5b6c38156cb7d770b7013ccc",
        },
        {
          bannerImageUrl: "/static/carouselImages/c4.jpg",
          bannerImageAlt: "2-Independence Day Deal -",
          isActive: false,
          order: 4,
          id: "5b6c38156cb7d770b7013ccc",
        },
        {
          bannerImageUrl: "/static/carouselImages/c5.jpg",
          bannerImageAlt: "3-Independence Day Deal - 25%",
          isActive: false,
          order: 4,
          id: "5b6c38156cb7d770b7013ccc",
        },
        {
          bannerImageUrl: "/static/carouselImages/c7.png",
          bannerImageAlt: "4-Independence Day Deal - 25% off ",
          isActive: false,
          order: 4,
          id: "5b6c38156cb7d770b7013ccc",
        },
        {
          bannerImageUrl: "/static/carouselImages/offer5.jpg",
          bannerImageAlt: "5-Independence Day Deal - 25% off on",
          isActive: false,
          order: 3,
          id: "5b6c38156cb7d770b7012ccc",
        },
      ];

      await setCarouselData(responseJson);
    };
    data();
  }, []);

  return (
    <div className="bannerContainer">
      <Carousel
        infiniteLoop={true}
        autoPlay={true}
        showStatus={false}
        showArrows={true}
        showThumbs={false}
        interval={5000}
      >
        {carouseldata &&
          carouseldata.map((item, index) => (
            <div key={index} onClick={() => handleDivClick()}>
              <img src={item.bannerImageUrl} alt={item.bannerImageAlt} />
            </div>
          ))}
      </Carousel>
    </div>
  );
};

export default Banner;
