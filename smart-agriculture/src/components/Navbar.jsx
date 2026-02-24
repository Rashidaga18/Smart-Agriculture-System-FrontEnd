import { Leaf } from "lucide-react";

function Navbar() {
  return (
    <nav className="bg-green-900 text-white px-8 py-4 flex justify-between items-center">
      
      {/* Logo */}
      <div className="flex items-center gap-2 text-xl font-semibold">
        <Leaf className="text-green-400" size={22} />
        <span>Farm Support</span>
      </div>

      {/* Links */}
      <div className="flex items-center gap-8 text-sm">
        <a href="#" className="hover:text-green-300">Crop Recommendation</a>
        <a href="#" className="hover:text-green-300">Disease Detection</a>

        <button className="border border-green-400 px-4 py-1 rounded-md hover:bg-green-700 transition">
          Login
        </button>

        <span className="flex items-center gap-1 cursor-pointer">
          🌍 EN
        </span>
      </div>
    </nav>
  );
}

export default Navbar;