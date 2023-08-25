import { paginationList } from '../styles/style';

type PaginationProps = {
  totalContact: number;
  perPage: number;
  setCurrentPage: (page: number) => void;
};
const Pagination = ({ totalContact, perPage, setCurrentPage }: PaginationProps) => {
  const pages: number[] = [];

  for (let i = 1; i <= Math.ceil(totalContact / perPage); i++) {
    pages.push(i);
  }
  return (
    <div css={paginationList}>
      {pages.map((page, index) => {
        return (
          <button key={index} onClick={() => setCurrentPage(page)}>
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
