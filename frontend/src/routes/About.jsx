import React from "react";
import {
  PageTitle,
  StoreFeatures,
  BrandCarousel,
  InstagramPromo,
} from "../components";
import AboutBanner from "../assets/about-banner.webp";
import wing1 from "../assets/wing1.png";
import wing2 from "../assets/wing2.png";

function About() {
  return (
    <div>
      <PageTitle pageName="About Us" />

      <div className="our-story">
        <div className="our-story__title">
          <img src={wing1} alt="" className="our-story__wing" />
          <p>OUR STORY</p>
          <img src={wing2} alt="" className="our-story__wing" />
        </div>

        <h3 className="our-story__desc">
          welcome to <span className="orange">Brew Bliss,</span> your ultimate
          destination for fresh flavors <br /> and delightful sips. We’re
          passionate about delivering premium food <br /> and beverages to
          satisfy every craving, anytime, anywhere!
        </h3>

        <img src={AboutBanner} alt="" className="our-story__banner" />
      </div>

      <StoreFeatures />
      <BrandCarousel />
      <InstagramPromo />

      <div className="team">
        <div className="team__title">
          <img src={wing1} alt="" className="team__wing" />
          <p>Meet Our Team Members</p>
          <img src={wing2} alt="" className="team__wing" />
        </div>

        <h3 className="our-story__desc">
          welcome to <span className="orange">Brew Bliss,</span> your ultimate
          destination for fresh flavors <br /> and delightful sips. We’re
          passionate about delivering premium food <br /> and beverages to
          satisfy every craving, anytime, anywhere!
        </h3>

        <img src={AboutBanner} alt="" className="our-story__banner" />
      </div>
    </div>
  );
}

export default About;
