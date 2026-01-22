import awaynaLogo from "@/assets/awayna_rojo.svg";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="absolute top-0 left-0 right-0 z-20 bg-white/90 backdrop-blur-lg border-b border-border/40 shadow-sm animate-in fade-in slide-in-from-top duration-500">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button onClick={() => navigate("/")}>
          <img
            src={awaynaLogo}
            alt="awayna"
            className="h-15 w-auto transition-all group-hover:scale-110"
          />
        </button>

        {/* <nav className="hidden md:flex items-center gap-8 text-foreground">
          <a href="#" className="text-sm font-medium hover:text-muted-foreground transition-colors">Destinos</a>
          <a href="#" className="text-sm font-medium hover:text-muted-foreground transition-colors">Ofertas</a>
          <a href="#" className="text-sm font-medium hover:text-muted-foreground transition-colors">Contacto</a>
        </nav> */}
      </div>
    </header>
  );
}
