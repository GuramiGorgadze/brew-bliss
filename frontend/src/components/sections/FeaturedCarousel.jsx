import { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import arrivalsBeers from '../../assets/arrivals-beers.webp';
import { useLoader } from '../../context/LoaderContext';
import wing1 from '../../assets/wing1.png';
import wing2 from '../../assets/wing2.png';
import { Product } from '../../components';
import * as api from '../../api/api';
import { useNavigate } from 'react-router-dom';

function FeaturedCarousel() {
  const [products, setProducts] = useState([]);
  const { useDataLoader } = useLoader();

  const navigate = useNavigate();

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
        alert(data.err);
      }
    };
    fetchProductsData();
  }, []);

  return (
    <div className="featured-carousel">
      <div className="featured-carousel__title">
        <img
          src={wing1}
          alt=""
          className="wing"
        />
        <p>Featured Products</p>
        <img
          src={wing2}
          alt=""
          className="wing"
        />
      </div>

      <p className="featured-carousel__text">
        Describe what your customers will receive when subscribing to your newsletter. what your
        customers
      </p>

      <div className="featured-carousel__wrapper">
        <button
          className="featured-carousel__btn featured-carousel__btn--prev"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canScrollPrev}
          aria-label="Previous"
        >
          <i className="bi bi-chevron-left"></i>
        </button>
        <div
          className="featured-carousel__embla"
          ref={emblaRef}
        >
          <div className="featured-carousel__embla--container">
            {products.map((product) => (
              <div
                className="featured-carousel__embla--slide"
                key={product._id}
              >
                <Product product={product} />
              </div>
            ))}
          </div>
        </div>
        <button
          className="featured-carousel__btn featured-carousel__btn--next"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canScrollNext}
          aria-label="Next"
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>

      <button
        className="featured-carousel__show-all"
        onClick={() => navigate('/products')}
      >
        Show all
      </button>
    </div>
  );
}

export default FeaturedCarousel;
