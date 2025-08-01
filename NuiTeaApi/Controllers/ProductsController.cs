using Microsoft.AspNetCore.Mvc;
using NuiTeaApi.Models;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System;

namespace NuiTeaApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly NuiTeaContext _context;

        public ProductsController(NuiTeaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<object>> GetProducts()
        {
            var products = _context.Products
                .Include(p => p.Category)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Price,
                    p.Image,
                    p.Description,
                    p.IsActive,
                    p.IsSoldOut,
                    p.CreatedAt,
                    Category = p.Category == null ? null : new
                    {
                        p.Category.Id,
                        p.Category.Name,
                        p.Category.Description
                    }
                })
                .ToList();
            return Ok(products);
        }

        [HttpPost]
        public ActionResult<Product> AddProduct(CreateProductDto dto)
        {
            try
            {
                var product = new Product
                {
                    Name = dto.Name,
                    Price = dto.Price,
                    Image = dto.Image,
                    CategoryId = dto.CategoryId,
                    Description = dto.Description,
                    IsActive = dto.IsActive,
                    IsSoldOut = dto.IsSoldOut,
                    CreatedAt = dto.CreatedAt
                };
                _context.Products.Add(product);
                _context.SaveChanges();
                return product;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateProduct(int id, [FromBody] CreateProductDto dto)
        {
            var product = _context.Products.FirstOrDefault(p => p.Id == id);
            if (product == null)
                return NotFound(new { message = "Không tìm thấy sản phẩm." });

            product.Name = dto.Name;
            product.Price = dto.Price;
            product.Image = dto.Image;
            product.CategoryId = dto.CategoryId;
            product.Description = dto.Description;
            product.IsActive = dto.IsActive;
            product.IsSoldOut = dto.IsSoldOut;
            product.CreatedAt = dto.CreatedAt;

            _context.SaveChanges();
            return Ok(product);
        }

        [HttpPut("{id}/toggle-soldout")]
        public IActionResult ToggleSoldOut(int id)
        {
            var product = _context.Products.FirstOrDefault(p => p.Id == id);
            if (product == null)
                return NotFound(new { message = "Không tìm thấy sản phẩm." });

            product.IsSoldOut = !product.IsSoldOut;
            _context.SaveChanges();
            
            return Ok(new { 
                message = product.IsSoldOut ? "Sản phẩm đã được đánh dấu hết hàng." : "Sản phẩm đã được bật lại.",
                isSoldOut = product.IsSoldOut 
            });
        }

        public class CreateProductDto
        {
            public string Name { get; set; }
            public double Price { get; set; }
            public string Image { get; set; }
            public int CategoryId { get; set; }
            public string Description { get; set; }
            public bool IsActive { get; set; }
            public bool IsSoldOut { get; set; }
            public DateTime CreatedAt { get; set; }
        }
    }
}