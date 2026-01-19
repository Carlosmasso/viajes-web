import { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

export function ImageLightbox({ images, initialIndex = 0, onClose, alt }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [loadedImages, setLoadedImages] = useState(new Set([initialIndex]));
  const [zoom, setZoom] = useState(false);
  const imageRef = useRef(null);

  const minSwipeDistance = 50;

  // Preload adjacent images
  useEffect(() => {
    const preloadImages = [];
    const nextIndex = (currentIndex + 1) % images.length;
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    
    [currentIndex, nextIndex, prevIndex].forEach(index => {
      if (!loadedImages.has(index)) {
        const img = new Image();
        img.src = images[index];
        img.onload = () => {
          setLoadedImages(prev => new Set([...prev, index]));
        };
        preloadImages.push(img);
      }
    });
  }, [currentIndex, images]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isAnimating) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [currentIndex, isAnimating]);

  const goToPrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setZoom(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      setIsAnimating(false);
      setDirection(0);
    }, 300);
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setZoom(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      setIsAnimating(false);
      setDirection(0);
    }, 300);
  };

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) goToNext();
    if (isRightSwipe) goToPrevious();
  };

  const toggleZoom = () => {
    setZoom(!zoom);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-in fade-in duration-300 m-0"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 p-2 md:p-3 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white rounded-full transition-all backdrop-blur-sm z-10 hover:scale-110"
        aria-label="Cerrar galería"
      >
        <X className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 px-3 py-1.5 md:px-4 md:py-2 bg-white/10 backdrop-blur-sm text-white text-sm md:text-base rounded-full z-10">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Zoom controls */}
      <button
        onClick={toggleZoom}
        className="absolute top-20 right-4 md:top-24 md:right-6 p-2 md:p-3 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white rounded-full transition-all backdrop-blur-sm z-10 hover:scale-110"
        aria-label={zoom ? "Reducir zoom" : "Ampliar zoom"}
      >
        {zoom ? <ZoomOut className="w-5 h-5 md:w-6 md:h-6" /> : <ZoomIn className="w-5 h-5 md:w-6 md:h-6" />}
      </button>

      {/* Navigation buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            disabled={isAnimating}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-white/10 hover:bg-white/20 active:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full transition-all backdrop-blur-sm hover:scale-110 disabled:hover:scale-100"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          <button
            onClick={goToNext}
            disabled={isAnimating}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-white/10 hover:bg-white/20 active:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full transition-all backdrop-blur-sm hover:scale-110 disabled:hover:scale-100"
            aria-label="Siguiente imagen"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </>
      )}

      {/* Main image */}
      <div className="max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-8 md:p-12">
        <img
          ref={imageRef}
          src={images[currentIndex]}
          alt={`${alt} - ${currentIndex + 1}`}
          onLoad={() => setLoadedImages(prev => new Set([...prev, currentIndex]))}
          className={`max-w-full max-h-full object-contain rounded-lg transition-all duration-300 ${
            zoom ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
          } ${
            direction === 1 ? 'animate-in slide-in-from-right-10' : 
            direction === -1 ? 'animate-in slide-in-from-left-10' : 
            'animate-in fade-in'
          } ${!loadedImages.has(currentIndex) ? 'opacity-0' : 'opacity-100'}`}
          onClick={toggleZoom}
          draggable={false}
        />
        {!loadedImages.has(currentIndex) && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 max-w-xl overflow-x-auto px-4 scrollbar-hide overflow-y-hidden z-10">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating && index !== currentIndex) {
                setIsAnimating(true);
                setDirection(index > currentIndex ? 1 : -1);
                setZoom(false);
                setTimeout(() => {
                  setCurrentIndex(index);
                  setIsAnimating(false);
                  setDirection(0);
                }, 300);
              }
            }}
            disabled={isAnimating}
            className={`flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all ${
              index === currentIndex
                ? 'border-secondary scale-110 ring-2 ring-secondary/50'
                : 'border-white/20 hover:border-white/50 hover:scale-105'
            } ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </button>
        ))}
      </div>

      {/* Background overlay - clicking closes */}
      <div
        className="absolute inset-0 -z-10"
        onClick={onClose}
        aria-label="Cerrar galería"
      />
    </div>
  );
}
