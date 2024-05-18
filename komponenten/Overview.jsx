"use client"

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Button, Container, Form, Nav, Navbar, ProgressBar } from 'react-bootstrap';
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Overview() {
    const { data: session } = useSession();

    const [level, setLevel] = useState(1)
    const [xp, setXp] = useState(0)
    const [maxXp, setMaxXp] = useState(20)
    const [xpPercent, setXpPercent] = useState(0)

    const [vorname, setVorname] = useState("")
    const [nachname, setNachname] = useState("")
    const [zweitname, setZweitname] = useState("")

    const [geburtsjahr, setGeburtsjahr] = useState("")
    const [alter, setAlter] = useState("nicht angegeben")

    const [größe, setGröße] = useState("")
    const [gewicht, setGewicht] = useState("")

    useEffect(() => {
        calculateXp()
        calculateAge()
    })

    const calculateXp = () => {
        if (xp >= maxXp) {
            setLevel(level + 1)
            setXp(xp - maxXp)
            setMaxXp(maxXp * 2)
            setXpPercent((xp / maxXp) * 100)
        } else {
            setXpPercent((xp / maxXp) * 100)
        }
    }

    const calculateAge = () => {
        if(!geburtsjahr){
            return
        }

        const selectedDate = new Date(geburtsjahr);
        const currentYear = new Date().getFullYear();
        const selectedYear = selectedDate.getFullYear();
        const calculatedAge = currentYear - selectedYear;
        
        setAlter(calculatedAge);
    }

    return (
        <div>
            <Navbar fixed="top" expand="lg" className="bg-body-tertiary box-shadow">
                <Container fluid>
                    <Image src={"/icon/icon.JPG"} alt="icon" width={45} height={45} style={{ borderRadius: "50%" }} className="me-2" />
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
                            <Button variant="outline-primary me-2">Upload</Button>
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

            <div style={{ marginBlock: "110px", marginInline: "50px" }} className="d-flex justify-content-center row">
                <div className="col-8">
                    <div className="bg-body-tertiary box-shadow card-container">
                        <h1 className="ms-3 pt-2 fs-3">Persöhnliche Daten</h1>

                        <div className="row">
                            <div className="col">
                                <div>
                                    <div className="d-flex justify-content-between">
                                        <p className="ms-3">Vorname</p>
                                        <Form.Control className="me-3 input-field" value={vorname} onChange={(e) => setVorname(e.target.value)}/>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p className="ms-3">Nachname</p>
                                        <Form.Control className="me-3 input-field" value={nachname} onChange={(e) => setNachname(e.target.value)}/>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p className="ms-3">Zweitname</p>
                                        <Form.Control className="me-3 input-field" value={zweitname} onChange={(e) => setZweitname(e.target.value)}/>
                                    </div>
                                    <hr className="custom-hr" />
                                </div>
                                <div>
                                    <div className="d-flex justify-content-between">
                                        <p className="ms-3">Geburtsjahr</p>
                                        <Form.Control className="me-3 input-field" type="date" value={geburtsjahr} onChange={(e) => setGeburtsjahr(e.target.value)}/>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p className="ms-3">Alter</p>
                                        <p className="me-3">{alter}</p>
                                    </div>
                                    <hr className="custom-hr" />
                                </div>
                            </div>
                            <div className="col">
                                <div className="d-flex justify-content-between">
                                    <p className="ms-3">Größe</p>
                                    <Form.Control className="me-3 input-field" value={größe} onChange={(e) => setGröße(e.target.value)}/>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p className="ms-3">Gewicht</p>
                                    <Form.Control className="me-3 input-field" value={gewicht} onChange={(e) => setGewicht(e.target.value)}/>
                                </div>
                                <hr className="custom-hr" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-4">
                    <div className="bg-body-tertiary box-shadow card-container">
                        <h1 className="ms-3 pt-2 fs-3">Hygiene</h1>

                        <div>
                            <p className="ms-3 fs-5 fw-semibold">Zähne geputzt</p>

                            <div className="d-flex justify-content-between">
                                <p className="ms-3">Zähne geputzt(morgens)</p>
                                <Form.Check type={"checkbox"} className="me-3" />
                            </div>
                            <div className="d-flex justify-content-between">
                                <p className="ms-3">Zähne geputzt(mittags)</p>
                                <Form.Check type={"checkbox"} className="me-3" />
                            </div>
                            <div className="d-flex justify-content-between">
                                <p className="ms-3">Zähne geputzt(abends)</p>
                                <Form.Check type={"checkbox"} className="me-3" />
                            </div>
                            <hr className="custom-hr" />
                        </div>
                        <div>
                            <p className="ms-3 fs-5 fw-semibold">gewaschen</p>

                            <div className="d-flex justify-content-between">
                                <p className="ms-3">geduscht</p>
                                <Form.Check type={"checkbox"} className="me-3" />
                            </div>
                            <hr className="custom-hr" />
                        </div>
                        <div>
                            <p className="ms-3 fs-5 fw-semibold">Nägel geschnitten</p>

                            <div className="d-flex justify-content-between">
                                <p className="ms-3">Fingernägel geschnitten</p>
                                <Form.Check type={"checkbox"} className="me-3" />
                            </div>
                            <div className="d-flex justify-content-between">
                                <p className="ms-3">Fußnägel geschnitten</p>
                                <Form.Check type={"checkbox"} className="me-3" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed-bottom bg-body-tertiary box-shadow">
                <div className="mx-3 my-2">
                    <div>Level: {level}</div>
                    <div>XP: {xp}/{maxXp}</div>
                    <ProgressBar now={xpPercent} />
                </div>
            </div>
        </div>
    )
}