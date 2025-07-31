using Microsoft.AspNetCore.Mvc;
using NuiTeaApi.Models;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic; // Added for List<Material>

namespace NuiTeaApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MaterialsController : ControllerBase
    {
        private readonly NuiTeaContext _context;
        public MaterialsController(NuiTeaContext context)
        {
            _context = context;
        }

        // GET: api/materials
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var materials = await _context.Materials
                    .Where(m => m.IsActive)
                    .Select(m => new
                    {
                        m.Id,
                        m.Name,
                        m.Category,
                        m.Supplier,
                        m.Quantity,
                        m.Unit,
                        m.ImportPrice,
                        m.ImportDate,
                        m.CreatedAt,
                        m.UpdatedAt
                    })
                    .ToListAsync();
                
                return Ok(materials);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi server: " + ex.Message });
            }
        }

        // POST: api/materials
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateMaterialRequest req)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(req.Name))
                    return BadRequest(new { message = "Vui lòng nhập tên nguyên vật liệu." });

                var material = new Material
                {
                    Name = req.Name,
                    Category = req.Category,
                    Supplier = req.Supplier,
                    Quantity = req.Quantity ?? 0,
                    Unit = req.Unit ?? "cái",
                    ImportPrice = req.ImportPrice,
                    ImportDate = req.ImportDate ?? DateTime.Now,
                    IsActive = true,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                };

                _context.Materials.Add(material);
                await _context.SaveChangesAsync();

                return Ok(new { 
                    message = "Thêm nguyên vật liệu thành công!", 
                    material.Id, 
                    material.Name 
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi server: " + ex.Message });
            }
        }

        // PUT: api/materials/{id}/import
        [HttpPut("{id}/import")]
        public async Task<IActionResult> Import(int id, [FromBody] ImportRequest req)
        {
            try
            {
                var material = await _context.Materials.FindAsync(id);
                if (material == null)
                    return NotFound(new { message = "Không tìm thấy nguyên vật liệu." });

                if (req.Quantity <= 0)
                    return BadRequest(new { message = "Số lượng phải lớn hơn 0." });

                material.Quantity += req.Quantity;
                material.UpdatedAt = DateTime.Now;
                await _context.SaveChangesAsync();

                return Ok(new { 
                    message = $"Đã nhập kho {req.Quantity} {material.Unit} {material.Name}.",
                    material.Quantity 
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi server: " + ex.Message });
            }
        }

        // PUT: api/materials/{id}/export
        [HttpPut("{id}/export")]
        public async Task<IActionResult> Export(int id, [FromBody] ExportRequest req)
        {
            try
            {
                var material = await _context.Materials.FindAsync(id);
                if (material == null)
                    return NotFound(new { message = "Không tìm thấy nguyên vật liệu." });

                if (req.Quantity <= 0)
                    return BadRequest(new { message = "Số lượng phải lớn hơn 0." });

                if (material.Quantity < req.Quantity)
                    return BadRequest(new { message = "Số lượng trong kho không đủ." });

                material.Quantity -= req.Quantity;
                material.UpdatedAt = DateTime.Now;
                await _context.SaveChangesAsync();

                return Ok(new { 
                    message = $"Đã xuất kho {req.Quantity} {material.Unit} {material.Name}.",
                    material.Quantity 
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi server: " + ex.Message });
            }
        }

        // DELETE: api/materials/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var material = await _context.Materials.FindAsync(id);
                if (material == null)
                    return NotFound(new { message = "Không tìm thấy nguyên vật liệu." });

                material.IsActive = false;
                material.UpdatedAt = DateTime.Now;
                await _context.SaveChangesAsync();

                return Ok(new { message = "Đã xóa nguyên vật liệu thành công." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi server: " + ex.Message });
            }
        }

        public class CreateMaterialRequest
        {
            public string Name { get; set; } = null!;
            public string? Category { get; set; }
            public string? Supplier { get; set; }
            public int? Quantity { get; set; }
            public string? Unit { get; set; }
            public decimal? ImportPrice { get; set; }
            public DateTime? ImportDate { get; set; }
        }

        public class ImportRequest
        {
            public int Quantity { get; set; }
        }

        public class ExportRequest
        {
            public int Quantity { get; set; }
        }
    }
} 