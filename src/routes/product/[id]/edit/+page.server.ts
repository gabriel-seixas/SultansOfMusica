import { error, fail, redirect } from "@sveltejs/kit";
import { getToken } from "$lib/auth";
import { getProductById, updateInventory, updateProduct } from "$lib/somapi/client";
import { searchArtist } from "$lib/audiodb/client";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async ({ params, cookies }) => {
  const token = getToken(cookies);
  if (!token) throw redirect(303, "/login");

  const productId = Number(params.id);
  const product = await getProductById(productId, token);
  if (!product) throw error(404, "Produto não encontrado.");

  let artistApiId = "";
  if (product.artist) {
    try {
      const artists = await searchArtist({ query: product.artist });
      if (artists.length > 0) {
        artistApiId = artists[0].idArtist;
      }
    } catch {
      // ignora
    }
  }

  return { product, artistApiId };
};

export const actions: Actions = {
  default: async ({ request, cookies, params }) => {
    const token = getToken(cookies);
    if (!token) return fail(401, { error: "Não autenticado." });

    const productId = Number(params.id);
    const formData = await request.formData();

    const title = formData.get("title")?.toString().trim() ?? "";
    const artistName = formData.get("artistName")?.toString().trim() ?? "";
    const artistApiId = formData.get("artistApiId")?.toString().trim() ?? "";
    const priceRaw = formData.get("price")?.toString() ?? "";
    const productCode = formData.get("productCode")?.toString().trim() ?? "";
    const releaseDate = formData.get("releaseDate")?.toString().trim() ?? "";
    const stockRaw = formData.get("stock")?.toString() ?? "0";
    const mainImageUrl = formData.get("mainImageUrl")?.toString().trim() ?? "";
    const typeIdRaw = formData.get("typeId")?.toString() ?? "1"; // Padrão CD

    if (!title || !artistName || !artistApiId || !priceRaw || !productCode || !releaseDate) {
      return fail(400, { error: "Preencha todos os campos obrigatórios." });
    }

    const priceInCents = Math.round(Number(priceRaw) * 100);
    if (isNaN(priceInCents)) return fail(400, { error: "Preço inválido." });

    let stock = parseInt(stockRaw, 10);
    if (isNaN(stock) || stock < 0) stock = 0;

    if (!mainImageUrl) return fail(400, { error: "A imagem principal é obrigatória." });

    let typeId = parseInt(typeIdRaw, 10);
    if (isNaN(typeId) || typeId < 1 || typeId > 4) {
      typeId = 1; 
    }

    const payload = {
      "product-id": productId,
      "api-id": productCode,
      "artist-api-id": artistApiId,
      "artist-name": artistName,
      cover: mainImageUrl,
      price: priceInCents,
      release_date: releaseDate,
      stock: stock,
      title: title,
      "type-id": typeId,  
    };

    try {
      await updateProduct(payload, token);
      await updateInventory(
        { "product-id": productId, "new-stock": stock },
        token,
      );
    } catch (err) {
      const e = err as { status?: number; message?: string };
      if (e?.status === 401) return fail(401, { error: "Autenticação inválida." });
      if (e?.status === 404) return fail(404, { error: "Produto/Inventory não encontrado." });
      return fail(500, { error: e?.message || "Erro ao atualizar produto/estoque." });
    }

    throw redirect(303, `/product/${productId}`);
  },
};