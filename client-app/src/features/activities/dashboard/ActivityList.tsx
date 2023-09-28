import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react'; 
import { HeaderContent } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityListItem from './ActivityListItem';
import { iActivity } from '../../../app/models/activity';




export default observer(function ActivityList() {      
    const {activityStore} = useStore();
    const{groupedActivities}=activityStore;

    
    
    
    return (
        <>

        {groupedActivities.map(([group, activities]) =>(
            <Fragment key={group}>
                <HeaderContent style={{ color: "teal" }}> 
                {group}
                </HeaderContent>
                        {activities.map((activity: iActivity) => ( 
                        <ActivityListItem key={activity.id} activity={activity}/>
                        ))}
            </Fragment>
        ))}
        </>
    )
})


