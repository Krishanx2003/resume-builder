import Footer from "@/components/Footer";
import FilterOptions from "./FilterOptions";
import TemplateGallery from "./TemplateGallery";


export default function ChooseTemplatePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Choose Your Resume Template</h1>
          <p className="mt-1 text-sm text-gray-600">
            Select a template that reflects your style and suits the job you're applying for.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <FilterOptions />
          <TemplateGallery />
        </div>
      </main>

      <Footer />
    </div>
  )
}

