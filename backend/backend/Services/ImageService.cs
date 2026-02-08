namespace backend.Services
{
    public class ImageService
    {
        // public async Task<string> SaveFileAsync(IFormFile file, string path)
        // {
        //     var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", path);
        //     if (!Directory.Exists(uploadsFolder))
        //         Directory.CreateDirectory(uploadsFolder);
        //     var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
        //     var filePath = Path.Combine(uploadsFolder, fileName);

        //     using (var stream = new FileStream(filePath, FileMode.Create))
        //     {
        //         await file.CopyToAsync(stream);
        //     }

        //     return $"/uploads/{path}/{fileName}";
        // }

        // public void DeleteFile(string fileName)
        // {
        //     var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", fileName.TrimStart('/'));
        //     if (File.Exists(filePath) && filePath.StartsWith(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot")))
        //         File.Delete(filePath);
        // }
        public async Task<string> SaveFileAsync(IFormFile file, string path)
        {
            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", path);
            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);
            var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return $"/uploads/{path}/{fileName}";
        }

        public void DeleteFile(string fileName)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", fileName.TrimStart('/'));
            if (File.Exists(filePath) && filePath.StartsWith(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot")))
                File.Delete(filePath);
        }
    }
}
