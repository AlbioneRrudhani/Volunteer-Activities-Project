using System.Threading.Tasks;
using Application.Photos;
using Microsoft.AspNetCore.Http;



namespace Application.Interfaces
{
    public interface IPhotoAccessor
    {
        //kto metoda nuk perzihen me db fare, jane vec per me upload, delete foto nga cloudinary
        Task<PhotoUploadResult> AddPhoto(IFormFile file);
        Task <string> DeletePhoto (string publicId);

    }




}