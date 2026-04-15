-- Insert serving areas
INSERT INTO serving_areas (area_name, delivery_charge, delivery_time_minutes, is_available) VALUES
('Koramangala', 30, 30, TRUE),
('Indiranagar', 25, 25, TRUE),
('Whitefield', 40, 35, TRUE),
('HSR Layout', 35, 30, TRUE),
('MG Road', 45, 40, TRUE),
('Jayanagar', 30, 28, TRUE),
('Bannerghatta Road', 50, 40, TRUE),
('Yeshwantpur', 35, 32, TRUE)
ON CONFLICT DO NOTHING;

-- Insert menu items
INSERT INTO menu_items (name, description, price, category, is_popular, is_available) VALUES
-- Biryani
('Hyderabadi Chicken Biryani', 'Fragrant basmati rice cooked with tender chicken, aromatic spices, and ghee', 450.00, 'Biryani', TRUE, TRUE),
('Lucknowi Mutton Biryani', 'Slow-cooked mutton biryani with traditional Lucknowi flavors', 550.00, 'Biryani', TRUE, TRUE),
('Paneer Biryani', 'Creamy paneer and rice biryani with aromatic spices', 380.00, 'Biryani', FALSE, TRUE),
('Vegetable Biryani', 'Mixed vegetables with fragrant basmati rice', 320.00, 'Biryani', FALSE, TRUE),

-- Tandoori
('Tandoori Chicken (Half)', 'Marinated chicken grilled in traditional tandoor', 420.00, 'Tandoori', TRUE, TRUE),
('Tandoori Chicken (Full)', 'Marinated chicken grilled in traditional tandoor', 750.00, 'Tandoori', TRUE, TRUE),
('Paneer Tikka', 'Marinated paneer cubes cooked in tandoor', 350.00, 'Tandoori', FALSE, TRUE),
('Seekh Kebab', 'Minced meat kebab with aromatic spices', 320.00, 'Tandoori', FALSE, TRUE),

-- Curries
('Butter Chicken', 'Tender chicken in creamy tomato butter sauce', 420.00, 'Curries', TRUE, TRUE),
('Chettinad Chicken', 'Spicy chicken curry with traditional South Indian spices', 380.00, 'Curries', FALSE, TRUE),
('Paneer Makhani', 'Creamy paneer curry with aromatic spices', 350.00, 'Curries', FALSE, TRUE),
('Rogan Josh', 'Aromatic mutton curry with yogurt and spices', 480.00, 'Curries', FALSE, TRUE),

-- Breads
('Butter Naan', 'Traditional soft naan with butter', 80.00, 'Breads', FALSE, TRUE),
('Garlic Naan', 'Naan topped with fresh garlic and butter', 90.00, 'Breads', FALSE, TRUE),
('Paratha', 'Layered Indian flatbread', 60.00, 'Breads', FALSE, TRUE),
('Roti', 'Whole wheat Indian bread', 40.00, 'Breads', FALSE, TRUE),

-- Starters
('Momo (8 Pcs)', 'Steamed dumplings with spiced filling', 280.00, 'Starters', FALSE, TRUE),
('Spring Roll (4 Pcs)', 'Crispy rolls with vegetable or meat filling', 200.00, 'Starters', FALSE, TRUE),
('Samosa (4 Pcs)', 'Triangular pastry with savory filling', 120.00, 'Starters', FALSE, TRUE),

-- Desserts
('Gulab Jamun (4 Pcs)', 'Soft milk solids in sugar syrup', 180.00, 'Desserts', FALSE, TRUE),
('Kheer', 'Creamy rice pudding with nuts', 150.00, 'Desserts', FALSE, TRUE),
('Gajar Ka Halwa', 'Traditional carrot dessert', 200.00, 'Desserts', FALSE, TRUE),

-- Beverages
('Masala Chai', 'Indian spiced tea', 60.00, 'Beverages', FALSE, TRUE),
('Lassi', 'Traditional yogurt drink', 80.00, 'Beverages', FALSE, TRUE),
('Mango Lassi', 'Creamy mango yogurt drink', 120.00, 'Beverages', FALSE, TRUE)
ON CONFLICT DO NOTHING;
