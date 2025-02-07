
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up the PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

interface PDFViewerProps {
  url: string;
}

export const PDFViewer = ({ url }: PDFViewerProps) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pages, setPages] = useState<JSX.Element[]>([]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
    
    // Pre-render all pages
    const pagesArray = Array.from(new Array(numPages), (_, index) => (
      <div key={`page_${index + 1}`}>
        <Page
          pageNumber={index + 1}
          className="max-w-full transition-opacity duration-300"
          loading={<div className="w-full h-[800px] bg-gray-100 animate-pulse" />}
          renderTextLayer={true}
          renderAnnotationLayer={true}
        />
      </div>
    ));
    setPages(pagesArray);
  };

  const changePage = (offset: number) => {
    setPageNumber(prevPageNumber => {
      const newPageNumber = prevPageNumber + offset;
      if (numPages === null) return prevPageNumber;
      return Math.min(Math.max(1, newPageNumber), numPages);
    });
  };

  return (
    <div className="flex flex-col items-center">
      <Document
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
        className="max-w-full"
      >
        {pages.map((page, index) => (
          <div key={`page_wrapper_${index + 1}`} className={pageNumber === index + 1 ? 'block' : 'hidden'}>
            {page}
          </div>
        ))}
      </Document>
      
      {numPages && (
        <div className="flex items-center gap-4 mt-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => changePage(-1)}
            disabled={pageNumber <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <span className="text-sm">
            Página {pageNumber} de {numPages}
          </span>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => changePage(1)}
            disabled={pageNumber >= numPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
