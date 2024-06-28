import React, { useEffect, useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

const TrainingMaterials = () => {
  const [imageUrls, setImageUrls] = useState({
    mimosasTiersImage: "",
    mimosasValuesImage: "",
    trainingPlanImg: "",
    tierCriteriaImage: "",
  });

  const [fileUrls, setFileUrls] = useState({
    tierAssessments: "",
    mimosasValues: "",
    trainingPlan: "",
    tierCriteria: "",
  });

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        // Fetching image URLs
        const mimosasTiersImage = await getDownloadURL(
          ref(storage, "images/mimosas-tiers.png")
        );
        const mimosasValuesImage = await getDownloadURL(
          ref(storage, "images/mimosas-values.png")
        );
        const trainingPlanImg = await getDownloadURL(
          ref(storage, "images/training-plan.png")
        );
        const tierCriteriaImage = await getDownloadURL(
          ref(storage, "images/tier-criteria-december-22.png")
        );

        setImageUrls({
          mimosasTiersImage,
          mimosasValuesImage,
          trainingPlanImg,
          tierCriteriaImage,
        });

        // Fetching file URLs from the images directory
        const tierAssessments = await getDownloadURL(
          ref(storage, "images/mimosas-tiers.png")
        );
        const mimosasValuesFile = await getDownloadURL(
          ref(storage, "images/mimosas-values.png")
        );
        const trainingPlanFile = await getDownloadURL(
          ref(storage, "images/training-plan.png")
        );
        const tierCriteriaFile = await getDownloadURL(
          ref(storage, "images/tier-criteria-december-22.png")
        );

        setFileUrls({
          tierAssessments,
          mimosasValues: mimosasValuesFile,
          trainingPlan: trainingPlanFile,
          tierCriteria: tierCriteriaFile,
        });
      } catch (error) {
        console.error("Error fetching URLs: ", error);
      }
    };

    fetchUrls();
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#d69c28] to-[#fe642a] p-4 sm:h-screen sm:w-screen">
      <div className="flex flex-wrap justify-center p-4">
        <div className="m-2 min-w-[350px] max-w-[350px] space-y-2 rounded-xl bg-white px-8 py-8 shadow-lg sm:flex sm:items-center sm:space-x-6 sm:space-y-0 sm:py-4">
          <img
            className="mx-auto my-8 block h-[200px] w-[200px] object-cover sm:h-[100px] sm:w-[100px]"
            src={imageUrls.mimosasTiersImage}
            alt="Mimosas Tiers"
          />
          <div className="flex-column flex justify-center">
            <p className="flex justify-center px-4 py-2 text-sm font-bold text-[#f6b42c]">
              Tier Assessments
            </p>
            <button className="rounded bg-[#f6b42c] px-4 py-2 font-bold text-white hover:bg-[#fe642a]">
              <a
                className="text-white no-underline"
                href={fileUrls.tierAssessments}
                target="_blank"
                rel="noopener noreferrer"
              >
                Click Here to Download
              </a>
            </button>
          </div>
        </div>
        <div className="m-2 min-w-[350px] max-w-[350px] space-y-2 rounded-xl bg-white px-8 py-8 shadow-lg sm:flex sm:items-center sm:space-x-6 sm:space-y-0 sm:py-4">
          <img
            className="mx-auto my-8 block h-[200px] w-[200px] object-cover sm:h-[100px] sm:w-[100px]"
            src={imageUrls.mimosasValuesImage}
            alt="Mimosas Values"
          />
          <div className="flex-column flex justify-center">
            <p className="flex justify-center px-4 py-2 text-sm font-bold text-[#f6b42c]">
              Mimosas Values
            </p>
            <button className="rounded bg-[#f6b42c] px-4 py-2 font-bold text-white hover:bg-[#fe642a]">
              <a
                className="text-white no-underline"
                href={fileUrls.mimosasValues}
                target="_blank"
                rel="noopener noreferrer"
              >
                Click Here to Download
              </a>
            </button>
          </div>
        </div>
        <div className="m-2 min-w-[350px] max-w-[350px] space-y-2 rounded-xl bg-white px-8 py-8 shadow-lg sm:flex sm:items-center sm:space-x-6 sm:space-y-0 sm:py-4">
          <img
            className="mx-auto my-8 block h-[200px] w-[200px] object-cover sm:h-[100px] sm:w-[100px]"
            src={imageUrls.trainingPlanImg}
            alt="Training Plan"
          />
          <div className="flex-column flex justify-center">
            <p className="flex justify-center px-4 py-2 text-sm font-bold text-[#f6b42c]">
              Training Plan
            </p>
            <button className="rounded bg-[#f6b42c] px-4 py-2 font-bold text-white hover:bg-[#fe642a]">
              <a
                className="text-white no-underline"
                href={fileUrls.trainingPlan}
                target="_blank"
                rel="noopener noreferrer"
              >
                Click Here to Download
              </a>
            </button>
          </div>
        </div>
        <div className="m-2 min-w-[350px] max-w-[350px] space-y-2 rounded-xl bg-white px-8 py-8 shadow-lg sm:flex sm:items-center sm:space-x-6 sm:space-y-0 sm:py-4">
          <img
            className="mx-auto my-8 block h-[200px] w-[200px] object-cover sm:h-[100px] sm:w-[100px]"
            src={imageUrls.tierCriteriaImage}
            alt="Tier Criteria"
          />
          <div className="flex-column flex justify-center">
            <p className="flex justify-center px-4 py-2 text-sm font-bold text-[#f6b42c]">
              Tier Criteria
            </p>
            <button className="rounded bg-[#f6b42c] px-4 py-2 font-bold text-white hover:bg-[#fe642a]">
              <a
                className="text-white no-underline"
                href={fileUrls.tierCriteria}
                target="_blank"
                rel="noopener noreferrer"
              >
                Click Here to Download
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingMaterials;
