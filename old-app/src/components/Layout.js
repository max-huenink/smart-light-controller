import React from 'react';
import Container from 'react-bootstrap/Container';
import NavMenu from './NavMenu';

export default function Layout() {
    return (
      <div>
        <NavMenu />
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
}
