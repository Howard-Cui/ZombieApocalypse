import React from 'react';
import { styled } from 'styled-components';
import { Outlet } from 'react-router-dom';

const HeadLine = styled.div`
  display: flex;
  justify-content: center;
`;

const ContentArea = styled.div`
  display: flex;
  justify-content: center;
  
`

export default function HomePage() {
  return (
    <div>
      <HeadLine>
        <h1>Zombie Apocalypse</h1>
      </HeadLine>
      <hr/>
      <ContentArea>
        <Outlet/>
      </ContentArea>
    </div>
  );
};
