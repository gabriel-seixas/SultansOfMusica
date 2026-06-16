import { error } from "@sveltejs/kit";
import { getToken } from "$lib/auth";
import { getProductById, getProductList } from "$lib/somapi/client";
import { lookupTracksByAlbumId, searchAlbum } from "$lib/audiodb/client";

import type { Track } from "$lib/audiodb/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, cookies }) => {
	const token = getToken(cookies);
	const productId = Number(params.id);

	const product = await getProductById(productId, token);
	if (!product) throw error(404, "Product not found");

	let albumCovers: string[] = [];
	if (product.title) {
		const albums = await searchAlbum({
			artist: product.artist,
			album: product.title,
		});
		if (albums.length) {
			albumCovers = [
				albums[0].strAlbumThumb,
				...albums.slice(1).map((a) => a.strAlbumThumb),
			].filter(Boolean) as string[];
		}
	}

	const relatedProducts = await getProductList({ page: 1, amount: 4 }, token);

	let tracklist: Track[] = [];
	let albumDescription = "";
	const albumYear = product["release-date"];

	if (product.artist && product.title) {
		const albums = await searchAlbum({
			artist: product.artist,
			album: product.title,
		});
		if (albums.length > 0) {
			const audioDbAlbum = albums[0];

			const tracks = await lookupTracksByAlbumId({
				albumId: Number(audioDbAlbum.idAlbum),
			});
			tracklist = tracks ?? [];

			albumDescription = audioDbAlbum.strDescriptionPT ??
				audioDbAlbum.strDescription ?? "";
		}
	}

	return {
		product,
		albumCovers,
		relatedProducts,
		tracklist,
		albumDescription,
		albumYear,
	};
};
