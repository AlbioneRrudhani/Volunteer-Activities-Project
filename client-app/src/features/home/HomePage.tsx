


import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button, Item } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

export default observer(function HomePage() {
    const { userStore, modalStore } = useStore();
    return (

        <div>

            <Segment inverted textAlign="center" vertical className="masthead">
                <Image src='/images/logo.png' className="img" alt='logo' style={{ /*marginTop:60, height:'1200px', width:'1600px',opacity:0.2, position: 'absolute',
          left: '50%',top: '50%', transform: 'translate(-50%, -50%)' */}} />
                <Container text>
                    <div className='homePageContent'>
                        <Header as='h2' inverted className="title">
                            Volunteer Opportunities
                        </Header>
                        <Item.Description className="description" style={{ fontWeight: 'bolder' }}>
                            VolunteerMatch is the most effective way to recruit highly qualified volunteers
                            for your nonprofit. We match you with people who are passionate
                            about and committed to your cause, and who can help when and where you need them.

                            ...And because volunteers are often donors as well, we make it easy for them to contribute their time and money.
                        </Item.Description>
                        {userStore.isLoggedIn ? (
                            <Button as={Link} to='/activities' size='huge' inverted className="accessButton">
                                Find Opportunities !
                            </Button>
                        ) : (
                            <>

                                <Button onClick={() => modalStore.openModal(<LoginForm />)} size='huge' inverted className="accessButton">
                                    Login!
                                </Button>
                                <Button onClick={() => modalStore.openModal(<RegisterForm />)} size='huge' inverted className="accessButton">
                                    Register!
                                </Button>
                            </>
                        )}
                    </div>

                </Container>


            </Segment></div>
    )
})