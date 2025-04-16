import axios from "axios";
import React, { useEffect, useState } from "react";

function Creator() {
  const [admin, setAdmin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // To handle any errors

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const { data } = await axios.get("http://localhost:4001/api/users/admins", {
          withCredentials: true,
        });
        if (data.admins) {
          setAdmin(data.admins);  // Assuming 'admins' is an array in the response
        }
      } catch (err) {
        setError("Failed to load admins");  // Error handling
        console.error("Error fetching admins:", err);
      } finally {
        setLoading(false);  // Stop loading when request completes
      }
    };

    fetchAdmins();
  }, []);

  // Handle loading and error states
  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <span>Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center text-red-600">
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Popular Creators</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 rounded-full my-5">
        {admin && admin.length > 0 ? (
          admin.slice(0, 4).map((element) => {
            return (
              <div key={element._id} className="text-center">
                <div>
                  {/* Check if photo.url exists */}
                  <img
                    src={element.photo?.url || "fallback-image-url"} // Fallback if photo URL is missing
                    alt="creator"
                    className="md:w-56 md:h-56 object-cover border border-black rounded-full"
                  />
                  <div className="mt-2">
                    <p className="text-lg font-semibold">{element.name}</p>
                    <p className="text-gray-600 text-xs">{element.role}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500">No creators found.</div>
        )}
      </div>
    </div>
  );
}

export default Creator;
