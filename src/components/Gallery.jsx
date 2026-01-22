import { useState } from 'react';
import { ImageLightbox } from './ImageLightbox';

export function Gallery({ images, name }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          Galería de {name}
        </h2>
        
        {/* Mobile: Carousel horizontal con scroll */}
        <div className="md:hidden">
          <div className="relative">
            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => openLightbox(index)}
                  className="flex-shrink-0 w-[85vw] h-[300px] snap-center group relative overflow-hidden rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/50"
                >
                  <img
                    src={image}
                    alt={`${name} ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-active:bg-black/20 transition-all duration-300" />
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-white text-sm font-medium">{index + 1} / {images.length}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: Custom grid layout */}
        <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-1 h-[500px] rounded-2xl overflow-hidden">
          {/* Primera imagen - mitad del espacio (2 cols x 2 rows) */}
          <button
            onClick={() => openLightbox(0)}
            className="col-span-2 row-span-2 group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-secondary/50"
          >
            <img
              src={images[0]}
              alt={`${name} 1`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
          </button>

          {/* Segunda imagen - mitad de la mitad (1 col x 2 rows) */}
          <button
            onClick={() => openLightbox(1)}
            className="col-span-1 row-span-2 group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-secondary/50"
          >
            <img
              src={images[1]}
              alt={`${name} 2`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
          </button>

          {/* Tercera y cuarta imagen - una encima de otra (1 col x 1 row cada una) */}
          <button
            onClick={() => openLightbox(2)}
            className="col-span-1 row-span-1 group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-secondary/50"
          >
            <img
              src={images[2]}
              alt={`${name} 3`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
          </button>

          <button
            onClick={() => openLightbox(3)}
            className="col-span-1 row-span-1 group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-secondary/50"
          >
            <img
              src={images[3]}
              alt={`${name} 4`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
            {images.length > 4 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white text-3xl font-semibold">+{images.length - 4}</span>
              </div>
            )}
          </button>
        </div>
      </div>

      {lightboxOpen && (
        <ImageLightbox
          images={images}
          initialIndex={selectedImageIndex}
          onClose={() => setLightboxOpen(false)}
          alt={name}
        />
      )}
    </>
  );
}
