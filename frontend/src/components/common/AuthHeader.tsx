import Image from "next/image";

export default function AuthHeader() {
  return (
    <div className="header bg-secondary h-18 flex items-center px-4">
      <Image
        src="/images/site logo.png"
        alt="Site Logo"
        width={150} // desired width
        height={50} // desired height
        className="object-contain"
      />
    </div>
  );
}
