import { Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="absolute top-0 left-0 right-0 z-20 bg-white/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-3 hover:opacity-70 transition-opacity"
        >
          <div className="p-2 bg-secondary rounded-lg">
            <Globe className="w-6 h-6 text-secondary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Viajes Mundo</h1>
            <p className="text-xs text-muted-foreground">Explora el planeta</p>
          </div>
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
