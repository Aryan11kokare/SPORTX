import { useState } from "react";
import { Link } from "react-router-dom";

const categories = [
  { id: 1, name: "Basketball", icon: "🏀" },
  { id: 2, name: "Cricket", icon: "🏏" },
  { id: 3, name: "Footwear", icon: "👟" },
  { id: 4, name: "Fitness", icon: "💪" },
  { id: 5, name: "Tennis", icon: "🎾" },
  { id: 6, name: "Football", icon: "⚽" },
  { id: 7, name: "Strength Training", icon: "🏋️" },
  { id: 8, name: "Swimming", icon: "🏊" },
  { id: 9, name: "Boxing", icon: "🥊" },
  { id: 10, name: "Cycling", icon: "🚴" },
  { id: 11, name: "Golf", icon: "⛳" },
  { id: 12, name: "Skateboarding", icon: "🛹" },
];

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-black text-white py-8 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center tracking-tight">
            SPORTS EQUIPMENT STORE
          </h1>
          <p className="text-center text-gray-300 mt-3 text-lg">
            Premium Quality | Professional Grade
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">
            Shop by Category
          </h2>
          <div className="w-24 h-1 bg-black"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              to={`/view/${category.name}`}
              key={category.id}
              className={`group relative overflow-hidden border-2 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl ${
                selectedCategory === category.id
                  ? "border-black bg-black text-white"
                  : "border-gray-300 bg-white text-black hover:border-black"
              }`}
            >
              <div className="p-8 text-center">
                <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold tracking-wide uppercase">
                  {category.name}
                </h3>
              </div>

              <div
                className={`absolute bottom-0 left-0 right-0 h-1 transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-white"
                    : "bg-black transform scale-x-0 group-hover:scale-x-100"
                }`}
              ></div>
            </Link>
          ))}
        </div>

        {selectedCategory && (
          <div className="mt-12 p-8 bg-black text-white text-center rounded-none shadow-xl">
            <h3 className="text-2xl font-bold mb-2">
              {categories.find((c) => c.id === selectedCategory)?.name}
            </h3>
            <p className="text-gray-300 mb-4">
              Browse our premium collection of{" "}
              {categories
                .find((c) => c.id === selectedCategory)
                ?.name.toLowerCase()}{" "}
              equipment
            </p>
            <button className="bg-white text-black px-8 py-3 font-semibold hover:bg-gray-200 transition-colors duration-300 uppercase tracking-wide">
              View Products
            </button>
          </div>
        )}
      </main>

      <footer className="bg-black text-white py-8 px-6 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-lg mb-3 uppercase">Quality</h4>
              <p className="text-gray-400 text-sm">
                Premium grade equipment for professionals and enthusiasts
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-3 uppercase">Service</h4>
              <p className="text-gray-400 text-sm">
                Expert guidance and customer support
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-3 uppercase">Delivery</h4>
              <p className="text-gray-400 text-sm">
                Fast and reliable shipping worldwide
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6">
            <p className="text-gray-400 text-sm">
              &copy; 2026 Sports Equipment Store. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Categories;
