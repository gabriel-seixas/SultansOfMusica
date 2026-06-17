import { error, fail, redirect } from "@sveltejs/kit";
import { getToken } from "$lib/auth";
<<<<<<< HEAD
import { getProductById, updateProduct, updateInventory } from "$lib/somapi/client";
=======
import { getProductById, updateInventory, updateProduct } from "$lib/somapi/client";

>>>>>>> 3bdffe4 (ZzZz)
import { searchArtist } from "$lib/audiodb/client";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async ({ params, cookies }) => {
  const token = getToken(cookies);
  if (!token) throw redirect(303, "/login");

  const productId = Number(params.id);
  const product = await getProductById(productId, token);
  if (!product) throw error(404, "Produto não encontrado.");

  // Busca o ID do artista na TheAudioDB
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

    if (!title || !artistName || !artistApiId || !priceRaw || !productCode || !releaseDate) {
      return fail(400, { error: "Preencha todos os campos obrigatórios." });
    }

    const priceInCents = Math.round(Number(priceRaw) * 100);
    if (isNaN(priceInCents)) return fail(400, { error: "Preço inválido." });

    let stock = parseInt(stockRaw, 10);
    if (isNaN(stock) || stock < 0) stock = 0;

    if (!mainImageUrl) return fail(400, { error: "A imagem principal é obrigatória." });

    try {
<<<<<<< HEAD
      const currentProduct = await getProductById(productId, token);

      const productChanged =
        title !== currentProduct.title ||
        artistName !== currentProduct.artist ||
        productCode !== currentProduct["api-id"] ||
        mainImageUrl !== currentProduct.cover ||
        priceInCents !== currentProduct.price ||
        releaseDate !== (currentProduct.release_date ?? "");

      const stockChanged = stock !== currentProduct.stock;

      if (productChanged) {
        await updateProduct({
          "product-id": productId,
          "api-id": productCode,
          "artist-api-id": artistApiId,
          "artist-name": artistName,
          cover: mainImageUrl,
          price: priceInCents,
          release_date: releaseDate,
          title,
          "type-id": 1,
        }, token);
      }

      if (stockChanged) {
        await updateInventory({
          "product-id": productId,
          "new-stock": stock,
        }, token);
      }
    } catch (err: any) {
      if (err?.status === 401) return fail(401, { error: "Autenticação inválida." });
      if (err?.status === 404) return fail(404, { error: "Produto não encontrado." });
      return fail(500, { error: err?.message || "Erro ao atualizar." });
=======
      // Atualiza os metadados do produto (título, preço, cover, etc)
      await updateProduct(payload, token);

      // Atualiza estoque via endpoint correto
      // (PUT /inventory/update com { "product-id", "new-stock" })
      await updateInventory(
        { "product-id": productId, "new-stock": stock },
        token,
      );
    } catch (err) {
      const e = err as { status?: number; message?: string };

      if (e?.status === 401) return fail(401, { error: "Autenticação inválida." });
      if (e?.status === 404) return fail(404, { error: "Produto/Inventory não encontrado." });
      return fail(500, { error: e?.message || "Erro ao atualizar produto/estoque." });
>>>>>>> 3bdffe4 (ZzZz)
    }




    throw redirect(303, `/product/${productId}`);
  },
};
