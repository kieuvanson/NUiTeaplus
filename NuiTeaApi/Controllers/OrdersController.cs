using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuiTeaApi.Models;

namespace NuiTeaApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly NuiTeaContext _context;

        public OrdersController(NuiTeaContext context)
        {
            _context = context;
        }

        // Lấy tất cả đơn hàng (cho admin)
        [HttpGet]
        public async Task<IActionResult> GetOrders([FromQuery] string customerPhone = null)
        {
            try
            {
                var query = _context.Orders.AsQueryable();
                
                // Nếu có customerPhone, chỉ lấy đơn hàng của khách hàng đó
                if (!string.IsNullOrEmpty(customerPhone))
                {
                    query = query.Where(o => o.Email == customerPhone); // Sử dụng email để lọc
                    Console.WriteLine($"Filtering orders by email: {customerPhone}");
                }
                
                var orders = await query
                    .OrderByDescending(o => o.CreatedAt)
                    .ToListAsync();

                var result = orders.Select(order => new
                {
                    id = order.Id,
                    orderNumber = order.OrderNumber,
                    customerName = order.CustomerName,
                    phone = order.Phone,
                    address = order.Address,
                    totalAmount = order.TotalAmount,
                    paymentMethod = order.PaymentMethod,
                    paymentStatus = order.PaymentStatus,
                    orderStatus = order.OrderStatus,
                    createdAt = order.CreatedAt,
                    estimatedDelivery = order.EstimatedDelivery,
                    completedAt = order.CompletedAt,
                    note = order.Note,
                    couponCode = order.CouponCode,
                    discountAmount = order.DiscountAmount,
                    items = order.GetItems()
                });

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        // Lấy đơn hàng theo ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrder(int id)
        {
            try
            {
                var order = await _context.Orders.FindAsync(id);
                if (order == null)
                    return NotFound(new { error = "Không tìm thấy đơn hàng" });

                var result = new
                {
                    id = order.Id,
                    orderNumber = order.OrderNumber,
                    customerName = order.CustomerName,
                    phone = order.Phone,
                    address = order.Address,
                    totalAmount = order.TotalAmount,
                    paymentMethod = order.PaymentMethod,
                    paymentStatus = order.PaymentStatus,
                    orderStatus = order.OrderStatus,
                    createdAt = order.CreatedAt,
                    estimatedDelivery = order.EstimatedDelivery,
                    completedAt = order.CompletedAt,
                    note = order.Note,
                    couponCode = order.CouponCode,
                    discountAmount = order.DiscountAmount,
                    items = order.GetItems()
                };

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        // Tạo đơn hàng mới
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderRequest request)
        {
            try
            {
                Console.WriteLine($"Received order request: {System.Text.Json.JsonSerializer.Serialize(request)}");
                
                // Validation
                if (string.IsNullOrEmpty(request.OrderNumber))
                    return BadRequest(new { error = "OrderNumber is required" });
                
                if (string.IsNullOrEmpty(request.CustomerName))
                    return BadRequest(new { error = "CustomerName is required" });
                
                if (string.IsNullOrEmpty(request.Phone))
                    return BadRequest(new { error = "Phone is required" });
                
                if (string.IsNullOrEmpty(request.Email))
                    return BadRequest(new { error = "Email is required" });
                
                if (string.IsNullOrEmpty(request.Address))
                    return BadRequest(new { error = "Address is required" });
                
                if (request.Items == null || request.Items.Count == 0)
                    return BadRequest(new { error = "Items are required" });

                var order = new Order
                {
                    OrderNumber = request.OrderNumber,
                    CustomerName = request.CustomerName,
                    Phone = request.Phone,
                    Email = request.Email,
                    Address = request.Address,
                    Note = request.Note,
                    TotalAmount = request.TotalAmount,
                    PaymentMethod = request.PaymentMethod,
                    PaymentStatus = request.PaymentStatus,
                    OrderStatus = request.OrderStatus,
                    CreatedAt = DateTime.Now,
                    EstimatedDelivery = DateTime.Now.AddMinutes(30),
                    CouponCode = request.CouponCode,
                    DiscountAmount = request.DiscountAmount ?? 0
                };

                order.SetItems(request.Items);

                _context.Orders.Add(order);
                await _context.SaveChangesAsync();

                Console.WriteLine($"Order created successfully with ID: {order.Id}");

                return Ok(new { 
                    id = order.Id,
                    orderNumber = order.OrderNumber,
                    message = "Đơn hàng đã được tạo thành công"
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error creating order: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                return BadRequest(new { error = ex.Message });
            }
        }

        // Cập nhật trạng thái đơn hàng
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] UpdateOrderStatusRequest request)
        {
            try
            {
                var order = await _context.Orders.FindAsync(id);
                if (order == null)
                    return NotFound(new { error = "Không tìm thấy đơn hàng" });

                order.OrderStatus = request.OrderStatus;
                
                if (request.OrderStatus == "Đã giao hàng")
                {
                    order.CompletedAt = DateTime.Now;
                }

                await _context.SaveChangesAsync();

                return Ok(new { 
                    message = "Cập nhật trạng thái đơn hàng thành công",
                    orderStatus = order.OrderStatus
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        // Cập nhật trạng thái thanh toán
        [HttpPut("{id}/payment-status")]
        public async Task<IActionResult> UpdatePaymentStatus(int id, [FromBody] UpdatePaymentStatusRequest request)
        {
            try
            {
                var order = await _context.Orders.FindAsync(id);
                if (order == null)
                    return NotFound(new { error = "Không tìm thấy đơn hàng" });

                order.PaymentStatus = request.PaymentStatus;
                await _context.SaveChangesAsync();

                return Ok(new { 
                    message = "Cập nhật trạng thái thanh toán thành công",
                    paymentStatus = order.PaymentStatus
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        // Xóa đơn hàng
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            try
            {
                var order = await _context.Orders.FindAsync(id);
                if (order == null)
                    return NotFound(new { error = "Không tìm thấy đơn hàng" });

                _context.Orders.Remove(order);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Xóa đơn hàng thành công" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }

    public class CreateOrderRequest
    {
        public string OrderNumber { get; set; } = string.Empty;
        public string CustomerName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Note { get; set; } = string.Empty;
        public decimal TotalAmount { get; set; }
        public string PaymentMethod { get; set; } = string.Empty;
        public string PaymentStatus { get; set; } = string.Empty;
        public string OrderStatus { get; set; } = string.Empty;
        public string CouponCode { get; set; } = string.Empty;
        public decimal? DiscountAmount { get; set; }
        public List<OrderItem> Items { get; set; } = new List<OrderItem>();
    }

    public class UpdateOrderStatusRequest
    {
        public string OrderStatus { get; set; } = string.Empty;
    }

    public class UpdatePaymentStatusRequest
    {
        public string PaymentStatus { get; set; } = string.Empty;
    }
} 