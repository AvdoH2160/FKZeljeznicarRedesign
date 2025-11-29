namespace backend.Services
{
    public class ImageService
    {
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
            if(File.Exists(fileName))
                File.Delete(fileName);
        }
    }
}
