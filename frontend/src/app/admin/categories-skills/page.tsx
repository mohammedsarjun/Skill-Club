// components/Admin/CategorySkills/DynamicManagementPage.tsx
"use client";
import { useState, useEffect } from "react";
import Table from "@/components/admin/Table";
import DynamicForm from "@/components/common/Form";
import AdminActionApi from "@/api/action/AdminActionApi";
import { IcategoryData } from "@/types/interfaces/admin/IAdmin";
import toast from "react-hot-toast";

interface Category {
  id: number;
  name: string;
  description: string;
}

interface Specialty {
  id: number;
  name: string;
  categoryName: string;
}

interface Skill {
  id: number;
  name: string;
  specialtyName: string;
}

interface Column {
  key: string;
  label: string;
}

interface Filter {
  key: string;
  label: string;
  options: string[];
}

interface FormField {
  name: string;
  type: "text" | "number" | "textarea" | "select" | "checkbox";
  placeholder?: string;
  label?: string;
  options?: { label: string; value: any }[];
}

// const [categoriesData, setCategoriesData] = useState<Category[]>([]);
// Sample data
const categoriesData: Category[] = [
  { id: 1, name: "Web Development", description: "All web related jobs" },
  { id: 2, name: "Design", description: "Graphic & UI/UX jobs" },
];

const specialtiesData: Specialty[] = [
  { id: 1, name: "Frontend", categoryName: "Web Development" },
  { id: 2, name: "Backend", categoryName: "Web Development" },
];

const skillsData: Skill[] = [
  { id: 1, name: "React.js", specialtyName: "Frontend" },
  { id: 2, name: "Node.js", specialtyName: "Backend" },
];

async function onSubmit(data: IcategoryData) {
  const response = await AdminActionApi.createCategory(data);
  if (response.success) {
    toast.success(response.message);
  }else{
    toast.error(response.message)
  }
}

const DynamicManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "categories" | "specialties" | "skills"
  >("categories");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       setLoading(true);

  //       if (activeTab === "categories") {
  //         AdminActionApi.getCategories;
  //       }
  //       if (activeTab === "specialties") {
  //         AdminActionApi.getCategories;
  //       }

  //       if (activeTab === "skills") {
  //         AdminActionApi.getCategories;
  //       }

  //       const res = await fetch(url);
  //       if (!res.ok) throw new Error("Failed to fetch " + activeTab);
  //       const json = await res.json();
  //       setData(json);
  //     } catch (err: any) {
  //       toast.error(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchData();
  // }, [activeTab]);

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  let columns: Column[] = [];
  let data: Category[] | Specialty[] | Skill[] = [];
  let filters: Filter[] = [];
  let addButtonLabel: string = "";
  let formFields: FormField[] = [];

  switch (activeTab) {
    case "categories":
      columns = [
        { key: "name", label: "Category Name" },
        { key: "description", label: "Description" },
      ];
      data = categoriesData;
      filters = [];
      addButtonLabel = "Add Category";
      formFields = [
        { name: "name", type: "text", placeholder: "Enter category name" },
        {
          name: "description",
          type: "textarea",
          placeholder: "Enter description",
        },
        {
          name: "status",
          type: "select",
          options: [
            { label: "List", value: "list" },
            { label: "UnList", value: "unlist" },
          ],
          label: "Status",
        },
      ];
      break;

    case "specialties":
      columns = [
        { key: "name", label: "Specialty Name" },
        { key: "categoryName", label: "Category" },
      ];
      data = specialtiesData;
      filters = [
        {
          key: "categoryName",
          label: "Category",
          options: ["Web Development", "Design"],
        },
      ];
      addButtonLabel = "Add Specialty";
      formFields = [
        { name: "name", type: "text", placeholder: "Enter specialty name" },
        {
          name: "categoryName",
          type: "select",
          label: "Category",
          options: categoriesData.map((cat) => ({
            label: cat.name,
            value: cat.name,
          })),
        },
      ];
      break;

    case "skills":
      columns = [
        { key: "name", label: "Skill Name" },
        { key: "specialtyName", label: "Specialty" },
      ];
      data = skillsData;
      filters = [
        {
          key: "specialtyName",
          label: "Specialty",
          options: ["Frontend", "Backend"],
        },
      ];
      addButtonLabel = "Add Skill";
      formFields = [
        { name: "name", type: "text", placeholder: "Enter skill name" },
        {
          name: "specialtyName",
          type: "select",
          label: "Specialty",
          options: specialtiesData.map((spec) => ({
            label: spec.name,
            value: spec.name,
          })),
        },
      ];
      break;
  }

  return (
    <div className="p-6">
      {/* Heading */}
      <h2 className="text-2xl font-bold">Category and Skills Management</h2>
      <p className="text-sm text-gray-500 mt-1">
        Organize job categories and skill tags
      </p>
      <div className="my-4 mb-9"></div>

      {/* Tabs */}
      <div className="flex justify-start items-center mb-4 gap-6 border-b border-gray-200">
        {["categories", "specialties", "skills"].map((tab) => {
          const isActive = activeTab === tab;
          return (
            <div
              key={tab}
              className={`cursor-pointer pb-2 text-lg font-medium transition-colors duration-200
                ${
                  isActive
                    ? "text-primary border-b-2 border-green-500"
                    : "text-gray-600 hover:text-primary-dark"
                }
              `}
              onClick={() =>
                setActiveTab(tab as "categories" | "specialties" | "skills")
              }
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </div>
          );
        })}
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={data}
        filters={filters}
        addButtonLabel={addButtonLabel}
        formFields={formFields}
        handleOpenModal={handleOpenModal}
      />

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center ">
          <div className="bg-white rounded-lg p-6 relative w-1/3">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-4">Add New</h2>
            {/* You can replace this with DynamicForm later */}
            <DynamicForm
              fields={formFields}
              onSubmit={onSubmit}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicManagementPage;
