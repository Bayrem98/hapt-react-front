import {ChangeEvent, useState} from "react";
import {FormattedMessage} from "react-intl";
import {Button, Col, Container, Form, FormGroup, Input, Row,} from "reactstrap";
import {Link} from "react-router-dom";

function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const changeEmail = (e: ChangeEvent<HTMLInputElement>) =>
        setEmail(e.target.value);

    const changePassword = (e: ChangeEvent<HTMLInputElement>) =>
        setPassword(e.target.value);

    return (
        <Container fluid>
            <Row>
                <Col xs={12} md={6} className="screen bg-dark "/>
                <Col
                    xs={12}
                    md={6}
                    className="login text-center p-5 d-flex flex-column justify-content-center"
                >
                    <FormattedMessage tagName="h1" id="login.title"/>
                    <FormattedMessage tagName="p" id="login.subtitle"/>
                    <Form>
                        <FormGroup floating className="mb-3">
                            <Input
                                type="email"
                                className="form-control"
                                id="floatingInput"
                                placeholder="name@example.com"
                                value={email}
                                onChange={changeEmail}
                            />
                            <FormattedMessage tagName="label" id="login.email"/>
                        </FormGroup>
                        <FormGroup floating>
                            <Input
                                type="password"
                                id="floatingPassword"
                                placeholder="Password"
                                value={password}
                                onChange={changePassword}
                            />
                            <FormattedMessage tagName="label" id="login.pass"/>
                        </FormGroup>
                        <Row>
                            <Col className="d-flex">
                                <FormGroup check inline className="text-left">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="flexCheckDefault"
                                    />

                                    <FormattedMessage tagName="label" id="login.text"/>
                                </FormGroup>
                            </Col>
                            <Col>
                                <a href="#">
                                    <FormattedMessage id="login.forget"/>
                                </a>
                            </Col>
                        </Row>

                        <Button tag={Link} to={"/dashboard"} type="button" color="dark" size="lg">
                            <FormattedMessage id="login.btn"/>
                        </Button>
                    </Form>
                    <footer className="text-center">
                        <FormattedMessage id="login.copy"/>
                    </footer>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
