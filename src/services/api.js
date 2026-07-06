const BASE_URL = 'https://fakestoreapi.com';

const dummyProducts = [
  // KIDS
  { id: 101, title: "Boys Casual T-Shirt", price: 15.99, description: "Comfortable cotton t-shirt.", category: "kids", image: "/images/boys-casual-tshirt.png", rating: { rate: 4.5, count: 120 } },
  { id: 102, title: "Girls Floral Dress", price: 22.50, description: "Beautiful summer dress.", category: "kids", image: "/images/girls-floral-dress.png", rating: { rate: 4.8, count: 85 } },
  { id: 103, title: "Kids Denim Jacket", price: 35.00, description: "Classic denim for kids.", category: "kids", image: "/images/kids-denim-jacket.png", rating: { rate: 4.6, count: 90 } },
  { id: 104, title: "Boys Sport Shorts", price: 12.99, description: "Athletic shorts.", category: "kids", image: "/images/boys-sport-shorts.png", rating: { rate: 4.2, count: 45 } },
  { id: 105, title: "Girls Winter Coat", price: 45.00, description: "Warm and cozy coat.", category: "kids", image: "/images/girls-coat.png", rating: { rate: 4.9, count: 150 } },
  { id: 106, title: "Kids Sneakers", price: 29.99, description: "Durable shoes for play.", category: "kids", image: "/images/kids-sneakers.png", rating: { rate: 4.3, count: 210 } },
  
  // BEAUTY
  { id: 107, title: "Luxury Face Serum", price: 45.00, description: "Rejuvenating face serum.", category: "beauty", image: "/images/luxury-face-serum.png", rating: { rate: 4.9, count: 340 } },
  { id: 108, title: "Matte Lipstick Collection", price: 29.99, description: "Long-lasting matte lipsticks.", category: "beauty", image: "/images/matte-lipstick.png", rating: { rate: 4.6, count: 210 } },
  { id: 109, title: "Hydrating Moisturizer", price: 35.50, description: "Daily hydrating cream.", category: "beauty", image: "/images/moisturizer.png", rating: { rate: 4.7, count: 180 } },
  { id: 110, title: "Eyeshadow Palette", price: 42.00, description: "12 versatile shades.", category: "beauty", image: "/images/eyeshadow.png", rating: { rate: 4.8, count: 500 } },
  { id: 111, title: "Volume Mascara", price: 18.99, description: "Intense black volume.", category: "beauty", image: "/images/volume-mascara.png", rating: { rate: 4.4, count: 320 } },
  { id: 112, title: "Rose Water Toner", price: 15.00, description: "Refreshing and balancing.", category: "beauty", image: "/images/toner.png", rating: { rate: 4.5, count: 110 } },

  // GENZ
  { id: 113, title: "Oversized Graphic Hoodie", price: 35.99, description: "Streetwear aesthetic.", category: "genz", image: "/images/graphic-hoodie.png", rating: { rate: 4.7, count: 450 } },
  { id: 114, title: "Chunky Retro Sneakers", price: 89.99, description: "Trendy chunky sneakers.", category: "genz", image: "/images/retro-sneakers.png", rating: { rate: 4.4, count: 320 } },
  { id: 115, title: "Cargo Parachute Pants", price: 49.99, description: "Loose fit cargo pants.", category: "genz", image: "/images/cargo-pants.png", rating: { rate: 4.6, count: 280 } },
  { id: 116, title: "Vintage Wash Tee", price: 24.00, description: "Faded vintage graphic t-shirt.", category: "genz", image: "/images/vintage-tee.png", rating: { rate: 4.8, count: 190 } },
  { id: 117, title: "Y2K Sunglasses", price: 14.50, description: "Rimless tinted sunglasses.", category: "genz", image: "/images/y2k-sunglasses.png", rating: { rate: 4.2, count: 410 } },
  { id: 118, title: "Crossbody Tech Bag", price: 28.00, description: "Utility crossbody bag.", category: "genz", image: "/images/tech-bag.png", rating: { rate: 4.5, count: 155 } },
  
  // MEN
  { id: 119, title: "Classic Men's Blue Jeans", price: 45.99, description: "Classic straight-leg blue denim jeans.", category: "men's clothing", image: "/images/mens-jeans.png", rating: { rate: 4.6, count: 180 } },
  { id: 120, title: "Men's Tailored Suit Jacket", price: 120.00, description: "Elegant navy blue tailored suit jacket.", category: "men's clothing", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400&auto=format&fit=crop", rating: { rate: 4.8, count: 110 } },
  { id: 121, title: "Casual Cotton Chinos", price: 34.50, description: "Breathable khaki chinos for everyday wear.", category: "men's clothing", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=400&auto=format&fit=crop", rating: { rate: 4.5, count: 85 } },
  { id: 122, title: "Vintage Leather Jacket", price: 199.99, description: "Classic brown leather motorcycle jacket.", category: "men's clothing", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=400&auto=format&fit=crop", rating: { rate: 4.9, count: 205 } },
  { id: 123, title: "Striped Oxford Shirt", price: 29.99, description: "Crisp white and blue striped button-down.", category: "men's clothing", image: "/images/striped-oxford-shirt.png", rating: { rate: 4.4, count: 90 } },
  { id: 124, title: "Athletic Running Shorts", price: 19.99, description: "Lightweight performance running shorts.", category: "men's clothing", image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=400&auto=format&fit=crop", rating: { rate: 4.6, count: 150 } },
  { id: 125, title: "Crewneck Knit Sweater", price: 45.00, description: "Cozy wool-blend crewneck sweater in charcoal.", category: "men's clothing", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=400&auto=format&fit=crop", rating: { rate: 4.7, count: 130 } },
  { id: 126, title: "Classic Polo Shirt", price: 22.50, description: "Premium cotton pique polo in crimson red.", category: "men's clothing", image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=400&auto=format&fit=crop", rating: { rate: 4.3, count: 220 } },
  { id: 127, title: "Waterproof Trench Coat", price: 89.99, description: "Modern beige trench coat with water-resistant finish.", category: "men's clothing", image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=400&auto=format&fit=crop", rating: { rate: 4.8, count: 75 } },
  { id: 128, title: "Slim Fit Turtleneck", price: 32.00, description: "Sleek black ribbed turtleneck pullover.", category: "men's clothing", image: "https://images.unsplash.com/photo-1622445270947-32dc23bc3f05?q=80&w=400&auto=format&fit=crop", rating: { rate: 4.6, count: 140 } },
  { id: 129, title: "Cargo Work Trousers", price: 42.99, description: "Durable olive green cargo trousers with utility pockets.", category: "men's clothing", image: "/images/cargo-work-trousers.png", rating: { rate: 4.5, count: 195 } }
];

export const fetchProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  const data = await res.json();
  const filteredData = data.filter(p => p.id !== 1);
  return [...filteredData, ...dummyProducts];
};

export const fetchProductById = async (id) => {
  if (id > 100) {
    const dummy = dummyProducts.find(p => p.id === parseInt(id));
    if (dummy) return dummy;
  }
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch product with id ${id}`);
  return res.json();
};

export const fetchCategories = async () => {
  const res = await fetch(`${BASE_URL}/products/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  const data = await res.json();
  return [...data, 'kids', 'beauty', 'genz'];
};

export const fetchProductsByCategory = async (category) => {
  const dummyCatProducts = dummyProducts.filter(p => p.category === category);
  if (['kids', 'beauty', 'genz'].includes(category)) {
    return dummyCatProducts;
  }
  const res = await fetch(`${BASE_URL}/products/category/${category}`);
  if (!res.ok) throw new Error(`Failed to fetch products for category ${category}`);
  const data = await res.json();
  const filteredData = data.filter(p => p.id !== 1);
  return [...filteredData, ...dummyCatProducts];
};
