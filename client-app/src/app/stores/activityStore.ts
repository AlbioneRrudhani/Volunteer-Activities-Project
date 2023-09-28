import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { ActivityFormValues, iActivity } from "../models/activity";
import {format} from 'date-fns';
import { store } from "./store";
import { Profile } from "../models/profile";
import { Pagination, PagingParams } from "../models/pagination";



export default class ActivityStore {
    activityRegistry=new Map<string,iActivity>(); 
    selectedActivity: iActivity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingIntial = false;
    pagination:Pagination | null=null;
    pagingParams=new PagingParams();

    constructor() {
        makeAutoObservable(this)   
    }

    setPagingParams=(pagingParams:PagingParams)=>{
        this.pagingParams=pagingParams;
    }

    get axiosParams(){
        const params=new URLSearchParams();
        params.append('pageNumber',this.pagingParams.pageNumber.toString());
        params.append('pageSize',this.pagingParams.pageSize.toString());
        return params;
    }

    get activitiesByDate(){
        return Array.from(this.activityRegistry.values()).sort((a,b)=>
        a.date!.getTime() - b.date!.getTime()); 
    }

    get groupedActivities(){
        return Object.entries(
        this.activitiesByDate.reduce((activities, activity) =>{
            const date = format(activity.date!, 'dd MMM yyyy');
            activities[date] = activities[date] ? [...activities[date], activity] : [activity];
            return activities;
        }, {} as {[key: string]: iActivity[]})
        )
    }



    loadActivities = async () => { 
        this.loadingIntial = true;     
                                       
        try {
            const result = await agent.Activities.list(this.axiosParams);
            result.data.forEach(activity => { 
              this.setAcitvity(activity);
            })
            this.setPagination(result.pagination);
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setPagination=(pagination:Pagination)=>{
        this.pagination=pagination;
    }

    loadActivity = async(id: string) => { 
        let activity = this.getActivity(id);
        if(activity){ 
            this.selectedActivity = activity;
            return activity; 
        }else{
            this.loadingIntial = true;
            try{
                activity = await agent.Activities.details(id); 
                this.setAcitvity(activity);
                runInAction(()=>{
                    this.selectedActivity = activity;
                })
                
                this.setLoadingInitial(false);
                return activity;
            }catch(error){
                console.log(error);
                this.setLoadingInitial(false);

            }
        }

    }
    private setAcitvity =(activity: iActivity) => {
        const user=store.userStore.user;
        if(user){
            activity.isGoing=activity.attendees!.some( 
                a=>a.username===user.username
            )
            activity.isHost=activity.hostUsername===user.username;
            activity.host=activity.attendees?.find(x=> x.username===activity.hostUsername);
        }
           activity.date = new Date(activity.date!);
            this.activityRegistry.set(activity.id,activity) 
    }

    private getActivity = (id: string) => { 
        return this.activityRegistry.get(id);
        
    }
   



    setLoadingInitial = (state: boolean) => {
        this.loadingIntial = state;
    }

    createActivity = async (activity: ActivityFormValues) => {
   

       const user = store.userStore.user;
       const attendee = new Profile(user!);
        try {
            await agent.Activities.create(activity);
            const newActivity = new iActivity(activity);
            newActivity.hostUsername = user!.username;
            newActivity.attendees = [attendee];
            this.setAcitvity(newActivity);
            runInAction(() => {
                this.selectedActivity = newActivity;
            })
        } catch (error) {
            console.log(error);
        }
    }

    updateActivity = async (activity: ActivityFormValues) => {
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                if(activity.id){
                    let updateActivity = {...this.getActivity(activity.id), ...activity}
                    this.activityRegistry.set(activity.id,updateActivity as iActivity);
                    this.selectedActivity = updateActivity as iActivity;
                }

            })
        } catch (error) {
            console.log(error);
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.loading = false;
            })

        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateAttendance = async() => { 
        const user = store.userStore.user;
        this.loading = true;
        try{
            await agent.Activities.attend(this.selectedActivity!.id);
            runInAction(() =>{
                if(this.selectedActivity?.isGoing){
                    this.selectedActivity.attendees = this.selectedActivity.attendees?.filter(a => a.username !== user?.username); //i filtron
                    this.selectedActivity.isGoing = false;
                }else{
                    const attendee = new Profile(user!); 
                    this.selectedActivity?.attendees?.push(attendee);
                    this.selectedActivity!.isGoing = true;
                }
                this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!)
            })

        }catch(error){
            console.log(error);

        }finally{
            runInAction(() => this.loading = false);
        }
    }

    cancelActivityToggle= async()=>{
        this.loading=true;
        try{
            await agent.Activities.attend(this.selectedActivity!.id); 
            runInAction(()=>{
                this.selectedActivity!.isCancelled=!this.selectedActivity?.isCancelled;
                this.activityRegistry.set(this.selectedActivity!.id,this.selectedActivity!);
            
            })
        }catch(error){
            console.log(error);
        } finally{
            runInAction(()=>this.loading=false);
        }
    }

    updateAttendeeFollowing=(username:string)=>{
        this.activityRegistry.forEach(activity=>{
            activity.attendees.forEach(attendee=>{
                if(attendee.username===username){
                    attendee.following?attendee.followersCount-- : attendee.followersCount++; 
                    attendee.following=!attendee.following;
                }
            })
        })
    }
    clearSelectedActivity = () =>{
        this.selectedActivity = undefined;
        
    }

}
