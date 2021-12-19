import { Fragment, useState, useEffect } from "react";
import { Card, Form, Col, Button, Row, Stack, Table } from 'react-bootstrap';
import axios from "./../axios";

const cuisines = ["Meksykańska", "Indyjska", "Gruzińska", "Pizzeria", "Kawiarnia", "Hawajska"];
const locations = ["Stare Miasto", "Bronowice", "Kazimierz", "Krowodrza"]

const Recommender = (props) => {

    useEffect(()=>{
        handleGetFriends();
        handleGetRecommendations();
    }, [])

    const handleSubmitForm = (event) => {
        event.preventDefault()
        console.log("in submit")
        var loc = event.target[0].value;
        var qui = event.target[1].value;
        var friendList = "";
        var iter = 2
        friends.forEach( fri => {
            if(event.target[iter].checked){
                friendList += fri + ",";
            }
            iter += 1;
        })
        friendList = friendList.slice(0, -1);

        axios.post("/get-best", {cuisine: qui, location: loc, person: friendList, max: "True"})
        .then(res => {
            console.log(res.data)
            setRecommended(res.data)
        }).catch(err => {
            console.log(err.message)
        })

    }

    const [friends, setFriends] = useState([])
    const [newRest, setNewRest] = useState([])
    const [recommended, setRecommended] = useState([])

    const handleGetFriends = () => {
        axios.get(`/get-friends?person=${props.userName}`)
        .then(res => {
            console.log(res)
            setFriends(res.data.friends)
        }).catch(err => {
            console.log(err.message)
        })
    }

    // this not working wanna know why
    const handleGetRecommendations = () => {
        axios.get(`/get-recommendations?person=${props.userName}`)
        .then(res => {
            console.log(res)
            setNewRest(res.data.recommendations)
        }).catch(err => {
            console.log(err.message)
        })
    }

    const cuisineOptions = cuisines.map( cui => <option value={cui}>{cui}</option>)
    const locationOptions = locations.map( cui => <option value={cui}>{cui}</option>)
    const friendOptions = friends.map(fri => <Form.Check type="checkbox" label={fri}/>)

    let recommendedRows = recommended.map((res, index) => {
        console.log(res)
        return (
            <tr>
                <td>{index+1}</td>
                <td>{res.restaurant}</td>
                <td>{res.likers.map(el => el + " ")}</td>
                <td>{res.occurence}</td>
            </tr>)
    })

    let newRestRows = newRest.map((res, index) => {
        return (
            <tr>
                <td>{index+1}</td>
                <td>{res.name}</td>
                <td>{res.recommenders.map(el => el + " ")}</td>
                <td>{res.count}</td>
            </tr>)
    })

    return(
        <Fragment>
        <Card style={{margin: "30px"}}>
            <Card.Body>
                <Card.Title>Poznaj rekomendowane restauracje!</Card.Title>
                <Card.Text>
                Możesz wybrać preferowaną lokalizację oraz typ kuchni. Zlisty znajomych możesz wybrać osoby, tak by filtrować również po preferencjach przyjaciół - pokażemy ci ranking restauracji, które oni lubią!
                <Form className="SearchForm" onSubmit={handleSubmitForm}>
                    <Form.Group as={Row} controlId="formHorizontalType">
                    <Row style={{marginBottom: "20px"}}>
                        <Form.Label>
                        Wyszukaj filtrując po: 
                        </Form.Label>
                        <Col sm={2}>
                            <Form.Select >
                                <option value="">Dowolna lokalizacja</option>
                                {locationOptions}
                            </Form.Select>
                        </Col>
                        <Col sm={2}>
                            <Form.Select>
                                <option value="">Dowolna kuchnia</option>
                                {cuisineOptions}
                            </Form.Select>
                        </Col>
                    </Row>
                    <Form.Label>
                        Wybierz znajomych polecających restaurację (opcjonalnie):
                    </Form.Label>
                    <Stack direction="horizontal" gap={3} style={{marginBottom: "20px"}}>
                        {friendOptions}
                    </Stack>
                        <Col sm={1}>
                            <Button variant="dark" type="submit" >
                                Szukaj
                            </Button>
                        </Col>
                    </Form.Group>
                </Form>
                </Card.Text>
                <Table striped bordered hover className="RestaurantTable">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nazwa</th>
                            <th>Polecający</th>
                            <th>Ilość poleceń</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recommendedRows}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>

        <Card style={{margin: "30px"}}>
            <Card.Body>
                <Card.Title>Odkryj nowe smaki</Card.Title>
                <Card.Text>
                W tej rubryce znajdziesz listę restauracji, które są lubiane przez twoich znajomych, ale ty jeszcze ich nie odwiedzałeś (nie są na liście polubionych przez ciebie).
                </Card.Text>
                <Table striped bordered hover className="RestaurantTable">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nazwa</th>
                            <th>Polecający</th>
                            <th>Ilość poleceń</th>
                        </tr>
                    </thead>
                    <tbody>
                        {newRestRows}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>

      </Fragment>
    );
}

export default Recommender;