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
        <div className="grid grid-cols-4 gap-4 h-[600px]">
          {/* Main large image - spans 2 columns and 2 rows */}
          <button
            onClick={() => openLightbox(0)}
            className="col-span-2 row-span-2 rounded-xl overflow-hidden group relative focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 active:scale-[0.99] transition-transform"
          >
            <img
              src={images[0]}
              alt={`${name} 1`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </button>

          {/* Second image - tall */}
          <button
            onClick={() => openLightbox(1)}
            className="col-span-2 row-span-1 rounded-xl overflow-hidden group relative focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 active:scale-[0.99] transition-transform"
          >
            <img
              src={images[1]}
              alt={`${name} 2`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </button>

          {/* Third and fourth images - smaller, side by side */}
          <button
            onClick={() => openLightbox(2)}
            className="col-span-1 row-span-1 rounded-xl overflow-hidden group relative focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 active:scale-[0.99] transition-transform"
          >
            <img
              src={images[2]}
              alt={`${name} 3`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </button>

          <button
            onClick={() => openLightbox(3)}
            className="col-span-1 row-span-1 rounded-xl overflow-hidden group relative focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 active:scale-[0.99] transition-transform"
          >
            <img
              src={images[3]}
              alt={`${name} 4`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
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
