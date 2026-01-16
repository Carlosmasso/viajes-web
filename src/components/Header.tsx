import { Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="absolute top-0 left-0 right-0 z-20 p-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="p-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Viajes Mundo</h1>
            <p className="text-sm text-white/80">Explora el planeta</p>
          </div>
        </button>
        
        <nav className="hidden md:flex items-center gap-6 text-white">
          <a href="#" className="hover:text-white/80 transition-colors">Destinos</a>
          <a href="#" className="hover:text-white/80 transition-colors">Ofertas</a>
          <a href="#" className="hover:text-white/80 transition-colors">Contacto</a>
          {/* <button className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg hover:bg-white/20 transition-colors border border-white/20">
            Iniciar sesión
          </button> */}
        </nav>
      </div>
    </header>
  );
}
