// components/Admin/CategorySkills/DynamicManagementPage.tsx
"use client";
import { useState, useEffect, useMemo } from "react";
import Table from "@/components/admin/Table";
import DynamicForm from "@/components/common/Form";
import AdminActionApi from "@/api/action/AdminActionApi";
import toast from "react-hot-toast";
import { categorySchema, specialitySchema } from "@/utils/validation";
import { debounce } from "lodash";

interface Category {
  id: number;
  name: string;
  description: string;
  status?: string;
}

interface Specialty {
  id: number;
  name: string;
  category: string | number;
  categoryName?: string;
  status?: string;
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
  hidden?: boolean;
  options?: { label: string; value: any }[];
}

const DynamicManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"categories" | "specialties" | "skills">("categories");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<any>({});
  const [canDeleteRow, setCanDeleteRow] = useState(false);

  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const [specialtiesData, setSpecialtiesData] = useState<Specialty[]>([]);
  const [skillsData, setSkillsData] = useState<Skill[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editInitialValues, setEditInitialValues] = useState<Record<string, any>>({});

  // ---------------- Fetch Data ----------------
  useEffect(() => {
    async function fetchData() {
      try {
        if (activeTab === "categories") {
          setCanDeleteRow(false);
          const response = await AdminActionApi.getCategories(search, page, limit);
          if (response.success) setCategoriesData(response.data.data);
          else toast.error(response.message);
        }

        if (activeTab === "specialties") {
          setCanDeleteRow(false);

          const response = await AdminActionApi.getSpecialities(search, page, limit);
          const categoryResponse = await AdminActionApi.getCategories(undefined, undefined, undefined, "minimal");

          if (categoryResponse.success) setCategoriesData(categoryResponse.data.data);
          else toast.error(categoryResponse.message);

          if (response.success) setSpecialtiesData(response.data.data);
          else toast.error(response.message);
        }

        if (activeTab === "skills") {
          setCanDeleteRow(false);
          // Future: fetch skills via API
          setSkillsData([
            { id: 1, name: "React.js", specialtyName: "Frontend" },
            { id: 2, name: "Node.js", specialtyName: "Backend" },
          ]);
        }
      } catch (err: any) {
        toast.error(err.message);
      }
    }
    fetchData();
  }, [activeTab, search, page]);

  const debouncedSetSearch = useMemo(
    () => debounce((value: string) => setSearch(value), 500),
    []
  );

  // ---------------- Form Submission ----------------
  async function onSubmit(data: any, mode: string) {
    let response: any;

    try {
      if (activeTab === "categories") {
        response =
          mode === "create"
            ? await AdminActionApi.createCategory(data)
            : await AdminActionApi.updateCategory(data);

        if (response.success) {
          setCategoriesData((prev) =>
            mode === "create"
              ? [...prev, response.data]
              : prev.map((cat) => (cat.id === response.data.id ? response.data : cat))
          );
        }
      }

      if (activeTab === "specialties") {
        response =
          mode === "create"
            ? await AdminActionApi.createSpeciality(data)
            : await AdminActionApi.updateSpeciality(data);

        if (response.success) {
          setSpecialtiesData((prev) =>
            mode === "create"
              ? [...prev, response.data]
              : prev.map((spec) => (spec.id === response.data.id ? response.data : spec))
          );
        }
      }

      // if (activeTab === "skills") {
      //   response =
      //     mode === "create"
      //       ? await AdminActionApi.createSkill?.(data)
      //       : await AdminActionApi.updateSkill?.(data);

      //   if (response?.success) {
      //     setSkillsData((prev) =>
      //       mode === "create"
      //         ? [...prev, response.data]
      //         : prev.map((skill) => (skill.id === response.data.id ? response.data : skill))
      //     );
      //   }
      // }

      if (response?.success) toast.success(response.message);
      else toast.error(response?.message || "Action failed");
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  // ---------------- Table Config ----------------
  let columns: Column[] = [];
  let data: Category[] | Specialty[] | Skill[] = [];
  let filtersConfig: Filter[] = [];
  let addButtonLabel = "";
  let formFields: FormField[] = [];

  switch (activeTab) {
    case "categories":
      columns = [
        { key: "name", label: "Category Name" },
        { key: "description", label: "Description" },
      ];
      data = categoriesData;
      addButtonLabel = "Add Category";
      formFields = [
        { name: "name", type: "text", placeholder: "Enter category name", label: "Name" },
        { name: "description", type: "textarea", placeholder: "Enter description", label: "Description" },
        {
          name: "status",
          type: "select",
          label: "Status",
          options: [
            { label: "List", value: "list" },
            { label: "UnList", value: "unlist" },
          ],
        },
      ];
      break;

    case "specialties":
      columns = [
        { key: "name", label: "Specialty Name" },
        { key: "categoryName", label: "Category" },
      ];
      data = specialtiesData;
      filtersConfig = [
        { key: "category", label: "Category", options: categoriesData.map((cat) => cat.name) },
      ];
      addButtonLabel = "Add Specialty";
      formFields = [
        { name: "name", type: "text", placeholder: "Enter specialty name", label: "Name" },
        {
          name: "category",
          type: "select",
          label: "Category",
          options: categoriesData.map((cat) => ({ label: cat.name, value: cat.id })),
        },
        {
          name: "status",
          type: "select",
          label: "Status",
          options: [
            { label: "List", value: "list" },
            { label: "UnList", value: "unlist" },
          ],
        },
      ];
      break;

    case "skills":
      columns = [
        { key: "name", label: "Skill Name" },
        { key: "specialtyName", label: "Specialty" },
      ];
      data = skillsData;
      filtersConfig = [
        { key: "specialtyName", label: "Specialty", options: specialtiesData.map((s) => s.name) },
      ];
      addButtonLabel = "Add Skill";
      formFields = [
        { name: "name", type: "text", placeholder: "Enter skill name", label: "Name" },
        {
          name: "specialtyName",
          type: "select",
          label: "Specialty",
          options: specialtiesData.map((spec) => ({ label: spec.name, value: spec.name })),
        },
      ];
      break;
  }

  // ---------------- Handle Edit ----------------
  function handleEditModal(values: any) {
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
        category: values.category || "",
        status: values.status || "list",
      });
    } else if (activeTab === "skills") {
      setEditInitialValues({
        id: values.id,
        name: values.name || "",
        specialtyName: values.specialtyName || "",
      });
    }
    setIsEditModalOpen(true);
  }

  // ---------------- UI ----------------
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Category and Skills Management</h2>
      <p className="text-sm text-gray-500 mt-1">Organize job categories, specialties, and skill tags</p>

      {/* Tabs */}
      <div className="flex justify-start items-center mb-4 gap-6 border-b border-gray-200 mt-6">
        {["categories", "specialties", "skills"].map((tab) => {
          const isActive = activeTab === tab;
          return (
            <div
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`cursor-pointer pb-2 text-lg font-medium transition-colors ${
                isActive ? "text-primary border-b-2 border-green-500" : "text-gray-600 hover:text-primary-dark"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </div>
          );
        })}
      </div>

      {/* Table */}
      <Table
        title={activeTab === "categories" ? "Job Categories" : activeTab === "specialties" ? "Specialties" : "Skills"}
        columns={columns}
        data={data}
        filters={filtersConfig}
        addButtonLabel={addButtonLabel}
        formFields={formFields}
        handleOpenModal={() => setIsModalOpen(true)}
        page={page}
        setPage={setPage}
        search={search}
        setSearch={debouncedSetSearch}
        canDelete={canDeleteRow}
        handleEditModal={handleEditModal}
      />

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg p-6 relative w-1/3">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2 text-gray-600">✕</button>
            <DynamicForm
              title={`Create ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
              fields={formFields}
              onSubmit={onSubmit}
              onClose={() => setIsModalOpen(false)}
              validationSchema={activeTab === "categories" ? categorySchema : specialitySchema}
            />
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg p-6 relative w-1/3">
            <button onClick={() => setIsEditModalOpen(false)} className="absolute top-2 right-2 text-gray-600">✕</button>
            <DynamicForm
              title={`Edit ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
              fields={formFields}
              onSubmit={onSubmit}
              onClose={() => setIsEditModalOpen(false)}
              initialValues={editInitialValues}
              mode="update"
              validationSchema={activeTab === "categories" ? categorySchema : specialitySchema}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicManagementPage;
