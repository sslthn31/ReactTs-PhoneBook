import { css, keyframes } from '@emotion/react';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const spinnerStyle = css`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #7986cb; /* Change this to your desired color */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;
const spinnerPosition = css`
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Loading = () => {
  return (
    <div css={spinnerPosition}>
      <div css={spinnerStyle} />
    </div>
  );
};

export default Loading;
