import mimosasTiersImage from "../assets/mimosas-tiers.png";
import mimosasValuesImage from "../assets/mimosas-values.png";
import trainingPlanImg from "../assets/mimosas-tiers.png";
import tierCriteriaImage from "../assets/tier-criteria-december-22.png";
import "../index.css";

function TrainingMaterials(props) {
  return (
    <div className="bg-gradient-to-r from-[#d69c28] to-[#fe642a] p-4 sm:h-screen sm:w-screen">
      <div className="flex flex-wrap justify-center p-4">
        <div className="m-2 min-w-[350px] max-w-[350px] space-y-2 rounded-xl bg-white px-8 py-8 shadow-lg sm:flex sm:items-center sm:space-x-6 sm:space-y-0 sm:py-4">
          <img
            className="mx-auto my-8 block h-[200px] w-[200px]  object-cover sm:h-[100px] sm:w-[100px]"
            src={mimosasTiersImage}
            alt=""
          />
          <div className="flex-column flex justify-center">
            <p className="flex justify-center px-4 py-2 text-sm font-bold text-[#f6b42c]">
              Tier Assessments
            </p>
            <button className="rounded bg-[#f6b42c] px-4 py-2 font-bold text-white hover:bg-[#fe642a]">
              <a
                className="text-white no-underline"
                href="https://docs.google.com/spreadsheets/d/1viZXsDsZNYMSph91jZMz3udp5oWK27pn/edit?usp=share_link&ouid=109731519903093401608&rtpof=true&sd=true"
                target="_blank"
              >
                Click Here to Download
              </a>
            </button>
          </div>
        </div>
        <div className="m-2 min-w-[350px] max-w-[350px] space-y-2 rounded-xl bg-white px-8 py-8 shadow-lg sm:flex sm:items-center sm:space-x-6 sm:space-y-0 sm:py-4">
          <img
            className="mx-auto my-8 block h-[200px] w-[200px]  object-cover sm:h-[100px] sm:w-[100px]"
            src={mimosasValuesImage}
            alt=""
          />
          <div className="flex-column flex justify-center">
            <p className="flex justify-center px-4 py-2 text-sm font-bold text-[#f6b42c]">
              Mimosas Values
            </p>
            <button className="rounded bg-[#f6b42c] px-4 py-2 font-bold text-white hover:bg-[#fe642a]">
              <a
                className="text-white no-underline"
                href="https://drive.google.com/file/d/1PDpuNAWpqzUQYqvxK_MnLmtVgzggIwne/view?usp=share_link"
                target="_blank"
              >
                Click Here to Download
              </a>
            </button>
          </div>
        </div>
        <div className="m-2 min-w-[350px] max-w-[350px] space-y-2 rounded-xl bg-white px-8 py-8 shadow-lg sm:flex sm:items-center sm:space-x-6 sm:space-y-0 sm:py-4">
          <img
            className="mx-auto my-8 block h-[200px] w-[200px]  object-cover sm:h-[100px] sm:w-[100px]"
            src={trainingPlanImg}
            alt=""
          />
          <div className="flex-column flex justify-center">
            <p className="flex justify-center px-4 py-2 text-sm font-bold text-[#f6b42c]">
              Training Plan
            </p>
            <button className="rounded bg-[#f6b42c] px-4 py-2 font-bold text-white hover:bg-[#fe642a]">
              <a
                className="text-white no-underline"
                href="https://docs.google.com/spreadsheets/d/1WFvZ2dtCfUz_tJPSuTMutaJvTBgbWDgw/edit?usp=share_link&ouid=109731519903093401608&rtpof=true&sd=true"
                target="_blank"
              >
                Click Here to Download
              </a>
            </button>
          </div>
        </div>
        <div className="m-2 min-w-[350px] max-w-[350px] space-y-2 rounded-xl bg-white px-8 py-8 shadow-lg sm:flex sm:items-center sm:space-x-6 sm:space-y-0 sm:py-4">
          <img
            className="mx-auto my-8 block h-[200px] w-[200px]  object-cover sm:h-[100px] sm:w-[100px]"
            src={tierCriteriaImage}
            alt=""
          />
          <div className="flex-column flex justify-center">
            <p className="flex justify-center px-4 py-2 text-sm font-bold text-[#f6b42c]">
              Tier Criteria
            </p>
            <button className="rounded bg-[#f6b42c] px-4 py-2 font-bold text-white hover:bg-[#fe642a]">
              <a
                className="text-white no-underline"
                href="https://docs.google.com/document/d/1jxk3Ncu90yDrXbxls_pTBOYZUBSBM9Ft/edit?usp=share_link&ouid=109731519903093401608&rtpof=true&sd=true"
                target="_blank"
              >
                Click Here to Download
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainingMaterials;
