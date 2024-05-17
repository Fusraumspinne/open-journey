"use client"

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';

export default function Overview() {
    const { data: session } = useSession();

    return (
        <div>
            <Navbar sticky="top" expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand href="#">Open Journey</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href="/">Angemeldet als: {session?.user?.name}</Nav.Link>
                            <Nav.Link href="/">Freunde</Nav.Link>
                        </Nav>
                        <NavDropdown title="Links" id="navbarScrollingDropdown" className="me-3">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">
                                Something else here
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Username"
                                className="me-2"
                                aria-label="Search"
                                bg="success"
                            />
                            <Button variant="outline-primary" style={{borderRadius:"6px 0 0 6px"}}>Search</Button>
                        </Form>
                        <Button variant="outline-primary" style={{borderRadius:"0 6px 6px 0"}} onClick={() => signOut()}>Logout</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}