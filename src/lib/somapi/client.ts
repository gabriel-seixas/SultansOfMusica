import { PUBLIC_SOM_APIURL } from "$env/static/public";
import { SomApiError } from "./errors.ts";
import type {
	CreateArtistRequest,
	CreateProductRequest,
	CreateUserRequest,
	ErrorResponse,
	GetProductListPageRequest,
	GetProductListResponse,
	GetProductResponse,
	GetSaleResponse,
	GetUserResponse,
	LoginUserRequest,
	LoginUserResponse,
	SellProductRequest,
	SellProductResponse,
	UpdateInventoryRequest,
	UpdateProductRequest,
} from "./types.ts";

const BASE_PATH = "/api/v1";
const BASE_URL = `${PUBLIC_SOM_APIURL}${BASE_PATH}`;

async function request<T>(
	method: string,
	path: string,
	body?: Record<string, unknown>,
	authToken?: string,
): Promise<T> {
	const headers: Record<string, string> = {
		"Content-Type": "application/json",
	};
	if (authToken) {
		headers["Authorization"] = `Bearer ${authToken}`;
	}

	const response = await fetch(`${BASE_URL}${path}`, {
		method,
		headers,
		body: body ? JSON.stringify(body) : undefined,
	});

	if (!response.ok) {
		let errorMsg = response.statusText;
		try {
			const errBody: ErrorResponse = await response.json();
			errorMsg = errBody.details || errBody.error || errorMsg;
		} catch {
			// ignore parse errors
		}
		throw new SomApiError(response.status, errorMsg);
	}

	// 201/204 with no body → return undefined
	if (
		response.status === 204 ||
		response.headers.get("content-length") === "0"
	) {
		return undefined as unknown as T;
	}

	return response.json() as Promise<T>;
}

export async function createUser(
	params: CreateUserRequest,
	authToken?: string,
): Promise<void> {
	await request<void>(
		"POST",
		"/user/create",
		params as unknown as Record<string, unknown>,
		authToken,
	);
}

export async function loginUser(
	params: LoginUserRequest,
): Promise<LoginUserResponse> {
	return request<LoginUserResponse>(
		"POST",
		"/user/login",
		params as unknown as Record<string, unknown>,
	);
}

export async function getUserById(
	id: number,
	authToken?: string,
): Promise<GetUserResponse> {
	return request<GetUserResponse>("GET", `/user/${id}`, undefined, authToken);
}

export async function createArtist(
	params: CreateArtistRequest,
	authToken?: string,
): Promise<void> {
	await request<void>(
		"POST",
		"/artist/create",
		params as unknown as Record<string, unknown>,
		authToken,
	);
}

export async function createProduct(
	params: CreateProductRequest,
	authToken?: string,
): Promise<void> {
	await request<void>(
		"POST",
		"/product/create",
		params as unknown as Record<string, unknown>,
		authToken,
	);
}

export async function getProductById(
	id: number,
	authToken?: string,
): Promise<GetProductResponse> {
	return request<GetProductResponse>(
		"GET",
		`/product/${id}`,
		undefined,
		authToken,
	);
}

export async function getProductList(
	params: GetProductListPageRequest,
	authToken?: string,
): Promise<GetProductListResponse> {
	return request<GetProductListResponse>(
		"POST",
		"/product/list",
		params as unknown as Record<string, unknown>,
		authToken,
	);
}

export async function getAllProducts(
	authToken?: string,
): Promise<GetProductListResponse> {
	return request<GetProductListResponse>(
		"GET",
		"/product/all",
		undefined,
		authToken,
	);
}

export async function sellProduct(
	params: SellProductRequest,
	authToken?: string,
): Promise<SellProductResponse> {
	return request<SellProductResponse>(
		"POST",
		"/product/sell",
		params as unknown as Record<string, unknown>,
		authToken,
	);
}

export async function updateProduct(
	params: UpdateProductRequest,
	authToken?: string,
): Promise<void> {
	await request<void>(
		"PUT",
		"/product/update",
		params as unknown as Record<string, unknown>,
		authToken,
	);
}

export async function updateInventory(
	params: UpdateInventoryRequest,
	authToken?: string,
): Promise<void> {
	await request<void>(
		"PUT",
		"/inventory/update",
		params as unknown as Record<string, unknown>,
		authToken,
	);
}

export async function getSaleById(
	id: number,
	authToken?: string,
): Promise<GetSaleResponse> {
	return request<GetSaleResponse>("GET", `/sale/${id}`, undefined, authToken);
}

export async function getAllSales(
	authToken?: string,
): Promise<GetSaleResponse[]> {
	return request<GetSaleResponse[]>("GET", "/sale/all", undefined, authToken);
}
