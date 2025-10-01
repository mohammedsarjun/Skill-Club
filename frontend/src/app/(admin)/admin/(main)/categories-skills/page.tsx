// components/Admin/CategorySkills/DynamicManagementPage.tsx
"use client";
import { useState, useEffect, useMemo } from "react";
import Table from "@/components/admin/Table";
import DynamicForm from "@/components/common/Form";
import AdminActionApi from "@/api/action/AdminActionApi";
import { IcategoryData, ISpeaciality } from "@/types/interfaces/admin/IAdmin";
import toast from "react-hot-toast";
import { categorySchema, specialitySchema } from "@/utils/validation";
import { debounce } from "lodash";

import AdminRoleGuard from "@/components/AdminRoleGaurd";

interface Category {
  id: number;
  name: string;
  description: string;
}

interface Specialty {
  id: number;
  name: string;
  category: string;
  categoyName: string;
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

// const specialtiesData: Specialty[] = [
//   { id: 1, name: "Frontend", category: "Web Development" },
//   { id: 2, name: "Backend", category: "Web Development" },
// ];

const skillsData: Skill[] = [
  { id: 1, name: "React.js", specialtyName: "Frontend" },
  { id: 2, name: "Node.js", specialtyName: "Backend" },
];

const DynamicManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "categories" | "specialties" | "skills"
  >("categories");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [canDeleteRow, setCanDeleteRow] = useState(false);
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const [specialtiesData, setSpecialtiesData] = useState<Specialty[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        // setLoading(true);

        if (activeTab === "categories") {
          setCanDeleteRow(false);
          const response = await AdminActionApi.getCategories(
            search,
            page,
            limit
          );
          if (response.success) {
            setCategoriesData(response.data.data);
          } else {
            toast.error(response.message);
          }
        }
        if (activeTab === "specialties") {
          setCanDeleteRow(false);

          const response = await AdminActionApi.getSpecialities(
            search,
            page,
            limit
          );

          const categoryResponse = await AdminActionApi.getCategories(undefined, undefined, undefined, "minimal")

          if (categoryResponse.success) {
            setCategoriesData(categoryResponse.data.data)
          } else {
            toast.error(response.message);
          }

          if (response.success) {

            setSpecialtiesData(response.data.data);
          } else {
            toast.error(response.message);
          }
          // AdminActionApi.getSpecialties;
        }

        // if (activeTab === "skills") {
        //   AdminActionApi.getCategories;
        // }
      } catch (err: any) {
        toast.error(err.message);
      }
    }
    fetchData();
  }, [activeTab, search, page]);

  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearch(value);
      }, 500),
    [setSearch]
  );

  async function onSubmit(data: any, mode: string) {
    let response: any;

    if (activeTab == "categories" && mode == "create") {
      response = await AdminActionApi.createCategory(data);
      if (response.success) {
        setCategoriesData((prev) => [...prev, response.data]); // <-- automatically update array
      }
    } else if (activeTab == "categories" && mode == "update") {
      response = await AdminActionApi.updateCategory(data);
      if (response.success) {
        setCategoriesData((prev) =>
          prev.map((cat) => (cat.id === response.data.id ? response.data : cat))
        );
      }
    } else if (activeTab == "specialties" && mode == "create") {
      response = await AdminActionApi.createSpeciality(data);
      if (response.success) {
        setSpecialtiesData((prev) => [...prev, response.data]); // <-- automatically update array
      }
    } else if (activeTab == "specialties" && mode == "update") {
      response = await AdminActionApi.updateSpeciality(data);
      console.log(response)
      if (response.success) {
        setSpecialtiesData((prev) =>
          prev.map((spec) => (spec.id === response.data.id ? response.data : spec))
        ); // <-- automatically update array
      }
    } 
    // else if (activeTab == "skills" && mode == "create") {
    //   response = await AdminActionApi.createSkill(data);
    //   if (response.success) {
    //     skillsData.push(response.data); // if skillsData were state, you'd use setSkillsData
    //   }
    // } else if (activeTab == "skills" && mode == "update") {
    //   response = await AdminActionApi.updateSkill(data);
    //   if (response.success) {
    //     const index = skillsData.findIndex((skill) => skill.id === response.data.id);
    //     if (index !== -1) skillsData[index] = response.data; // update the array
    //   }
    // }

    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  }


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
          key: "category",
          label: "Category",
          options: [...categoriesData.map((cat) => cat.name)],
        },
      ];
      addButtonLabel = "Add Specialty";
      formFields = [
        { name: "name", type: "text", placeholder: "Enter specialty name" },
        {
          name: "category",
          type: "select",
          label: "Category",
          options: categoriesData.map((cat) => ({
            label: cat.name,
            value: cat.id,
          })),
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

  const [editInitialValues, setEditInitialValues] = useState<
    Record<string, any>
  >({});

  function handleEditModal(values: any) {
    console.log(values);
    if (activeTab === "categories") {
      setEditInitialValues({
        id: values.id,
        name: values.name || "",
        description: values.description || "",
        status: values.status || "list",
      });
    } else if (activeTab === "specialties") {
      setEditInitialValues({
        id: values.id,
        name: values.name || "",
        category: values.category || "", // here `description` can hold categoryName
        status: values.status
      });
    } else if (activeTab === "skills") {
      setEditInitialValues({
        name: values.name || "",
        specialtyName: values.description || "", // here `description` can hold specialtyName
      });
    }

    setIsEditModalOpen(true);
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
                ${isActive
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
        title={
          activeTab == "categories"
            ? "Job Categories"
            : activeTab == "specialties"
              ? "Specialties"
              : activeTab == "skills"
                ? "Skills"
                : ""
        }
        columns={columns}
        data={data}
        filters={filters}
        addButtonLabel={addButtonLabel}
        formFields={formFields}
        handleOpenModal={handleOpenModal}
        page={page}
        setPage={setPage}
        search={search}
        setSearch={debouncedSetSearch}
        canDelete={canDeleteRow}
        handleEditModal={handleEditModal}
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
              title={
                activeTab == "categories"
                  ? "Create Category"
                  : activeTab == "specialties"
                    ? "Create Specialty"
                    : activeTab == "skills"
                      ? "Create Skills"
                      : ""
              }
              fields={formFields}
              onSubmit={onSubmit}
              onClose={handleCloseModal}
              validationSchema={activeTab === "categories" ? categorySchema : activeTab === "specialties" ? specialitySchema : specialitySchema}
            />
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center ">
          <div className="bg-white rounded-lg p-6 relative w-1/3">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-4">Edit</h2>

            <DynamicForm
              title={
                activeTab == "categories"
                  ? "Edit Category"
                  : activeTab == "specialties"
                    ? "Edit Specialty"
                    : activeTab == "skills"
                      ? "Edit Skills"
                      : ""
              }
              fields={
                activeTab === "categories"
                  ? [
                    {
                      name: "name",
                      type: "text",
                      placeholder: "Enter category name",
                      label: "Category Name",
                    },
                    {
                      name: "description",
                      type: "textarea",
                      placeholder: "Enter description",
                      label: "Description",
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
                    {
                      name: "id",
                      type: "text",
                      hidden: true
                    }
                  ]
                  : activeTab === "specialties"
                    ? [
                      {
                        name: "name",
                        type: "text",
                        placeholder: "Enter specialty name",
                        label: "Specialty Name",
                      },
                      {
                        name: "category",
                        type: "select",
                        label: "Category",
                        options: categoriesData.map((cat) => ({
                          label: cat.name,
                          value: cat.id,
                        })),
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
                      {
                        name: "id",
                        type: "text",
                        hidden: true
                      }
                    ]
                    : [
                      {
                        name: "name",
                        type: "text",
                        placeholder: "Enter skill name",
                        label: "Skill Name",
                      },
                      {
                        name: "specialtyName",
                        type: "select",
                        label: "Specialty",
                        options: specialtiesData.map((spec) => ({
                          label: spec.name,
                          value: spec.name,
                        })),
                      },
                    ]
              }

              onSubmit={onSubmit}
              onClose={() => setIsEditModalOpen(false)}
              initialValues={editInitialValues}
              mode="update"
              validationSchema={activeTab == "categories" ? categorySchema : activeTab == "specialties" ? specialitySchema : specialitySchema}
            />
          </div>
        </div>
      )}
    </div>
  );
};




  export default function DynamicManagement() {
    return (

        <DynamicManagementPage />

    );
  }

 DynamicManagementPage;
