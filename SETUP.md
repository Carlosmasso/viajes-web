# Web de Viajes

## 🚀 Ejecutar el proyecto

```bash
pnpm install
pnpm dev
```

## ✨ Características

- **Globo 3D interactivo** con Globe.gl (sin necesidad de tokens)
- **8 destinos** predefinidos alrededor del mundo
- **Animación flyto** al hacer clic en un destino
- **Modal** con información detallada de cada destino
- **Diseño responsive** con Tailwind CSS
- **Marcadores interactivos** con tooltips
- **Auto-rotación** del globo terráqueo

## 📝 Personalización

### Agregar nuevos destinos

Edita el archivo `src/data/destinations.ts` y agrega nuevos objetos al array:

```typescript
{
  id: 'nuevo-destino',
  name: 'Nombre',
  country: 'País',
  description: 'Descripción...',
  coordinates: [lng, lat], // Longitud, Latitud
  image: 'url-de-imagen',
  highlights: ['Punto 1', 'Punto 2'],
  bestTime: 'Mejor época para visitar',
  price: 'Desde €XXX'
}
```

### Personalizar el globo

En `src/components/MapboxGlobe.tsx` puedes modificar:

- Velocidad de rotación: `autoRotateSpeed` (línea 24)
- Imágenes del globo: `globeImageUrl`, `bumpImageUrl`, `backgroundImageUrl`
- Color de atmósfera: `atmosphereColor`
- Punto de vista inicial: `pointOfView`

## 🎨 Stack Tecnológico

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Globe.gl
- Lucide React (iconos)
