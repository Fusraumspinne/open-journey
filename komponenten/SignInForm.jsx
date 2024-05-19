"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Image from "next/image";
import { EmailOutlined, LockOutlined, PersonOutline, } from "@mui/icons-material";

export default function SignInForm() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const [level, setLevel] = useState(1)
    const [xp, setXp] = useState(0)
    const [maxXp, setMaxXp] = useState(20)

    const [vorname, setVorname] = useState("")
    const [nachname, setNachname] = useState("")
    const [zweitname, setZweitname] = useState("")

    const [geburtsjahr, setGeburtsjahr] = useState("")
    const [alter, setAlter] = useState("nicht angegeben")

    const [größe, setGröße] = useState("")
    const [gewicht, setGewicht] = useState("")

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!name || !email || !password) {
            setError("All fields are required")
            return
        }

        try {
            const resUserExists = await fetch("api/userExists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const { user } = await resUserExists.json();

            if (user) {
                setError("User already exists.");
                return;
            }

            const res = await fetch("api/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    level,
                    xp,
                    maxXp,
                    vorname,
                    nachname,
                    zweitname,
                    geburtsjahr,
                    alter,
                    größe,
                    gewicht
                })
            })

            if (res.ok) {
                const form = e.target
                form.reset()
                router.push("/")
            } else {
                console.log("User registration failed")
            }
        } catch (error) {
            console.log("Error during registration: ", error)
        }
    }

    return (
        <div>
            <Navbar fixed="top" expand="lg" className="bg-body-tertiary box-shadow">
                <Container fluid className="d-flex justify-content-start">
                    <Image src={"/icon/icon.JPG"} alt="icon" width={45} height={45} style={{ borderRadius: "50%" }} className="me-2" />
                    <Navbar.Brand href="#">Open Journey</Navbar.Brand>
                </Container>
            </Navbar>


            <div className="d-flex justify-content-center">
                <div className="form-card bg-body-tertiary card-container">
                    <div className="mx-3">
                        <div className="d-flex justify-content-center mt-3">
                            <h1>Sign Up</h1>
                        </div>

                        <div className="d-flex justify-content-center text-danger">
                            {error ? (
                                <div>
                                    {error}
                                </div>
                            ) : (
                                <div style={{color:"transparent"}}>
                                    hallo
                                </div>
                            )}
                        </div>

                        <div>
                            <div className="d-flex justify-content-end">
                                <Form.Control placeholder="Username" className="form-input-field" onChange={e => setName(e.target.value)} />
                                <PersonOutline className="icon"/>
                            </div>
                            <div className="d-flex justify-content-end">
                                <Form.Control placeholder="E-Mail" className="form-input-field" onChange={e => setEmail(e.target.value)} />
                                <EmailOutlined className="icon"/>
                            </div>

                            <div className="d-flex justify-content-end">
                                <Form.Control placeholder="Password" className="form-input-field" onChange={e => setPassword(e.target.value)} />
                                <LockOutlined className="icon"/>
                            </div>


                            <Button className="form-input-field mt-3" variant="outline-primary" onClick={handleSubmit}>Sign Up</Button>
                        </div>

                        <Link href="/" className="text-decoration-none" style={{fontSize:"18px", color:"black"}}>
                            <p>Already have an account? <span className="text-decoration-underline text-primary"> Login Here</span></p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
