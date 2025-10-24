import { useState, ChangeEvent, FormEvent } from "react";
import { FaTimes } from "react-icons/fa";
import Input from "./Input";
import Button from "./Button";
import { ZodSchema, ZodError } from "zod";
import React from "react";
import { detectArrayType } from "@/utils/arrayUtils";

type FieldType =
  | "text"
  | "number"
  | "textarea"
  | "checkbox"
  | "select"
  | "password";

interface SelectOption {
  label: string | number;
  value: string | number;
  checked?: boolean;
}

interface Field {
  name: string;
  type: FieldType;
  placeholder?: string;
  label?: string;
  options?: SelectOption[];
  hidden?: boolean;
  group?: string; // ✅ for side-by-side fields
  hideOnCheck?: {
    field: string; // the checkbox field name
    value?: any; // optional value (if multiple options)
  };
}

interface DynamicFormProps {
  fields: Field[] | undefined;
  initialValues?: Record<string, any>;
  onSubmit: (data: any, mode: string) => void;
  mode?: "create" | "update";
  onClose: () => void;
  validationSchema?: ZodSchema | null;
  title?: string;
  layout?: "vertical" | "horizontal"; // ✅ NEW prop
}

const DynamicFormModal: React.FC<DynamicFormProps> = ({
  fields = [],
  initialValues = {},
  onSubmit,
  mode = "create",
  onClose,
  title,
  validationSchema,
  layout = "vertical", // ✅ default
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({
    ...initialValues,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  console.log(formData);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, type, value } = e.target;

    let fieldValue: any;

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;

      if (fields?.find((f) => f.name === name)?.options) {
        const currentArray = Array.isArray(formData[name])
          ? formData[name]
          : [];
        if (target.checked) {
          fieldValue = [...currentArray, target.value];
        } else {
          fieldValue = currentArray.filter((v) => v !== target.value);
        }
      } else {
        fieldValue = target.checked;
      }
    } else {
      fieldValue = value;
    }

    setFormData({ ...formData, [name]: fieldValue });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validationSchema) {
      try {
        validationSchema.parse(formData);

        setErrors({});
      } catch (err) {
        if (err instanceof ZodError) {
          const formErrors: Record<string, string> = {};
          err.issues.forEach((issue) => {
            if (issue.path[0])
              formErrors[issue.path[0] as string] = issue.message;
          });
          setErrors(formErrors);
          return;
        }
      }
    }

    let submitData: Record<string, any> = formData;

    if (mode === "update") {
      submitData = Object.keys(formData).reduce((acc, key) => {
        if (formData[key] !== initialValues[key]) acc[key] = formData[key];
        return acc;
      }, {} as Record<string, any>);
      submitData.id = initialValues.id;
    }

    onSubmit(submitData, mode);
    onClose();
  };

  // ✅ Group fields by 'group'
  const groupedFields: Record<string, Field[]> = {};
  fields.forEach((field) => {
    const groupName = field.group || field.name;
    if (!groupedFields[groupName]) groupedFields[groupName] = [];
    groupedFields[groupName].push(field);
  });

  // ✅ Layout style
  const containerWidth = layout === "horizontal" ? "max-w-5xl" : "max-w-lg"; // widen form in horizontal mode
  const formFlex = layout === "horizontal" ? "flex-wrap" : "flex-col";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div
        className={`bg-secondary rounded-xl shadow-lg w-11/12 ${containerWidth} p-6 relative`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-black">
          {title ? title : mode === "create" ? "Create Item" : "Update Item"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className={`space-y-4 ${
            layout === "horizontal" ? "grid grid-cols-2 gap-4" : ""
          }`}
        >
          {Object.values(groupedFields).map((group, i) => (
            <div
              key={i}
              className={`flex ${
                group.length > 1 ? "gap-4" : "flex-col"
              } ${formFlex}`}
            >
              {group.map((field) => {
                console.log("hi");
                // Skip rendering fields that should be hidden
                if (field.hideOnCheck) {
                  const conditionField = field.hideOnCheck.field;
                  const conditionValue = field.hideOnCheck.value;

                  const conditionData = formData[conditionField];

                  const isArray = Array.isArray(conditionData);
                  const shouldHide = conditionValue
                    ? isArray
                      ? conditionData.includes(conditionValue)
                      : conditionData === conditionValue
                    : !!conditionData; // hide if checkbox is checked (true)

                  if (shouldHide) return null;
                }

                switch (field.type) {
                  case "text":
                  case "number":
                    return (
                      <div key={field.name} className="flex-1">
                        <p className="text-black">{field.label}</p>
                        <Input
                          key={field.name}
                          type={field.type}
                          name={field.name}
                          value={formData[field.name] || ""}
                          placeholder={field.placeholder}
                          onChange={handleChange}
                          error={errors[field.name]}
                          hidden={field.hidden}
                        />
                      </div>
                    );

                  case "password":
                    return (
                      <div key={field.name} className="flex-1">
                        <p className="text-black">{field.label}</p>
                        <Input
                          key={field.name}
                          type={field.type}
                          name={field.name}
                          value={formData[field.name] || ""}
                          placeholder={field.placeholder}
                          onChange={handleChange}
                          error={errors[field.name]}
                          hidden={field.hidden}
                        />
                      </div>
                    );

                  case "textarea":
                    return (
                      <div key={field.name} className="flex-1">
                        <p className="text-black">{field.label}</p>
                        <textarea
                          name={field.name}
                          value={formData[field.name] || ""}
                          placeholder={field.placeholder}
                          onChange={handleChange}
                          className="w-full mb-1 px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors[field.name] && (
                          <p className="text-red-500 text-sm">
                            {errors[field.name]}
                          </p>
                        )}
                      </div>
                    );

                  case "checkbox":
                    return (
                      <div key={field.name} className="space-y-1 flex-1">
                        {field.options ? (
                          field.options.map((opt) => {
                            let valueArray = Array.isArray(formData[field.name])
                              ? formData[field.name]
                              : [];
                            let isChecked = false;
                            if (
                              detectArrayType(valueArray) == "Array of objects"
                            ) {
                              valueArray = valueArray.map(
                                (arr: { name: string; id: string }) => arr.id
                              );
                            }
                            isChecked = valueArray.includes(opt.value);
                            return (
                              <label
                                key={opt.value}
                                className="flex items-center space-x-2 text-black"
                              >
                                <input
                                  type="checkbox"
                                  name={field.name}
                                  value={opt.value}
                                  checked={isChecked}
                                  onChange={handleChange}
                                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span>{opt.label}</span>
                              </label>
                            );
                          })
                        ) : (
                          <label className="flex items-center space-x-2 text-black">
                            <input
                              type="checkbox"
                              name={field.name}
                              checked={!!formData[field.name]}
                              onChange={handleChange}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span>{field.label}</span>
                          </label>
                        )}
                        {errors[field.name] && (
                          <p className="text-red-500 text-sm">
                            {errors[field.name]}
                          </p>
                        )}
                      </div>
                    );

                  case "select":
                    return (
                      <div key={field.name} className="flex-1">
                        <p className="text-black">{field.label}</p>
                        <select
                          name={field.name}
                          value={formData[field.name] || ""}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                      </div>
                    );

                  default:
                    return null;
                }
              })}
            </div>
          ))}

          <div className={`${layout === "horizontal" ? "col-span-2" : ""}`}>
            <Button
              className="w-full"
              content={mode === "create" ? "Create" : "Update"}
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default DynamicFormModal;
