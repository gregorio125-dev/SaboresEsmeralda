import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// ─── Constantes ───────────────────────────────────────────────────────────────

const SHIPPING_COST = 15000;

const formatPrice = (price: number) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(price);

// ─── Vista ────────────────────────────────────────────────────────────────────

export default function Carrito() {
  const { items, removeItem, updateQuantity, subtotal, totalItems } = useCart();

  const shipping = subtotal > 0 ? SHIPPING_COST : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-[var(--bg-main)] py-12 px-4 sm:px-6 lg:px-8 font-['Inter']">
      <div className="max-w-7xl mx-auto mt-16">

        {/* Encabezado */}
        <div className="flex items-center space-x-4 mb-8">
          <ShoppingBag className="w-8 h-8 text-[var(--primary-color)]" />
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-main)] font-['Playfair_Display']">
            Tu Carrito de Compras
          </h1>
        </div>

        {/* Estado vacío */}
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[var(--bg-card)] rounded-[var(--radius-xl)] shadow-[var(--shadow-md)] p-12 text-center"
          >
            <ShoppingBag className="w-20 h-20 mx-auto text-[var(--text-muted)] mb-6 opacity-50" />
            <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4">
              Tu carrito está vacío
            </h2>
            <p className="text-[var(--text-muted)] mb-8">
              Parece que aún no has añadido nada a tu carrito.
            </p>
            <Link
              to="/catalogo"
              className="inline-flex items-center px-6 py-3 bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-white rounded-[var(--radius-full)] transition duration-300 font-medium"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Explorar Catálogo
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Lista de productos */}
            <div className="lg:w-2/3 space-y-6">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="bg-[var(--bg-card)] rounded-[var(--radius-xl)] shadow-[var(--shadow-sm)] border border-[var(--border-color)] overflow-hidden flex flex-col sm:flex-row items-center p-4 hover:shadow-[var(--shadow-md)] transition-shadow"
                >
                  {/* Imagen */}
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        'https://placehold.co/128x128/059669/FFF?text=SE';
                    }}
                    className="w-full sm:w-32 h-32 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-6 flex-shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl font-semibold text-[var(--text-main)] mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)] mb-2">{item.category}</p>
                    <p className="text-lg font-bold text-[var(--primary-color)]">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  {/* Controles */}
                  <div className="flex items-center flex-col sm:flex-row gap-4 mt-4 sm:mt-0">
                    <div className="flex items-center border border-[var(--border-color)] rounded-full">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-2 text-[var(--text-main)] hover:text-[var(--primary-color)] transition-colors disabled:opacity-40"
                        disabled={item.quantity <= 1}
                        aria-label="Reducir cantidad"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center text-[var(--text-main)] font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-2 text-[var(--text-main)] hover:text-[var(--primary-color)] transition-colors"
                        aria-label="Aumentar cantidad"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                      aria-label="Eliminar producto"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}

              <Link
                to="/catalogo"
                className="inline-flex items-center text-[var(--primary-color)] hover:text-[var(--primary-hover)] font-medium transition-colors mt-4"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Seguir comprando
              </Link>
            </div>

            {/* Resumen del pedido */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:w-1/3"
            >
              <div className="bg-[var(--secondary-color)] rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)] p-6 text-[var(--text-white)] sticky top-24">
                <h2 className="text-2xl font-bold mb-6 font-['Playfair_Display'] border-b border-white/20 pb-4">
                  Resumen del Pedido
                </h2>

                <div className="space-y-4 mb-6 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="opacity-80">
                      Subtotal ({totalItems} {totalItems === 1 ? 'producto' : 'productos'})
                    </span>
                    <span className="font-semibold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="opacity-80">Costo de envío</span>
                    <span className="font-semibold">{formatPrice(shipping)}</span>
                  </div>
                </div>

                <div className="border-t border-white/20 pt-4 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-2xl font-bold text-[var(--accent-color)]">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                <button className="w-full bg-[var(--accent-color)] hover:bg-[#d4ac0d] text-[var(--text-main)] font-bold py-4 rounded-[var(--radius-full)] transition duration-300 shadow-[var(--shadow-md)]">
                  Proceder al Pago
                </button>

                <p className="mt-4 text-center text-xs opacity-60">
                  Opciones de pago seguras. Impuestos incluidos donde aplique.
                </p>
              </div>
            </motion.aside>
          </div>
        )}
      </div>
    </div>
  );
}
