import { memo, useCallback } from 'react';
import { PaginationsProps } from './Paginations.async';
import cls from './Paginations.module.scss';
import { classNames } from '../../../lib/classNames/classNames';
import {
  DOTS,
  usePagination,
} from '../../../lib/hooks/usePagination/usePagination';

const PaginationsUI = memo((props: PaginationsProps) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    pageSize,
    siblingCount,
    totalCount,
  });

  const onPrevious = useCallback(() => {
    if (currentPage === 1) return;
    onPageChange(currentPage - 1);
  }, [currentPage, onPageChange]);

  const lastPage = paginationRange[paginationRange.length - 1];
  const onNext = useCallback(() => {
    if (currentPage === lastPage) return;
    onPageChange(currentPage + 1);
  }, [currentPage, lastPage, onPageChange]);

  if (currentPage === 0 || paginationRange.length < 2) return null;

  return (
    <div className={classNames(cls.Paginations, {}, [className])}>
      <ul className={cls.paginationContainer}>
        <li
          className={classNames(cls.paginationItem, {
            [cls.disabled]: currentPage === 1,
          })}
          onClick={onPrevious}
        >
          <div className={classNames(cls.arrow, {}, [cls.left])} />
        </li>
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS)
            return (
              <li
                key={pageNumber + index}
                className={classNames(cls.paginationItem, {}, [cls.dots])}
              >
                &#8230;
              </li>
            );

          return (
            <li
              key={pageNumber}
              className={classNames(cls.paginationItem, {
                [cls.selected]: pageNumber === currentPage,
              })}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
        <li
          className={classNames(cls.paginationItem, {
            [cls.disabled]: currentPage === lastPage,
          })}
          onClick={onNext}
        >
          <div className={classNames(cls.arrow, {}, [cls.right])} />
        </li>
      </ul>
    </div>
  );
});

export default PaginationsUI;
