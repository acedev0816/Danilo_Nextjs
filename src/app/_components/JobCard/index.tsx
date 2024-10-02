import { Job } from "@/types";
import { useState } from "react";
import JobEditModal from "../JobEditModal";

type Props = {
  data: Job;
  className?: string; // additional external styles
  onUpdate: (job: Job) => void;
};
const JobCard = ({ data, className, onUpdate }: Props) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleUpdate = (updatedJob: Job) => {
    onUpdate(updatedJob); // Call the parent update handler
  };

  return (
    <div
      className={`max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden ${className}`}
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">{data.title}</h2>
        <p className="text-gray-700 text-base mb-4">{data.description}</p>
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold text-green-600">
            ${data.salary}/hr
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Edit
          </button>
        </div>
      </div>
      <JobEditModal
        isOpen={isModalOpen}
        job={data}
        onClose={() => setModalOpen(false)}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default JobCard;
