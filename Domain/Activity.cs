using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Activity
    {
        public Guid Id { get; set; }


        public string Title { get; set; }

        public  DateTime date { get; set; }

        public string Description { get; set; }

        public string Category { get; set; }

        public string City { get; set; }

        public string Venue { get; set; }

        public bool isCancelled {get; set;}

        public ICollection<ActivityAttendee> Attendees{get; set;}=new List <ActivityAttendee>();

        public ICollection<Comment> Comments{get; set;} = new List<Comment>();
    }
}