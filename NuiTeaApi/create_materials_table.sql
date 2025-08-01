CREATE TABLE IF NOT EXISTS Materials (
  Id INT PRIMARY KEY AUTO_INCREMENT,
  Name VARCHAR(100) NOT NULL,
  Category VARCHAR(50) NOT NULL DEFAULT '',
  Supplier VARCHAR(100) NOT NULL DEFAULT '',
  Quantity INT NOT NULL DEFAULT 0,
  Unit VARCHAR(20) NOT NULL DEFAULT '',
  ImportPrice DECIMAL(10,2) NOT NULL DEFAULT 0,
  ImportDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ExpiryDate DATETIME NULL,
  MinQuantity INT NOT NULL DEFAULT 10,
  IsActive BOOLEAN NOT NULL DEFAULT TRUE,
  CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UpdatedAt DATETIME NULL
);

-- Thêm dữ liệu mẫu
INSERT INTO Materials (Name, Category, Supplier, Quantity, Unit, ImportPrice, ImportDate, ExpiryDate, MinQuantity) VALUES
('Sữa tươi', 'Sữa', 'Vinamilk', 0, 'lit', 25000.00, '2024-01-15', '2024-02-15', 10),
('Bột trà xanh', 'Gia vị', 'Công ty TNHH ABC', 0, 'kg', 150000.00, '2024-01-10', '2024-06-10', 5),
('Đường cát trắng', 'Gia vị', 'Công ty Đường Biên Hòa', 50, 'kg', 12000.00, '2024-01-05', '2024-12-05', 20),
('Trân châu', 'Topping', 'Công ty TNHH XYZ', 30, 'kg', 80000.00, '2024-01-12', '2024-03-12', 15);
