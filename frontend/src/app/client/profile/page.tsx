import Image from "next/image";


import RoleGuard from "@/components/RoleGaurd";

function ProfilePage() {
  return (
    <div className="bg-mint-500">
        <h1 className="font-bold text-5xl text-center mt-6 mb-6">Client Profile</h1>
    </div>
  );
}


export default function Profile() {
  return (
  <RoleGuard allowedRoles={["client"]}>
      <ProfilePage />
  </RoleGuard>
  );
}

