import { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import arrivalsBeers from '../../assets/arrivals-beers.webp';
import { useLoader } from '../../context/LoaderContext';
import { useTranslation } from 'react-i18next';
import wing1 from '../../assets/wing1.png';
import wing2 from '../../assets/wing2.png';
import { Product } from '../../components';
import * as api from '../../api/api';
import BlurText from './reactBits/BlurText';
import ShinyText from './reactBits/ShinyText';

function ArrivalsCarousel() {
  const [products, setProducts] = useState([]);
  const { useDataLoader } = useLoader();
  const { t } = useTranslation();

  const autoplay = Autoplay({ delay: 5000, stopOnInteraction: false });

  const [emblaRef, emblaApi] = useEmblaCarousel({ slidesToScroll: 1, align: 'start' }, [autoplay]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const fetchProductsData = async () => {
      const data = await useDataLoader(api.getProducts);
      if (data?.data) {
        setProducts(data.data);
      } else if (data.err) {
        console.log(data.err);
      }
    };
    fetchProductsData();
  }, []);

  return (
    <div className="arrivals-carousel">
      <div className="arrivals-carousel__left">
        <img
          className="arrivals-carousel__left--img"
          src={arrivalsBeers}
          alt=""
        />
      </div>

      <div className="arrivals-carousel__right">
        <div className="arrivals-carousel__right--title">
          <img
            src={wing1}
            alt=""
            className="wing"
          />
          <p>
            {' '}
            <BlurText
              text={t('arrivalsCarousel.title')}
              delay={100}
              animateBy="words"
              direction="top"
              className="text-2xl mb-8"
            />
          </p>
          <img
            src={wing2}
            alt=""
            className="wing"
          />
        </div>

        <p className="arrivals-carousel__right--text">
          {' '}
          <ShinyText
            text={t('arrivalsCarousel.text')}
            speed={2}
            delay={0}
            color="#696969"
            shineColor="#ffffff"
            spread={120}
            direction="left"
            yoyo={true}
            pauseOnHover={false}
            disabled={false}
          />
        </p>

        <div className="arrivals-carousel__right--carousel">
          <button
            className="arrivals-carousel__btn arrivals-carousel__btn--prev"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canScrollPrev}
            aria-label="Previous"
          >
            <i className="bi bi-chevron-left"></i>
          </button>

          <div
            className="arrivals-carousel__embla"
            ref={emblaRef}
          >
            <div className="arrivals-carousel__embla--container">
              {products.map((product) => (
                <div
                  className="arrivals-carousel__embla--slide"
                  key={product._id}
                >
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>

          <button
            className="arrivals-carousel__btn arrivals-carousel__btn--next"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canScrollNext}
            aria-label="Next"
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ArrivalsCarousel;
