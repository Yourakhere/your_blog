import axios from "axios";
import React, { useEffect, useState } from "react";

function Creators() {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4001/api/users/admins", { withCredentials: true })
      .then(({ data }) => setCreators(data.admins))
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-5xl mx-auto my-12 px-4">
      <h2 className="text-2xl font-bold text-center mb-8">Our Creators</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {creators.length ? (
          creators.map(({ _id, photo, name, email, phone, role }) => (
            <div
              key={_id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col items-center"
            >
              <img
                src={photo.url}
                alt={name}
                className="w-20 h-20 rounded-full mb-3 object-cover border-2 border-gray-300"
              />
              <h3 className="text-lg font-semibold">{name}</h3>
              <p className="text-sm text-gray-600">{role}</p>
              <p className="text-xs text-gray-500 truncate">{email}</p>
              {phone && <p className="text-xs text-gray-500">{phone}</p>}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Creators;
