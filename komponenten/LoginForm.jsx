"use client"

import Link from "next/link"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Image from "next/image";
import { EmailOutlined, LockOutlined, } from "@mui/icons-material";

export default function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false
            })

            if (res.error) {
                setError("Invalid Data")
                return
            }

            router.replace("dashboard")
        } catch (error) {
            console.log(error)
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
                <div className="bg-body-tertiary box-shadow card-container form-card">
                    <div className="mx-3">
                        <div className="d-flex justify-content-center mt-3">
                            <h1>Login</h1>
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
                                <Form.Control placeholder="E-Mail" className="form-input-field" onChange={e => setEmail(e.target.value)} />
                                <EmailOutlined className="icon"/>
                            </div>

                            <div  className="d-flex justify-content-end">
                                <Form.Control placeholder="Password" className="form-input-field" onChange={e => setPassword(e.target.value)} />
                                <LockOutlined className="icon"/>
                            </div>


                            <Button className="form-input-field mt-3" variant="outline-primary" onClick={handleSubmit}>Login</Button>
                        </div>

                        <Link href="/signup" className="text-decoration-none" style={{fontSize:"18px", color:"black"}}>
                            <p>Don't have an account? <br /><span className="text-decoration-underline text-primary"> Sign Up Here</span></p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
