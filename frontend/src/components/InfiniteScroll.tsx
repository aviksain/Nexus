import React, { useEffect, useRef, ReactNode } from "react";

interface InfiniteScrollProps {
  children: ReactNode;
  fetchMore: () => void;
  hasNextPage: boolean;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  children,
  fetchMore,
  hasNextPage,
}) => {
  const loader = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const elementRef = loader.current;
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage) {
        fetchMore();
      }
    });

    if (elementRef) observer.observe(elementRef);

    return () => {
      if (elementRef) observer.unobserve(elementRef);
    };
  }, [fetchMore, hasNextPage]);

  return (
    <>
      {children}
      <div ref={loader} className="h-2" />
    </>
  );
};

export default InfiniteScroll;
