using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuiTeaApi.Models;

namespace NuiTeaApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CouponsController : ControllerBase
    {
        private readonly NuiTeaContext _context;
        public CouponsController(NuiTeaContext context)
        {
            _context = context;
        }

        // GET: api/coupons/active
        [HttpGet("active")]
        public async Task<IActionResult> GetActiveCoupons()
        {
            var now = DateTime.Now;
            var coupons = await _context.Coupons
                .Where(c => c.IsActive && (c.ExpiryDate == null || c.ExpiryDate > now))
                .ToListAsync();
            return Ok(coupons);
        }

        // GET: api/coupons/validate?code=CODE
        [HttpGet("validate")]
        public async Task<IActionResult> ValidateCoupon([FromQuery] string code)
        {
            var now = DateTime.Now;
            var coupon = await _context.Coupons
                .FirstOrDefaultAsync(c => c.Code == code && c.IsActive && (c.ExpiryDate == null || c.ExpiryDate > now));
            if (coupon == null)
                return NotFound(new { message = "Mã giảm giá không hợp lệ hoặc đã hết hạn." });
            return Ok(coupon);
        }
    }
}