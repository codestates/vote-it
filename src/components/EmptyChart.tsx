import styled from 'styled-components';
import Chart from './Chart';

interface IProps {
  number: number;
}
export const EmptyChart = ({ number }: IProps) => {
  const example = [];
  for (let i = 1; i < number + 1; i++) {
    example.push({ id: 1, content: 'example', votedCount: 2 + i });
  }

  return (
    <>
      <div style={{ fontSize: '20px' }}>
        마감된 투표 입니다
        <div style={{ filter: 'blur(15px)' }}>
          <Chart options={example} />
        </div>
      </div>
    </>

  );
};


