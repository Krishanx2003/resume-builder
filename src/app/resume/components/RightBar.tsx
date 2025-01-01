import Image from "next/image";

export default function RightBar() {
  return (
    <div className="hidden w-80 flex-shrink-0 border-l bg-white p-4 lg:block">
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <h3 className="mb-4 text-center text-lg font-semibold text-blue-500">Contact Tips</h3>
        <ul className="space-y-4 text-sm text-gray-600">
          <li>• It's best to use a professional email. One that includes your full name is best.</li>
          <li>• Gmail is the preferred email client. Addresses from Yahoo or Hotmail tend to look outdated.</li>
        </ul>
        <div className="mt-6">
          <Image
            src="/template/Professional.svg"
            alt="Tips illustration"
            width={200}
            height={200}
            className="mx-auto"
          />
        </div>
      </div>
    </div>
  );
}
