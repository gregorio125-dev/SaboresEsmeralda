import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Hero from "./components/sections/Hero";
import FeaturedProducts from "./components/sections/FeaturedProducts";
import Services from "./components/sections/Services";
import Testimonials from "./components/sections/Testimonials";
import WhyChooseUs from "./components/sections/WhyChooseUs";
import CrearProducto from "./pages/CrearProducto";
import Catalogo from "./pages/Catalogo";
import Carrito from "./pages/Carrito";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";

function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <Services />
      <WhyChooseUs />
      <Testimonials />
    </>
  );
}

function App() {
  return (
    <ProductProvider>
      <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/crear-producto" element={<CrearProducto />} />
          <Route path="/carrito" element={<Carrito />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
