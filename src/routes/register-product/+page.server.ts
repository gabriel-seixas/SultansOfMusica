// src/routes/registrar-produto/+page.server.ts
import { type Actions, fail, redirect } from "@sveltejs/kit";
import { createProduct } from "$lib/somapi/client";

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    console.log("recebido");
    const formData = await request.formData();


    const title = formData.get("title")?.toString().trim() ?? "";
    const artistName = formData.get("artistName")?.toString().trim() ?? "";
    const artistApiId = formData.get("artistApiId")?.toString().trim() ?? "";
    const priceRaw = formData.get("price")?.toString() ?? "";
    const productCode = formData.get("productCode")?.toString().trim() ?? "";
    const releaseDate = formData.get("releaseDate")?.toString().trim() ?? "";
    const stockRaw = formData.get("stock")?.toString() ?? "0";
    const mainImageUrl = formData.get("mainImageUrl")?.toString().trim() ?? "";

    
    if (!title || !artistName || !artistApiId || !priceRaw || !productCode || !releaseDate) {
      return fail(400, { error: "Preencha todos os campos obrigatórios (Nome, Artista, ID do Artista, Preço, Código e Data)." });
    }

    const priceDecimal = Number(priceRaw);
    if (isNaN(priceDecimal) || priceDecimal <= 0) {
      return fail(400, { error: "Preço inválido." });
    }

    const stock = parseInt(stockRaw, 10);
    if (isNaN(stock) || stock < 0) {
      return fail(400, { error: "Estoque inválido." });
    }

    
    if (!mainImageUrl) {
      return fail(400, { error: "A imagem principal (link) é obrigatória." });
    }

    
    const authToken = cookies.get("som_jwt");
    if (!authToken) {
      return fail(401, { error: "Usuário não autenticado. Faça login primeiro." });
    }

    
    const payload = {
      "api-id": productCode,
      "artist-api-id": artistApiId,
      "artist-name": artistName,
      cover: mainImageUrl,
      price: Math.round(priceDecimal * 100),  
      release_date: releaseDate,
      stock: stock,
      title: title,
      "type-id": 1,                           
    };

    try {
      await createProduct(payload, authToken);
    } catch (err: any) {
      
      if (err?.status === 409) {
        return fail(409, { error: "Já existe um produto com esse código." });
      }
      if (err?.status === 401) {
        return fail(401, { error: "Autenticação inválida. Faça login novamente." });
      }
      return fail(500, { error: err?.message || "Erro interno ao registrar o produto." });
    }

    
    throw redirect(303, "/catalogo");
  },
};