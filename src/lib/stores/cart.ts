import { writable, derived } from 'svelte/store';
import type { GetProductResponse } from '$lib/somapi/types';

export type CartItem = {
  product: GetProductResponse;
  quantity: number;
};

export const cart = writable<CartItem[]>([]);

// Derived stores para cálculos
export const subtotal = derived(cart, $cart =>
  $cart.reduce((sum, item) => sum + (item.product.price / 100) * item.quantity, 0)
);

export const totalItems = derived(cart, $cart =>
  $cart.reduce((sum, item) => sum + item.quantity, 0)
);