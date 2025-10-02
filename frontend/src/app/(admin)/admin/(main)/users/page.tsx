// components/Admin/UserManagementPage.tsx
"use client";
import { useState, useEffect, useMemo } from "react";
import Table from "@/components/admin/Table";
import AdminActionApi from "@/api/action/AdminActionApi";
import toast from "react-hot-toast";
import { debounce } from "lodash";

interface User {
id: string;
name: string;
email: string;
role: "freelancer" | "client" | "admin";
status: "active" | "banned";
}

interface Column {
key: string;
label: string;
}

interface Filter {
key: string;
label: string;
options: Record<string, any>[];
}

const UserManagementPage: React.FC = () => {
const [users, setUsers] = useState<User[]>([]);
const [page, setPage] = useState(1);
const [limit] = useState(10);
const [search, setSearch] = useState("");
const [filters, setFilters] = useState<Record<string, any>>({});
const [totalUsers, setTotalUsers] = useState(0);
const [totalFreelancers, setTotalFreelancers] = useState(0);
const [totalClients, setTotalClients] = useState(0);
const [isModalOpen, setIsModalOpen] = useState(false);
const [isEditModalOpen, setIsEditModalOpen] = useState(false);
const [editInitialValues, setEditInitialValues] = useState<Record<string, any>>({});
// Fetch users


useEffect(() => {
async function fetchUsers() {

try {
const response = await AdminActionApi.getUsers(search, page, limit, filters);

console.log(response.data)
if (response.success) {
setUsers(response.data.data);
} else {
toast.error(response.message);
}
} catch (err: any) {
toast.error(err.message);
}
}
fetchUsers();
}, [search, page, filters]);

// Fetch user stats
useEffect(() => {
async function fetchUserStats() {
const response = await AdminActionApi.getUserStats();
if (response.success) {
setTotalUsers(response.data.totalUsers);
setTotalClients(response.data.totalClients);
setTotalFreelancers(response.data.totalFreelancers);
} else {
toast.error(response.message);
}
}
fetchUserStats();
}, []);

const debouncedSetSearch = useMemo(
() =>
debounce((value: string) => {
setSearch(value);
}, 500),
[]
);

const columns: Column[] = [
{ key: "name", label: "Name" },
{ key: "email", label: "Email" },
{ key: "roles", label: "Role" },
{ key: "status", label: "Status" },
];

const filtersConfig: Filter[] = [
{
key: "role",
label: "Role",
options: [
{ name: "Freelancer", id: "freelancer" },
{ name: "Client", id: "client" },
],
},
{
key: "status",
label: "Status",
options: [
{ name: "Active", id: "active" },
{ name: "Banned", id: "banned" },
],
},
];

function handleEditModal(user: User) {
setEditInitialValues(user);
setIsEditModalOpen(true);
}

return ( <div className="p-6"> <h2 className="text-2xl font-bold">Users Management</h2> <p className="text-sm text-gray-500 mt-1">
Manage all users, freelancers, and clients on the platform </p>

  {/* Stats Boxes */}
  <div className="grid grid-cols-3 gap-6 my-6">
    <div className="bg-white shadow rounded-lg p-4 text-center">
      <h3 className="text-lg font-semibold">Total Users</h3>
      <p className="text-2xl font-bold">{totalUsers}</p>
    </div>
    <div className="bg-white shadow rounded-lg p-4 text-center">
      <h3 className="text-lg font-semibold">Freelancers</h3>
      <p className="text-2xl font-bold">{totalFreelancers}</p>
    </div>
    <div className="bg-white shadow rounded-lg p-4 text-center">
      <h3 className="text-lg font-semibold">Clients</h3>
      <p className="text-2xl font-bold">{totalClients}</p>
    </div>
  </div>

  {/* Table */}
  <Table
    title="Users"
    columns={columns}
    data={users}
    filters={filtersConfig}
    handleOpenModal={() => setIsModalOpen(true)}
    page={page}
    setPage={setPage}
    search={search}
    setSearch={debouncedSetSearch}
    canDelete={true}
    handleEditModal={handleEditModal}
    setFilters={setFilters}
    activeFilters={filters}
    viewOnly={true}
  />
</div>

);
};

export default UserManagementPage;
