import { persistentAtom } from '@nanostores/persistent';

export interface CartItem {
  id: string;
  name: string;
  quantity: number;
}

// Estado del carrito. Clave: id del producto, Valor: CartItem
export const cart = persistentAtom<Record<string, CartItem>>(
  'eatsa_cart',
  {},
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);

export function addCartItem(item: CartItem) {
  const currentCart = cart.get();
  const existing = currentCart[item.id];
  
  if (existing) {
    cart.set({
      ...currentCart,
      [item.id]: {
        ...existing,
        quantity: existing.quantity + item.quantity
      }
    });
  } else {
    cart.set({
      ...currentCart,
      [item.id]: item
    });
  }
}

export function updateCartItemQuantity(id: string, quantity: number) {
  if (quantity <= 0) {
    removeCartItem(id);
    return;
  }
  
  const currentCart = cart.get();
  const existing = currentCart[id];
  
  if (existing) {
    cart.set({
      ...currentCart,
      [id]: {
        ...existing,
        quantity
      }
    });
  }
}

export function removeCartItem(id: string) {
  const currentCart = cart.get();
  const newCart = { ...currentCart };
  delete newCart[id];
  cart.set(newCart);
}

export function getWhatsAppUrl() {
  const items = Object.values(cart.get());
  if (items.length === 0) return '#';

  // Configuración del número de destino real de EATSA
  const WHATSAPP_NUMBER = '51980228368';
  
  let text = '¡Hola EATSA! Vengo desde la página web empresarial y me interesa cotizar los siguientes productos:\n\n';
  
  items.forEach(item => {
    text += `- ${item.name}: ${item.quantity} Tonelada(s)\n`;
  });
  
  text += '\nQuedo a la espera de su respuesta para coordinar. Gracias.';
  
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
