using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System;
using MediatR;
using Application.Activities;
using System.Threading;
using Microsoft.AspNetCore.Authorization;
using Application.Core;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {


        [HttpGet]

        public async Task<ActionResult> GetActivities([FromQuery]PagingParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query{Params = param})); 
        }                                                                                       

       
        [HttpGet("{id}")]

        public async Task<ActionResult> GetActivity(Guid id)
        {

            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));

        }


        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Activity = activity }));
        }

        [Authorize(Policy="IsActivityHost")]

        [HttpPut("{id}")]

        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Activity = activity }));

        }


        [Authorize(Policy="IsActivityHost")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }


        //per me update attendance
        [HttpPost("{id}/attend")]
        public async Task <IActionResult>Attend(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateAttendance.Command{Id=id}));
        }
    }
}