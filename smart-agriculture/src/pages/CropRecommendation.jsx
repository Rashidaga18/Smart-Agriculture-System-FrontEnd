import Navbar from "../components/Navbar";

function CropRecommendation() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex justify-center items-center py-12 px-4">
        
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl">

          <h2 className="text-2xl font-bold text-center mb-2">
            Soil & Weather Analysis
          </h2>

          <p className="text-center text-gray-500 mb-6">
            Provide soil nutrients and weather conditions for personalized crop suggestions.
          </p>

          {/* Quick Auto Fill */}
          <div className="bg-green-100 border border-green-300 rounded-lg p-4 flex justify-between items-center mb-6">
            <div>
              <p className="font-semibold text-sm">Quick Auto-fill</p>
              <p className="text-xs text-gray-600">
                Auto-populate with sample soil and weather data.
              </p>
            </div>
            <button className="bg-green-600 text-white px-4 py-1 rounded-md text-sm">
              Auto-fill Data
            </button>
          </div>

          {/* Soil Nutrients */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Soil Nutrients (mg/kg)</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input type="number" placeholder="Nitrogen (0-100)" className="border p-2 rounded-md w-full" />
              <input type="number" placeholder="Phosphorus (0-100)" className="border p-2 rounded-md w-full" />
              <input type="number" placeholder="Potassium (0-100)" className="border p-2 rounded-md w-full" />
            </div>
          </div>

          {/* Soil PH */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Soil pH Level</h3>
            <input type="number" placeholder="0.0 - 14.0" className="border p-2 rounded-md w-full" />
          </div>

          {/* Weather */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Weather Conditions</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input type="number" placeholder="Temperature (°C)" className="border p-2 rounded-md w-full" />
              <input type="number" placeholder="Humidity (%)" className="border p-2 rounded-md w-full" />
              <input type="number" placeholder="Rainfall (mm/year)" className="border p-2 rounded-md w-full" />
            </div>
          </div>

          {/* Location */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Farm Location</h3>
            <input type="text" placeholder="City, State, Country" className="border p-2 rounded-md w-full" />
          </div>

          {/* Submit Button */}
          <button className="w-full bg-green-800 text-white py-3 rounded-md font-semibold hover:bg-green-900 transition">
            Analyze & Get Suggestions
          </button>

        </div>
      </div>
    </div>
  );
}

export default CropRecommendation;