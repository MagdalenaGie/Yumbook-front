import {Form, Card, Col, Row, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from './../axios';

const LoginPage = (props) => {

    const navigate = useNavigate();

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
                console.log("zle dane!")
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
            axios.post(`/create-user`, {name: name, login: login, password: pass1})
            .then(res => {
                if(res.status === 200){
                    console.log("zrobione konto, super")
                }
            }).catch(err => {
                console.log(err.message)
            })
        }else{
            console.log("hasla sie nie zgadzaja")
        }
    }

    return (
        <Row style={{margin: "40px"}}>
            <Col>
                <Card style={{padding: "20px"}}>
                    <Card.Title>
                        Zaloguj się 
                    </Card.Title>
                    <Card.Text>
                        <Form onSubmit={handleSubmitLoginForm}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Login</Form.Label>
                                <Form.Control type="text" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Hasło</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
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
                    <Card.Title>
                        Zarejestruj się 
                    </Card.Title>
                    <Card.Text>
                        <Form onSubmit={handleSubmitRegisterForm}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Imie</Form.Label>
                                <Form.Control type="text" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Login</Form.Label>
                                <Form.Control type="text" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Hasło</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Powtórz hasło</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Button variant="dark" type="submit">
                                Utwórz konto
                            </Button>
                        </Form>
                    </Card.Text>
                </Card>
            </Col>
        </Row>
    )
}

export default LoginPage;