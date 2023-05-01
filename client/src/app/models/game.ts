export interface Game {
    id: number,
    slug: string,
    name: string,
    description: string,
    released: string,
    background_image: string,
    metacritic: number,
    website: string,
    esrb_rating: AgeRating,
    genres: Genre[],
    publishers: Publisher[],
    developers: Developer[],
    platforms: Platforms[]
}

export interface AgeRating {
    id: number,
    name: string
}

export interface Genre {
    name: string
}

export interface Publisher {
    name: string
}

export interface Developer {
    name: string
}

export interface Platforms {
    platform: Platform
}

export interface Platform {
    id: number,
    name: string
}