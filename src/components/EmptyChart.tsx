import styled from 'styled-components';
import Chart from './Chart';

export const EmptyChart = () => {
  const example = [
    { id: 79, content: 'swef', votedCount: 2 },
    { id: 80, content: 'der', votedCount: 4 },
    { id: 81, content: 'ergv', votedCount: 6 },
    { id: 82, content: 'wev', votedCount: 7 },
  ];
  return (
    <>
      {console.log()}
      <div style={{ filter: 'blur(7px)' }}>
        <Chart options={example} />
      </div>
    </>
  );
};
