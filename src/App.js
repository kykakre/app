import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import DialoguesPage from "./DialoguesPage";

const App = () => {
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">My App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/dialogues">Dialogues</Nav.Link>
            <Nav.Link as={Link} to="/other-page">Other Page</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container fluid>
        <Row>
          <Col md={2} className="bg-light sidebar">
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/dialogues">Dialogues</Nav.Link>
              <Nav.Link as={Link} to="/other-page">Other Page</Nav.Link>
            </Nav>
          </Col>
          <Col md={10}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dialogues" element={<DialoguesPage />} />
              <Route path="/other-page" element={<OtherPage />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
};

const HomePage = () => (
  <>
    <h1>Home</h1>
    <p>Welcome to the homepage.</p>
  </>
);

const OtherPage = () => (
  <>
    <h1>Other Page</h1>
    <p>Content for other page.</p>
  </>
);

export default App;
