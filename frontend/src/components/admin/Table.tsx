import {
  FaPlus,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";
import { Dispatch, SetStateAction, useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";

// Utils to render cell dynamically
const renderCell = (value: any) => {
  if (Array.isArray(value)) {
    return value.map((item, index) => (
      <button
        key={index}
        className="px-2 py-1 mx-1 rounded-lg bg-blue-500 text-white text-xs"
      >
        {typeof item === "string" ? item : item?.name || JSON.stringify(item)}
      </button>
    ));
  }

  if (typeof value === "object" && value !== null) {
    return value.name || JSON.stringify(value);
  }

  return value;
};

// Types
interface Column {
  key: string;
  label: string;
}

interface Filter {
  key: string;
  label: string;
  options: Record<string, any>[];
}

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
}

interface TableProps {
  title: string;
  columns: Column[];
  data: Record<string, any>[];
  filters?: Filter[];
  addButtonLabel?: string;
  formFields?: Field[] | undefined;
  handleOpenModal?: () => void;
  handleCloseModal?: () => void;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  search: string;
  setSearch: (searchData: any) => void;
  canDelete: boolean;
  handleEditModal?: (values: any) => void;
  viewOnly?: boolean;
  handleOpenViewModal?: (row: any) => void;
  setFilters?: (filterData: any) => void;
  activeFilters?: Record<string, string>;
}

const Table: React.FC<TableProps> = ({
  title,
  columns,
  data,
  filters = [],
  addButtonLabel,
  formFields,
  handleOpenModal,
  page,
  setPage,
  search,
  setSearch,
  canDelete = false,
  handleEditModal,
  viewOnly = false,
  handleOpenViewModal,
  setFilters,
  activeFilters,
}) => {
  // You can add your filter/search logic here
  let filteredData = data;

  return (
    <div>
      {/* Search + Filters + Add Button */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex gap-2">
          {/* Search */}
          <Input
            type="text"
            placeholder="Search ..."
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Filters */}
          {filters.length > 0 &&
            filters.map((filter) => (
              <select
                key={filter.key}
                className="border px-2 py-1 rounded"
                onChange={(e) =>
                  setFilters!({
                    ...activeFilters,
                    [filter.key]: e.target.value,
                  })
                }
              >
                <option value="">{filter.label}</option>
                {filter.options.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name}
                  </option>
                ))}
              </select>
            ))}
        </div>

        {/* Add Button */}
        {addButtonLabel && (
          <Button
            content={addButtonLabel}
            type="button"
            onClick={handleOpenModal}
          />
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        </div>

        <div className="overflow-x-auto">
          {/* Table */}
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="bg-gray-100">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {col.label}
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.length ? (
                filteredData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    {columns.map((col) => (
                      <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">
                            {renderCell(row[col.key])}
                          </div>
                        </div>
                      </td>
                    ))}

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      {viewOnly ? (
                        <span
                          className="text-green-600 cursor-pointer"
                          onClick={() => handleOpenViewModal?.(row)}
                        >
                          View
                        </span>
                      ) : (
                        <>
                          <button
                            className="text-emerald-600 hover:text-emerald-900"
                            onClick={() => handleEditModal?.(row)}
                          >
                            <FaEdit />
                          </button>

                          {canDelete && (
                            <button className="text-red-600 hover:text-red-900">
                              <FaTrashAlt />
                            </button>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + 1} className="text-center py-4">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simple Pagination */}
      <div className="mt-4 flex justify-end">
        <button
          className="px-3 py-1 border rounded mx-1"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>

        <span className="px-3 py-1">{page}</span>

        <button
          className="px-3 py-1 border rounded mx-1"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
