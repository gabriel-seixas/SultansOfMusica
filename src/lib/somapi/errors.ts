export class SomApiError extends Error {
	status: number;
	details: string;

	constructor(status: number, details: string) {
		super(details);
		this.name = "SomApiError";
		this.status = status;
		this.details = details;
	}
}
