using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Application.Interfaces;
using System.Linq;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<ActivityDto>>> { 
        
            public PagingParams Params { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<PagedList<ActivityDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccesor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccesor)
            {
                _userAccesor = userAccesor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<PagedList<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {

                var query =  _context.Activities  
                .OrderBy(d=>d.date)

                .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider,
                 new {currentUsername=_userAccesor.GetUsername()})
                .AsQueryable();


                return Result<PagedList<ActivityDto>>.Success(
                    await PagedList<ActivityDto>.CreateAsync(query, request.Params.PageNumber,
                    request.Params.PageSize)
                );



            }
        }
    }
}