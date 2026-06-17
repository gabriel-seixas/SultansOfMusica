import { redirect } from '@sveltejs/kit';
import { getAllProducts } from '$lib/somapi/client';
import { getToken } from '$lib/auth';
import type { GetProductResponse } from '$lib/somapi/types';


export async function load({ cookies }) {
  const token = getToken(cookies);
  if (!token) throw redirect(303, '/login');

  try {
    const response = await getAllProducts(token);
    return { products: response['product-list'] ?? [] };
  } catch (err: any) {
    if (err?.status === 401) throw redirect(303, '/login');
    return { products: [], error: err?.message || 'Erro ao carregar produtos.' };
  }
}