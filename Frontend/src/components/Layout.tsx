import React from 'react';
import Container from 'react-bootstrap/Container';
import NavMenu from './NavMenu';

interface Props {
  children?: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div>
      <NavMenu />
      <Container>
        {children}
      </Container>
    </div>
  );
}

