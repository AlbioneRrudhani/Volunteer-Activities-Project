import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Menu, Image, Dropdown, DropdownItem, Sidebar } from 'semantic-ui-react';
import { useStore } from '../stores/store';



export default observer(function NavBar() { 
    const { userStore: { user, logout } } = useStore();

    return ( 
        <div className='navBar'>

            <Sidebar
                as={Menu}
                icon='labeled'
                inverted
                vertical
                visible
                style={{ width: '290px' }}
                className="navBar"
            >
                <Container className='navbarContent'>
                    <img className='logo' src="/images/logo.png" alt="logo" width="100" height="65" />
                    <Menu.Item style={{ color: 'white',fontSize:'large' }} as={NavLink} to='/' exact header className='volunteerAct'>
                        Volunteer Activities
                    </Menu.Item>

                    <Menu.Item style={{ color: 'white', hover: '', fontSize:'large' }} as={NavLink} to='/activities' name='Activities' />
                    <Menu.Item style={{ color: 'white', fontSize:'large' }} as={NavLink} to='/errors' name='Errors' />

                    <Menu.Item >
                        <Button className='buttonCreate' style={{ color: 'white',fontSize:'large'}} as={NavLink} to='/createActivity' positive content='Create Activity' />
                    </Menu.Item>

                    <div className='profile'>
                        <Menu.Item>

                            <Image src={user?.image || '/images/biona.png'} avatar style={{width:'3em', height:'3em'}}/>
                            <Dropdown className="loginItem" style={{ color: 'black', paddingLeft:'10px',fontSize:'11pt' }} pointing='top left' text={user?.displayName} >
                                <Dropdown.Menu className="dropdown" style={{ paddingLeft: '10px' }}>
                                    <Dropdown.Item as={Link} to={`/profiles/${user?.username}`} text='My Profile' icon='biona' />
                                    <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                                </Dropdown.Menu>
                            </Dropdown>

                        </Menu.Item>
                    </div>
                </Container>
            </Sidebar>
        </div>
    )


})