import React from 'react';

interface IProps {
  err: string;
}
function ServerErr(err: IProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      {console.log(err)}
      <img
        src={`${process.env.PUBLIC_URL}/serverErr.png`}
        alt="server error img"
        style={{ width: '70%', height: 'auto' }}
      />
    </div>
  );
}

export default ServerErr;
