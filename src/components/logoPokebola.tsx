export default function LogoPokebola() {
    return (
        <span 
            aria-hidden="true"
            className="relative inline-block h-10 w-10 shrink-0
            rounded-full border-2 border-neutral-900 shadow-sm"

            style={{
                backgroundImage:
                "linear-gradient(to bottom, #EF4444 0%, #EF4444 47%, #171717 47%, #171717 53%, #FFF 53%, #FFF 100%)"
            }}
            >
                <span className="absolute top-1/2 left-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-neutral-900 bg-white" />
        </span>
    );
}