"use client"

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Button, Container, Form, Nav, Navbar, ProgressBar } from 'react-bootstrap';
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Overview() {
    const { data: session } = useSession();

    const [email, setEmail] = useState("")

    const [level, setLevel] = useState(1)
    const [xp, setXp] = useState(0)
    const [maxXp, setMaxXp] = useState(20)
    const [xpPercent, setXpPercent] = useState(0)

    const [vorname, setVorname] = useState("")
    const [nachname, setNachname] = useState("")
    const [zweitname, setZweitname] = useState("")

    const [geburtsjahr, setGeburtsjahr] = useState('');
    const [alter, setAlter] = useState("nicht angegeben")

    const [größe, setGröße] = useState("")
    const [gewicht, setGewicht] = useState("")
    const [geschlecht, setGeschlecht] = useState("")

    const [lastUpdate, setLastUpdate] = useState("")

    const [zähneGeputztMorgens, setZähneGeputztMorgens] = useState(false)
    const [zähneGeputztMittags, setZähneGeputztMittags] = useState(false)
    const [zähneGeputztAbends, setZähneGeputztAbends] = useState(false)

    const [geduscht, setGeduscht] = useState(false)

    const [fingernägelGeschnitten, setFingernägelGeschnitten] = useState(false)
    const [fußnägelGeschnitten, setFußnägelGeschnitten] = useState(false)

    const fetchUser = async (email) => {
        try {
            const response = await fetch("/api/getUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            if (response.ok) {
                const data = await response.json();

                console.log(data);

                setLevel(data.user.level)
                setXp(data.user.xp)
                setMaxXp(data.user.maxXp)

                setVorname(data.user.vorname)
                setNachname(data.user.nachname)
                setZweitname(data.user.zweitname)

                setGeburtsjahr(data.user.geburtsjahr)
                setAlter(data.user.alter)

                setGröße(data.user.größe)
                setGewicht(data.user.gewicht)
                setGeschlecht(data.user.geschlecht)

                setLastUpdate(data.user.lastUpdate)
                
                setZähneGeputztMorgens(data.user.zähneGeputztMorgens)
                setZähneGeputztMittags(data.user.zähneGeputztMittags)
                setZähneGeputztAbends(data.zähneGeputztAbends)

                setGeduscht(data.user.geduscht)
                
                setFingernägelGeschnitten(data.user.fingernägelGeschnitten)
                setFußnägelGeschnitten(data.user.fußnägelGeschnitten)

                handleDailyQuests()

                console.log(data)
            } else {
                console.error("Fehler beim Abrufen der Benutzer:", response.statusText);
            }
        } catch (error) {
            console.error("Fehler beim Abrufen der Benutzer:", error);
        }
    };

    useEffect(() => {
        fetchUser(email)
    }, [email])

    useEffect(() => {
        if (session) {
            setEmail(session?.user?.email)
        }

        calculateXp()
        calculateAge()

        handleDailyQuests()
    })

    const handleDateChange = (e) => {
        const dateValue = e.target.value.split('T')[0]
        setGeburtsjahr(dateValue)
    }

    const calculateXp = () => {
        if (xp >= 0) {
            if (xp >= maxXp) {
                setLevel(level + 1)
                setXp(xp - maxXp)
                setMaxXp(maxXp * 2)
                setXpPercent((xp / maxXp) * 100)
            } else {
                setXpPercent((xp / maxXp) * 100)
            }
        } else {
            setLevel(prevLevel => prevLevel - 1);
            const newMaxXp = maxXp / 2;
            setMaxXp(newMaxXp);

            const xpDifference = newMaxXp + xp;
            setXp(xpDifference);
            setXpPercent((xpDifference / newMaxXp) * 100);
        }
    }

    const calculateAge = () => {
        if (!geburtsjahr) {
            return
        }

        const selectedDate = new Date(geburtsjahr);
        const currentYear = new Date().getFullYear();
        const selectedYear = selectedDate.getFullYear();
        const calculatedAge = currentYear - selectedYear;

        setAlter(calculatedAge);
    }

    const handleXpDrop = (e, xpDrop) => {
        if (e.target.checked) {
            setXp(prevXp => prevXp + xpDrop);
        } else {
            setXp(prevXp => prevXp - xpDrop);
        }
    };

    const handleDailyQuests = () => {
        if(!lastUpdate){
            return
        }

        const getCurrentDateInGermanFormat = () => {
            const now = new Date();
            return now.toLocaleDateString('de-DE', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        };

        const today = getCurrentDateInGermanFormat();

        if (today === lastUpdate) {

        } else {
            setZähneGeputztMorgens(false)
            setZähneGeputztMittags(false)
            setZähneGeputztAbends(false)

            setGeduscht(false)
            setFingernägelGeschnitten(false)

            setFußnägelGeschnitten(false)
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const getCurrentDateInGermanFormat = () => {
            const now = new Date();
            return now.toLocaleDateString('de-DE', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        };

        setLastUpdate(getCurrentDateInGermanFormat());

        try {
            const response = await fetch("/api/updateUser", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: session?.user?.email,
                    level: level,
                    xp: xp,
                    maxXp: maxXp,
                    vorname: vorname,
                    nachname: nachname,
                    zweitname: zweitname,
                    geburtsjahr: geburtsjahr,
                    alter: alter,
                    größe: größe,
                    gewicht: gewicht,
                    geschlecht: geschlecht,
                    lastUpdate: getCurrentDateInGermanFormat(),
                    zähneGeputztMorgens: zähneGeputztMorgens,
                    zähneGeputztMittags: zähneGeputztMittags,
                    zähneGeputztAbends: zähneGeputztAbends,
                    geduscht: geduscht,
                    fingernägelGeschnitten: fingernägelGeschnitten,
                    fußnägelGeschnitten: fußnägelGeschnitten
                }),
            });

            if (response.ok) {
                console.log("Benutzername erfolgreich aktualisiert");
            } else {
                console.error("Fehler beim Aktualisieren des Benutzernamens:", response.statusText);
            }
        } catch (error) {
            console.error("Fehler beim Aktualisieren des Benutzernamens:", error);
        }
    };

    return (
        <div>
            <div className="small-screen">
                <Navbar fixed="top" expand="lg" className="bg-body-tertiary box-shadow">
                    <Container fluid>
                        <Image src={"/icon/icon.JPG"} alt="icon" width={45} height={45} style={{ borderRadius: "50%" }} className="me-3" />
                        <Navbar.Brand href="#">Open Journey</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="me-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                <Nav.Link href="/">Freunde</Nav.Link>
                                <Nav.Link href="/">Leaderbord</Nav.Link>
                            </Nav>
                            <Button variant="outline-primary me-2 form-input-field" onClick={handleUpdate}>Upload</Button>
                            <div className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Username"
                                    className="me-2"
                                    aria-label="Search"
                                    bg="success"
                                />
                                <Button variant="outline-primary">Search</Button>
                            </div>
                            <Button variant="outline-primary form-input-field" onClick={() => signOut()}>Logout</Button>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <div style={{ marginBlock: "110px", marginInline: "15px" }}>
                    <div className="my-5">
                        <div className="bg-body-tertiary box-shadow card-container">
                            <h1 className="ms-3 pt-2 fs-3">Persöhnliche Daten</h1>

                            <div className="row">
                                <div className="col">
                                    <div>
                                        <div className="d-flex justify-content-between">
                                            <p className="mx-3">Vorname</p>
                                            <Form.Control className="me-3 input-field" value={vorname} onChange={(e) => setVorname(e.target.value)} />
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <p className="mx-3">Nachname</p>
                                            <Form.Control className="me-3 input-field" value={nachname} onChange={(e) => setNachname(e.target.value)} />
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <p className="mx-3">Zweitname</p>
                                            <Form.Control className="me-3 input-field" value={zweitname} onChange={(e) => setZweitname(e.target.value)} />
                                        </div>
                                        <hr className="custom-hr" />
                                    </div>
                                    <div>
                                        <div className="d-flex justify-content-between">
                                            <p className="mx-3">Geburtsjahr</p>
                                            <Form.Control className="me-3 input-field" type="date" value={geburtsjahr} onChange={handleDateChange} />
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <p className="mx-3">Alter</p>
                                            <p className="me-3">{alter}</p>
                                        </div>
                                        <hr className="custom-hr" />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="d-flex justify-content-between">
                                        <p className="mx-3">Größe</p>
                                        <Form.Control className="me-3 input-field" value={größe} onChange={(e) => setGröße(e.target.value)} />
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p className="mx-3">Gewicht</p>
                                        <Form.Control className="me-3 input-field" value={gewicht} onChange={(e) => setGewicht(e.target.value)} />
                                    </div>
                                    <hr className="custom-hr" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="bg-body-tertiary box-shadow card-container">
                            <h1 className="ms-3 pt-2 fs-3">Hygiene</h1>

                            <div>
                                <p className="ms-3 fs-5 fw-semibold">Zähne geputzt</p>

                                <div className="d-flex justify-content-between">
                                    <p className="ms-3">Zähne geputzt(morgens)</p>
                                    <Form.Check type={"checkbox"} className="me-3" checked={zähneGeputztMorgens} onChange={(e) => {
                                        handleXpDrop(e, 7)
                                        setZähneGeputztMorgens(e.target.checked)
                                    }} />
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p className="ms-3">Zähne geputzt(mittags)</p>
                                    <Form.Check type={"checkbox"} className="me-3" checked={zähneGeputztMittags} onChange={(e) => {
                                        handleXpDrop(e, 5)
                                        setZähneGeputztMittags(e.target.checked)
                                    }} />
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p className="ms-3">Zähne geputzt(abends)</p>
                                    <Form.Check type={"checkbox"} className="me-3" checked={zähneGeputztAbends} onChange={(e) => {
                                        handleXpDrop(e, 7)
                                        setZähneGeputztAbends(e.target.checked)
                                    }} />
                                </div>
                                <hr className="custom-hr" />
                            </div>
                            <div>
                                <p className="ms-3 fs-5 fw-semibold">gewaschen</p>

                                <div className="d-flex justify-content-between">
                                    <p className="ms-3">geduscht</p>
                                    <Form.Check type={"checkbox"} className="me-3" checked={geduscht} onChange={(e) => {
                                        handleXpDrop(e, 15)
                                        setGeduscht(e.target.checked)
                                    }} />
                                </div>
                                <hr className="custom-hr" />
                            </div>
                            <div>
                                <p className="ms-3 fs-5 fw-semibold">Nägel geschnitten</p>

                                <div className="d-flex justify-content-between">
                                    <p className="ms-3">Fingernägel geschnitten</p>
                                    <Form.Check type={"checkbox"} className="me-3" checked={fingernägelGeschnitten} onChange={(e) => {
                                        handleXpDrop(e, 20)
                                        setFingernägelGeschnitten(e.target.checked)
                                    }} />
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p className="ms-3">Fußnägel geschnitten</p>
                                    <Form.Check type={"checkbox"} className="me-3" checked={fußnägelGeschnitten} onChange={(e) => {
                                        handleXpDrop(e, 25)
                                        setFußnägelGeschnitten(e.target.checked)
                                    }} />
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

            <div className="big-screen">
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
                                <Nav.Link href="/">Freunde</Nav.Link>
                                <Nav.Link href="/">Leaderbord</Nav.Link>
                            </Nav>
                            <div className="d-flex">
                                <Button variant="outline-primary me-2" onClick={handleUpdate}>Upload</Button>
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
                                            <p className="mx-3">Vorname</p>
                                            <Form.Control className="me-3 input-field" value={vorname} onChange={(e) => setVorname(e.target.value)} />
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <p className="mx-3">Nachname</p>
                                            <Form.Control className="me-3 input-field" value={nachname} onChange={(e) => setNachname(e.target.value)} />
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <p className="mx-3">Zweitname</p>
                                            <Form.Control className="me-3 input-field" value={zweitname} onChange={(e) => setZweitname(e.target.value)} />
                                        </div>
                                        <hr className="custom-hr" />
                                    </div>
                                    <div>
                                        <div className="d-flex justify-content-between">
                                            <p className="mx-3">Geburtsjahr</p>
                                            <Form.Control className="me-3 input-field" type="date" value={geburtsjahr} onChange={handleDateChange} />
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <p className="mx-3">Alter</p>
                                            <p className="me-3">{alter}</p>
                                        </div>
                                        <hr className="custom-hr" />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="d-flex justify-content-between">
                                        <p className="mx-3">Größe</p>
                                        <Form.Control className="me-3 input-field" value={größe} onChange={(e) => setGröße(e.target.value)} />
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p className="mx-3">Gewicht</p>
                                        <Form.Control className="me-3 input-field" value={gewicht} onChange={(e) => setGewicht(e.target.value)} />
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p className="mx-3">Geschlecht</p>
                                        <Form.Control className="me-3 input-field" value={geschlecht} onChange={(e) => setGeschlecht(e.target.value)} />
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
                                    <Form.Check type={"checkbox"} className="me-3" checked={zähneGeputztMorgens} onChange={(e) => {
                                        handleXpDrop(e, 7)
                                        setZähneGeputztMorgens(e.target.checked)
                                    }} />
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p className="ms-3">Zähne geputzt(mittags)</p>
                                    <Form.Check type={"checkbox"} className="me-3" checked={zähneGeputztMittags} onChange={(e) => {
                                        handleXpDrop(e, 5)
                                        setZähneGeputztMittags(e.target.checked)
                                    }} />
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p className="ms-3">Zähne geputzt(abends)</p>
                                    <Form.Check type={"checkbox"} className="me-3" checked={zähneGeputztAbends} onChange={(e) => {
                                        handleXpDrop(e, 7)
                                        setZähneGeputztAbends(e.target.checked)
                                    }} />
                                </div>
                                <hr className="custom-hr" />
                            </div>
                            <div>
                                <p className="ms-3 fs-5 fw-semibold">gewaschen</p>

                                <div className="d-flex justify-content-between">
                                    <p className="ms-3">geduscht</p>
                                    <Form.Check type={"checkbox"} className="me-3" checked={geduscht} onChange={(e) => {
                                        handleXpDrop(e, 15)
                                        setGeduscht(e.target.checked)
                                    }} />
                                </div>
                                <hr className="custom-hr" />
                            </div>
                            <div>
                                <p className="ms-3 fs-5 fw-semibold">Nägel geschnitten</p>

                                <div className="d-flex justify-content-between">
                                    <p className="ms-3">Fingernägel geschnitten</p>
                                    <Form.Check type={"checkbox"} className="me-3" checked={fingernägelGeschnitten} onChange={(e) => {
                                        handleXpDrop(e, 20)
                                        setFingernägelGeschnitten(e.target.checked)
                                    }} />
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p className="ms-3">Fußnägel geschnitten</p>
                                    <Form.Check type={"checkbox"} className="me-3" checked={fußnägelGeschnitten} onChange={(e) => {
                                        handleXpDrop(e, 25)
                                        setFußnägelGeschnitten(e.target.checked)
                                    }} />
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
        </div>
    )
}