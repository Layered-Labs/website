import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ResearchNotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center px-8">
        <p className="text-sm font-medium text-black/40 uppercase tracking-wider mb-4">
          404
        </p>
        <h1 className="text-3xl font-semibold tracking-tight mb-4 text-black">
          Research post not found
        </h1>
        <p className="text-black/50 mb-8">
          The article you&apos;re looking for doesn&apos;t exist or may have
          been moved.
        </p>
        <Link
          href="/#research"
          className="inline-flex items-center gap-2 text-sm font-medium bg-black text-white px-6 py-3 rounded-full hover:bg-black/80 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Research
        </Link>
      </div>
    </div>
  );
}
