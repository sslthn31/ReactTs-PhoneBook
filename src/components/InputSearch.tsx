import { css } from '@emotion/react';
import React, { useRef } from 'react';
const styles = {
  wrap: css`
    width: 100%;
    max-width: 600px;
  `,
  search: css`
    width: 100%;
    position: relative;
    display: flex;

    @media (min-width: 480px) {
      flex-direction: row;
    }
  `,
  searchTerm: css`
    width: 100%;
    border: 3px solid #00b4cc;
    border-right: none;
    padding: 5px;
    height: 20px;
    border-radius: 5px 0 0 5px;
    outline: none;
    color: #9dbfaf;

    &:focus {
      color: #00b4cc;
    }

    @media (min-width: 480px) {
      border-radius: 5px 0 0 0;
      border-right: 3px solid #00b4cc;
    }
  `,
  searchButton: css`
    width: 70px;
    height: 36px;
    border: 1px solid #00b4cc;
    background: #00b4cc;
    text-align: center;
    color: #fff;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
    font-size: 1rem;

    @media (min-width: 480px) {
      width: auto;
      border-radius: 0 5px 5px 0;
      margin-top: 0;
    }
  `,
};
type searchProps = {
  setSearch: (query: string) => void;
};
const InputSearch = ({ setSearch }: searchProps) => {
  const searchRef = useRef<HTMLInputElement>(null);
  function getSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearch(searchRef?.current?.value || '');
  }
  return (
    <div css={styles.wrap}>
      <form css={styles.search} onSubmit={getSearch}>
        <input type="text" css={styles.searchTerm} placeholder="...." ref={searchRef} />
        <button type="submit" css={styles.searchButton}>
          Search
        </button>
      </form>
    </div>
  );
};

export default InputSearch;
