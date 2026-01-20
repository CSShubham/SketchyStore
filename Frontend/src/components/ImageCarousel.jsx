// import { useState } from "react";

// export default function ImageCarousel({ images =[]}) {
//   const [current, setCurrent] = useState(0);
//   const length = images.length;

//   if (length === 0) {
//     return (
//       <div className="w-full h-full flex items-center justify-center">
//         <img
//           src="./Mascot.jpeg"
//           alt="No product image"
//           className="w-full h-full object-cover"
//         />
//       </div>
//     );
//   }

//   const prevSlide = () => setCurrent((current - 1 + length) % length);
//   const nextSlide = () => setCurrent((current + 1) % length);

//   return (
//     <div className="relative w-full max-w-md h-full mx-auto overflow-hidden">
//       {/* Images */}
//       <div className="w-full h-full">
//         {images.map((img, index) => (
//           <img
//             key={index}
//             src={img.url}
//             alt={`Slide ${index}`}
//             className={`absolute w-full h-full object-cover transition-opacity duration-500 ${
//               index === current ? "opacity-100" : "opacity-0"
//             }`}
//           />
//         ))}
//       </div>

//       {/* Prev Button */}
//       <button
//         className="absolute top-1/2 text-4xl left-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
//         onClick={prevSlide}
//       >
//         ‹
//       </button>

//       {/* Next Button */}
//       <button
//         className="absolute top-1/2 right-4 text-4xl transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
//         onClick={nextSlide}
//       >
//         ›
//       </button>

//       {/* Dots */}
//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//         {images.map((_, index) => (
//           <button
//             key={index}
//             className={`w-3 h-3 border-1 rounded-full ${
//               index === current ? "bg-white" : "bg-gray-600"
//             }`}
//             onClick={() => setCurrent(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
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
