import { css, keyframes } from '@emotion/react';

export const mainLayout = css`
  display: flex;
  padding: 50px;
  // justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  gap: 2rem;
  background: rgb(2, 0, 36);
  background: radial-gradient(circle, rgba(2, 0, 36, 1) 38%, rgba(38, 38, 190, 1) 100%, rgba(0, 212, 255, 1) 100%);

  .button-add {
    display: flex;
    justify-content: flex-end;
    max-width: 600px;
    width: 100%;
    height: 50px;
    border-radius: 8px;
  }
  .button-add button {
    width: 25%;
    border-radius: 6px;
    font-weight: bold;
  }
`;

export const contactList = css`
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .title {
    color: #f5eded;
  }

  p {
    color: #fff;
    font-size: 10px;
  }
  .contact {
    color: #201e1e;
    border: none;
    height: 25px;
    transition: all 0.3s ease-in;
    background-color: rgba(245, 236, 236, 0.795);
    border-radius: 6px;
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
      background-color: rgba(184, 167, 167, 0.795);
      border: 1px solid black;
    }
  }
`;

export const paginationList = css`
  display: flex;
  flex-direction: row;
  gap: 5px;
  cursor: pointer;
  button {
    max-width: 30px;
    width: 100%;
    border-radius: 6px;
    background-color: #fff;

    &:hover {
      background-color: rgba(245, 236, 236, 0.795);
    }
  }
`;
export const fadeIn = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;
export const modalAnimation = css`
  animation: ${fadeIn} 0.8s ease-in-out;
`;
export const modalStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    align-self: flex-end;
    margin-top: 10px;
  }
`;

export const modalWithAnimation = css`
  ${modalStyles}
  ${modalAnimation}
`;

export const contentStyles = css`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  color: #201e1e;

  display: flex;
  flex-direction: column;
  gap: 1rem;
  .modalContent {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  ul {
    padding-left: 1.2rem;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
  }
  .buttons button {
    width: 90px;
    height: auto;
    border-radius: 4px;
    background-color: #fff;

    &:hover {
      background-color: rgba(245, 236, 236, 0.795);
    }
  }
`;
