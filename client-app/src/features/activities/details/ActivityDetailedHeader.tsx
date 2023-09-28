import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Header, Item, Segment, Image, Grid, Label } from 'semantic-ui-react'
import { iActivity } from "../../../app/models/activity";
import { format } from 'date-fns';
import { useStore } from '../../../app/stores/store';

const activityImageStyle = {
    filter: 'brightness(40%)', 
};

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    activity: iActivity
}

export default observer(function ActivityDetailedHeader({ activity }: Props) {
    const { activityStore: { updateAttendance, loading, cancelActivityToggle } } = useStore();
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>

                {activity.isCancelled &&
                    <Label style={{ position: 'absolute', zIndex: 1000, left: -14, top: 20 }}
                        ribbon color='red' content='Cancelled' />}

                <Image src={`/images/categoryImages/${activity.category}.jpg`} fluid style={activityImageStyle} />
                <Segment style={activityImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content style={{ left: '3%' }}>
                                <Header
                                    size='huge'
                                    content={activity.title}
                                    style={{ color: 'white' }}
                                />

                                <Item style={{ color: 'white' }}>
                                    <p>{format(activity.date!, 'dd MMM yyyy h:mm aa')}</p>
                                </Item>

                                <p>
                                    Hosted by <strong><Link to={`profiles/${activity.host?.username}`}>{activity.host?.displayName}</Link></strong>
                                </p>

                                <Segment className="buttonsActivity" >
                                    {activity.isHost ? (
                                        <>
                                            <Button
                                                color={activity.isCancelled ? 'green' : 'red'}
                                                floated='left'
                                                basic
                                                content={activity.isCancelled ? 'Re-activate Activity' : 'Cancel Activity'}
                                                onClick={cancelActivityToggle}
                                                loading={loading}    
                                            />
                                            <Button as={Link}
                                                disabled={activity.isCancelled}
                                                to={`/manage/${activity.id}`}
                                                color="blue"
                                                floated='right'>
                                                Manage Event
                                            </Button>
                                        </>
                                    ) : activity.isGoing ? (
                                            <Button loading={loading} onClick={updateAttendance} style={{ color: 'black' }}>Cancel attendance</Button>
                                        ) : (
                                                <Button disabled={activity.isCancelled}
                                                    loading={loading}
                                                    onClick={updateAttendance}
                                                    className="JoinButton"
                                                    style={{ color: 'black' }}>
                                                    Join Event
                                                </Button>
                                            )
                                    }


                                </Segment>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>

        </Segment.Group>
    )
})
