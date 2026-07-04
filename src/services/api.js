const BASE_URL = 'https://fakestoreapi.com';

export const fetchProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
};

export const fetchProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch product with id ${id}`);
  return res.json();
};

export const fetchCategories = async () => {
  const res = await fetch(`${BASE_URL}/products/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
};

export const fetchProductsByCategory = async (category) => {
  const res = await fetch(`${BASE_URL}/products/category/${category}`);
  if (!res.ok) throw new Error(`Failed to fetch products for category ${category}`);
  return res.json();
};
