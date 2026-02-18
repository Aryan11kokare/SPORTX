function Hero() {
  return (
    <div className="relative bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Premium Sports
            <br />
            <span className="text-gray-400">Equipment</span>
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Elevate your game with our curated collection of professional-grade
            sports equipment. Quality that performs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#products"
              className="bg-white text-black px-8 py-4 font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
            >
              Shop Collection
            </a>
            <a
              href="#"
              className="border-2 border-white px-8 py-4 font-semibold hover:bg-white hover:text-black transition-all duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
    </div>
  );
}

export default Hero;
