// src/routes/search/+page.server.ts
import { redirect } from '@sveltejs/kit';
import { getAllProducts } from '$lib/somapi/client';
import { getToken } from '$lib/auth';          
import type { GetProductResponse } from '$lib/somapi/types';

export async function load({ url, cookies }) {
  const query = url.searchParams.get('q')?.trim().toLowerCase() ?? '';

  const authToken = getToken(cookies);          
  if (!authToken) {
    throw redirect(303, '/login');
  }

  try {
    const response = await getAllProducts(authToken);
    const allProducts: GetProductResponse[] = response['product-list'];

    let filtered = allProducts;
    if (query) {
      filtered = allProducts.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.artist.toLowerCase().includes(query) ||
          p['api-id'].toLowerCase().includes(query)
      );
    }

    return { products: filtered, query };
  } catch (err: any) {
    if (err?.status === 401) {
      const { removeToken } = await import('$lib/auth');
      removeToken(cookies);
      throw redirect(303, '/login');
    }
    return { products: [], query, error: err?.message || 'Erro ao buscar produtos.' };
  }
}