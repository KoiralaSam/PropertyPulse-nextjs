import Link from "next/link";
const Pagination = ({ page, pageSize, totalItems }) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      <Link
        href={`/properties?page=${page - 1}`}
        aria-disabled={page === 1}
        className={`mr-2 px-2 py-1 border border-gray-300 rounded ${
          page === 1 ? "hidden" : ""
        }`}
      >
        Previous
      </Link>
      <span className="mx-2">
        Page {page} of {totalPages}
      </span>
      <Link
        href={`/properties?page=${page + 1}`}
        aria-disabled={page === totalPages}
        className={`ml-2 px-2 py-1 border border-gray-300 rounded ${
          page === totalPages ? "hidden" : ""
        }`}
      >
        Next
      </Link>
    </section>
  );
};

export default Pagination;
