import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import instagram01 from '../../assets/instagram/instagram01.png';
import instagram02 from '../../assets/instagram/instagram02.png';
import instagram03 from '../../assets/instagram/instagram03.png';
import instagram04 from '../../assets/instagram/instagram04.png';
import instagram05 from '../../assets/instagram/instagram05.png';
import instagram06 from '../../assets/instagram/instagram06.png';
import instagram07 from '../../assets/instagram/instagram07.png';
import instagram08 from '../../assets/instagram/instagram08.png';
import instagramIcon from '../../assets/icons/instagram.svg';

function InstagramCarousel() {
  const instagramImages = [
    instagram01,
    instagram02,
    instagram03,
    instagram04,
    instagram05,
    instagram06,
    instagram07,
    instagram08,
  ];

  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start', dragFree: false }, [
    Autoplay({ delay: 2500, stopOnInteraction: false }),
  ]);

  return (
    <div className="instagram-promo">
      {instagramImages.map((img, index) => (
        <a
          key={index}
          href="https://www.instagram.com/"
          target="_blank"
          rel="noreferrer"
        >
          <div className="instagram-promo__card computer">
            <img
              src={img}
              alt=""
            />
            <div className="instagram-promo__card__overlay">
              <img
                src={instagramIcon}
                alt=""
              />
            </div>
          </div>
        </a>
      ))}

      <div
        className="instagram-promo__viewport laptop"
        ref={emblaRef}
      >
        <div className="instagram-promo__container">
          {instagramImages.map((img, index) => (
            <div
              className="instagram-promo__slide"
              key={index}
            >
              <img
                src={img}
                alt={`instagram-${index}`}
                className="instagram-promo__slide__img"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InstagramCarousel;
