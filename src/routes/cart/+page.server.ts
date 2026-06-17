import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';
import { sellProduct } from '$lib/somapi/client';
import type { SaleRequestInfo } from '$lib/somapi/types';
import { getToken } from '$lib/auth';

export const actions: Actions = {
  checkout: async ({ request, cookies }) => {
    const token = getToken(cookies);
    if (!token) {
      throw redirect(303, '/login');
    }

    const formData = await request.formData();
    const itemsJson = formData.get('items')?.toString() ?? '[]';
    let items: SaleRequestInfo[];

    try {
      items = JSON.parse(itemsJson);
    } catch {
      return fail(400, { error: 'Formato de itens inválido.' });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return fail(400, { error: 'Carrinho vazio.' });
    }

    for (const item of items) {
      if (!item['product-id'] || item['sale-amount'] < 1) {
        return fail(400, { error: 'Item de venda inválido.' });
      }
    }

    const payload = { 'sale-items': items };

    try {
      const result = await sellProduct(payload, token);
      // result deve conter { 'sale-id': number }
      return { success: true, saleId: result['sale-id'] };
    } catch (err: any) {
      if (err?.status === 409) {
        return fail(409, { error: 'Estoque insuficiente ou conflito.' });
      }
      if (err?.status === 401) {
        throw redirect(303, '/login');
      }
      return fail(500, { error: err?.message || 'Erro ao processar venda.' });
    }
  }
};