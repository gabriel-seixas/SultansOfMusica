export class AudioDbApiError extends Error {
	public status: number;
	public statusText: string;

	constructor(status: number, statusText: string) {
		super(`TheAudioDB API error: ${status} ${statusText}`);
		this.name = "AudioDbApiError";
		this.status = status;
		this.statusText = statusText;
	}
}
