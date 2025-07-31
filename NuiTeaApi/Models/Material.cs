using System;

namespace NuiTeaApi.Models
{
    public class Material
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Category { get; set; }
        public string? Supplier { get; set; }
        public int Quantity { get; set; } = 0;
        public string? Unit { get; set; } = "cái";
        public decimal? ImportPrice { get; set; }
        public DateTime? ImportDate { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
        public bool IsActive { get; set; } = true;
    }
} 