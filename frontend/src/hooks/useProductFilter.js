import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useProductFilter(products = [], userSearch = '') {
  const [filters, setFilters] = useState({
    search: userSearch,
    minPrice: '',
    maxPrice: '',
    sort: 'most-relevant',
  });

  const navigate = useNavigate()

  useEffect(() => {
    setFilters(prev => ({ ...prev, search: userSearch }));
  }, [userSearch]);

  const resetFilters = () => {
    setFilters({ search: '', minPrice: '', maxPrice: '', sort: 'most-relevant' });
    navigate('/products');
  };

  const filtered = useMemo(() => {
    let result = [...products];

    if (filters.search) {
      result = result.filter(p =>
        p.title?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    const filteringAvailability = filters.inStock !== filters.outOfStock;
    if (filteringAvailability) {
      result = result.filter(p =>
        filters.inStock ? p.variants[0].available : !p.variants[0].available
      );
    }

    if (filters.minPrice) {
      result = result.filter(p =>
        Number(p.variants?.[0]?.price) >= Number(filters.minPrice)
      );
    }

    if (filters.maxPrice) {
      result = result.filter(p =>
        Number(p.variants?.[0]?.price) <= Number(filters.maxPrice)
      );
    }

    if (filters.sort !== 'most-relevant') {
      result.sort((a, b) => {
        const priceA = Number(a.variants?.[0]?.price);
        const priceB = Number(b.variants?.[0]?.price);
        switch (filters.sort) {
          case 'title-asc': return a.title.localeCompare(b.title);
          case 'title-desc': return b.title.localeCompare(a.title);
          case 'price-asc': return priceA - priceB;
          case 'price-desc': return priceB - priceA;
          default: return 0;
        }
      });
    }

    return result;
  }, [products, filters]);

  const updateFilter = (key, value) =>
    setFilters(prev => ({ ...prev, [key]: value }));

  return { products: filtered, updateFilter, resetFilters };
}

export default useProductFilter;