import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface JobEditModalProps {
  isOpen: boolean;
  job: any;
  onClose: () => void;
  onUpdate: (values: any) => void;
}

const JobEditModal: React.FC<JobEditModalProps> = ({ isOpen, job, onClose, onUpdate }) => {
  if (!isOpen) return null;

  const initialValues = {
    title: job.title,
    description: job.description,
    salary: job.salary,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    salary: Yup.number().required('Salary is required').positive('Must be a positive number'),
  });

  const handleSubmit = (values: any) => {
    onUpdate({ ...job, ...values });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded shadow-md w-[90vw] max-w-[500px]">
        <h2 className="text-2xl font-bold mb-4">Edit Job</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {() => (
            <Form>
              <div className="mb-4">
                <label htmlFor="title" className="block mb-2">Title</label>
                <Field name="title" type="text" className="border rounded w-full p-2"/>
                <ErrorMessage name="title" component="div" className="text-red-500 text-sm"/>
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block mb-2">Description</label>
                <Field name="description" as="textarea" className="border rounded w-full p-2"/>
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm"/>
              </div>
              <div className="mb-4">
                <label htmlFor="salary" className="block mb-2">Salary</label>
                <Field name="salary" type="number" className="border rounded w-full p-2"/>
                <ErrorMessage name="salary" component="div" className="text-red-500 text-sm"/>
              </div>
              <button type="submit" className="bg-blue-500 text-white p-2 rounded mr-2">Update</button>
              <button type="button" onClick={onClose} className="bg-gray-300 p-2 rounded">Cancel</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default JobEditModal;