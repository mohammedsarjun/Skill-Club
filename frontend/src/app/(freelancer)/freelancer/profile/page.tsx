import RoleGuard from "@/components/RoleGaurd";
import Image from "next/image";

function FreelancerProfilePage() {
  return (
    <div className="bg-mint-500">
        <h1 className="font-bold text-5xl text-center mt-6 mb-6">Freelancer Profile</h1>
    </div>
  );
}






  export default function FreelancerProfile() {
    return (
       <RoleGuard allowedRoles={["freelancer"]}>
        <FreelancerProfilePage />
       </RoleGuard>
    );
  }