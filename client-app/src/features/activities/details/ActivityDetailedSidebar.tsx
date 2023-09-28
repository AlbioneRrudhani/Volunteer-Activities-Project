import React from 'react'
import { Segment, List, Label, Item, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { iActivity } from '../../../app/models/activity';

interface Props {
    activity: iActivity;
}

export default observer(function ActivityDetailedSidebar({ activity: { attendees, host } }: Props) {
    if (!attendees) return null; 
    return (
        <>
            <Segment
                textAlign='center'
                style={{ border: 'none', color: 'black' }}
                attached='top'
                secondary
                inverted
            >
                {attendees.length}{attendees.length === 1 ? ' Person' : ' People'} going
            </Segment>
            <Segment attached >
                <List relaxed divided>
                    {attendees.map(attendee => (
                        <Item style={{ position: 'relative' }} key={attendee.username}>
                            {attendee.username === host?.username &&
                                <Label
                                    style={{ position: 'absolute' }}
                                    color='blue'
                                    ribbon='right'
                                >
                                    Host
                                </Label>}
                            <Image size='tiny' src={attendee.image || '/images/biona.png'} />
                            <Item.Content verticalAlign='middle'>
                                <Item.Header as='h3'>
                                    <Link to={`/profiles/${attendee.username}`}>{attendee.displayName}</Link>
                                </Item.Header>
                                {attendee.following &&
                                <Item.Extra style={{ color: 'green' }}>Following</Item.Extra>}
                            </Item.Content>
                        </Item>

                    ))}
                </List>
            </Segment>
        </>

    )
})
