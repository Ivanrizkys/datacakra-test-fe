import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPage?: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function Pagination({
  page,
  totalPage,
  setPage,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-foreground">
        Page {page} of {totalPage ?? ""}
      </p>
      <div className="flex gap-1 items-center">
        <button
          onClick={() => page > 1 && setPage(page - 1)}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Prev
        </button>
        <span className="text-foreground font-medium">{page}</span>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          onClick={() => totalPage && page < totalPage && setPage(page + 1)}
        >
          Next
          <ChevronRight className="mr-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
