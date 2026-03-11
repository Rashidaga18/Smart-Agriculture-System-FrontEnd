import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

function Navbar() {
  return (
    <nav className="bg-green-900 text-white px-8 py-4 flex justify-between items-center">
      
      {/* Logo Clickable */}
      <Link to="/" className="flex items-center gap-2 text-xl font-semibold cursor-pointer">
        <Leaf className="text-green-400" size={22} />
        <span>Farm Support</span>
      </Link>

      <div className="flex items-center gap-8 text-sm">
        <Link 
          to="/crop-recommendation"
          className="hover:text-green-300"
        >
          Crop Recommendation
        </Link>

        <Link 
          to="/disease-detection"
          className="bg-green-800 px-4 py-1 rounded-md"
        >
          Disease Detection
        </Link>

        <Link 
          to="/login"
          className="border border-green-400 px-4 py-1 rounded-md hover:bg-green-800 transition"
        >
          Login
        </Link>

        <span>🌍 EN</span>
      </div>
    </nav>
  );
}

export default Navbar;