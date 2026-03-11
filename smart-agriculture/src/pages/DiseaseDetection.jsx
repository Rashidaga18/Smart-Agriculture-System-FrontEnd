import Navbar from "../components/Navbar";
import { UploadCloud } from "lucide-react";

function DiseaseDetection() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex justify-center items-center py-12 px-4">
        
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl">

          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <UploadCloud size={20} />
            Upload Plant Image
          </h2>

          <p className="text-gray-500 mb-6">
            Take a clear photo of the affected leaf for accurate detection
          </p>

          {/* Upload Box */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center text-center mb-6">

            <UploadCloud size={50} className="text-gray-400 mb-4" />

            <p className="font-medium">Upload Leaf Image</p>
            <p className="text-sm text-gray-500 mb-4">
              Supported formats: JPG, PNG, WEBP (Max 10MB)
            </p>

            <label className="bg-green-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-green-700 transition">
              Choose Image
              <input type="file" className="hidden" />
            </label>

          </div>

          {/* Tips Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="bg-green-100 border border-green-300 rounded-lg p-3 text-sm">
              🌿 <span className="font-semibold">Good lighting:</span> Ensure the leaf is well-lit with natural light
            </div>

            <div className="bg-green-100 border border-green-300 rounded-lg p-3 text-sm">
              🔍 <span className="font-semibold">Clear focus:</span> Keep the leaf in sharp focus without blur
            </div>

            <div className="bg-green-100 border border-green-300 rounded-lg p-3 text-sm">
              🍃 <span className="font-semibold">Full leaf:</span> Capture the entire affected leaf area
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default DiseaseDetection;