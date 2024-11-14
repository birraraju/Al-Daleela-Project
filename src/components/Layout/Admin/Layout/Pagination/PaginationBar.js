import React from 'react'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { useTheme } from '../../../ThemeContext/ThemeContext'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const {isLangArab}  = useTheme()
  const totalItems = Math.ceil(totalPages / 9)
  const pageNumbers = []
  const maxVisiblePages = 5

  // Generate array of page numbers to display
  if (totalItems <= maxVisiblePages) {
    for (let i = 1; i <= totalItems; i++) {
      pageNumbers.push(i)
    }
  } else {
    const leftOffset = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1)
    const rightOffset = Math.min(leftOffset + maxVisiblePages - 1, totalItems)

    if (leftOffset > 1) pageNumbers.push(1, '...')
    for (let i = leftOffset; i <= rightOffset; i++) {
      pageNumbers.push(i)
    }
    if (rightOffset < totalItems) pageNumbers.push('...', totalItems)
  }

  return (
    <nav className="flex justify-center mt-5 items-center space-x-2" aria-label="Pagination">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 ${isLangArab && "ml-2"} disabled:opacity-50`}
        aria-label="First page"
      >
        <ChevronsLeft className={`w-5 h-5 ${isLangArab && "rotate-180 "} `} />
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
        aria-label="Previous page"
      >
        <ChevronLeft className={`w-5 h-5 ${isLangArab && "rotate-180 "} `} />
      </button>
      {pageNumbers.map((page, index) => (
        <React.Fragment key={index}>
          {typeof page === 'number' ? (
            <button
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 rounded-md ${currentPage === page ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          ) : (
            <span className="px-4 py-2">...</span>
          )}
        </React.Fragment>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
        aria-label="Next page"
      >
        <ChevronRight className={`w-5 h-5 ${isLangArab && "rotate-180"} `} />
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
        aria-label="Last page"
      >
        <ChevronsRight className={`w-5 h-5 ${isLangArab && "rotate-180"} `} />
      </button>
    </nav>
  )
}
