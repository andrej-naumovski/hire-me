import { useMemo, useState } from 'react';

const usePaginatedData = <T>(data: Array<T> | undefined, pageSize: number) => {
  const [currentPage, setCurrentPage] = useState(1);

  const currentPageData =
    useMemo(
      () => data?.slice((currentPage - 1) * pageSize, currentPage * pageSize) ?? [],
      [data, currentPage, pageSize]
    );

  const pageCount = Math.ceil((data?.length ?? 0) / pageSize);

  return {
    page: currentPage,
    data: currentPageData,
    pageCount,
    setPage: setCurrentPage
  };
};

export default usePaginatedData;
