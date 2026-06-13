import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function useProductFilter(products = []) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const filters = useMemo(() => {
    return {
      search: searchParams.get('search') || '',
      category: searchParams.get('category') || '',
      inStock: searchParams.get('inStock') === 'true',
      outOfStock: searchParams.get('outOfStock') === 'true',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      sort: searchParams.get('sort') || 'most-relevant',
    };
  }, [searchParams]);

  const resetFilters = () => {
    setSearchParams({});
  };

  const updateFilter = (key, value) => {
    setSearchParams((prevParams) => {
      const nextParams = new URLSearchParams(prevParams);
      if (value === '' || value === false || value === null || value === undefined) {
        nextParams.delete(key);
      } else {
        nextParams.set(key, String(value));
      }
      return nextParams;
    });
  };

  const updateFilters = (updates) => {
    setSearchParams((prevParams) => {
      const nextParams = new URLSearchParams(prevParams);
      Object.entries(updates).forEach(([key, value]) => {
        if (value === '' || value === false || value === null || value === undefined) {
          nextParams.delete(key);
        } else {
          nextParams.set(key, String(value));
        }
      });
      return nextParams;
    });
  };

  const getTitle = (p) => {
    if (!p.title) return '';
    if (typeof p.title === 'string') return p.title;
    return p.title[lang] ?? p.title.en ?? '';
  };

  const getTags = (p) => {
    if (!p.tags) return [];
    if (Array.isArray(p.tags)) return p.tags;
    return p.tags[lang] ?? p.tags.en ?? [];
  };

  const filtered = useMemo(() => {
    let result = [...products];

    if (filters.search) {
      result = result.filter((p) =>
        getTitle(p).toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category) {
      result = result.filter((p) => getTags(p).includes(filters.category.toLowerCase()));
    }

    const isFilteringInStock = filters.inStock && !filters.outOfStock;
    const isFilteringOutOfStock = filters.outOfStock && !filters.inStock;

    if (isFilteringInStock) {
      result = result.filter((p) => p?.available === true);
    } else if (isFilteringOutOfStock) {
      result = result.filter((p) => p?.available === false);
    }

    if (filters.minPrice) {
      result = result.filter((p) => Number(p.variants?.[0]?.price) >= Number(filters.minPrice));
    }

    if (filters.maxPrice) {
      result = result.filter((p) => Number(p.variants?.[0]?.price) <= Number(filters.maxPrice));
    }

    if (filters.sort !== 'most-relevant') {
      result.sort((a, b) => {
        const priceA = Number(a.variants?.[0]?.price);
        const priceB = Number(b.variants?.[0]?.price);
        switch (filters.sort) {
          case 'title-asc':
            return getTitle(a).localeCompare(getTitle(b), lang);
          case 'title-desc':
            return getTitle(b).localeCompare(getTitle(a), lang);
          case 'price-asc':
            return priceA - priceB;
          case 'price-desc':
            return priceB - priceA;
          default:
            return 0;
        }
      });
    }

    return result;
  }, [products, filters, lang]);

  return { products: filtered, filters, updateFilter, updateFilters, resetFilters };
}

export default useProductFilter;
