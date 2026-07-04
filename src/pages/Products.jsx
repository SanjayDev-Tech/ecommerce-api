import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts, fetchCategories } from '../services/api';
import { ProductCard, ProductCardSkeleton } from '../components/ProductCard';
import './Products.css';

export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get('search') || '';
  const categoryParam = searchParams.get('category') || 'all';

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Local state for filters
  const [search, setSearch] = useState(searchParam);
  const [category, setCategory] = useState(categoryParam);
  const [sort, setSort] = useState('default'); // default, price-asc, price-desc

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories()
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error("Failed to fetch products or categories", err);
        setError("Failed to load products. Please check your connection and try again.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Sync state with URL params on change
  useEffect(() => {
    setSearch(searchParam);
    setCategory(categoryParam);
  }, [searchParam, categoryParam]);

  const handleFilterChange = (newCategory) => {
    setCategory(newCategory);
    setSearchParams(prev => {
      if (newCategory === 'all') prev.delete('category');
      else prev.set('category', newCategory);
      return prev;
    });
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    setSearchParams(prev => {
      if (!val.trim()) prev.delete('search');
      else prev.set('search', val);
      return prev;
    });
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (category && category !== 'all') {
      result = result.filter(p => p.category === category);
    }

    if (search.trim()) {
      const lowerSearch = search.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(lowerSearch) || 
        p.description.toLowerCase().includes(lowerSearch)
      );
    }

    if (sort === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, category, search, sort]);

  return (
    <div className="page-container container animate-fade-in">
      <h1 className="section-title">All Products</h1>
      
      <div className="products-layout">
        {/* Sidebar Filters */}
        <aside className="products-sidebar">
          <div className="filter-group">
            <h3 className="filter-title">Search</h3>
            <input 
              type="text" 
              placeholder="Search..." 
              className="input"
              value={search}
              onChange={handleSearchChange}
            />
          </div>

          <div className="filter-group">
            <h3 className="filter-title">Categories</h3>
            <div className="category-list">
              <button 
                className={`category-btn ${category === 'all' ? 'active' : ''}`}
                onClick={() => handleFilterChange('all')}
              >
                All Categories
              </button>
              {categories.map(cat => (
                <button 
                  key={cat}
                  className={`category-btn ${category === cat ? 'active' : ''}`}
                  onClick={() => handleFilterChange(cat)}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h3 className="filter-title">Sort By Price</h3>
            <select 
              className="input sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="default">Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="products-main">
          {loading ? (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, idx) => <ProductCardSkeleton key={idx} />)}
            </div>
          ) : error ? (
            <div className="empty-state">
              <h2 className="text-2xl font-semibold mb-2 text-danger-color">Oops! Something went wrong</h2>
              <p className="text-secondary">{error}</p>
              <button className="btn btn-outline mt-4" onClick={() => window.location.reload()}>
                Try Again
              </button>
            </div>
          ) : filteredAndSortedProducts.length > 0 ? (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h2 className="text-2xl font-semibold mb-2">No products found</h2>
              <p className="text-secondary">Try adjusting your search or filters to find what you're looking for.</p>
              <button className="btn btn-outline mt-4" onClick={() => { setSearch(''); setCategory('all'); setSort('default'); setSearchParams({}); }}>
                Clear Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
