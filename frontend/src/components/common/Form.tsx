import { useState, ChangeEvent, FormEvent } from "react";
import { FaTimes } from "react-icons/fa";
import Input from "./Input";
import Button from "./Button";
import { ZodSchema, ZodError } from "zod";
import { categorySchema } from "@/utils/validation";
import React from "react";
// Field types
type FieldType = "text" | "number" | "textarea" | "checkbox" | "select";

interface SelectOption {
  label: string;
  value: string | number;
}

interface Field {
  name: string;
  type: FieldType;
  placeholder?: string;
  label?: string;
  options?: SelectOption[];
  hidden?:boolean
}

interface DynamicFormProps {
  fields: Field[] | undefined;
  initialValues?: Record<string, any>;
  onSubmit: (data: any, mode: string) => void;
  mode?: "create" | "update";
  onClose: () => void; // to close the popup
  validationSchema?: ZodSchema;
  title?: string;


}

const DynamicFormModal: React.FC<DynamicFormProps> = ({
  fields = [],
  initialValues = {},
  onSubmit,
  mode = "create",
  onClose,
  title,
  validationSchema
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({
    ...initialValues,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, type, value } = e.target;

    const fieldValue =
      type === "checkbox" && e.target instanceof HTMLInputElement
        ? e.target.checked
        : value;
        if(type=="select-one"){
          console.log(fieldValue)
        }
    setFormData({ ...formData, [name]: fieldValue });
  };

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();


  if (validationSchema) {
    try {
      // Validate full formData
      validationSchema.parse(formData);

      setErrors({});

      let submitData: Record<string, any> = formData;

      if (mode === "update") {
        // Only include fields that are different from initialValues
        submitData = Object.keys(formData).reduce((acc, key) => {
          if (formData[key] !== initialValues[key]) {
            acc[key] = formData[key];
          }
          return acc;
        }, {} as Record<string, any>);

        // Always include id in update
        submitData.id = initialValues.id;
      }

      onSubmit(submitData, mode);
      onClose();
    } catch (err) {
      if (err instanceof ZodError) {
        const formErrors: Record<string, string> = {};
        err.issues.forEach((e) => {
          if (e.path[0]) formErrors[e.path[0] as string] = e.message;
        });
        setErrors(formErrors);
      }
    }
  } else {
    let submitData: Record<string, any> = formData;

    if (mode === "update") {
      submitData = Object.keys(formData).reduce((acc, key) => {
        if (formData[key] !== initialValues[key]) {
          acc[key] = formData[key];
        }
        return acc;
      }, {} as Record<string, any>);

      // Always include id in update
      submitData.id = initialValues.id;
    }

    onSubmit(submitData, mode);
    onClose();
  }
};



  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-secondary  rounded-xl shadow-lg w-11/12 max-w-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 "
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-black">
          {title ? title : mode === "create" ? "Create Item" : "Update Item"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => {
            switch (field.type) {
              case "text":
              case "number":
                return (
                  <React.Fragment key={field.name}>
                    <Input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name] || ""}
                      placeholder={field.placeholder}
                      onChange={handleChange}
                      error={errors[field.name]}
                      hidden={field.hidden}
                    />
                  </React.Fragment>
                );

              case "textarea":
                return (
                  <React.Fragment key={field.name}>
                    <textarea
                      name={field.name}
                      value={formData[field.name] || ""}
                      placeholder={field.placeholder}
                      onChange={handleChange}
                      className="w-full mb-1 px-3 rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors[field.name] && (
                      <p className="text-red-500 text-sm">
                        {errors[field.name]}
                      </p>
                    )}
                  </React.Fragment>
                );

              case "checkbox":
                return (
                  <React.Fragment key={field.name}>
                    <label className="flex items-center space-x-2 text-gray-800 dark:text-white">
                      {field.label}
                      <input
                        type="checkbox"
                        name={field.name}
                        checked={!!formData[field.name]}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span>{field.label}</span>
                    </label>
                    {errors[field.name] && (
                      <p className="text-red-500 text-sm">
                        {errors[field.name]}
                      </p>
                    )}
                  </React.Fragment>
                );

              case "select":
                return (
                  <React.Fragment key={field.name}>
                    <p>{field.label}</p>
                    <select
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      className="w-full px-3 rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="" disabled>
                        Select {field.label}
                      </option>
                      {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>

                    {errors[field.name] && (
                      <p className="text-red-500 text-sm">
                        {errors[field.name]}
                      </p>
                    )}
                  </React.Fragment>
                );

              default:
                return null;
            }
          })}

          <Button
            className="w-full"
            content={mode === "create" ? "Create" : "Update"}
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default DynamicFormModal;
