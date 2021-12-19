import { Fragment, useState, useEffect } from "react";
import { Tabs, Tab, Table, Card, Row, Col, Button } from 'react-bootstrap';
import './styles.css';
import axios from "./../axios";

const UserPage = (props) => {
    const [key, setKey] = useState('likes');
    const [restaurants, setRestaurants] = useState([])
    const [friends, setFriends] = useState([])
    const [people, setPeople] = useState([])
    const name = props.userName;

    useEffect(() => {
        handleLoadData();
        handleGetFriends();
        handleGetPeople();
    }, [])

    const handleLoadData = () => {
        axios.get(`/get-restaurants?cuisine&location&person=${props.userName}`)
        .then(res => {
            setRestaurants(res.data.restaurants)
        }).catch(err => {
            console.log(err.message)
        })
    }

    const handleGetFriends = () => {
        axios.get(`/get-friends?person=${props.userName}`)
        .then(res => {
            setFriends(res.data.friends)
        }).catch(err => {
            console.log(err.message)
        })
    }

    const handleGetPeople = () => {
        axios.get(`/get-person?person=${props.userName}`)
        .then(res => {
            setPeople(res.data.person)
        }).catch(err => {
            console.log(err.message)
        })
    }

    const handleAddFriend = (name) => {
        axios.post("/make-friends", {p1: props.userName, p2: name})
        .then(res => {
            handleGetFriends()
            handleGetPeople()
        }).catch(err => {
            console.log(err.message)
        })
    }

    const handleRemoveFriend = (name) => {
        axios.post("/delete-friends", {p1: props.userName, p2: name})
        .then(res => {
            handleGetFriends()
            handleGetPeople()
        }).catch(err => {
            console.log(err.message)
        })
    }

    const handleRemoveRestaurant = (name) => {
        axios.post("/dislike", {person: props.userName, restaurant: name})
        .then(res => {
            handleLoadData()
        }).catch(err => {
            console.log(err.message)
        })
    }

    let restaurantRows = restaurants.map((res, index) => {
        return (
            <tr>
                <td>{index+1}</td>
                <td>{res.restaurant}</td>
                <td>{res.location}</td>
                <td>{res.cuisine}</td>
                <td><Button variant="dark" onClick={() => handleRemoveRestaurant(res.restaurant)} >Cofnij polubienie</Button></td>
            </tr>)
    })

    let friendRows = friends.map((res, index) => {
        return (
            <tr>
                <td>{index+1}</td>
                <td>{res}</td>
                <td><Button variant="dark" onClick={() => handleRemoveFriend(res)} >Usuń</Button></td>
            </tr>)
    })

    let peopleRows = people.map((res, index) => {
        return (
            <tr>
                <td>{index+1}</td>
                <td>{res}</td>
                <td><Button variant="dark" onClick={() => handleAddFriend(res) } >Dodaj</Button></td>
            </tr>)
    })

  return (
      <Fragment>
        <Card style={{margin: "30px"}}>
            <Card.Body>
                <Card.Title>Witaj {name}</Card.Title>
                <Card.Text>
                Tutaj możesz sprawdzić listę lubianych i nielubianych restauracji, a także znajomych!
                </Card.Text>
            </Card.Body>
        </Card>
        <Tabs
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="ProfileTabs"
            >
            <Tab eventKey="likes" title="Lubiane restauracje" style={{margin: "30px"}}>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nazwa</th>
                            <th>Lokalizacja</th>
                            <th>Typ kuchni</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {restaurantRows}
                    </tbody>
                </Table>
            </Tab>
            <Tab eventKey="friends" title="Znajomi" style={{margin: "30px"}}>
                <Row>
                    <Col>
                        <Table striped bordered hover >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Znajomi</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {friendRows}
                            </tbody>
                        </Table>
                    </Col>
                    <Col>
                        <Table striped bordered hover >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Potencjalni znajomi</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {peopleRows}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Tab>
        </Tabs>

      </Fragment>
  );
}

export default UserPage;