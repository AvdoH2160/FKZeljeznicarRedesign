namespace backend.Model
{
    public static class SlugHelper
    {
        public static string GenerateSlug(string input)
        {
            string slug = input.ToLower()
                .Trim()
                .Replace("č", "c").Replace("ć", "c")
                .Replace("ž", "z")
                .Replace("š", "s")
                .Replace("đ", "dj")
                .Replace(" ", "-");

            slug = System.Text.RegularExpressions.Regex
                .Replace(slug, @"[^a-z0-9\-]", "");

            slug = System.Text.RegularExpressions.Regex
                .Replace(slug, @"-+", "-");

            return slug;
        }
    }
}
