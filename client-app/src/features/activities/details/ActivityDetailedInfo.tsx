import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React from 'react'
import {Segment, Grid, Icon} from 'semantic-ui-react'
import {iActivity} from "../../../app/models/activity";

interface Props {
    activity: iActivity
}

export default observer(function ActivityDetailedInfo({activity}: Props) {
    return (
        <Segment.Group style={{left:'3%'}}  className='actDetail'>
            <Segment attached='top' >
                <Grid className="detailedHeaders">
                    <Grid.Column width={1}>
                        <Icon size='large' color='black' name='info'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{activity.description}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle' className="detailedHeaders">
                    <Grid.Column width={1}>
                        <Icon name='calendar' size='large' color='black'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
            <span>
              {format(activity.date!, 'dd MMM yyyy h:mm aa')}
            </span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle' className="detailedHeaders">
                    <Grid.Column width={1}>
                        <Icon name='marker' size='large' color='black'/>
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span>{activity.venue}, {activity.city}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})