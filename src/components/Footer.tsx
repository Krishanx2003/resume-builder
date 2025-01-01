import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-12">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Additional Resources</h3>
            <ul className="space-y-1">
              <li>
                <Link href="/writing-tips" className="text-blue-600 hover:underline">
                  Resume Writing Tips
                </Link>
              </li>
              <li>
                <Link href="/cover-letter" className="text-blue-600 hover:underline">
                  Cover Letter Builder
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Support</h3>
            <p className="text-sm">
              Need help? Contact us at{' '}
              <a href="mailto:support@example.com" className="text-blue-600 hover:underline">
                support@example.com
              </a>
            </p>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Resume Builder. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

