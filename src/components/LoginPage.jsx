import {useState} from 'react';
import {Form, Card, Col, Row, Button, Alert} from 'react-bootstrap';
import reactDom from 'react-dom';
import { useNavigate } from 'react-router-dom';
import axios from './../axios';

const LoginPage = (props) => {

    const navigate = useNavigate();

    const [regSuccess, setRegSuccess] = useState(false);
    const [regFail, setRegFail] = useState(false);
    const [loginFail, setLoginFail] = useState(false);

    const handleSubmitLoginForm = (event) => {
        event.preventDefault()
        var login = event.target[0].value;
        var pass = event.target[1].value;
        axios.get(`/get-credentials?login=${login}`)
        .then(res => {
            console.log(res)
            if(res.data.password === pass){
                props.setLogged(true)
                props.setUser(res.data.name)
                navigate('/search');
            }else{
                setLoginFail(true)
            }
        }).catch(err => {
            console.log(err.message)
        })
    }

    const handleSubmitRegisterForm = (event) => {
        event.preventDefault()
        var name = event.target[0].value;
        var login = event.target[1].value;
        var pass1 = event.target[2].value;
        var pass2 = event.target[3].value;
        console.log(name, login, pass1, pass2);
        if(pass1 === pass2){
            axios.get("/get-all")
            .then(res => {
                var isOk = true;
                for(var i=0; i<res.data.all.length; i++){
                    if(res.data.all[i].login === login || res.data.all[i].user === name){
                        isOk = false;
                    }
                }
                if(isOk){
                    axios.post(`/create-user`, {name: name, login: login, password: pass1})
                    .then(res => {
                        if(res.status === 200){
                            setRegSuccess(true)
                        }
                    }).catch(err => {
                        setRegFail(true);
                    })
                }else{
                    setRegFail(true);
                }    
            })
            .catch(err => {
                setRegFail(true);
            })
        }else{
            setRegFail(true);
        }
    }

    const errLogin = (
        <Alert variant="danger" onClose={() => setLoginFail(false)} dismissible>
            <Alert.Heading>O nie!</Alert.Heading>
            <p>
            Nie uda??o si?? zalogowa??! Podano b????dne dane lub wyst??pi?? b????d serwera... Spr??buj ponownie
            </p>
      </Alert>
    )

    const errRegister = (
        <Alert variant="danger" onClose={() => setRegFail(false)} dismissible>
            <Alert.Heading>O nie!</Alert.Heading>
            <p>
            Nie uda??o si?? zarejestrowa??! Podano b????dne dane lub wyst??pi?? b????d serwera... Spr??buj ponownie
            </p>
      </Alert>
    )

    const succRegister = (
        <Alert variant="success" onClose={() => setRegSuccess(false)} dismissible>
            <Alert.Heading>Poprawnie utworzono konto!</Alert.Heading>
            <p>
            Teraz mo??esz si?? zalogowa??
            </p>
      </Alert>
    )

    return (
        <Row style={{margin: "40px"}}>
            <Col>
                <Card style={{padding: "20px"}}>
                    {loginFail ? errLogin : null}
                    <Card.Title>
                        Zaloguj si?? 
                    </Card.Title>
                    <Card.Text>
                        <Form onSubmit={handleSubmitLoginForm}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Login</Form.Label>
                                <Form.Control type="text" placeholder="Podaj login" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Has??o</Form.Label>
                                <Form.Control type="password" placeholder="Podaj has??o" />
                            </Form.Group>
                            <Button variant="dark" type="submit">
                                Zaloguj
                            </Button>
                        </Form>
                    </Card.Text>
                </Card>
            </Col>
            <Col>
                <Card style={{padding: "20px"}}>
                    {regFail ? errRegister : null}
                    {regSuccess ? succRegister : null}
                    <Card.Title>
                        Zarejestruj si?? 
                    </Card.Title>
                    <Card.Text>
                        <Form onSubmit={handleSubmitRegisterForm}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Imie</Form.Label>
                                <Form.Control type="text" placeholder="Podaj imi??" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Login</Form.Label>
                                <Form.Control type="text" placeholder="Podaj login" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Has??o</Form.Label>
                                <Form.Control type="password" placeholder="Podaj has??o" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Powt??rz has??o</Form.Label>
                                <Form.Control type="password" placeholder="Powt??rz has??o" />
                            </Form.Group>
                            <Button variant="dark" type="submit">
                                Utw??rz konto
                            </Button>
                        </Form>
                    </Card.Text>
                </Card>
            </Col>
        </Row>
    )
}

export default LoginPage;