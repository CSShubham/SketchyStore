
import { useState } from "react";

export default function ImageCarousel({ images = [] }) {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  const prevSlide = () => setCurrent((prev) => (prev - 1 + length) % length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % length);

  return (
    <div className="relative w-full aspect-square bg-gray-100 overflow-hidden rounded-xl">
      {/* No Image */}
      {length === 0 && (
        <img
          src="/Mascot.jpeg"
          alt="No product"
          className="w-full h-full object-contain"
        />
      )}

      {/* Images */}
      {images.map((img, index) => (
        <img
          key={index}
          src={img.url}
          alt={`Slide ${index}`}
          className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Prev */}
      {length > 1 && (
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full text-2xl"
        >
          ‹
        </button>
      )}

      {/* Next */}
      {length > 1 && (
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full text-2xl"
        >
          ›
        </button>
      )}

      {/* Dots */}
      {length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2.5 h-2.5 rounded-full ${
                index === current ? "bg-gray-900" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
