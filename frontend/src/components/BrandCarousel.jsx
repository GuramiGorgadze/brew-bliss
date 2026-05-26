import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import brand1 from "../assets/brands/brand01.png";
import brand2 from "../assets/brands/brand02.png";
import brand3 from "../assets/brands/brand03.png";
import brand4 from "../assets/brands/brand04.png";
import brand5 from "../assets/brands/brand05.png";

function BrandCarousel() {
  const brands = [brand1, brand2, brand3, brand4, brand5];

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: false,
    },
    [
      Autoplay({
        delay: 2500,
        stopOnInteraction: false,
      }),
    ]
  );
  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {brands.map((brand, index) => (
            <div className="embla__slide" key={index}>
              <img
                src={brand}
                alt={`brand-${index}`}
                className="embla__slide__img"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BrandCarousel;