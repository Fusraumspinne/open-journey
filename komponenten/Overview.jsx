"use client"

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Button, Container, Form, Nav, Navbar, NavDropdown, ProgressBar } from 'react-bootstrap';
import { useState, useEffect } from "react";

export default function Overview() {
    const { data: session } = useSession();

    const [level, setLevel] = useState(1)
    const [xp, setXp] = useState(0)
    const [maxXp, setMaxXp] = useState(20)
    const [xpPercent, setXpPercent] = useState(0)

    useEffect(() => {
        calculateXp()
    })
    
    const calculateXp = () => {
        if(xp >= maxXp) {
            setLevel(level + 1)
            setXp(xp - maxXp)
            setMaxXp(maxXp * 2)
            setXpPercent((xp / maxXp) * 100)
        }else {
            setXpPercent((xp / maxXp) * 100)
        }
    }

    return (
        <div>
            <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
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
                        <div className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Username"
                                className="me-2"
                                aria-label="Search"
                                bg="success"
                            />
                            <Button variant="outline-primary" style={{ borderRadius: "6px 0 0 6px" }}>Search</Button>
                            <Button variant="outline-primary" style={{ borderRadius: "0 6px 6px 0" }} onClick={() => signOut()}>Logout</Button>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div className="fixed-bottom bg-body-tertiary">
                <div className="mx-3 my-2">
                    <div>Level: {level}</div>
                    <div>XP: {xp}/{maxXp}</div>
                    <ProgressBar now={xpPercent}/>
                </div>
            </div>
        </div>
    )
}