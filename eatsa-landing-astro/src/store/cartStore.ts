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

  // TODO: Actualizar con el número real de WhatsApp de EATSA (código de país sin el +)
  const phone = '51999999999'; 
  
  let text = '¡Hola EATSA! Me interesa cotizar los siguientes productos:%0A%0A';
  
  items.forEach(item => {
    text += `- ${item.name}: ${item.quantity} Tonelada(s)%0A`;
  });
  
  text += '%0AQuedo a la espera de su respuesta para coordinar. Gracias.';
  
  return `https://wa.me/${phone}?text=${text}`;
}
