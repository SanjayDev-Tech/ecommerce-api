import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';
import { OrdersProvider } from './context/OrdersContext';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProfileModal } from './components/ProfileModal';

// Context
import { AuthProvider } from './context/AuthContext';

// Pages
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Login } from './pages/Login';
import { Wishlist } from './pages/Wishlist';
import { Orders } from './pages/Orders';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <OrdersProvider>
              <ToastProvider>
              <Router>
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/products/:id" element={<ProductDetails />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/wishlist" element={<Wishlist />} />
                      <Route path="/orders" element={<Orders />} />
                    </Routes>
                  </main>
                  <Footer />
                  <ProfileModal />
                </div>
              </Router>
              </ToastProvider>
            </OrdersProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
