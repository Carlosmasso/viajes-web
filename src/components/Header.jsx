import awaynaLogoRojo from "@/assets/awayna_rojo.svg";
import awaynaLogoBlanco from "@/assets/awayna_blanco.svg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export function Header() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        top: 0,
        width: "100%",
        position: "fixed",
        paddingInline: "12px",
        zIndex: 1000,
        backgroundColor: scrolled ? "#ffffff" : "#A61D2D",
        height: "60px",
        transition: "background-color 0.3s ease",
      }}
    >
      <div>
        <button onClick={() => navigate("/")}>
          <img
            alt="awayna"
            src={scrolled ? awaynaLogoRojo : awaynaLogoBlanco}
            className="h-15 w-auto transition-all group-hover:scale-110"
            style={{ transition: "opacity 0.3s ease" }}
          />
        </button>
      </div>
    </header>
  );

  {
    /*return (
    <header className="absolute top-0 left-0 right-0 z-20 bg-white/90 backdrop-blur-lg border-b border-border/40 shadow-sm animate-in fade-in slide-in-from-top duration-500">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button onClick={() => navigate("/")}>
          <img
            src={awaynaLogoRojo}
            alt="awayna"
            className="h-15 w-auto transition-all group-hover:scale-110"
          />
        </button>

         <nav className="hidden md:flex items-center gap-8 text-foreground">
          <a href="#" className="text-sm font-medium hover:text-muted-foreground transition-colors">Destinos</a>
          <a href="#" className="text-sm font-medium hover:text-muted-foreground transition-colors">Ofertas</a>
          <a href="#" className="text-sm font-medium hover:text-muted-foreground transition-colors">Contacto</a>
        </nav> 
      </div>
    </header>
  );
  */
  }
}
