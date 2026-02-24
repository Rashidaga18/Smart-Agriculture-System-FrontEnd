import Navbar from "../components/Navbar";
import farmImage from "../assets/farm.jpg";

function Home() {
  return (
    <div className="relative min-h-screen w-full">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${farmImage})` }}
      ></div>

      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-black/60 to-orange-700/60"></div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />

        <div className="flex flex-col items-center justify-center text-center text-white px-6 h-[80vh]">
          <h1 className="text-5xl md:text-6xl font-bold">
            Welcome to{" "}
            <span className="text-green-400">Farmer Support</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-gray-200">
            Transform your farming with intelligent crop recommendations,
            disease detection, and data-driven insights. Join thousands of
            farmers already using AI to increase their yields.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;