-- Insert sample categories
INSERT INTO categories (id, name, slug, description, image_url) VALUES
('c1e2d3f4-a1b2-c3d4-e5f6-a1b2c3d4e5f1', 'Skincare', 'skincare', 'Premium skincare products for all skin types', '/images/categories/skincare.jpg'),
('c1e2d3f4-a1b2-c3d4-e5f6-a1b2c3d4e5f2', 'Makeup', 'makeup', 'Professional makeup and cosmetics', '/images/categories/makeup.jpg'),
('c1e2d3f4-a1b2-c3d4-e5f6-a1b2c3d4e5f3', 'Hair Care', 'hair-care', 'Luxury hair care products', '/images/categories/hair-care.jpg'),
('c1e2d3f4-a1b2-c3d4-e5f6-a1b2c3d4e5f4', 'Fragrance', 'fragrance', 'Elegant perfumes and colognes', '/images/categories/fragrance.jpg'),
('c1e2d3f4-a1b2-c3d4-e5f6-a1b2c3d4e5f5', 'Body Care', 'body-care', 'Nourishing body care products', '/images/categories/body-care.jpg');

-- Insert sample products (let Supabase generate UUIDs automatically)
INSERT INTO products (name, slug, description, price, usage, stock, category_id, featured) VALUES
-- Skincare Products
('Hydrating Face Serum', 'hydrating-face-serum', 'Advanced hydration serum with hyaluronic acid for plump, glowing skin', 45.99, 'Apply daily to cleansed face and neck', 50, 'c1e2d3f4-a1b2-c3d4-e5f6-a1b2c3d4e5f1', true),
('Vitamin C Brightening Cream', 'vitamin-c-brightening-cream', 'Brightens complexion and reduces dark spots with pure Vitamin C', 52.50, 'Use every morning before sunscreen', 35, 'c1e2d3f4-a1b2-c3d4-e5f6-a1b2c3d4e5f1', true),
('Gentle Foaming Cleanser', 'gentle-foaming-cleanser', 'pH-balanced cleanser that removes impurities without stripping moisture', 28.75, 'Massage onto damp skin, then rinse', 75, 'c1e2d3f4-a1b2-c3d4-e5f6-a1b2c3d4e5f1', false),

-- Makeup Products
('Matte Liquid Lipstick', 'matte-liquid-lipstick', 'Long-lasting matte lipstick in 12 stunning shades', 24.99, 'Apply directly to lips from the doe-foot applicator', 100, 'c1e2d3f4-a1b2-c3d4-e5f6-a1b2c3d4e5f2', true),
('Natural Finish Foundation', 'natural-finish-foundation', 'Lightweight foundation with buildable coverage and SPF 30', 38.50, 'Apply with brush or fingers and blend evenly', 60, 'c1e2d3f4-a1b2-c3d4-e5f6-a1b2c3d4e5f2', false),
('Professional Eyeshadow Palette', 'professional-eyeshadow-palette', '16 highly pigmented shades with matte and shimmer finishes', 55.00, 'Apply with brushes for desired intensity', 25, 'c1e2d3f4-a1b2-c3d4-e5f6-a1b2c3d4e5f2', true),

-- Hair Care Products
('Repairing Hair Mask', 'repairing-hair-mask', 'Deep conditioning treatment for damaged and dry hair', 32.99, 'Apply to clean, wet hair and leave for 5-10 minutes', 40, 'c1e2d3f4-a1b2-c3d4-e5f6-a1b2c3d4e5f3', false),
('Volumizing Shampoo', 'volumizing-shampoo', 'Adds body and fullness to fine, flat hair', 26.75, 'Massage into wet hair, lather, and rinse thoroughly', 80, 'c1e2d3f4-a1b2-c3d4-e5f6-a1b2c3d4e5f3', true),

-- Fragrance Products
('Eau de Parfum - Rose Noir', 'eau-de-parfum-rose-noir', 'Mysterious blend of black rose, oud wood, and vanilla', 89.99, 'Spray on pulse points for all-day fragrance', 30, 'c1e2d3f4-a1b2-c3d4-e5f6-a1b2c3d4e5f4', true),
('Fresh Citrus Cologne', 'fresh-citrus-cologne', 'Bright and energetic scent with lemon, bergamot, and musk', 75.50, 'Apply to wrists and neck for a refreshing scent', 45, 'c1e2d3f4-a1b2-c3d4-e5f6-a1b2c3d4e5f4', false),

-- Body Care Products
('Luxury Body Butter', 'luxury-body-butter', 'Rich, creamy body butter with shea and cocoa butter', 34.99, 'Massage into skin after shower for deep hydration', 65, 'c1e2d3f4-a1b2-c3d4-e5f6-a1b2c3d4e5f5', true),
('Exfoliating Body Scrub', 'exfoliating-body-scrub', 'Sugar-based scrub with essential oils for smooth skin', 29.25, 'Gently massage onto wet skin in circular motions, then rinse', 55, 'c1e2d3f4-a1b2-c3d4-e5f6-a1b2c3d4e5f5', false);

-- Insert sample product images (using actual product IDs from the products table)
INSERT INTO product_images (product_id, image_url, alt_text, sort_order)
SELECT
    p.id,
    CASE
        WHEN p.name = 'Hydrating Face Serum' THEN '/images/products/serum-1.jpg'
        WHEN p.name = 'Vitamin C Brightening Cream' THEN '/images/products/vitamin-c-1.jpg'
        WHEN p.name = 'Matte Liquid Lipstick' THEN '/images/products/lipstick-1.jpg'
        WHEN p.name = 'Natural Finish Foundation' THEN '/images/products/foundation-1.jpg'
        WHEN p.name = 'Professional Eyeshadow Palette' THEN '/images/products/eyeshadow-1.jpg'
        WHEN p.name = 'Repairing Hair Mask' THEN '/images/products/hair-mask-1.jpg'
        WHEN p.name = 'Eau de Parfum - Rose Noir' THEN '/images/products/perfume-1.jpg'
        WHEN p.name = 'Luxury Body Butter' THEN '/images/products/body-butter-1.jpg'
        ELSE '/images/products/default.jpg'
    END,
    p.name || ' product image',
    1
FROM products p;

-- Add secondary images for some products
INSERT INTO product_images (product_id, image_url, alt_text, sort_order)
SELECT
    p.id,
    CASE
        WHEN p.name = 'Hydrating Face Serum' THEN '/images/products/serum-2.jpg'
        WHEN p.name = 'Vitamin C Brightening Cream' THEN '/images/products/vitamin-c-2.jpg'
        WHEN p.name = 'Matte Liquid Lipstick' THEN '/images/products/lipstick-2.jpg'
        WHEN p.name = 'Professional Eyeshadow Palette' THEN '/images/products/eyeshadow-2.jpg'
        WHEN p.name = 'Eau de Parfum - Rose Noir' THEN '/images/products/perfume-2.jpg'
        WHEN p.name = 'Luxury Body Butter' THEN '/images/products/body-butter-2.jpg'
    END,
    p.name || ' additional view',
    2
FROM products p
WHERE p.name IN ('Hydrating Face Serum', 'Vitamin C Brightening Cream', 'Matte Liquid Lipstick', 'Professional Eyeshadow Palette', 'Eau de Parfum - Rose Noir', 'Luxury Body Butter');
