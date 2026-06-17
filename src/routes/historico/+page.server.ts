import { redirect } from '@sveltejs/kit';
import { getAllSales } from '$lib/somapi/client';
import { getToken } from '$lib/auth';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
  const token = getToken(cookies);
  if (!token) throw redirect(303, '/login');

  try {
   
    const sales = await getAllSales(token);
    return { sales: sales ?? [] };
  } catch (err: any) {
    if (err?.status === 401) throw redirect(303, '/login');
    return { sales: [], error: err?.message || 'Erro ao carregar histórico.' };
  }
};