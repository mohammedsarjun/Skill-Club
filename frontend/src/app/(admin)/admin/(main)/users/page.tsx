// components/Admin/UserManagementPage.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import Table from "@/components/admin/Table";
import AdminActionApi from "@/api/action/AdminActionApi";
import toast from "react-hot-toast";
import { debounce } from "lodash";
import { FaCheck, FaTimes } from "react-icons/fa";

interface Column {
  key: string;
  label: string;
}

interface Filter {
  key: string;
  label: string;
  options: Record<string, any>[];
}

export interface FreelancerDetailDto {
  freelancerLogo: string;
  professionalRole: string;
  hourlyRate: string;
  languages: string[];
}

export interface ClientDetailDto {
  companyName: string;
  companyLogo: string;
  website: string;
  companyDescription: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: number;
  roles: string[];
  isFreelancerBlocked: boolean;
  isClientBlocked: boolean;
  freelancerDetail: FreelancerDetailDto | undefined;
  clientDetail: ClientDetailDto | undefined;
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
  const [viewUser, setViewUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "client" | "freelancer">("overview");

  const [confirmBlock, setConfirmBlock] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await AdminActionApi.getUsers(search, page, limit, filters);
        if (response.success) setUsers(response.data.data);
        else toast.error(response.message);
      } catch (err: any) {
        toast.error(err.message);
      }
    }
    fetchUsers();
  }, [search, page, filters]);

  useEffect(() => {
    async function fetchUserStats() {
      try {
        const response = await AdminActionApi.getUserStats();
        if (response.success) {
          setTotalUsers(response.data.totalUsers);
          setTotalClients(response.data.totalClients);
          setTotalFreelancers(response.data.totalFreelancers);
        } else toast.error(response.message);
      } catch (err: any) {
        toast.error(err.message);
      }
    }
    fetchUserStats();
  }, []);

  const debouncedSetSearch = useMemo(() => debounce((value: string) => setSearch(value), 500), []);

  const columns: Column[] = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "roles", label: "Role" },
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
  ];

  const handleViewModal = async (user: User) => {
    const response = await AdminActionApi.getUserDetail(user.id);
    setViewUser(response.data);
    setActiveTab("overview");
    setIsModalOpen(true);
  };

  const handleBlockClient = async (userId: string) => {
    if (!viewUser) return;
    const status = viewUser.isClientBlocked ? "unblock" : "block";
    try {
      await AdminActionApi.updateUserStatus(userId, "client", status);
      toast.success(`Client ${status}ed successfully`);
      setViewUser({ ...viewUser, isClientBlocked: !viewUser.isClientBlocked });
      setConfirmBlock(null);
    } catch (err: any) {
      toast.error(err.message || "Failed to update client status");
    }
  };

  const handleBlockFreelancer = async (userId: string) => {
    if (!viewUser) return;
    const status = viewUser.isFreelancerBlocked ? "unblock" : "block";
    try {
      await AdminActionApi.updateUserStatus(userId, "freelancer", status);
      toast.success(`Freelancer ${status}ed successfully`);
      setViewUser({ ...viewUser, isFreelancerBlocked: !viewUser.isFreelancerBlocked });
      setConfirmBlock(null);
    } catch (err: any) {
      toast.error(err.message || "Failed to update freelancer status");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Users Management</h2>
      <p className="text-sm text-gray-500 mt-1">
        Manage all users, freelancers, and clients on the platform
      </p>

      {/* Stats */}
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
        handleOpenViewModal={handleViewModal}
        page={page}
        setPage={setPage}
        search={search}
        setSearch={debouncedSetSearch}
        canDelete={true}
        setFilters={setFilters}
        activeFilters={filters}
        viewOnly={true}
      />

      {/* View Modal */}
      {isModalOpen && viewUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-3/4 max-w-2xl p-6 shadow-lg relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold"
            >
              X
            </button>

            {/* Tabs */}
            <div className="flex border-b mb-4">
              <button
                className={`px-4 py-2 ${activeTab === "overview" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>

              {viewUser.clientDetail && (
                <button
                  className={`px-4 py-2 ${activeTab === "client" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
                  onClick={() => setActiveTab("client")}
                >
                  Client
                </button>
              )}

              {viewUser.freelancerDetail && (
                <button
                  className={`px-4 py-2 ${activeTab === "freelancer" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
                  onClick={() => setActiveTab("freelancer")}
                >
                  Freelancer
                </button>
              )}
            </div>

            {/* Tab Content */}
            <div className="space-y-2">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <>
                  <p><strong>Name:</strong> {viewUser.name}</p>
                  <p><strong>Email:</strong> {viewUser.email}</p>
                  <p><strong>Phone:</strong> {viewUser.phone || "N/A"}</p>
                  <p><strong>Roles:</strong> {viewUser.roles.join(",")}</p>
                </>
              )}

              {/* Client Tab */}
              {activeTab === "client" && (
                <>
                  <p><strong>Company Name:</strong> {viewUser.clientDetail?.companyName || "N/A"}</p>
                  <p>
                    <strong>Logo:</strong>{" "}
                    {viewUser.clientDetail?.companyLogo ? <img src={viewUser.clientDetail.companyLogo} className="w-16 h-16" /> : "N/A"}
                  </p>
                  <p><strong>Website:</strong> {viewUser.clientDetail?.website || "N/A"}</p>
                  <p><strong>Description:</strong> {viewUser.clientDetail?.companyDescription || "N/A"}</p>

                  {confirmBlock === `client-${viewUser.id}` ? (
                    <div className="flex space-x-2 mt-2">
                      <button onClick={() => handleBlockClient(viewUser.id)} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"><FaCheck /></button>
                      <button onClick={() => setConfirmBlock(null)} className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"><FaTimes /></button>
                    </div>
                  ) : (
                    <button
                      className={`mt-2 px-4 py-2 rounded ${viewUser.isClientBlocked ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"} text-white`}
                      onClick={() => setConfirmBlock(`client-${viewUser.id}`)}
                    >
                      {viewUser.isClientBlocked ? "Unblock Client" : "Block Client"}
                    </button>
                  )}
                </>
              )}

              {/* Freelancer Tab */}
              {activeTab === "freelancer" && (
                <>
                  <p>
                    <strong>Logo:</strong>{" "}
                    {viewUser.freelancerDetail?.freelancerLogo ? <img src={viewUser.freelancerDetail.freelancerLogo} className="w-16 h-16" /> : "N/A"}
                  </p>
                  <p><strong>Professional Role:</strong> {viewUser.freelancerDetail?.professionalRole || "N/A"}</p>
                  <p><strong>Hourly Rate:</strong> {viewUser.freelancerDetail?.hourlyRate ? `$${viewUser.freelancerDetail.hourlyRate}` : "N/A"}</p>
                  <p><strong>Languages:</strong> {viewUser.freelancerDetail?.languages?.join(", ") || "N/A"}</p>

                  {confirmBlock === `freelancer-${viewUser.id}` ? (
                    <div className="flex space-x-2 mt-2">
                      <button onClick={() => handleBlockFreelancer(viewUser.id)} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"><FaCheck /></button>
                      <button onClick={() => setConfirmBlock(null)} className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"><FaTimes /></button>
                    </div>
                  ) : (
                    <button
                      className={`mt-2 px-4 py-2 rounded ${viewUser.isFreelancerBlocked ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"} text-white`}
                      onClick={() => setConfirmBlock(`freelancer-${viewUser.id}`)}
                    >
                      {viewUser.isFreelancerBlocked ? "Unblock Freelancer" : "Block Freelancer"}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;
