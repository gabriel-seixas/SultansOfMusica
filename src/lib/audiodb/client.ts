import { AudioDbApiError } from "./errors.ts";
import type {
	Album,
	Artist,
	LookupAlbumByIdParams,
	LookupAlbumMBParams,
	LookupAlbumsByArtistParams,
	LookupArtistMBParams,
	LookupArtistParams,
	LookupArtistSocialParams,
	LookupTrackByIdParams,
	LookupTrackMBParams,
	LookupTracksByAlbumParams,
	SearchAlbumParams,
	SearchArtistParams,
	SearchDiscographyMBParams,
	SearchDiscographyParams,
	SearchTrackParams,
	Track,
} from "./types.ts";

const API_KEY = "2";
const BASE_URL = "https://www.theaudiodb.com/api/v1/json";

async function fetchFromApi<T>(
	endpoint: string,
	params: Record<string, string | number | undefined>,
): Promise<T> {
	const url = new URL(`${BASE_URL}/${API_KEY}/${endpoint}`);
	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined) {
			url.searchParams.append(key, String(value));
		}
	});

	const response = await fetch(url.toString());
	if (!response.ok) {
		throw new AudioDbApiError(response.status, response.statusText);
	}
	return response.json() as Promise<T>;
}

export async function searchArtist(
	params: SearchArtistParams,
): Promise<Artist[]> {
	const data = await fetchFromApi<{ artists: Artist[] }>("search.php", {
		s: params.query,
	});
	return data.artists ?? [];
}

export async function searchDiscography(
	params: SearchDiscographyParams,
): Promise<Album[]> {
	const data = await fetchFromApi<{ album: Album[] }>("discography.php", {
		s: params.artist,
	});
	return data.album ?? [];
}

export async function searchDiscographyByMBID(
	params: SearchDiscographyMBParams,
): Promise<Album[]> {
	const data = await fetchFromApi<{ album: Album[] }>("discography-mb.php", {
		s: params.mbid,
	});
	return data.album ?? [];
}

export async function searchAlbum(params: SearchAlbumParams): Promise<Album[]> {
	const data = await fetchFromApi<{ album: Album[] }>("searchalbum.php", {
		s: params.artist,
		a: params.album,
	});
	return data.album ?? [];
}

export async function searchTrack(params: SearchTrackParams): Promise<Track[]> {
	const data = await fetchFromApi<{ track: Track[] }>("searchtrack.php", {
		s: params.artist,
		t: params.track,
	});
	return data.track ?? [];
}

export async function lookupArtist(
	params: LookupArtistParams,
): Promise<Artist[]> {
	const data = await fetchFromApi<{ artists: Artist[] }>("artist.php", {
		i: params.artistId,
	});
	return data.artists ?? [];
}

export async function lookupArtistByMBID(
	params: LookupArtistMBParams,
): Promise<Artist[]> {
	const data = await fetchFromApi<{ artists: Artist[] }>("artist-mb.php", {
		i: params.mbid,
	});
	return data.artists ?? [];
}

export async function lookupArtistSocial(
	params: LookupArtistSocialParams,
): Promise<unknown> {
	return await fetchFromApi<unknown>("artist-social.php", {
		i: params.artistId,
	});
}

export async function lookupAlbumsByArtist(
	params: LookupAlbumsByArtistParams,
): Promise<Album[]> {
	const data = await fetchFromApi<{ album: Album[] }>("album.php", {
		i: params.artistId,
	});
	return data.album ?? [];
}

export async function lookupAlbumById(
	params: LookupAlbumByIdParams,
): Promise<Album[]> {
	const data = await fetchFromApi<{ album: Album[] }>("album.php", {
		m: params.albumId,
	});
	return data.album ?? [];
}

export async function lookupAlbumByMBID(
	params: LookupAlbumMBParams,
): Promise<Album[]> {
	const data = await fetchFromApi<{ album: Album[] }>("album-mb.php", {
		i: params.mbid,
	});
	return data.album ?? [];
}

export async function lookupTracksByAlbumId(
	params: LookupTracksByAlbumParams,
): Promise<Track[]> {
	const data = await fetchFromApi<{ track: Track[] }>("track.php", {
		m: params.albumId,
	});
	return data.track ?? [];
}

export async function lookupTrackById(
	params: LookupTrackByIdParams,
): Promise<Track[]> {
	const data = await fetchFromApi<{ track: Track[] }>("track.php", {
		h: params.trackId,
	});
	return data.track ?? [];
}

export async function lookupTrackByMBID(
	params: LookupTrackMBParams,
): Promise<Track[]> {
	const data = await fetchFromApi<{ track: Track[] }>("track-mb.php", {
		i: params.mbid,
	});
	return data.track ?? [];
}
