import type { PokemonResumo } from "../types";

const POKEAPI_URL = "https://pokeapi.co/api/v2";

interface PokemonListItem {
    name: string;
    url: string
}

interface PokemonListResponse {
    results: PokemonListItem[];
}

function extrairId(url: string): number{
    const partes = url.split("/").filter(Boolean);
    return Number(partes[partes.length - 1]);
}

function imagemSprite(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

export async function buscarTodosPokemons(): Promise<PokemonResumo[]>{
    const resultado = await fetch(`${POKEAPI_URL}/pokemon?limit=200`);

    if (!resultado.ok){
        throw new Error("Não foi possível carregar a lista de pokemons.");
    }

    const dados: PokemonListResponse = await resultado.json();

    return dados.results.map((item => {
        const id = extrairId(item.url);
        return { id, nome: item.name, imagem: imagemSprite(id) }
    }))
}


export interface PokemonDetalhe {
    id: number;
    nome: string;
    imagem: string;
    altura: number;
    peso: number;
    tipos: string[];
    habilidades: string[];
    stats: {nome: string; valor: number}[];
}

interface PokemonDetalheResponse {
    id: number;
    height: number;
    weight: number;
    types: {type: {name: string}}[];
    abilities: {ability: {name: string}}[];
    stats: {base_stat: number; stat: {name: string}}[];
    sprites: {
        front_default: string | null;
        other?: {"official-artwork"?: { front_default: string | null}};
    }
}

export async function buscarDetalhe(nome:string):
Promise<PokemonDetalhe>{
    const resultado = await fetch(`${POKEAPI_URL}/pokemon/${nome}`);
    if(!resultado.ok){
        throw new Error("Erro ao carregar detalhes.");
    }

    const dados: PokemonDetalheResponse = await resultado.json();
    const imagemOficial = dados.sprites.other?.["official-artwork"]?.front_default

    return{
        id: dados.id,
        nome,
        imagem: imagemOficial ?? dados.sprites.front_default ?? imagemSprite(dados.id),
        altura: dados.height / 10,
        peso: dados.weight / 10,
        tipos: dados.types.map((t) => t.type.name),
        habilidades: dados.abilities.map((a) => a.ability.name),
        stats: dados.stats.map((s) => ({nome: s.stat.name, valor: s.base_stat}))
    }
}