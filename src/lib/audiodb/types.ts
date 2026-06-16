export interface Artist {
	idArtist: string;
	strArtist: string;
	strArtistStripped: string | null;
	strArtistAlternate: string;
	strLabel: string;
	idLabel: string;
	intFormedYear: string;
	intBornYear: string;
	intDiedYear: string | null;
	strDisbanded: string | null;
	strStyle: string;
	strGenre: string;
	strMood: string;
	strWebsite: string;
	strFacebook: string;
	strTwitter: string;
	strBiography: string;
	strBiographyDE: string | null;
	strBiographyFR: string | null;
	strBiographyCN: string | null;
	strBiographyIT: string | null;
	strBiographyJP: string | null;
	strBiographyRU: string | null;
	strBiographyES: string | null;
	strBiographyPT: string | null;
	strBiographySE: string | null;
	strBiographyNL: string | null;
	strBiographyHU: string | null;
	strBiographyNO: string | null;
	strBiographyIL: string | null;
	strBiographyPL: string | null;
	strGender: string;
	intMembers: string;
	strCountry: string;
	strCountryCode: string;
	strArtistThumb: string | null;
	strArtistLogo: string | null;
	strArtistCutout: string | null;
	strArtistClearart: string | null;
	strArtistWideThumb: string | null;
	strArtistFanart: string | null;
	strArtistFanart2: string | null;
	strArtistFanart3: string | null;
	strArtistFanart4: string | null;
	strArtistBanner: string | null;
	strMusicBrainzID: string;
	strISNIcode: string | null;
	strLastFMChart: string | null;
	intCharted: string;
	strLocked: string;
}

export interface Album {
	idAlbum: string;
	idArtist: string;
	idLabel: string;
	strAlbum: string;
	strAlbumStripped: string;
	strArtist: string;
	strArtistStripped: string;
	intYearReleased: string;
	strStyle: string;
	strGenre: string;
	strLabel: string;
	strReleaseFormat: string;
	intSales: string;
	strAlbumThumb: string | null;
	strAlbumThumbHQ: string | null;
	strAlbumBack: string | null;
	strAlbumCDart: string | null;
	strAlbumSpine: string | null;
	strAlbum3DCase: string | null;
	strAlbum3DFlat: string | null;
	strAlbum3DFace: string | null;
	strAlbum3DThumb: string | null;
	strDescription: string | null;
	strDescriptionDE: string | null;
	strDescriptionFR: string | null;
	strDescriptionCN: string | null;
	strDescriptionIT: string | null;
	strDescriptionJP: string | null;
	strDescriptionRU: string | null;
	strDescriptionES: string | null;
	strDescriptionPT: string | null;
	strDescriptionSE: string | null;
	strDescriptionNL: string | null;
	strDescriptionHU: string | null;
	strDescriptionNO: string | null;
	strDescriptionIL: string | null;
	strDescriptionPL: string | null;
	intLoved: string | null;
	intScore: string | null;
	intScoreVotes: string | null;
	intPopularity: string | null;
	strReview: string;
	strMood: string | null;
	strTheme: string | null;
	strSpeed: string | null;
	strLocation: string | null;
	strMusicBrainzID: string;
	strMusicBrainzArtistID: string;
	strAllMusicID: string | null;
	strBBCReviewID: string | null;
	strRateYourMusicID: string | null;
	strDiscogsID: string | null;
	strWikidataID: string | null;
	strWikipediaID: string | null;
	strGeniusID: string | null;
	strLyricWikiID: string | null;
	strMusicMozID: string | null;
	strItunesID: string | null;
	strAmazonID: string | null;
	strUPCID: string | null;
	strSpotifyID: string | null;
	strLocked: string;
	intChecked: string;
}

export interface Track {
	idTrack: string;
	idAlbum: string;
	idArtist: string;
	idLyric: string | null;
	idIMVDB: string | null;
	strTrack: string;
	strAlbum: string;
	strArtist: string;
	strArtistAlternate: string | null;
	intCD: string | null;
	intDuration: string;
	strGenre: string;
	strMood: string | null;
	strStyle: string | null;
	strTheme: string | null;
	strDescriptionEN: string | null;
	strDescriptionDE: string | null;
	strDescriptionFR: string | null;
	strDescriptionCN: string | null;
	strDescriptionIT: string | null;
	strDescriptionJP: string | null;
	strDescriptionRU: string | null;
	strDescriptionES: string | null;
	strDescriptionPT: string | null;
	strDescriptionSE: string | null;
	strDescriptionNL: string | null;
	strDescriptionHU: string | null;
	strDescriptionNO: string | null;
	strDescriptionIL: string | null;
	strDescriptionPL: string | null;
	strTrackThumb: string | null;
	strTrack3DCase: string | null;
	strTrackLyrics: string | null;
	strMusicVid: string | null;
	strMusicVidDirector: string | null;
	strMusicVidCompany: string | null;
	strMusicVidScreen1: string | null;
	strMusicVidScreen2: string | null;
	strMusicVidScreen3: string | null;
	intMusicVidViews: string | null;
	intMusicVidLikes: string | null;
	intMusicVidDislikes: string | null;
	intMusicVidFavorites: string | null;
	intMusicVidComments: string | null;
	intTrackNumber: string;
	intLoved: string;
	intScore: string | null;
	intPopularity: string | null;
	intScoreVotes: string | null;
	intTotalListeners: string | null;
	intTotalPlays: string | null;
	strMusicBrainzID: string;
	strMusicBrainzAlbumID: string;
	strMusicBrainzArtistID: string;
	strLocked: string;
}

export interface SearchArtistParams {
	/** Artist name to search for */
	query: string;
}

export interface SearchDiscographyParams {
	/** Artist name */
	artist: string;
}

export interface SearchDiscographyMBParams {
	/** MusicBrainz artist ID */
	mbid: string;
}

export interface SearchAlbumParams {
	/** Artist name */
	artist: string;
	/** Album name (optional) */
	album?: string;
}

export interface SearchTrackParams {
	/** Artist name */
	artist: string;
	/** Track name */
	track: string;
}

export interface LookupArtistParams {
	/** AudioDB artist ID */
	artistId: number;
}

export interface LookupArtistMBParams {
	/** MusicBrainz artist ID */
	mbid: string;
}

export interface LookupArtistSocialParams {
	/** AudioDB artist ID */
	artistId: number;
}

export interface LookupAlbumsByArtistParams {
	/** AudioDB artist ID */
	artistId: number;
}

export interface LookupAlbumByIdParams {
	/** AudioDB album ID */
	albumId: number;
}

export interface LookupAlbumMBParams {
	/** MusicBrainz release group ID */
	mbid: string;
}

export interface LookupTracksByAlbumParams {
	/** AudioDB album ID */
	albumId: number;
}

export interface LookupTrackByIdParams {
	/** AudioDB track ID */
	trackId: number;
}

export interface LookupTrackMBParams {
	/** MusicBrainz recording ID */
	mbid: string;
}
