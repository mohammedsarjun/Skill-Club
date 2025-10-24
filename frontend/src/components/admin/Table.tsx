"use client";

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Dispatch, SetStateAction } from "react";
import Button from "../common/Button";
import Input from "../common/Input";

// ===== Utility to Render Table Cell =====
const renderCell = (value: unknown): React.ReactNode => {
  if (Array.isArray(value)) {
    return value.map((item, index) => (
      <button
        key={index}
        className="px-2 py-1 mx-1 rounded-lg bg-blue-500 text-white text-xs"
      >
        {typeof item === "string"
          ? item
          : (item as { name?: string })?.name ?? JSON.stringify(item)}
      </button>
    ));
  }

  if (typeof value === "object" && value !== null) {
    return (value as { name?: string })?.name ?? JSON.stringify(value);
  }

  return String(value ?? "");
};

// ===== Type Definitions =====
export interface Column<T> {
  key: keyof T;
  label: string;
}

interface FilterOption {
  id: string | number;
  name: string;
}

export interface Filter {
  key: string;
  label: string;
  options: FilterOption[];
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

interface TableProps<T extends object> {
  title: string;
  columns: Column<T>[];
  data: T[];
  filters?: Filter[];
  addButtonLabel?: string;
  formFields?: Field[];
  handleOpenModal?: () => void;
  handleCloseModal?: () => void;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  search: string;
  setSearch: (value: string) => void;
  canDelete?: boolean;
  handleEditModal?: (row: T) => void;
  viewOnly?: boolean;
  handleOpenViewModal?: (row: T) => void;
  setFilters?: (filters: Record<string, string>) => void;
  activeFilters?: Record<string, string>;
}

// ===== Main Table Component =====
function Table<T extends { id: string | number }>({
  title,
  columns,
  data,
  filters = [],
  addButtonLabel,
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
}: TableProps<T>) {
  const filteredData = data; // implement filtering/search if needed

  return (
    <div>
      {/* Search + Filters + Add Button */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Search ..."
            onChange={(e) => setSearch(e.target.value)}
          />
          {filters.map((filter) => (
            <select
              key={filter.key}
              className="border px-2 py-1 rounded"
              onChange={(e) =>
                setFilters?.({
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

        {addButtonLabel && (
          <Button
            content={addButtonLabel}
            type="button"
            onClick={handleOpenModal}
          />
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((col) => (
                  <th
                    key={String(col.key)}
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
              {filteredData.length > 0 ? (
                filteredData.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {columns.map((col) => (
                      <td
                        key={String(col.key)}
                        className="px-6 py-4 whitespace-nowrap"
                      >
                        <div className="text-sm font-medium text-gray-900">
                          {renderCell(row[col.key])}
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
                  <td
                    colSpan={columns.length + 1}
                    className="text-center py-4 text-gray-500"
                  >
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
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
}

export default Table;
