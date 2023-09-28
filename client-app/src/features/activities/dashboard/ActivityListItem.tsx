import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item,Label,Segment } from "semantic-ui-react";
import { iActivity } from "../../../app/models/activity";
import {format} from 'date-fns';
import ActivityListItemAttendee from "./ActivityListItemAttendee";


interface Props{
    activity: iActivity
}

export default function ActivityListItem({activity}: Props){
   

    return(
        <Segment.Group className="activityy">
            <Segment >
                {activity.isCancelled &&
                <Label attached='top' color='red' content='Cancelled' style={{textAlign:'center'}}/>
                }
                    <Item.Group >
                    <Item.Content>
                        <Item.Image style={{marginBottom:3}} size='tiny' circular src={activity.host?.image || '/images/era.png'} />
                                <Item.Header as={Link} to={`/activities/${activity.id}`} className='titleAc'>
                                    {activity.title}
                                </Item.Header>
                                <Item.Description>Hosted by <Link to={`/profiles/${activity.hostUsername}`}>{activity.host?.displayName}</Link></Item.Description>
                                {activity.isHost && (
                                    <Item.Description>
                                        <Label basic color='orange'>
                                            You are hosting this activity
                                        </Label>
                                    </Item.Description>
                                )}

                                {activity.isGoing && !activity.isHost && (
                                    <Item.Description>
                                        <Label basic color='orange'>
                                            You are going to this activity
                                        </Label>
                                    </Item.Description>
                                )}
                            </Item.Content>
                        <Item >
                        <Item.Image width="100%" height="140" className="imgg" src={`/images/categoryImages/${activity.category}.jpg`}/>
                        </Item>
                    </Item.Group>
            </Segment>
            <Segment>
                <span  className="dateAc">
                    <Icon name='clock'/>{format(activity.date!, 'dd MMM yyyy h:mm aa')}
                    </span>
                    </Segment>
                    <Segment>
                    <span className="venueAc">
                    <Icon name='marker'/>{activity.venue}
                    </span>               
                   </Segment>
            <Segment secondary>
                <ActivityListItemAttendee attendees={activity.attendees!}/>
            </Segment> 
            <Segment clearing>
                <span className='descriptionAc'>{activity.description}</span>
                </Segment>
                <Segment>
                <Button
                    as={Link} to={`/activities/${activity.id}`} color='orange' className='buttonAc' floated='right' content='View'
                />
                </Segment>
            
        </Segment.Group>
    )
}

{/* <Item key={activity.id}>
                       
<ItemContent>
     <ItemHeader as='a'>{activity.title}</ItemHeader>
     <ItemMeta>{activity.toString()}</ItemMeta>
     <ItemDescription>
         <div>{activity.description}</div>
         <div>{activity.city},{activity.venue}</div>
     </ItemDescription>
     <ItemExtra>
         <Button as={Link} to = {`/activities/${activity.id}`} floated='right' content='Read More' color='green' /> {/*funksioni selectActivity perdoret per butonin view 
         <Button 
         name={activity.id}
         floated='right' 
         loading={loading && target===activity.id} 
         onClick={(e) => handleActivityDelete(e,activity.id)} content='Delete' color='red'/>      {/* --te pjesa e onclick e kemi shenu qashtu per mos me execute the function menjehere, por prit deri sa ta shtypim butonin submit                                                                                                            --te pjesa e onclick e kemi shenu qashtu per mos me execute the function menjehere, por prit deri sa ta shtypim butonin submit                                                              */}
     /*<Label basic content={activity.category} />
   </ItemExtra>
</ItemContent>
</Item> */
