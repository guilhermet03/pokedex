import { Link } from "react-router";

interface PokemonCardProps {
    id: number;
    nome: string;
    imagem: string;
}

export default function 
    PokemonCard({ id, nome, imagem }: PokemonCardProps) {
        return(

        <Link
            to={`/pokemon/${nome}`}
            className="group relative flex flex-col items-center
            rounded-2xl border border-neutral-200 bg-white p-4
            shadow-sm transition hover:-translate-y-1
            hover:border-red-200 hover:shadow-lg"
        >

        <span className="absolute top-3 font-mono
                     text-xs text-neutral-400">
            #{String(id).padStart(3, "0")}
        </span>

        <img src={imagem} alt={nome} loading="lazy"
            className="h-24 w-24 transition group-hover:scale-110" />

        <p className="mt-2 text-center font-medium
            text-neutral-800 capitalize">
            {nome}
        </p>        

        </Link>
    );
}