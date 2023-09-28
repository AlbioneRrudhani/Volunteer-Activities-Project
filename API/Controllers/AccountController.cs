using System.Threading.Tasks;
using API.DTOs;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Linq;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {

        private readonly UserManager<AppUser> userManager;
        private readonly SignInManager<AppUser> signInManager;
        private readonly TokenService _tokenService;

        public AccountController(UserManager<AppUser> userManager,
         SignInManager<AppUser> signInManager, TokenService tokenService)
        {
            _tokenService = tokenService;
            this.userManager = userManager;
             this.signInManager = signInManager;
        }
        [HttpPost("login")]

        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDto)
        {
            var user = await userManager.Users.Include(p => p.Photos)
            .FirstOrDefaultAsync(x => x.Email == loginDto.Email);

            if(user == null) return Unauthorized();

            var result = await signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if(result.Succeeded)
            {
               return CreateUserObject(user);
            }
            return Unauthorized();
        }
        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO)
        {
            if(await userManager.Users.AnyAsync(x => x.Email == registerDTO.Email))
            {
                ModelState.AddModelError("email","Email taken");
                return ValidationProblem();
            }
             if(await userManager.Users.AnyAsync(x => x.UserName == registerDTO.Username))
            {
                ModelState.AddModelError("username","Username taken");
                return ValidationProblem();
            }
            var user = new AppUser
            {
                DisplayName = registerDTO.DisplayName ,
                Email = registerDTO.Email,
                UserName = registerDTO.Username
            };
            var result = await userManager.CreateAsync(user, registerDTO.Password);

            if(result.Succeeded)
            {
                return CreateUserObject(user);
                
            }
            return BadRequest("Problem registering user");
        }

        [Authorize]
        [HttpGet]

        public async Task<ActionResult<UserDTO>> GetCurrentUser()
        {
            var user  = await userManager.Users.Include(p => p.Photos)
            .FirstOrDefaultAsync(x => x.Email ==User.FindFirstValue(ClaimTypes.Email));

            return CreateUserObject(user);
       
        }
        private UserDTO CreateUserObject(AppUser user)
        {
             return new UserDTO
                {
                    DisplayName = user.DisplayName,
                    Image = user?.Photos?.FirstOrDefault(x => x.isMain)?.Url,
                    Token = _tokenService.CreateToken(user),
                    Username = user.UserName
                };
        }

    }
}