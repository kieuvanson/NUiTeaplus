import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MenuBar from './components/MenuBar';
import { useCart } from './contexts/CartContext';
import LoginModal from './components/LoginModal';
import CartModal from './components/CartModal';

export default function OrderStatusPage() {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const { cart } = useCart();

    // Load user from localStorage
    useEffect(() => {
        const savedUser = localStorage.getItem('nui_tea_user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
    }, []);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                console.log('Fetching order details for ID:', orderId);
                const response = await fetch(`http://localhost:5249/api/orders/${orderId}`);

                if (response.ok) {
                    const orderData = await response.json();
                    console.log('Fetched order data:', orderData);
                    setOrder(orderData);
                } else {
                    console.error('Failed to fetch order:', response.status);
                    setError('Không tìm thấy thông tin đơn hàng');
                }
            } catch (error) {
                console.error('Error fetching order:', error);
                setError('Lỗi kết nối server');
            } finally {
                setLoading(false);
            }
        };

        if (orderId) {
            fetchOrderDetails();
        } else {
            setError('ID đơn hàng không hợp lệ');
            setLoading(false);
        }
    }, [orderId]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Đã đặt hàng': return '#2196F3';
            case 'Đang chuẩn bị': return '#FF9800';
            case 'Đang giao hàng': return '#9C27B0';
            case 'Đã giao hàng': return '#4CAF50';
            case 'Đã hủy': return '#F44336';
            default: return '#666';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Đã đặt hàng': return '📋';
            case 'Đang chuẩn bị': return '👨‍🍳';
            case 'Đang giao hàng': return '🚚';
            case 'Đã giao hàng': return '✅';
            case 'Đã hủy': return '❌';
            default: return '📦';
        }
    };

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', background: '#f6f5f3' }}>
                <MenuBar
                    user={user}
                    setUser={setUser}
                    setShowLogin={setShowLogin}
                    setShowCart={setShowCart}
                    setPage={() => { }}
                />
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 'calc(100vh - 80px)',
                    fontSize: 18,
                    color: '#666'
                }}>
                    Đang tải thông tin đơn hàng...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ minHeight: '100vh', background: '#f6f5f3' }}>
                <MenuBar
                    user={user}
                    setUser={setUser}
                    setShowLogin={setShowLogin}
                    setShowCart={setShowCart}
                    setPage={() => { }}
                />
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 'calc(100vh - 80px)',
                    fontSize: 18,
                    color: '#f44336'
                }}>
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#f6f5f3' }}>
            <MenuBar
                user={user}
                setUser={setUser}
                setShowLogin={setShowLogin}
                setShowCart={setShowCart}
                setPage={() => { }}
            />

            <div style={{
                maxWidth: 800,
                margin: '40px auto',
                padding: '0 20px'
            }}>
                {/* Header */}
                <div style={{
                    background: '#fff',
                    borderRadius: 16,
                    padding: 32,
                    marginBottom: 24,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 16
                    }}>
                        <h1 style={{
                            color: '#b8860b',
                            fontWeight: 700,
                            fontSize: 28,
                            margin: 0
                        }}>
                            Trạng thái đơn hàng
                        </h1>
                        <div style={{
                            background: '#f0e6d3',
                            padding: '8px 16px',
                            borderRadius: 20,
                            fontSize: 14,
                            fontWeight: 600,
                            color: '#b8860b'
                        }}>
                            {order.orderNumber}
                        </div>
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        marginBottom: 8
                    }}>
                        <span style={{ fontSize: 24 }}>
                            {getStatusIcon(order.orderStatus)}
                        </span>
                        <span style={{
                            fontSize: 20,
                            fontWeight: 600,
                            color: getStatusColor(order.orderStatus)
                        }}>
                            {order.orderStatus}
                        </span>
                    </div>

                    <div style={{ color: '#666', fontSize: 14 }}>
                        Đặt hàng lúc: {new Date(order.createdAt).toLocaleString('vi-VN')}
                    </div>
                </div>

                {/* Thông tin khách hàng */}
                <div style={{
                    background: '#fff',
                    borderRadius: 16,
                    padding: 24,
                    marginBottom: 24,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}>
                    <h3 style={{
                        color: '#333',
                        fontWeight: 600,
                        marginBottom: 16,
                        fontSize: 18
                    }}>
                        Thông tin giao hàng
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#666' }}>Tên khách hàng:</span>
                            <span style={{ fontWeight: 600 }}>{order.customerName}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#666' }}>Số điện thoại:</span>
                            <span style={{ fontWeight: 600 }}>{order.phone}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#666' }}>Địa chỉ:</span>
                            <span style={{ fontWeight: 600 }}>{order.address}</span>
                        </div>
                    </div>
                </div>

                {/* Sản phẩm đã đặt */}
                <div style={{
                    background: '#fff',
                    borderRadius: 16,
                    padding: 24,
                    marginBottom: 24,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}>
                    <h3 style={{
                        color: '#333',
                        fontWeight: 600,
                        marginBottom: 16,
                        fontSize: 18
                    }}>
                        Sản phẩm đã đặt
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {order.items && Array.isArray(order.items) && order.items.length > 0 ? (
                            order.items.map((item, index) => (
                                <div key={index} style={{
                                    display: 'flex',
                                    gap: 16,
                                    padding: '16px 0',
                                    borderBottom: order.items && index < order.items.length - 1 ? '1px solid #eee' : 'none'
                                }}>
                                    <div style={{
                                        width: 60,
                                        height: 60,
                                        background: '#f8f8f8',
                                        borderRadius: 8,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: 24,
                                        overflow: 'hidden'
                                    }}>
                                        {item.productImage ? (
                                            <img
                                                src={item.productImage}
                                                alt={item.productName}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        ) : (
                                            '🍵'
                                        )}
                                    </div>

                                    <div style={{ flex: 1 }}>
                                        <div style={{
                                            fontWeight: 600,
                                            fontSize: 16,
                                            marginBottom: 4
                                        }}>
                                            {item.productName}
                                        </div>
                                        <div style={{
                                            fontSize: 14,
                                            color: '#666',
                                            marginBottom: 4
                                        }}>
                                            {item.options?.size ? `${item.options.size} | ` : ''}
                                            {item.options?.type ? `${item.options.type === 'lanh' ? 'Lạnh' : 'Nóng'} | ` : ''}
                                            {item.options?.sugar ? `${item.options.sugar}` : ''}
                                        </div>
                                        {item.options?.toppings && item.options.toppings.length > 0 && (
                                            <div style={{
                                                fontSize: 13,
                                                color: '#b8860b'
                                            }}>
                                                Topping: {item.options.toppings.join(', ')}
                                            </div>
                                        )}
                                    </div>

                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{
                                            fontWeight: 600,
                                            color: '#b8860b',
                                            fontSize: 16
                                        }}>
                                            {item.price.toLocaleString()}đ
                                        </div>
                                        <div style={{
                                            fontSize: 14,
                                            color: '#666'
                                        }}>
                                            x{item.quantity}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{
                                textAlign: 'center',
                                padding: '20px',
                                color: '#666',
                                fontSize: '16px'
                            }}>
                                Không có thông tin sản phẩm
                            </div>
                        )}
                    </div>
                </div>

                {/* Thông tin thanh toán */}
                <div style={{
                    background: '#fff',
                    borderRadius: 16,
                    padding: 24,
                    marginBottom: 24,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}>
                    <h3 style={{
                        color: '#333',
                        fontWeight: 600,
                        marginBottom: 16,
                        fontSize: 18
                    }}>
                        Thông tin thanh toán
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#666' }}>Phương thức thanh toán:</span>
                            <span style={{ fontWeight: 600 }}>{order.paymentMethod}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#666' }}>Trạng thái thanh toán:</span>
                            <span style={{
                                fontWeight: 600,
                                color: order.paymentStatus === 'Đã thanh toán' ? '#4CAF50' : '#FF9800'
                            }}>
                                {order.paymentStatus}
                            </span>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            paddingTop: 12,
                            borderTop: '1px solid #eee',
                            fontSize: 18,
                            fontWeight: 700,
                            color: '#b8860b'
                        }}>
                            <span>Tổng cộng:</span>
                            <span>{order.totalAmount.toLocaleString()}đ</span>
                        </div>
                    </div>
                </div>

                {/* Thời gian dự kiến */}
                <div style={{
                    background: '#e8f5e8',
                    borderRadius: 16,
                    padding: 24,
                    marginBottom: 24,
                    border: '1px solid #4CAF50'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        marginBottom: 8
                    }}>
                        <span style={{ fontSize: 24 }}>⏰</span>
                        <span style={{
                            fontSize: 18,
                            fontWeight: 600,
                            color: '#2e7d32'
                        }}>
                            Thời gian dự kiến giao hàng
                        </span>
                    </div>
                    <div style={{
                        fontSize: 16,
                        color: '#2e7d32',
                        fontWeight: 600
                    }}>
                        {new Date(order.estimatedDelivery).toLocaleString('vi-VN')}
                    </div>
                </div>

                {/* Nút hành động */}
                <div style={{
                    display: 'flex',
                    gap: 16,
                    justifyContent: 'center'
                }}>
                    <button
                        onClick={() => navigate('/')}
                        style={{
                            padding: '12px 24px',
                            background: '#b8860b',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 8,
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontSize: 16
                        }}
                    >
                        Về trang chủ
                    </button>
                    <button
                        onClick={() => navigate('/menu')}
                        style={{
                            padding: '12px 24px',
                            background: '#fff',
                            color: '#b8860b',
                            border: '2px solid #b8860b',
                            borderRadius: 8,
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontSize: 16
                        }}
                    >
                        Đặt thêm
                    </button>
                </div>
            </div>

            {/* Modals */}
            {showLogin && (
                <LoginModal
                    onClose={() => setShowLogin(false)}
                    onLogin={(userData) => {
                        setUser(userData);
                        setShowLogin(false);
                    }}
                />
            )}

            {showCart && (
                <CartModal
                    onClose={() => setShowCart(false)}
                    user={user}
                />
            )}
        </div>
    );
} 