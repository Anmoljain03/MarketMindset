// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// export default function IndicatorDetail() {
//   const { id } = useParams();
//   const [indicator, setIndicator] = useState(null);

//   useEffect(() => {
//     fetch(`/api/indicators/${id}`)
//       .then(res => res.json())
//       .then(data => setIndicator(data));
//   }, [id]);

//   if (!indicator) return <div className="text-center text-white">Loading...</div>;

//   return (
// <div className="bg-black text-orange-400 px-4 py-28">
//   <div className="max-w-6xl mx-auto">
//     <h1 className="text-2xl font-bold text-center mb-6">{indicator.title}</h1>

//     <img
//       src={`http://localhost:5000/uploads/${indicator.image}`}
//       alt={indicator.title}
//       className="w-full h-96 mb-6 rounded-lg shadow"
//     />
//       <div
//         className="prose prose-invert  max-w-none text-white"
//         dangerouslySetInnerHTML={{ __html: indicator.description }}
//       />
//       <a
//         href={indicator.downloadFileUrl}
//         download
//         className="mt-6 inline-block  bg-orange-400 text-black px-6 py-2 rounded font-bold"
//       >
//         Download Indicator
//       </a>
//     </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import IndicatorFormModal from "../components/IndicatorFormModal";

export default function IndicatorDetail() {
  const { id } = useParams();
  const [indicator, setIndicator] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const [showModal, setShowModal] = useState(true); // show modal initially

  useEffect(() => {
    fetch(`/api/indicators/${id}`)
      .then(res => res.json())
      .then(data => setIndicator(data));
  }, [id]);

  const handleFormSubmit = (userData) => {
    console.log("User Data Submitted:", userData);
    setShowModal(false);
    setShowContent(true);
  };

  if (!indicator) return <div className="text-center text-white">Loading...</div>;

  return (
    <div className="bg-black text-orange-400 px-8 py-28 min-h-screen">
        <div className="max-w-6xl mx-auto">
      <IndicatorFormModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleFormSubmit}
      />
      {showContent && (
        <>
          <h1 className="text-2xl  text-center font-bold mb-6">{indicator.title}</h1>
           <img
      src={`http://localhost:5000/uploads/${indicator.image}`}
       alt={indicator.title}
       className="w-full h-96 mb-6 rounded-lg shadow"
     />
          <div
            className="prose prose-invert max-w-none text-white"
            dangerouslySetInnerHTML={{ __html: indicator.description }}
          />
          <a
  href={`http://localhost:5000/uploads/${indicator.downloadFileUrl}`}
  download
  className="mt-6 inline-block bg-orange-400 text-black px-6 py-2 rounded font-bold"
>
  Download Indicator
</a>

        </>
      )}
    </div>
    </div>
  );
}
