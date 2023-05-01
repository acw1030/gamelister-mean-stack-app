import { Game } from './game';

export interface Result {
    count: number,
    next: string,
    previous: string,
    results: Game[]
}