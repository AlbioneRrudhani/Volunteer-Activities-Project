import { Profile } from "./profile";

export interface iActivity {
    id: string;
    title: string;
    date: Date | null;
    description: string;
    category: string;
    city: string;
    venue: string; 
    hostUsername:string;
    isCancelled:boolean;
    isGoing:boolean;
    isHost:boolean;
    host?:Profile;
    attendees:Profile[]
}


export class iActivity implements iActivity{
    constructor(init?: ActivityFormValues){
        Object.assign(this.attendees, init);
    }
}

export class ActivityFormValues{
    id?: string = undefined;
    title: string = '';
    category: string = '';
    description: string = '';
    date: Date | null = null;
    city: string = '';
    venue: string = '';

    constructor(activity?: ActivityFormValues){
         if(activity){
            this.id = activity.id;
            this.title = activity.title;
            this.category = activity.category;
            this.description = activity.description;
            this.date = activity.date;
            this.city = activity.city;
            this.venue = activity.venue;
         }
    } 
}





