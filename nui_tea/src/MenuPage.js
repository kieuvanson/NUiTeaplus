import React, { useEffect, useState, useRef } from 'react';
import MenuBar from './components/MenuBar';
import LoginModal from './components/LoginModal';
import CartModal from './components/CartModal';
import ProductOptionModal from './components/ProductOptionModal';
import { useCart } from './contexts/CartContext';

function MenuPage() {
    const [user, setUser] = useState(() => {
        const u = localStorage.getItem('nui_tea_user');
        return u ? JSON.parse(u) : null;
    });
    const [page, setPage] = useState('menu');
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showForgot, setShowForgot] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [showProductOption, setShowProductOption] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [search, setSearch] = useState('');
    const promoRef = useRef(null);
    const contactRef = useRef(null);
    const { addItem } = useCart();

    useEffect(() => {
        fetch('http://localhost:5249/api/productcategories')
            .then(res => res.json())
            .then(data => setCategories(data));
        fetch('http://localhost:5249/api/products')
            .then(res => res.json())
            .then(data => {
                console.log('Products loaded:', data);
                console.log('Products with isSoldOut = true:', data.filter(p => p.isSoldOut === true));
                console.log('Products with isSoldOut = false:', data.filter(p => p.isSoldOut === false));
                setProducts(data);
            });
    }, []);

    // Lọc sản phẩm theo category và search
    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === 'all' || product.categoryId === selectedCategory;
        const matchesSearch = !search || product.name.toLowerCase().includes(search.toLowerCase());
        // Hiển thị tất cả sản phẩm, không lọc bỏ sản phẩm hết hàng
        console.log(`Product ${product.name}: categoryId=${product.categoryId}, selectedCategory=${selectedCategory}, isSoldOut=${product.isSoldOut}, matchesCategory=${matchesCategory}`);
        return matchesCategory && matchesSearch;
    });

    // Gom sản phẩm theo category
    const groupProductsByCategory = () => {
        let grouped = {};
        filteredProducts.forEach(p => {
            // Nếu đang lọc theo category thì chỉ lấy category đó
            if (selectedCategory !== 'all' && (p.categoryId !== selectedCategory && p.category?.id !== selectedCategory)) return;
            // Nếu đang search thì chỉ lấy sản phẩm phù hợp
            if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return;
            const catId = p.categoryId || (p.category && p.category.id) || 'Khác';
            const catName = (categories.find(c => c.id === catId)?.name) || 'Khác';
            if (!grouped[catName]) grouped[catName] = [];
            grouped[catName].push(p);
        });
        return grouped;
    };
    const groupedProducts = groupProductsByCategory();

    // Hàm scroll cho MenuBar
    const handleMenuScroll = (section) => {
        if (section === 'promo' && promoRef.current) {
            promoRef.current.scrollIntoView({ behavior: 'smooth' });
        } else if (section === 'contact' && contactRef.current) {
            contactRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#fdf6ea' }}>
            <MenuBar user={user} setUser={setUser} setPage={setPage} onMenuScroll={handleMenuScroll} setShowLogin={setShowLogin} setShowCart={setShowCart} />
            <div style={{ maxWidth: 1400, margin: '0 auto', padding: '40px 0', display: 'flex', gap: 40 }}>
                {/* Sidebar danh mục */}
                <aside style={{ width: 250, alignSelf: 'flex-start', position: 'sticky', top: 120 }}>
                    <div style={{ background: '#fff', borderRadius: 22, boxShadow: '0 4px 24px #b8860b22', padding: 32, minHeight: 220 }}>
                        <div style={{ fontWeight: 800, fontSize: 22, color: '#b8860b', marginBottom: 24, letterSpacing: 1 }}>DANH MỤC</div>
                        <div style={{ cursor: 'pointer', color: selectedCategory === 'all' ? '#b8860b' : '#7c4d03', fontWeight: selectedCategory === 'all' ? 800 : 500, marginBottom: 18, fontSize: 18, transition: 'color 0.2s', paddingBottom: 8, borderBottom: '1px solid #e0e0e0' }} onClick={() => setSelectedCategory('all')}>Tất cả</div>
                        {categories.map(cat => (
                            <div
                                key={cat.id}
                                style={{ cursor: 'pointer', color: selectedCategory === cat.id ? '#b8860b' : '#7c4d03', fontWeight: selectedCategory === cat.id ? 800 : 500, marginBottom: 18, fontSize: 18, transition: 'color 0.2s', paddingBottom: 8, borderBottom: '1px solid #e0e0e0' }}
                                onClick={() => setSelectedCategory(cat.id)}
                            >
                                {cat.name}
                            </div>
                        ))}
                    </div>
                </aside>
                {/* Khu vực sản phẩm */}
                <main style={{ flex: 1, minWidth: 0, paddingTop: 50 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 36 }}>
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Tìm kiếm sản phẩm..."
                            style={{ flex: 1, padding: 16, borderRadius: 14, border: '2px solid #e0c9a6', fontSize: 19, boxShadow: '0 2px 8px #b8860b11' }}
                        />
                    </div>
                    {/* Hiển thị từng nhóm sản phẩm theo loại */}
                    {Object.keys(groupedProducts).length === 0 && (
                        <div style={{ textAlign: 'center', color: '#b8860b', fontWeight: 700, marginTop: 60, fontSize: 22 }}>Không có sản phẩm nào phù hợp.</div>
                    )}
                    {Object.entries(groupedProducts).map(([catName, prods]) => (
                        <section key={catName} style={{ marginBottom: 48 }}>
                            <h2 style={{ color: '#b8860b', fontWeight: 900, fontSize: 26, marginBottom: 24, letterSpacing: 1, textShadow: '0 2px 8px #b8860b11' }}>{catName}</h2>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                                gap: 36,
                                justifyItems: 'center',
                            }}>
                                {prods.map(product => (
                                    <div
                                        key={product.id}
                                        style={{
                                            background: '#fff',
                                            borderRadius: 22,
                                            boxShadow: '0 6px 32px #b8860b22',
                                            padding: 28,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            position: 'relative',
                                            minHeight: 340,
                                            width: '100%',
                                            maxWidth: 320,
                                            transition: 'transform 0.18s, box-shadow 0.18s',
                                            cursor: 'pointer',
                                        }}
                                        onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-6px) scale(1.03)'; e.currentTarget.style.boxShadow = '0 12px 40px #b8860b33'; }}
                                        onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 6px 32px #b8860b22'; }}
                                    >
                                        {product.isBestSeller && <div style={{ position: 'absolute', top: 16, left: 16, background: '#ff9800', color: '#fff', fontWeight: 700, borderRadius: 10, padding: '3px 14px', fontSize: 15, boxShadow: '0 2px 8px #ff980033' }}>Best Seller</div>}
                                        {product.isSoldOut && (
                                            <div style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                background: 'rgba(0,0,0,0.3)',
                                                borderRadius: 22,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                zIndex: 10
                                            }}>
                                                <div style={{
                                                    background: '#e74c3c',
                                                    color: '#fff',
                                                    fontWeight: 800,
                                                    borderRadius: 12,
                                                    padding: '8px 20px',
                                                    fontSize: 18,
                                                    boxShadow: '0 2px 8px rgba(231, 76, 60, 0.3)',
                                                    transform: 'rotate(-8deg)',
                                                    letterSpacing: 1
                                                }}>
                                                    HẾT HÀNG
                                                </div>
                                            </div>
                                        )}
                                        <img src={product.image} alt={product.name} style={{ width: 140, height: 140, objectFit: 'cover', borderRadius: 16, marginBottom: 18, boxShadow: '0 2px 12px #b8860b22' }} />
                                        <div style={{ fontWeight: 800, fontSize: 20, color: '#7c4d03', textAlign: 'center', marginBottom: 8 }}>{product.name}</div>
                                        <div style={{ color: '#666', fontSize: 14, textAlign: 'center', marginBottom: 8, lineHeight: 1.4, minHeight: 40 }}>{product.description}</div>
                                        <div style={{ color: '#b8860b', fontWeight: 800, fontSize: 18, marginBottom: 12 }}>{product.price?.toLocaleString()}đ</div>
                                        <button
                                            style={{
                                                background: product.isSoldOut ? '#ccc' : 'linear-gradient(90deg,#b8860b,#e5d3b3)',
                                                color: product.isSoldOut ? '#666' : '#fff',
                                                border: 'none',
                                                borderRadius: 12,
                                                padding: '13px 0',
                                                fontWeight: 600,
                                                fontSize: 18,
                                                width: '100%',
                                                marginTop: 10,
                                                cursor: product.isSoldOut ? 'not-allowed' : 'pointer',
                                                boxShadow: '0 2px 8px #b8860b33',
                                                letterSpacing: 1,
                                                transition: 'background 0.18s, box-shadow 0.18s',
                                                fontFamily: 'Segoe UI, Arial, sans-serif',
                                            }}
                                            disabled={product.isSoldOut}
                                            onMouseOver={e => {
                                                if (!product.isSoldOut) {
                                                    e.currentTarget.style.background = '#b8860b';
                                                    e.currentTarget.style.boxShadow = '0 4px 18px #b8860b33';
                                                }
                                            }}
                                            onMouseOut={e => {
                                                if (!product.isSoldOut) {
                                                    e.currentTarget.style.background = 'linear-gradient(90deg,#b8860b,#e5d3b3)';
                                                    e.currentTarget.style.boxShadow = '0 2px 8px #b8860b33';
                                                }
                                            }}
                                            onClick={() => {
                                                if (!product.isSoldOut) {
                                                    console.log('Selected product:', product);
                                                    console.log('Product category:', product.category);
                                                    setSelectedProduct(product);
                                                    setShowProductOption(true);
                                                }
                                            }}
                                        >
                                            {product.isSoldOut ? 'Hết hàng' : 'Đặt ngay'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </main>
            </div>
            {showLogin && <LoginModal onClose={() => setShowLogin(false)} onRegister={() => { setShowLogin(false); setShowRegister(true); }} onForgot={() => { setShowLogin(false); setShowForgot(true); }} onLoginSuccess={(data) => { setUser(normalizeUser(data)); localStorage.setItem('nui_tea_user', JSON.stringify(normalizeUser(data))); setShowLogin(false); }} />}
            {showRegister && <RegisterModal onClose={() => { setShowRegister(false); setShowLogin(true); }} onLogin={() => { setShowRegister(false); setShowLogin(true); }} />}
            {showForgot && <ForgotModal onClose={() => setShowForgot(false)} onLogin={() => { setShowForgot(false); setShowLogin(true); }} />}
            <CartModal isOpen={showCart} onClose={() => setShowCart(false)} user={user} />
            {showProductOption && selectedProduct && (
                <ProductOptionModal
                    product={selectedProduct}
                    open={showProductOption}
                    onClose={() => {
                        console.log('Closing modal');
                        setShowProductOption(false);
                        setSelectedProduct(null);
                    }}
                    onConfirm={(productWithOptions) => {
                        console.log('Confirming product with options:', productWithOptions);
                        // Thêm vào giỏ hàng sử dụng CartContext
                        addItem(productWithOptions);

                        // Đóng modal
                        setShowProductOption(false);
                        setSelectedProduct(null);

                        // Hiển thị thông báo thành công
                        alert('Đã thêm vào giỏ hàng!');
                    }}
                />
            )}
        </div>
    );
}

// Hàm normalizeUser từ App.js
function normalizeUser(u) {
    return {
        id: u.id || u.Id,
        email: u.email || u.Email,
        FullName: u.FullName || u.fullName || '',
        Username: u.Username || u.username || '',
        Phone: u.Phone || u.phone || '',
        Address: u.Address || u.address || '',
    };
}

// RegisterModal component
function RegisterModal({ onClose, onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirm) {
            setError('Mật khẩu xác nhận không khớp!');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const res = await fetch('http://localhost:5249/api/customers/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    password,
                    fullName: email,
                    username: email.split('@')[0],
                }),
            });
            const data = await res.json();
            if (res.ok) {
                setSuccess('Đăng ký thành công! Bạn có thể đăng nhập.');
            } else {
                setError(data.message || 'Đăng ký thất bại!');
            }
        } catch (err) {
            setError('Lỗi kết nối server!');
        }
        setLoading(false);
    };

    return (
        <div className="login-modal-overlay">
            <div className="login-modal">
                <button className="login-modal-close" onClick={onClose}>&times;</button>
                <h2>Đăng ký tài khoản</h2>
                <form className="login-form" onSubmit={handleRegister}>
                    <label>Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Nhập email" required />
                    <label>Mật khẩu</label>
                    <div className="login-password-row">
                        <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Nhập mật khẩu" required />
                        <button type="button" className="show-hide-btn" onClick={() => setShowPassword(v => !v)}>{showPassword ? 'Ẩn' : 'Hiện'}</button>
                    </div>
                    <label>Xác nhận mật khẩu</label>
                    <input type={showPassword ? 'text' : 'password'} value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Nhập lại mật khẩu" required />
                    <button type="submit" className="login-btn" disabled={loading}>{loading ? 'Đang đăng ký...' : 'Đăng ký'}</button>
                </form>
                {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
                {success && <div style={{ color: 'green', marginTop: 8 }}>{success}</div>}
                <div className="login-modal-footer">
                    <span>Đã có tài khoản? <a href="#" onClick={e => { e.preventDefault(); onLogin(); }}>Đăng nhập</a></span>
                </div>
            </div>
        </div>
    );
}

// ForgotModal component
function ForgotModal({ onClose, onLogin }) {
    const [email, setEmail] = useState('');
    return (
        <div className="login-modal-overlay">
            <div className="login-modal">
                <button className="login-modal-close" onClick={onClose}>&times;</button>
                <h2>Quên mật khẩu</h2>
                <form className="login-form" onSubmit={e => { e.preventDefault(); /* TODO: handle forgot */ }}>
                    <label>Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Nhập email đã đăng ký" required />
                    <button type="submit" className="login-btn">Gửi yêu cầu</button>
                </form>
                <div className="login-modal-footer">
                    <span>Đã nhớ mật khẩu? <a href="#" onClick={e => { e.preventDefault(); onLogin(); }}>Đăng nhập</a></span>
                </div>
            </div>
        </div>
    );
}

export default MenuPage; 