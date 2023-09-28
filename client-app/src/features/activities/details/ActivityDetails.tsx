
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import {useParams } from "react-router-dom";
import {Grid} from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from '../../../app/stores/store';
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";



export default observer(function ActivityDetails() {

    const { activityStore } = useStore();
    //const {} = activityStore;
    const { selectedActivity: activity, loadActivity, loadingIntial, clearSelectedActivity } = activityStore;
    const { id } = useParams<{ id: string }>(); 

    useEffect(() => {
        if (id) loadActivity(id); 
        return () => clearSelectedActivity();
    }, [id, loadActivity, clearSelectedActivity]);

    if (loadingIntial || !activity) return <LoadingComponent />; 

    return (
       

         <Grid>
         <Grid.Column width={10}>
             <ActivityDetailedHeader activity={activity} />
             </Grid.Column> 
             <Grid.Column width={5}>
             <ActivityDetailedInfo activity={activity}/>     
             </Grid.Column> 
        <Grid.Column width={10}>
        <ActivityDetailedChat activityId={activity.id}/>
         </Grid.Column>
         <Grid.Column width={6}>
        <ActivityDetailedSidebar activity={activity} />{}
         </Grid.Column>



     </Grid>
    )
})