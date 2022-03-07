import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../modules';
import { Toast } from './Toast';

const NotificationContainer = styled.div`
  font-size: 1rem;
  position: fixed;
  z-index: 999999;
  top: 80px;
  right: 12px;
`;

function NofiticationCenter() {
  const state = useSelector((state: RootState) => state.notificationReducer);

  return (
    <NotificationContainer>
      {state.map((n) => (
        <Toast key={n.uuid} text={n.message} dismissTime={n.dismissTime} />
      ))}
    </NotificationContainer>
  );
}

export default NofiticationCenter;
