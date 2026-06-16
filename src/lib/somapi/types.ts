export interface CreateUserRequest {
	email: string;
	password: string;
}

export interface CreateArtistRequest {
	"api-id": string;
	name: string;
}

export interface CreateProductRequest {
	"api-id": string;
	"artist-api-id": string;
	"artist-name": string;
	cover: string;
	price: number;
	release_date: string;
	stock: number;
	title: string;
	"type-id": number;
}

export interface GetProductListPageRequest {
	amount: number;
	page: number;
}

export interface LoginUserRequest {
	email: string;
	password: string;
}

export interface SellProductRequest {
	"sale-items": SaleRequestInfo[];
}

export interface SaleRequestInfo {
	"product-id": number;
	"sale-amount": number;
}

export interface UpdateInventoryRequest {
	"product-id": number;
	"new-stock": number;
}

export interface UpdateProductRequest {
	"api-id"?: string;
	"artist-api-id"?: string;
	"artist-name"?: string;
	cover?: string;
	price?: number;
	"product-id"?: number;
	release_date?: string;
	title?: string;
	"type-id"?: number;
}

export interface GetUserResponse {
	email: string;
	id: number;
}

export interface LoginUserResponse {
	"jwt-token": string;
}

export interface GetProductResponse {
	"api-id": string;
	artist: string;
	"artist-id": number;
	cover: string;
	id: number;
	price: number;
	"release-date": string;
	stock: number;
	title: string;
	type: string;
	"type-id": number;
}

export interface GetProductListResponse {
	"product-list": GetProductResponse[];
}

export interface SaleItemInfo {
	amount: number;
	artist: string;
	"artist-id": number;
	cover: string;
	price: number;
	"product-id": number;
	"product-title": string;
	stock: number;
	type: string;
	"type-id": number;
}

export interface GetSaleResponse {
	"date-time": string;
	id: number;
	items: SaleItemInfo[];
}

export interface SellProductResponse {
	"sale-id": number;
}

/** Standard error body */
export interface ErrorResponse {
	error: string;
	details: string;
}
