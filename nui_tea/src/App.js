import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import './App.css';
import './components/Cart.css';
import About from './About';
import MenuBar from './components/MenuBar';
// Đã xóa: import Banner from './Banner';
import ContactSection from './ContactSection';
import { CartProvider } from './contexts/CartContext';
import CartIcon from './components/CartIcon';
import CartModal from './components/CartModal';
import ProductCard from './components/ProductCard';
import CheckoutPage from './CheckoutPage';
import LoginModal from './components/LoginModal';
import FeaturedProducts from './components/FeaturedProducts';
import AdminEditProductModal from './components/AdminEditProductModal';
import DeleteProductModal from './components/DeleteProductModal';
import MenuPage from './MenuPage';
import OrderStatusPage from './OrderStatusPage';
import AdminOrderManagement from './components/AdminOrderManagement';

const bannerImage = 'https://tocotocotea.com/wp-content/uploads/2025/06/banner-web.jpg';

// --- MenuBar component ---
// Đã xóa: function MenuBar({ user, setUser, setPage, onMenuScroll, setShowLogin, setShowCart }) {
// Đã xóa:   const [userMenuOpen, setUserMenuOpen] = useState(false);
// Đã xóa:   const navigate = useNavigate();
// Đã xóa:   return (
// Đã xóa:     <nav className="menu-bar-modern">
// Đã xóa:       <div className="menu-bar-logo" onClick={() => { setPage('home'); navigate('/'); }} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
// Đã xóa:         <svg width="36" height="36" viewBox="0 0 48 48" fill="none" style={{ marginRight: 6 }}>
// Đã xóa:           <rect x="8" y="8" width="32" height="32" rx="16" fill="url(#grad1)" />
// Đã xóa:           <path d="M24 12 C28 12, 32 16, 32 20 C32 24, 28 28, 24 28 C20 28, 16 24, 16 20 C16 16, 20 12, 24 12 Z" fill="#8B4513" />
// Đã xóa:           <path d="M24 14 C26 14, 28 16, 28 18 C28 20, 26 22, 24 22 C22 22, 20 20, 20 18 C20 16, 22 14, 24 14 Z" fill="#A0522D" />
// Đã xóa:           <rect x="23" y="28" width="2" height="6" rx="1" fill="#654321" />
// Đã xóa:           <path d="M12 32 L20 24 L28 32 L36 24 L36 40 L12 40 Z" fill="#8B4513" opacity="0.7" />
// Đã xóa:           <path d="M16 36 L22 30 L28 36 L32 30 L32 40 L16 40 Z" fill="#A0522D" opacity="0.8" />
// Đã xóa:           <defs>
// Đã xóa:             <linearGradient id="grad1" x1="8" y1="8" x2="40" y2="40" gradientUnits="userSpaceOnUse">
// Đã xóa:               <stop stopColor="#D2B48C" />
// Đã xóa:               <stop offset="1" stopColor="#F5DEB3" />
// Đã xóa:             </linearGradient>
// Đã xóa:           </defs>
// Đã xóa:         </svg>
// Đã xóa:         <span className="menu-bar-logo-text" style={{ fontFamily: 'Dancing Script, Segoe UI, Roboto, cursive, sans-serif', fontSize: '2.1rem', fontWeight: 'bold', background: 'linear-gradient(90deg, #b48c5a 60%, #fff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'flex', alignItems: 'center' }}>nui_tea</span>
// Đã xóa:       </div>
// Đã xóa:       <ul className="menu-bar-list">
// Đã xóa:         <li onClick={() => { setPage('home'); navigate('/'); }}>Trang chủ</li>
// Đã xóa:         <li onClick={() => navigate('/menu')}>Thực đơn</li>
// Đã xóa:         <li onClick={() => { setPage('about'); navigate('/about'); }}>Giới thiệu</li>
// Đã xóa:         <li onClick={() => onMenuScroll && onMenuScroll('promo')}>Khuyến mãi</li>
// Đã xóa:         <li onClick={() => onMenuScroll && onMenuScroll('contact')}>Liên hệ</li>
// Đã xóa:       </ul>
// Đã xóa:       <div className="menu-bar-user" style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '16px' }}>
// Đã xóa:         <CartIcon onClick={() => setShowCart && setShowCart(true)} />
// Đã xóa:         {user ? (
// Đã xóa:           <>
// Đã xóa:             <div onClick={() => setUserMenuOpen(v => !v)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
// Đã xóa:               <svg width="28" height="28" viewBox="0 0 24 24" fill="#b48c5a"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 8-4 8-4s8 0 8 4" /></svg>
// Đã xóa:               <span style={{ fontWeight: 600 }}>{user.FullName || user.Username || user.email}</span>
// Đã xóa:             </div>
// Đã xóa:             {userMenuOpen && (
// Đã xóa:               <div style={{ position: 'absolute', right: 0, top: 36, background: '#fff', border: '1px solid #eee', borderRadius: 10, boxShadow: '0 4px 24px #b8860b22', minWidth: 160, zIndex: 100 }}>
// Đã xóa:                 <div style={{ padding: 12, borderBottom: '1px solid #eee', fontWeight: 600 }}>{user.email}</div>
// Đã xóa:                 <div style={{ padding: 12, cursor: 'pointer' }} onClick={() => { setUser(null); localStorage.removeItem('nui_tea_user'); setUserMenuOpen(false); }}>Đăng xuất</div>
// Đã xóa:               </div>
// Đã xóa:             )}
// Đã xóa:           </>
// Đã xóa:         ) : (
// Đã xóa:           <button onClick={() => setShowLogin && setShowLogin(true)} style={{ background: 'linear-gradient(90deg,#b8860b,#e5d3b3)', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Đăng nhập</button>
// Đã xóa:         )}
// Đã xóa:       </div>
// Đã xóa:     </nav>
// Đã xóa:   );
// Đã xóa: }

// --- Banner component ---
function Banner({ bannerImage }) {
  return (
    <div className="banner" style={{ height: '120vh', minHeight: '700px', position: 'relative' }}>
      <img src={bannerImage} alt="Banner" className="banner-img" />
      <div className="banner-content">
        <h1>Chào mừng đến với Nui Tea!</h1>
        <p>Trà sữa tự nhiên, phục vụ tận tâm.</p>
      </div>
    </div>
  );
}

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

function AboutPage({ setScrollToSection }) {
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('nui_tea_user');
    return u ? JSON.parse(u) : null;
  });
  const [page, setPage] = useState('about');
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  // Truyền hàm onMenuScroll để chuyển về trang chủ và setScrollToSection
  const handleMenuScroll = (section) => {
    setScrollToSection(section);
    navigate('/');
  };

  return (
    <div className="main-content">
      <MenuBar user={user} setUser={setUser} setPage={setPage} onMenuScroll={handleMenuScroll} setShowCart={setShowCart} />
      <About />
      <Footer />
      <CartModal isOpen={showCart} onClose={() => setShowCart(false)} user={user} />
    </div>
  );
}

function HomePage({ scrollToSection, setScrollToSection }) {
  // Copy toàn bộ phần return cũ của App (menu bar, banner, main content, footer, modal) vào đây
  // Hiệu ứng động cho section giới thiệu
  const introRef = useRef(null);
  useEffect(() => {
    const section = introRef.current;
    if (!section) return;
    const icon = section.querySelector('.intro-icon');
    const title = section.querySelector('.intro-title');
    const divider = section.querySelector('.intro-divider');
    const desc = section.querySelector('.intro-desc');
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          icon.classList.add('animate-fadein');
          title.classList.add('animate-fadein');
          divider.classList.add('animate-underline');
          desc.classList.add('animate-fadein-delay');
        } else {
          icon.classList.remove('animate-fadein');
          title.classList.remove('animate-fadein');
          divider.classList.remove('animate-underline');
          desc.classList.remove('animate-fadein-delay');
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const [isCheckout, setIsCheckout] = useState(false);
  const promoRef = useRef(null);
  const contactRef = useRef(null);
  const [page, setPage] = useState('home');
  const scrollTargetRef = useRef(null); // Lưu ref cần scroll sau khi chuyển trang
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('nui_tea_user');
    return u ? JSON.parse(u) : null;
  });
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Scroll đến section khi page đổi về home
  useEffect(() => {
    if (page === 'home' && scrollTargetRef.current) {
      const ref = scrollTargetRef.current;
      setTimeout(() => {
        if (ref.current) {
          ref.current.scrollIntoView({ behavior: 'smooth' });
        }
        scrollTargetRef.current = null;
      }, 100); // delay để đảm bảo render xong
    }
  }, [page]);

  // Đóng menu khi click ngoài
  useEffect(() => {
    if (!userMenuOpen) return;
    const handleClick = (e) => {
      if (!e.target.closest('.menu-bar-user')) setUserMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [userMenuOpen]);

  useEffect(() => {
    if (scrollToSection === 'promo' && promoRef.current) {
      promoRef.current.scrollIntoView({ behavior: 'smooth' });
      setScrollToSection(null);
    } else if (scrollToSection === 'contact' && contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
      setScrollToSection(null);
    }
  }, [scrollToSection, setScrollToSection]);

  const handleMenuScroll = (section) => {
    if (section === 'promo' && promoRef.current) {
      promoRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'contact' && contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className="main-content">
      <MenuBar user={user} setUser={setUser} setPage={setPage} onMenuScroll={handleMenuScroll} setShowLogin={setShowLogin} setShowCart={setShowCart} />
      <Banner bannerImage={bannerImage} />
      <ProductSection />
      <PromotionsSection promoRef={promoRef} />
      <div className="banner-secondary" style={{ width: '100vw', position: 'relative', left: '50%', transform: 'translateX(-50%)', margin: '40px 0 0 0', textAlign: 'center' }}>
        <img src="https://tocotocotea.com.vn/wp-content/uploads/2021/12/slideshow1_2.jpg" alt="Banner ưu đãi" style={{ width: '100vw', maxWidth: '100vw', borderRadius: 18, boxShadow: '0 4px 32px #b8860b22', display: 'block' }} />
      </div>
      {/* Đã bỏ <About /> khỏi trang chủ */}
      <ContactSection contactRef={contactRef} />
      <Footer />
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onRegister={() => { setShowLogin(false); setShowRegister(true); }} onForgot={() => { setShowLogin(false); setShowForgot(true); }} onLoginSuccess={(data) => { setUser(normalizeUser(data)); localStorage.setItem('nui_tea_user', JSON.stringify(normalizeUser(data))); setShowLogin(false); }} />}
      {showRegister && <RegisterModal onClose={() => { setShowRegister(false); setShowLogin(true); }} onLogin={() => { setShowRegister(false); setShowLogin(true); }} />}
      {showForgot && <ForgotModal onClose={() => setShowForgot(false)} onLogin={() => { setShowForgot(false); setShowLogin(true); }} />}
      <CartModal isOpen={showCart} onClose={() => setShowCart(false)} user={user} />
    </div>
  );
}

function LoginPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#faf8f3' }}>
      <div style={{ background: '#fff', padding: 40, borderRadius: 16, boxShadow: '0 4px 24px #b8860b22', minWidth: 320 }}>
        <LoginModal />
      </div>
    </div>
  );
}

function AdminPage() {
  const [tab, setTab] = React.useState('products');
  const menu = [
    { key: 'products', label: 'Quản lý sản phẩm', icon: '📦' },
    { key: 'orders', label: 'Quản lý đơn hàng', icon: '🧾' },
    { key: 'accounts', label: 'Quản lý tài khoản', icon: '👤' },
    { key: 'materials', label: 'Nguyên vật liệu', icon: '🥛' },
    { key: 'income', label: 'Thống kê thu nhập', icon: '💰' },
    { key: 'expense', label: 'Thống kê chi phí', icon: '📉' },
  ];
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('nui_tea_user');
    navigate('/login');
  };
  const handleGoHome = () => {
    navigate('/');
  };
  // State cho sản phẩm
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(null);

  // State cho tài khoản
  const [accounts, setAccounts] = useState([]);
  const [accountsLoading, setAccountsLoading] = useState(false);
  const [accountsError, setAccountsError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showAccountDetail, setShowAccountDetail] = useState(false);

  // State cho nguyên vật liệu
  const [materials, setMaterials] = useState([]);
  const [materialsLoading, setMaterialsLoading] = useState(false);
  const [materialsError, setMaterialsError] = useState('');
  const [materialSearchTerm, setMaterialSearchTerm] = useState('');
  const [showAddMaterial, setShowAddMaterial] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [showMaterialDetail, setShowMaterialDetail] = useState(false);

  // Hàm toggle Sold Out
  const toggleSoldOut = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5249/api/products/${productId}/toggle-soldout`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (response.ok) {
        // Cập nhật lại danh sách sản phẩm
        setLoading(true);
        fetch('http://localhost:5249/api/products')
          .then(res => res.json())
          .then(data => {
            setProducts(data);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      } else {
        alert('Lỗi: ' + data.message);
      }
    } catch (error) {
      alert('Lỗi kết nối server!');
    }
  };

  // Hàm toggle trạng thái tài khoản
  const toggleAccountStatus = async (accountId) => {
    try {
      const response = await fetch(`http://localhost:5249/api/customers/${accountId}/toggle-status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (response.ok) {
        // Cập nhật lại danh sách tài khoản
        setAccountsLoading(true);
        fetch('http://localhost:5249/api/customers')
          .then(res => res.json())
          .then(data => {
            setAccounts(data);
            setAccountsLoading(false);
          })
          .catch(() => setAccountsLoading(false));
      } else {
        alert('Lỗi: ' + data.message);
      }
    } catch (error) {
      alert('Lỗi kết nối server!');
    }
  };

    // Hàm xóa tài khoản
  const deleteAccount = async (accountId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa tài khoản này?')) {
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:5249/api/customers/${accountId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (response.ok) {
        // Cập nhật lại danh sách tài khoản
        setAccountsLoading(true);
        fetch('http://localhost:5249/api/customers')
          .then(res => res.json())
          .then(data => {
            setAccounts(data);
            setAccountsLoading(false);
          })
          .catch(() => setAccountsLoading(false));
      } else {
        alert('Lỗi: ' + data.message);
      }
    } catch (error) {
      alert('Lỗi kết nối server!');
    }
  };

  // Hàm nhập kho nguyên vật liệu
  const importMaterial = async (materialId, quantity) => {
    try {
      const response = await fetch(`http://localhost:5249/api/materials/${materialId}/import`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity })
      });
      const data = await response.json();
      if (response.ok) {
        // Cập nhật lại danh sách nguyên vật liệu
        setMaterialsLoading(true);
        fetch('http://localhost:5249/api/materials')
          .then(res => res.json())
          .then(data => {
            setMaterials(data);
            setMaterialsLoading(false);
          })
          .catch(() => setMaterialsLoading(false));
      } else {
        alert('Lỗi: ' + data.message);
      }
    } catch (error) {
      alert('Lỗi kết nối server!');
    }
  };

  // Hàm xuất kho nguyên vật liệu
  const exportMaterial = async (materialId, quantity) => {
    try {
      const response = await fetch(`http://localhost:5249/api/materials/${materialId}/export`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity })
      });
      const data = await response.json();
      if (response.ok) {
        // Cập nhật lại danh sách nguyên vật liệu
        setMaterialsLoading(true);
        fetch('http://localhost:5249/api/materials')
          .then(res => res.json())
          .then(data => {
            setMaterials(data);
            setMaterialsLoading(false);
          })
          .catch(() => setMaterialsLoading(false));
      } else {
        alert('Lỗi: ' + data.message);
      }
    } catch (error) {
      alert('Lỗi kết nối server!');
    }
  };

  // Hàm xóa nguyên vật liệu
  const deleteMaterial = async (materialId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa nguyên vật liệu này?')) {
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:5249/api/materials/${materialId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (response.ok) {
        // Cập nhật lại danh sách nguyên vật liệu
        setMaterialsLoading(true);
        fetch('http://localhost:5249/api/materials')
          .then(res => res.json())
          .then(data => {
            setMaterials(data);
            setMaterialsLoading(false);
          })
          .catch(() => setMaterialsLoading(false));
      } else {
        alert('Lỗi: ' + data.message);
      }
    } catch (error) {
      alert('Lỗi kết nối server!');
    }
  };

  useEffect(() => {
    if (tab === 'products') {
      setLoading(true);
      fetch('http://localhost:5249/api/products')
        .then(res => res.json())
        .then(data => {
          setProducts(data);
          setLoading(false);
        })
        .catch(() => {
          setError('Không thể tải sản phẩm');
          setLoading(false);
        });
    } else if (tab === 'accounts') {
      setAccountsLoading(true);
      fetch('http://localhost:5249/api/customers')
        .then(res => res.json())
        .then(data => {
          setAccounts(data);
          setAccountsLoading(false);
        })
        .catch(() => {
          setAccountsError('Không thể tải danh sách tài khoản');
          setAccountsLoading(false);
        });
    } else if (tab === 'materials') {
      setMaterialsLoading(true);
      fetch('http://localhost:5249/api/materials')
        .then(res => res.json())
        .then(data => {
          setMaterials(data);
          setMaterialsLoading(false);
        })
        .catch(() => {
          setMaterialsError('Không thể tải danh sách nguyên vật liệu');
          setMaterialsLoading(false);
        });
    }
  }, [tab]);

  useEffect(() => {
    fetch('http://localhost:5249/api/productcategories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(() => setCategories([]));
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f6f5f3', fontFamily: 'Segoe UI, Montserrat, Arial, sans-serif' }}>
      {/* Header trên cùng */}
      <header style={{ width: '100%', height: 62, background: '#fff', boxShadow: '0 2px 12px #b8860b11', display: 'flex', alignItems: 'center', padding: '0 18px', position: 'sticky', top: 0, zIndex: 10, justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 44, color: '#b8860b', fontWeight: 700, marginRight: 10, lineHeight: 1 }}>🍵</span>
          <span style={{ fontSize: 30, fontWeight: 900, color: '#7c4d03', letterSpacing: 1, lineHeight: 1 }}>Nui Tea <span style={{ color: '#b8860b', fontWeight: 900 }}>Admin</span></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginRight: 24 }}>
          <button onClick={handleGoHome} style={{ background: 'none', border: 'none', color: '#b8860b', fontSize: 22, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8, transition: 'background 0.15s' }} title="Về trang người dùng" onMouseOver={e => e.currentTarget.style.background = '#fbeee6'} onMouseOut={e => e.currentTarget.style.background = 'none'}>
            <span role="img" aria-label="home">🏠</span> <span style={{ fontSize: 16, fontWeight: 700 }}>Trang khách</span>
          </button>
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#b8860b', fontSize: 22, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8, transition: 'background 0.15s' }} title="Đăng xuất" onMouseOver={e => e.currentTarget.style.background = '#fbeee6'} onMouseOut={e => e.currentTarget.style.background = 'none'}>
            <span role="img" aria-label="logout">🚪</span> <span style={{ fontSize: 16, fontWeight: 700 }}>Đăng xuất</span>
          </button>
        </div>
      </header>
      <div style={{ display: 'flex', flex: 1, minHeight: 'calc(100vh - 62px)' }}>
        {/* Sidebar */}
        <aside style={{
          width: 240,
          background: '#faf8f3',
          boxShadow: '2px 0 16px #b8860b08',
          padding: '32px 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          borderTopRightRadius: 24,
          borderBottomRightRadius: 24,
          minHeight: '100%',
        }}>
          <nav style={{ width: '100%', flex: 1 }}>
            {menu.map(item => (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                style={{
                  background: tab === item.key ? 'linear-gradient(90deg,#b8860b 80%,#e5d3b3 100%)' : 'none',
                  color: tab === item.key ? '#fff' : '#7c4d03',
                  border: 'none',
                  borderRadius: 10,
                  padding: '13px 20px',
                  margin: '0 18px 10px 18px',
                  fontWeight: 600,
                  fontSize: 16,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  cursor: 'pointer',
                  boxShadow: tab === item.key ? '0 2px 8px #b8860b22' : 'none',
                  transition: 'all 0.18s',
                  outline: 'none',
                  borderLeft: tab === item.key ? '4px solid #fff7e6' : '4px solid transparent',
                  fontFamily: 'inherit',
                  minHeight: 48,
                }}
                onMouseOver={e => { if (tab !== item.key) e.currentTarget.style.background = '#f3e9dd'; }}
                onMouseOut={e => { if (tab !== item.key) e.currentTarget.style.background = 'none'; }}
              >
                <span style={{ fontSize: 19 }}>{item.icon}</span> {item.label}
              </button>
            ))}
          </nav>
        </aside>
        {/* Main content */}
        <main style={{ flex: 1, padding: '38px 0 0 0', minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'transparent' }}>
          <div style={{ width: '100%', maxWidth: 900, background: '#fff', borderRadius: 18, boxShadow: '0 4px 32px #b8860b13', padding: '38px 38px 32px 38px', minHeight: 420, margin: '0 0 32px 0', fontFamily: 'inherit' }}>
            {tab === 'products' && (
              <div>
                {/* Header Section */}
                <div style={{
                  background: 'linear-gradient(135deg, #b8860b 0%, #e5d3b3 100%)',
                  borderRadius: 16,
                  padding: '24px 32px',
                  marginBottom: 24,
                  color: 'white',
                  boxShadow: '0 8px 32px rgba(184, 134, 11, 0.2)'
                }}>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: 1 }}>Quản lý sản phẩm</div>
                </div>
                  <div style={{ fontSize: 18, opacity: 0.9 }}>Thêm, sửa, xóa và quản lý thông tin sản phẩm trà sữa</div>
                </div>

                {/* Search and Filter Section */}
                <div style={{
                  background: '#fff',
                  borderRadius: 12,
                  padding: '20px 24px',
                  marginBottom: 24,
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #f0f0f0'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: '#333', margin: 0 }}>Danh sách sản phẩm</h3>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <div style={{ position: 'relative' }}>
                        <input
                          type="text"
                          placeholder="Tìm kiếm sản phẩm..."
                          style={{
                            padding: '10px 16px 10px 40px',
                            border: '2px solid #e0e0e0',
                            borderRadius: 8,
                            fontSize: 14,
                            width: 280,
                            outline: 'none',
                            transition: 'all 0.3s ease'
                          }}
                          onFocus={(e) => e.target.style.borderColor = '#b8860b'}
                          onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                        />
                        <span style={{
                          position: 'absolute',
                          left: 12,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: '#999',
                          fontSize: 16
                        }}>
                          🔍
                        </span>
                      </div>
                      <button
                        onClick={() => setShowAdd(true)}
                        style={{
                          background: 'linear-gradient(90deg, #b8860b, #e5d3b3)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 8,
                          padding: '10px 20px',
                          fontWeight: 600,
                          fontSize: 14,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
                        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                      >
                        + Thêm sản phẩm
                      </button>
                    </div>
                  </div>
                </div>
                {loading ? (
                  <div>Đang tải sản phẩm...</div>
                ) : error ? (
                  <div style={{ color: 'red' }}>{error}</div>
                ) : (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '20px',
                    padding: '10px 0'
                  }}>
                        {products.map((p, idx) => (
                      <div key={p.id} style={{
                        background: '#fff',
                        borderRadius: 16,
                        padding: 20,
                        boxShadow: '0 4px 20px rgba(184, 134, 11, 0.1)',
                        border: '1px solid #f3e9dd',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-4px)';
                          e.target.style.boxShadow = '0 8px 30px rgba(184, 134, 11, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 4px 20px rgba(184, 134, 11, 0.1)';
                        }}>

                        {/* Header với ảnh và trạng thái */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
                          <div style={{
                            width: 80,
                            height: 80,
                            borderRadius: 12,
                            overflow: 'hidden',
                            background: '#f8f8f8',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                          }}>
                            {p.image ? (
                              <img
                                src={p.image}
                                alt={p.name}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover'
                                }}
                              />
                            ) : (
                              <span style={{ fontSize: 32, color: '#b8860b' }}>🍵</span>
                            )}
                          </div>

                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'flex-start',
                              marginBottom: 8
                            }}>
                              <h3 style={{
                                margin: 0,
                                fontSize: 18,
                                fontWeight: 700,
                                color: '#333',
                                lineHeight: 1.3,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}>
                                {p.name}
                              </h3>
                              <span style={{
                                background: p.isSoldOut ? '#ff6b6b' : '#51cf66',
                                color: '#fff',
                                padding: '4px 8px',
                                borderRadius: 12,
                                fontSize: 11,
                                fontWeight: 600,
                                flexShrink: 0
                              }}>
                                {p.isSoldOut ? 'Hết hàng' : 'Còn hàng'}
                              </span>
                            </div>

                            <div style={{
                              color: '#b8860b',
                              fontSize: 20,
                              fontWeight: 800,
                              marginBottom: 4
                            }}>
                              {p.price?.toLocaleString()}đ
                            </div>

                            <div style={{
                              color: '#666',
                              fontSize: 14,
                              marginBottom: 8
                            }}>
                              {p.category?.name || 'Chưa phân loại'}
                            </div>
                          </div>
                        </div>

                        {/* Mô tả */}
                        <div style={{
                          color: '#555',
                          fontSize: 14,
                          lineHeight: 1.5,
                          marginBottom: 16,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {p.description || 'Chưa có mô tả'}
                        </div>

                        {/* Thao tác */}
                        <div style={{
                          display: 'flex',
                          gap: 12,
                          justifyContent: 'flex-end'
                        }}>
                          <button
                            onClick={() => toggleSoldOut(p.id)}
                            style={{
                              background: p.isSoldOut ? '#51cf66' : '#ff6b6b',
                              color: '#fff',
                              border: 'none',
                              borderRadius: 8,
                              padding: '8px 16px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              fontSize: 13,
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                            onMouseLeave={(e) => e.target.style.opacity = '1'}
                            title={p.isSoldOut ? 'Bật lại sản phẩm' : 'Đánh dấu hết hàng'}
                          >
                            {p.isSoldOut ? 'Bật lại' : 'Hết hàng'}
                          </button>

                          <button
                            onClick={() => {
                              console.log('Sửa sản phẩm:', p);
                              setEditProduct(p);
                              setShowEdit(true);
                            }}
                            style={{
                              background: '#e5d3b3',
                              color: '#7c4d03',
                              border: 'none',
                              borderRadius: 8,
                              padding: '8px 16px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              fontSize: 13,
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => e.target.style.background = '#d4c19f'}
                            onMouseLeave={(e) => e.target.style.background = '#e5d3b3'}
                          >
                            Sửa
                          </button>

                          <button
                            onClick={() => { setDeleteProduct(p); setShowDelete(true); }}
                            style={{
                              background: '#ffb4a2',
                              color: '#a52a2a',
                              border: 'none',
                              borderRadius: 8,
                              padding: '8px 16px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              fontSize: 13,
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => e.target.style.background = '#ff9b87'}
                            onMouseLeave={(e) => e.target.style.background = '#ffb4a2'}
                          >
                            Xóa
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <AdminAddProductModal open={showAdd} onClose={() => setShowAdd(false)} onSuccess={() => {
                  setShowAdd(false);
                  setLoading(true);
                  fetch('http://localhost:5249/api/products')
                    .then(res => res.json())
                    .then(data => {
                      setProducts(data);
                      setLoading(false);
                    })
                    .catch(() => {
                      setError('Không thể tải lại danh sách sản phẩm');
                      setLoading(false);
                    });
                }} />
              </div>
            )}
            {tab === 'orders' && (
              <div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#b8860b', marginBottom: 10, letterSpacing: 1 }}>Quản lý đơn hàng</div>
                <div style={{ color: '#7c4d03', fontSize: 16, marginBottom: 18 }}>Xem, duyệt, cập nhật trạng thái đơn hàng.</div>
                <AdminOrderManagement />
              </div>
            )}
            {tab === 'accounts' && (
              <div>
                {/* Header Section */}
                <div style={{
                  background: 'linear-gradient(135deg, #b8860b 0%, #e5d3b3 100%)',
                  borderRadius: 16,
                  padding: '24px 32px',
                  marginBottom: 24,
                  color: 'white',
                  boxShadow: '0 8px 32px rgba(184, 134, 11, 0.2)'
                }}>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: 1 }}>Quản lý tài khoản</div>
                  </div>
                  <div style={{ fontSize: 18, opacity: 0.9 }}>Xem, phân quyền, khóa/mở tài khoản người dùng</div>
                </div>

                {/* Search Section */}
                <div style={{
                  background: '#fff',
                  borderRadius: 12,
                  padding: '20px 24px',
                  marginBottom: 24,
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #f0f0f0'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: '#333', margin: 0 }}>Danh sách tài khoản</h3>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="text"
                        placeholder="Tìm kiếm tài khoản..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                          padding: '10px 16px 10px 40px',
                          border: '2px solid #e0e0e0',
                          borderRadius: 8,
                          fontSize: 14,
                          width: 280,
                          outline: 'none',
                          transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#b8860b'}
                        onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                      />
                      <span style={{
                        position: 'absolute',
                        left: 12,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#999',
                        fontSize: 16
                      }}>
                        🔍
                      </span>
                    </div>
                  </div>
                </div>

                {/* Accounts List */}
                {accountsLoading ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#b8860b', fontSize: 18 }}>Đang tải danh sách tài khoản...</div>
                ) : accountsError ? (
                  <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>{accountsError}</div>
                ) : (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
                    gap: '20px',
                    padding: '10px 0'
                  }}>
                    {accounts
                      .filter(account =>
                        account.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        account.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        account.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        account.phone?.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((account, idx) => (
                        <div key={account.id} style={{
                          background: '#fff',
                          borderRadius: 16,
                          padding: 20,
                          boxShadow: '0 4px 20px rgba(184, 134, 11, 0.1)',
                          border: '1px solid #f3e9dd',
                          transition: 'all 0.3s ease',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-4px)';
                            e.target.style.boxShadow = '0 8px 30px rgba(184, 134, 11, 0.2)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 20px rgba(184, 134, 11, 0.1)';
                          }}>

                          {/* Header với avatar và trạng thái */}
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
                            <div style={{
                              width: 60,
                              height: 60,
                              borderRadius: '50%',
                              overflow: 'hidden',
                              background: '#f8f8f8',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                            }}>
                              <span style={{ fontSize: 24, color: '#b8860b' }}>👤</span>
                            </div>

                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                marginBottom: 8
                              }}>
                                <h3 style={{
                                  margin: 0,
                                  fontSize: 18,
                                  fontWeight: 700,
                                  color: '#333',
                                  lineHeight: 1.3,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap'
                                }}>
                                  {account.fullName || account.username || 'Chưa có tên'}
                                </h3>
                                <span style={{
                                  background: account.isActive !== false ? '#51cf66' : '#ff6b6b',
                                  color: '#fff',
                                  padding: '4px 8px',
                                  borderRadius: 12,
                                  fontSize: 11,
                                  fontWeight: 600,
                                  flexShrink: 0
                                }}>
                                  {account.isActive !== false ? 'Hoạt động' : 'Đã khóa'}
                                </span>
                              </div>

                              <div style={{
                                color: '#666',
                                fontSize: 14,
                                marginBottom: 4
                              }}>
                                {account.email || 'Chưa có email'}
                              </div>

                              <div style={{
                                color: '#b8860b',
                                fontSize: 14,
                                fontWeight: 600,
                                marginBottom: 8
                              }}>
                                @{account.username} • {account.phone || 'Chưa có số điện thoại'}
                              </div>
                            </div>
                          </div>

                          {/* Thông tin chi tiết */}
                          <div style={{
                            background: '#faf8f3',
                            borderRadius: 8,
                            padding: 12,
                            marginBottom: 16
                          }}>
                            <div style={{
                              display: 'grid',
                              gridTemplateColumns: '1fr 1fr',
                              gap: 8,
                              fontSize: 13,
                              color: '#666'
                            }}>
                              <div>
                                <strong style={{ color: '#333' }}>ID:</strong> {account.id}
                              </div>
                              <div>
                                <strong style={{ color: '#333' }}>Ngày tạo:</strong> {new Date(account.createdAt || Date.now()).toLocaleDateString('vi-VN')}
                              </div>
                              <div>
                                <strong style={{ color: '#333' }}>Vai trò:</strong> {account.role || 'Khách hàng'}
                              </div>
                              <div>
                                <strong style={{ color: '#333' }}>Địa chỉ:</strong> {account.address || 'Chưa có'}
                              </div>
                            </div>
                          </div>

                          {/* Thao tác */}
                          <div style={{
                            display: 'flex',
                            gap: 12,
                            justifyContent: 'flex-end'
                          }}>
                            <button
                              onClick={() => toggleAccountStatus(account.id)}
                              style={{
                                background: account.isActive !== false ? '#ff6b6b' : '#51cf66',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 8,
                                padding: '8px 16px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                fontSize: 13,
                                transition: 'all 0.2s'
                              }}
                              onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                              onMouseLeave={(e) => e.target.style.opacity = '1'}
                              title={account.isActive !== false ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
                            >
                              {account.isActive !== false ? 'Khóa' : 'Mở khóa'}
                            </button>

                            <button
                              onClick={() => {
                                setSelectedAccount(account);
                                setShowAccountDetail(true);
                              }}
                              style={{
                                background: '#e5d3b3',
                                color: '#7c4d03',
                                border: 'none',
                                borderRadius: 8,
                                padding: '8px 16px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                fontSize: 13,
                                transition: 'all 0.2s'
                              }}
                              onMouseEnter={(e) => e.target.style.background = '#d4c19f'}
                              onMouseLeave={(e) => e.target.style.background = '#e5d3b3'}
                            >
                              Chi tiết
                            </button>

                            <button
                              onClick={() => deleteAccount(account.id)}
                              style={{
                                background: '#ffb4a2',
                                color: '#a52a2a',
                                border: 'none',
                                borderRadius: 8,
                                padding: '8px 16px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                fontSize: 13,
                                transition: 'all 0.2s'
                              }}
                              onMouseEnter={(e) => e.target.style.background = '#ff9b87'}
                              onMouseLeave={(e) => e.target.style.background = '#ffb4a2'}
                            >
                              Xóa
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}

                {/* Modal Chi tiết tài khoản */}
                {showAccountDetail && selectedAccount && (
                  <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                  }}>
                    <div style={{
                      background: '#fff',
                      borderRadius: 16,
                      padding: 32,
                      maxWidth: 500,
                      width: '90%',
                      maxHeight: '80vh',
                      overflow: 'auto',
                      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 24
                      }}>
                        <h2 style={{
                          fontSize: 24,
                          fontWeight: 700,
                          color: '#333',
                          margin: 0
                        }}>
                          Chi tiết tài khoản
                        </h2>
                        <button
                          onClick={() => setShowAccountDetail(false)}
                          style={{
                            background: 'none',
                            border: 'none',
                            fontSize: 24,
                            cursor: 'pointer',
                            color: '#999',
                            padding: 4
                          }}
                        >
                          ×
                        </button>
                      </div>

                      <div style={{ marginBottom: 20 }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 16,
                          marginBottom: 16
                        }}>
                          <div style={{
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            background: '#f8f8f8',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <span style={{ fontSize: 24, color: '#b8860b' }}>👤</span>
                          </div>
                          <div>
                            <h3 style={{
                              fontSize: 20,
                              fontWeight: 700,
                              color: '#333',
                              margin: '0 0 4px 0'
                            }}>
                              {selectedAccount.fullName || selectedAccount.username}
                            </h3>
                            <span style={{
                              background: selectedAccount.isActive !== false ? '#51cf66' : '#ff6b6b',
                              color: '#fff',
                              padding: '4px 8px',
                              borderRadius: 12,
                              fontSize: 12,
                              fontWeight: 600
                            }}>
                              {selectedAccount.isActive !== false ? 'Hoạt động' : 'Đã khóa'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div style={{
                        background: '#faf8f3',
                        borderRadius: 8,
                        padding: 16,
                        marginBottom: 20
                      }}>
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: 12,
                          fontSize: 14
                        }}>
                          <div><strong>ID:</strong> {selectedAccount.id}</div>
                          <div><strong>Username:</strong> @{selectedAccount.username}</div>
                          <div><strong>Email:</strong> {selectedAccount.email}</div>
                          <div><strong>Phone:</strong> {selectedAccount.phone || 'Chưa có'}</div>
                          <div><strong>Role:</strong> {selectedAccount.role}</div>
                          <div><strong>Ngày tạo:</strong> {new Date(selectedAccount.createdAt).toLocaleDateString('vi-VN')}</div>
                          <div><strong>Cập nhật:</strong> {new Date(selectedAccount.updatedAt).toLocaleDateString('vi-VN')}</div>
                          <div><strong>Địa chỉ:</strong> {selectedAccount.address || 'Chưa có'}</div>
                        </div>
                      </div>

                      <div style={{
                        display: 'flex',
                        gap: 12,
                        justifyContent: 'flex-end'
                      }}>
                        <button
                          onClick={() => {
                            toggleAccountStatus(selectedAccount.id);
                            setShowAccountDetail(false);
                          }}
                          style={{
                            background: selectedAccount.isActive !== false ? '#ff6b6b' : '#51cf66',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 8,
                            padding: '10px 20px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontSize: 14
                          }}
                        >
                          {selectedAccount.isActive !== false ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
                        </button>
                        <button
                          onClick={() => setShowAccountDetail(false)}
                          style={{
                            background: '#e5d3b3',
                            color: '#7c4d03',
                            border: 'none',
                            borderRadius: 8,
                            padding: '10px 20px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontSize: 14
                          }}
                        >
                          Đóng
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            {tab === 'materials' && (
              <div>
                {/* Header Section */}
                <div style={{
                  background: 'linear-gradient(135deg, #b8860b 0%, #e5d3b3 100%)',
                  borderRadius: 16,
                  padding: '24px 32px',
                  marginBottom: 24,
                  color: 'white',
                  boxShadow: '0 8px 32px rgba(184, 134, 11, 0.2)'
                }}>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: 1 }}>Quản lý nguyên vật liệu</div>
                  </div>
                  <div style={{ fontSize: 18, opacity: 0.9 }}>Quản lý kho, nhập/xuất nguyên vật liệu</div>
                </div>

                {/* Search and Add Section */}
                <div style={{
                  background: '#fff',
                  borderRadius: 12,
                  padding: '20px 24px',
                  marginBottom: 24,
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #f0f0f0'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: '#333', margin: 0 }}>Danh sách nguyên vật liệu</h3>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <div style={{ position: 'relative' }}>
                        <input
                          type="text"
                          placeholder="Tìm kiếm nguyên vật liệu..."
                          value={materialSearchTerm}
                          onChange={(e) => setMaterialSearchTerm(e.target.value)}
                          style={{
                            padding: '10px 16px 10px 40px',
                            border: '2px solid #e0e0e0',
                            borderRadius: 8,
                            fontSize: 14,
                            width: 280,
                            outline: 'none',
                            transition: 'all 0.3s ease'
                          }}
                          onFocus={(e) => e.target.style.borderColor = '#b8860b'}
                          onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                        />
                        <span style={{
                          position: 'absolute',
                          left: 12,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: '#999',
                          fontSize: 16
                        }}>
                          🔍
                        </span>
                      </div>
                      <button
                        onClick={() => setShowAddMaterial(true)}
                        style={{
                          background: 'linear-gradient(90deg, #b8860b, #e5d3b3)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 8,
                          padding: '10px 20px',
                          fontWeight: 600,
                          fontSize: 14,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
                        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                      >
                        + Thêm nguyên vật liệu
                      </button>
                    </div>
                  </div>
                </div>

                {/* Materials List */}
                {materialsLoading ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#b8860b', fontSize: 18 }}>Đang tải danh sách nguyên vật liệu...</div>
                ) : materialsError ? (
                  <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>{materialsError}</div>
                ) : (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
                    gap: '20px',
                    padding: '10px 0'
                  }}>
                    {materials
                      .filter(material =>
                        material.name?.toLowerCase().includes(materialSearchTerm.toLowerCase()) ||
                        material.category?.toLowerCase().includes(materialSearchTerm.toLowerCase()) ||
                        material.supplier?.toLowerCase().includes(materialSearchTerm.toLowerCase())
                      )
                      .map((material, idx) => (
                        <div key={material.id} style={{
                          background: '#fff',
                          borderRadius: 16,
                          padding: 20,
                          boxShadow: '0 4px 20px rgba(184, 134, 11, 0.1)',
                          border: '1px solid #f3e9dd',
                          transition: 'all 0.3s ease',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-4px)';
                          e.target.style.boxShadow = '0 8px 30px rgba(184, 134, 11, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 4px 20px rgba(184, 134, 11, 0.1)';
                        }}>
                          
                          {/* Header với icon và trạng thái */}
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
                            <div style={{
                              width: 60,
                              height: 60,
                              borderRadius: 12,
                              overflow: 'hidden',
                              background: '#f8f8f8',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                            }}>
                              <span style={{ fontSize: 24, color: '#b8860b' }}>🥛</span>
                            </div>
                            
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                marginBottom: 8
                              }}>
                                <h3 style={{
                                  margin: 0,
                                  fontSize: 18,
                                  fontWeight: 700,
                                  color: '#333',
                                  lineHeight: 1.3,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap'
                                }}>
                                  {material.name || 'Chưa có tên'}
                                </h3>
                                <span style={{
                                  background: material.quantity > 0 ? '#51cf66' : '#ff6b6b',
                                  color: '#fff',
                                  padding: '4px 8px',
                                  borderRadius: 12,
                                  fontSize: 11,
                                  fontWeight: 600,
                                  flexShrink: 0
                                }}>
                                  {material.quantity > 0 ? 'Còn hàng' : 'Hết hàng'}
                                </span>
                              </div>
                              
                              <div style={{
                                color: '#666',
                                fontSize: 14,
                                marginBottom: 4
                              }}>
                                {material.category || 'Chưa phân loại'}
                              </div>
                              
                              <div style={{
                                color: '#b8860b',
                                fontSize: 14,
                                fontWeight: 600,
                                marginBottom: 8
                              }}>
                                {material.supplier || 'Chưa có nhà cung cấp'}
                              </div>
                            </div>
                          </div>

                          {/* Thông tin chi tiết */}
                          <div style={{
                            background: '#faf8f3',
                            borderRadius: 8,
                            padding: 12,
                            marginBottom: 16
                          }}>
                            <div style={{
                              display: 'grid',
                              gridTemplateColumns: '1fr 1fr',
                              gap: 8,
                              fontSize: 13,
                              color: '#666'
                            }}>
                              <div>
                                <strong style={{ color: '#333' }}>ID:</strong> {material.id}
                              </div>
                              <div>
                                <strong style={{ color: '#333' }}>Số lượng:</strong> {material.quantity || 0} {material.unit || 'cái'}
                              </div>
                              <div>
                                <strong style={{ color: '#333' }}>Giá nhập:</strong> {material.importPrice?.toLocaleString() || 0}đ
                              </div>
                              <div>
                                <strong style={{ color: '#333' }}>Ngày nhập:</strong> {new Date(material.importDate || Date.now()).toLocaleDateString('vi-VN')}
                              </div>
                            </div>
                          </div>

                          {/* Thao tác */}
                          <div style={{
                            display: 'flex',
                            gap: 12,
                            justifyContent: 'flex-end'
                          }}>
                            <button
                              onClick={() => {
                                const quantity = prompt('Nhập số lượng muốn nhập kho:');
                                if (quantity && !isNaN(quantity)) {
                                  importMaterial(material.id, parseInt(quantity));
                                }
                              }}
                              style={{
                                background: '#51cf66',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 8,
                                padding: '8px 16px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                fontSize: 13,
                                transition: 'all 0.2s'
                              }}
                              onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                              onMouseLeave={(e) => e.target.style.opacity = '1'}
                              title="Nhập kho"
                            >
                              Nhập kho
                            </button>
                            
                            <button
                              onClick={() => {
                                const quantity = prompt('Nhập số lượng muốn xuất kho:');
                                if (quantity && !isNaN(quantity)) {
                                  exportMaterial(material.id, parseInt(quantity));
                                }
                              }}
                              style={{
                                background: '#ffa500',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 8,
                                padding: '8px 16px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                fontSize: 13,
                                transition: 'all 0.2s'
                              }}
                              onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                              onMouseLeave={(e) => e.target.style.opacity = '1'}
                              title="Xuất kho"
                            >
                              Xuất kho
                            </button>
                            
                            <button
                              onClick={() => {
                                setSelectedMaterial(material);
                                setShowMaterialDetail(true);
                              }}
                              style={{
                                background: '#e5d3b3',
                                color: '#7c4d03',
                                border: 'none',
                                borderRadius: 8,
                                padding: '8px 16px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                fontSize: 13,
                                transition: 'all 0.2s'
                              }}
                              onMouseEnter={(e) => e.target.style.background = '#d4c19f'}
                              onMouseLeave={(e) => e.target.style.background = '#e5d3b3'}
                            >
                              Chi tiết
                            </button>
                            
                            <button
                              onClick={() => deleteMaterial(material.id)}
                              style={{
                                background: '#ffb4a2',
                                color: '#a52a2a',
                                border: 'none',
                                borderRadius: 8,
                                padding: '8px 16px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                fontSize: 13,
                                transition: 'all 0.2s'
                              }}
                              onMouseEnter={(e) => e.target.style.background = '#ff9b87'}
                              onMouseLeave={(e) => e.target.style.background = '#ffb4a2'}
                            >
                              Xóa
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}
            {tab === 'income' && (
              <div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#b8860b', marginBottom: 10, letterSpacing: 1 }}>Thống kê thu nhập</div>
                <div style={{ color: '#7c4d03', fontSize: 16, marginBottom: 18 }}>Xem báo cáo doanh thu, lọc theo thời gian.</div>
                <div style={{ height: 140, background: '#faf8f3', borderRadius: 12, boxShadow: '0 1px 6px #b8860b11', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b8860b', fontWeight: 600, fontSize: 18, opacity: 0.7 }}>[Biểu đồ thu nhập sẽ hiển thị ở đây]</div>
              </div>
            )}
            {tab === 'expense' && (
              <div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#b8860b', marginBottom: 10, letterSpacing: 1 }}>Thống kê chi phí</div>
                <div style={{ color: '#7c4d03', fontSize: 16, marginBottom: 18 }}>Xem báo cáo chi phí, lọc theo thời gian.</div>
                <div style={{ height: 140, background: '#faf8f3', borderRadius: 12, boxShadow: '0 1px 6px #b8860b11', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b8860b', fontWeight: 600, fontSize: 18, opacity: 0.7 }}>[Biểu đồ chi phí sẽ hiển thị ở đây]</div>
              </div>
            )}
          </div>
        </main>
      </div>
      <AdminEditProductModal
        open={showEdit}
        onClose={() => setShowEdit(false)}
        product={editProduct}
        categories={categories}
        onSuccess={() => {
          setShowEdit(false);
          setLoading(true);
          fetch('http://localhost:5249/api/products')
            .then(res => res.json())
            .then(data => {
              setProducts(data);
              setLoading(false);
            })
            .catch(() => setLoading(false));
        }}
      />
      <DeleteProductModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        product={deleteProduct}
        onDelete={async (product) => {
          try {
            await fetch(`http://localhost:5249/api/products/${product.id}`, { method: 'DELETE' });
            setShowDelete(false);
            setLoading(true);
            fetch('http://localhost:5249/api/products')
              .then(res => res.json())
              .then(data => {
                setProducts(data);
                setLoading(false);
              })
              .catch(() => setLoading(false));
          } catch (err) {
            alert('Lỗi xóa sản phẩm!');
          }
        }}
      />
    </div>
  );
}

function App() {
  const [scrollToSection, setScrollToSection] = useState(null);
  // Kiểm tra user trong localStorage
  const user = (() => {
    const u = localStorage.getItem('nui_tea_user');
    return u ? JSON.parse(u) : null;
  })();

  // Protected Route component
  const ProtectedAdminRoute = () => {
    // Kiểm tra user từ localStorage một cách động
    const currentUser = (() => {
      const u = localStorage.getItem('nui_tea_user');
      return u ? JSON.parse(u) : null;
    })();

    if (!currentUser || !(currentUser.role === 'admin' || currentUser.email === 'admin@nuitea.com')) {
      return <Navigate to="/login" />;
    }
    return <AdminPage />;
  };

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/about" element={<AboutPage setScrollToSection={setScrollToSection} />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<ProtectedAdminRoute />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/order-status/:orderId" element={<OrderStatusPage />} />
          <Route path="/" element={<HomePage scrollToSection={scrollToSection} setScrollToSection={setScrollToSection} />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

function RegisterModal({ onClose, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (password !== confirm) {
      setError('Mật khẩu xác nhận không khớp!');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5249/api/customers/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          fullName: email, // hoặc cho người dùng nhập tên riêng nếu muốn
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

function Footer() {
  return (
    <footer className="main-footer alt-layout">
      <div className="footer-container alt-layout">
        <div className="footer-left">
          <div className="footer-logo-big">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect x="8" y="8" width="32" height="32" rx="16" fill="url(#grad1)" />
              <path d="M24 12 C28 12, 32 16, 32 20 C32 24, 28 28, 24 28 C20 28, 16 24, 16 20 C16 16, 20 12, 24 12 Z" fill="#8B4513" />
              <path d="M24 14 C26 14, 28 16, 28 18 C28 20, 26 22, 24 22 C22 22, 20 20, 20 18 C20 16, 22 14, 24 14 Z" fill="#A0522D" />
              <rect x="23" y="28" width="2" height="6" rx="1" fill="#654321" />
              <path d="M12 32 L20 24 L28 32 L36 24 L36 40 L12 40 Z" fill="#8B4513" opacity="0.7" />
              <path d="M16 36 L22 30 L28 36 L32 30 L32 40 L16 40 Z" fill="#A0522D" opacity="0.8" />
              <defs>
                <linearGradient id="grad1" x1="8" y1="8" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#D2B48C" />
                  <stop offset="1" stopColor="#F5DEB3" />
                </linearGradient>
              </defs>
            </svg>
            <span className="footer-logo-text-big">nui_tea</span>
          </div>
          <div className="footer-desc-big">Trà sữa Nui Tea - Hương vị tự nhiên, phục vụ tận tâm. Đặt hàng online, giao tận nơi nhanh chóng!</div>
        </div>
        <div className="footer-divider"></div>
        <div className="footer-right">
          <div className="footer-group">
            <div className="footer-title">Menu</div>
            <ul className="footer-menu">
              <li><a href="#">Trang chủ</a></li>
              <li><a href="#">Thực đơn</a></li>
              <li><a href="#">Giới thiệu</a></li>
              <li><a href="#">Khuyến mãi</a></li>
              <li><a href="#">Liên hệ</a></li>
              <li><a href="#">Giỏ hàng</a></li>
            </ul>
          </div>
          <div className="footer-group">
            <div className="footer-title">Liên hệ</div>
            <div className="footer-contact-item">📞 0909 123 456</div>
            <div className="footer-contact-item">Zalo: <a href="https://zalo.me/0909123456" target="_blank" rel="noopener noreferrer">0909 123 456</a></div>
            <div className="footer-contact-item">Facebook: <a href="https://facebook.com/yourfanpage" target="_blank" rel="noopener noreferrer">nui_tea</a></div>
            <div className="footer-contact-item">Email: <a href="mailto:info@nuitea.com">info@nuitea.com</a></div>
          </div>
          <div className="footer-group">
            <div className="footer-title">Kết nối</div>
            <div className="footer-socials">
              <a href="https://facebook.com/yourfanpage" target="_blank" rel="noopener noreferrer" className="footer-social-icon fb">f</a>
              <a href="https://zalo.me/0909123456" target="_blank" rel="noopener noreferrer" className="footer-social-icon zalo">Z</a>
              <a href="mailto:info@nuitea.com" className="footer-social-icon email">@</a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-copyright">© 2024 Nui Tea. All rights reserved.</div>
    </footer>
  );
}

function ProductSection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5249/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => {
        console.error('Error fetching products:', error);
        // Fallback data if API fails
        setProducts([
          {
            id: 1,
            name: 'Trà sữa trân châu đường đen',
            description: 'Trà sữa thơm ngon với trân châu đường đen giòn dai',
            price: 35000,
            emoji: '🥤',
            image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=400&h=300&fit=crop',
            category: { name: 'Trà sữa' }
          },
          {
            id: 2,
            name: 'Trà sữa matcha',
            description: 'Trà sữa matcha Nhật Bản với hương vị đặc trưng',
            price: 40000,
            emoji: '🍵',
            image: 'https://images.unsplash.com/photo-1515823662972-94dfa8d7d0e0?w=400&h=300&fit=crop',
            category: { name: 'Trà sữa' }
          },
          {
            id: 3,
            name: 'Trà sữa taro',
            description: 'Trà sữa taro với màu tím đẹp mắt và hương vị độc đáo',
            price: 38000,
            emoji: '💜',
            image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=400&h=300&fit=crop&sat=-50&hue=280',
            category: { name: 'Trà sữa' }
          },
          {
            id: 4,
            name: 'Cà phê sữa đá',
            description: 'Cà phê sữa đá truyền thống Việt Nam',
            price: 25000,
            emoji: '☕',
            image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
            category: { name: 'Cà phê' }
          },
          {
            id: 5,
            name: 'Sinh tố dâu tây',
            description: 'Sinh tố dâu tây tươi ngon, bổ dưỡng',
            price: 45000,
            emoji: '🍓',
            image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop',
            category: { name: 'Sinh tố' }
          },
          {
            id: 6,
            name: 'Nước ép cam',
            description: 'Nước ép cam tươi 100% tự nhiên',
            price: 30000,
            emoji: '🍊',
            image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop',
            category: { name: 'Nước ép' }
          },
          {
            id: 7,
            name: 'Trà sữa trân châu đường hổ',
            description: 'Trà sữa truyền thống với trân châu đường đen',
            price: 39000,
            originalPrice: 45000,
            emoji: '🐯',
            image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=400&h=300&fit=crop&sat=20',
            category: { name: 'Trà sữa' },
            badge: { text: 'Hot', color: '#ff4757' }
          },
          {
            id: 8,
            name: 'Trà sữa hai anh em',
            description: 'Vị trà xanh nhài đậm vị, chát nhẹ',
            price: 45000,
            originalPrice: 52000,
            emoji: '👬',
            image: 'https://images.unsplash.com/photo-1515823662972-94dfa8d7d0e0?w=400&h=300&fit=crop&sat=30',
            category: { name: 'Trà sữa' },
            badge: { text: 'New', color: '#2ed573' }
          },
          {
            id: 9,
            name: 'Cà phê đen',
            description: 'Cà phê đen nguyên chất, đậm đà',
            price: 20000,
            emoji: '☕',
            image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop&sat=-30',
            category: { name: 'Cà phê' }
          },
          {
            id: 10,
            name: 'Sinh tố xoài',
            description: 'Sinh tố xoài chín ngọt, thơm lừng',
            price: 42000,
            emoji: '🥭',
            image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop&hue=60',
            category: { name: 'Sinh tố' }
          }
        ]);
      });
  }, []);

  return <FeaturedProducts products={products} />;
}

export default App;

function PromotionsSection({ promoRef }) {
  const [promos, setPromos] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5249/api/coupons/active')
      .then(res => res.json())
      .then(data => setPromos(data));
  }, []);
  return (
    <section className="promotions" ref={promoRef}>
      <div className="container">
        <h2 style={{ fontSize: 36, fontWeight: 800, color: '#a0522d', marginBottom: 32, letterSpacing: 1 }}>🎁 Khuyến mãi hôm nay</h2>
        <div className="promo-cards promo-cards-fancy">
          {promos.length === 0 ? (
            <p>Không có khuyến mãi nào khả dụng.</p>
          ) : promos.map((promo) => (
            <div className="promo-card promo-card-fancy" key={promo.id}>
              <div className="promo-icon">
                <span role="img" aria-label="gift" style={{ fontSize: 36 }}>🎉</span>
              </div>
              <div className="promo-main">
                <div className="promo-title">
                  {promo.discountType === 'percent'
                    ? `Giảm ${promo.discountValue}%`
                    : `Giảm ${promo.discountValue.toLocaleString()}đ`}
                </div>
                <div className="promo-desc">{promo.description}</div>
                <div className="promo-meta">
                  <span className="promo-expiry">HSD: {promo.expiryDate ? promo.expiryDate.slice(0, 10) : ''}</span>
                  <span className="promo-status" style={{ color: promo.isActive ? '#008000' : '#d2691e', fontWeight: 600, marginLeft: 12 }}>{promo.isActive ? 'Còn hiệu lực' : 'Hết hạn'}</span>
                </div>
                <div className="promo-coupon">
                  <span className="coupon-label">Mã giảm giá</span>
                  <span className="coupon-code">{promo.code}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProfilePage({ user, setUser, setPage }) {
  const [form, setForm] = useState({
    fullName: user?.FullName || '',
    username: user?.Username || '',
    phone: user?.Phone || '',
    address: user?.Address || '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  if (!user) return <div style={{ padding: 32 }}>Bạn chưa đăng nhập.</div>;
  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setSuccess(''); setError('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5249/api/customers/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Id: user.id || user.Id,
          Email: user.email || user.Email,
          FullName: form.fullName,
          Username: form.username,
          Phone: form.phone,
          Address: form.address,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        const userNorm = normalizeUser(data.customer);
        setUser(userNorm);
        localStorage.setItem('nui_tea_user', JSON.stringify(userNorm));
        setSuccess('Cập nhật thông tin thành công!');
      } else {
        setError(data.message || 'Cập nhật thất bại!');
      }
    } catch (err) {
      setError('Lỗi kết nối server!');
    }
    setLoading(false);
  };
  return (
    <div style={{ maxWidth: 420, margin: '40px auto', background: '#fff7e6', borderRadius: 18, boxShadow: '0 4px 24px #b8860b22', padding: 32 }}>
      <h2 style={{ color: '#a0522d', fontWeight: 800, marginBottom: 18 }}>Thông tin tài khoản</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <label>Email</label>
        <input value={user.email} disabled style={{ background: '#f3e9dd', color: '#888' }} />
        <label>Họ tên</label>
        <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Nhập họ tên" />
        <label>Username</label>
        <input name="username" value={form.username} onChange={handleChange} placeholder="Nhập username" />
        <label>Số điện thoại</label>
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Nhập số điện thoại" />
        <label>Địa chỉ</label>
        <input name="address" value={form.address} onChange={handleChange} placeholder="Nhập địa chỉ" />
        <button type="submit" style={{ background: 'linear-gradient(90deg,#b8860b,#e5d3b3)', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 0', fontWeight: 700, fontSize: 17, marginTop: 10 }} disabled={loading}>{loading ? 'Đang lưu...' : 'Lưu thay đổi'}</button>
      </form>
      {success && <div style={{ color: 'green', marginTop: 12 }}>{success}</div>}
      {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
      <button onClick={() => setPage('home')} style={{ marginTop: 24, background: 'none', border: 'none', color: '#a0522d', textDecoration: 'underline', cursor: 'pointer', fontWeight: 600 }}>← Quay về trang chủ</button>
    </div>
  );
}

function AdminAddProductModal({ open, onClose, onSuccess }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [isSoldOut, setIsSoldOut] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (open) {
      fetch('http://localhost:5249/api/productcategories')
        .then(res => res.json())
        .then(data => setCategories(data))
        .catch(() => setCategories([]));
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (!name || !price || !categoryId) {
      setError('Vui lòng nhập tên, giá và chọn loại sản phẩm!');
      return;
    }
    setLoading(true);
    try {
      const productData = {
          Name: name || '',
          Price: Number(price) || 0,
          Description: description || '',
          Image: image || '',
          CategoryId: Number(categoryId),
          Category: {
            Id: Number(categoryId),
            Name: categories.find(c => c.id === Number(categoryId))?.name || ''
          },
          IsActive: true,
        IsSoldOut: isSoldOut,
          CreatedAt: new Date().toISOString()
      };
      console.log('Sending product data:', productData);
      
      const res = await fetch('http://localhost:5249/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Thêm sản phẩm thành công!');
        setTimeout(() => {
          setLoading(false);
          onSuccess && onSuccess();
          onClose();
        }, 700);
      } else {
        console.error('Lỗi thêm sản phẩm:', data);
        setError(data.message || 'Thêm sản phẩm thất bại! ' + JSON.stringify(data));
        setLoading(false);
      }
    } catch (err) {
      setError('Lỗi kết nối server!');
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(34,34,34,0.18)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 16, boxShadow: '0 8px 40px #b8860b33', padding: 32, minWidth: 340, maxWidth: 420, width: '100%', display: 'flex', flexDirection: 'column', gap: 14, position: 'relative' }}>
        <button type="button" onClick={onClose} style={{ position: 'absolute', top: 12, right: 18, background: 'none', border: 'none', fontSize: 28, color: '#b8860b', cursor: 'pointer' }}>&times;</button>
        <div style={{ fontWeight: 800, fontSize: 22, color: '#b8860b', marginBottom: 8 }}>Thêm sản phẩm mới</div>
        <label>Tên sản phẩm *</label>
        <input value={name} onChange={e => setName(e.target.value)} required placeholder="Nhập tên sản phẩm" style={{ padding: 8, borderRadius: 8, border: '1.2px solid #e0c9a6' }} />
        <label>Giá (VNĐ) *</label>
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} required placeholder="Nhập giá" style={{ padding: 8, borderRadius: 8, border: '1.2px solid #e0c9a6' }} />
        <label>Mô tả</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Mô tả sản phẩm" style={{ padding: 8, borderRadius: 8, border: '1.2px solid #e0c9a6', minHeight: 48 }} />
        <label>Ảnh (URL)</label>
        <input value={image} onChange={e => setImage(e.target.value)} placeholder="Link ảnh sản phẩm" style={{ padding: 8, borderRadius: 8, border: '1.2px solid #e0c9a6' }} />
        <label>Loại *</label>
        <select value={categoryId} onChange={e => setCategoryId(e.target.value)} required style={{ padding: 8, borderRadius: 8, border: '1.2px solid #e0c9a6' }}>
          <option value="">-- Chọn loại sản phẩm --</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={isSoldOut}
            onChange={e => setIsSoldOut(e.target.checked)}
            style={{ width: 16, height: 16 }}
          />
          Đánh dấu hết hàng
        </label>
        <button type="submit" disabled={loading} style={{ background: 'linear-gradient(90deg,#b8860b,#e5d3b3)', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 0', fontWeight: 700, fontSize: 17, marginTop: 10, cursor: 'pointer' }}>{loading ? 'Đang thêm...' : 'Thêm sản phẩm'}</button>
        {error && <div style={{ color: 'red', marginTop: 6 }}>{error}</div>}
        {success && <div style={{ color: 'green', marginTop: 6 }}>{success}</div>}
      </form>
    </div>
  );
}
