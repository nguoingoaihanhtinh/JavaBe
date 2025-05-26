
INSERT INTO user (username, email, password, address, avatar) VALUES
('User', 'user@gmail.com', 'AQAAAAIAAYagAAAAEBiaay58PuSVSTIoh6/fzFD21elgUpHZau1jIXaxxkwAbu/hRpdJb1p2Q3kHpnjfXw==', '', ''),
('Admin', 'admin@gmail.com', 'AQAAAAIAAYagAAAAEBiaay58PuSVSTIoh6/fzFD21elgUpHZau1jIXaxxkwAbu/hRpdJb1p2Q3kHpnjfXw==', '', '');

INSERT INTO food_types (type_id, name_type, parent_id) VALUES
(1, 'Vietnamese Noodles', false),
(2, 'Grilled Dishes', false),
(3, 'Rice Dishes', false),
(4, 'Vegetarian', false),
(5, 'Soups', false),
(6, 'Seafood', false),
(7, 'Snacks', false),
(8, 'Desserts', false),
(9, 'Beverages', false),
(10, 'Salads', false);


INSERT INTO food (food_id, name, image1, image2, image3, food_type_id, rating, number_rating, price, itemleft,description) VALUES
(1, 'Phở bò', 'https://fohlafood.vn/cdn/shop/articles/bi-quyet-nau-phi-bo-ngon-tuyet-dinh.jpg?v=1712213789', 'https://tiki.vn/blog/wp-content/uploads/2023/07/thumb-12.jpg', 'https://amivietnam.com/wp-content/uploads/2024/03/image-242-1150x800.png', 1, 0, 0, 50000, 12 , 'Phở bò là món ăn truyền thống nổi tiếng của Việt Nam. Với nước dùng đậm đà từ xương hầm, hương vị thịt bò mềm ngọt hòa quyện cùng bánh phở dai ngon. Món ăn còn được bổ sung hành lá, ngò gai và các loại gia vị tạo nên hương thơm quyến rũ.'),
(2, 'Phở gà', 'https://cdn.tgdd.vn/2021/09/CookProduct/1200(3)-1200x676-2.jpg', 'https://noiphodien123.vn/wp-content/uploads/2023/08/cach-nau-pho-ga-ha-noi.jpg', 'https://cachnau.vn/wp-content/uploads/2022/02/pho-ga-ga-noi.jpg', 1, 0, 0, 45000, 23,'Phở gà với nước dùng thanh nhẹ, được ninh từ xương gà, mang lại vị ngọt tự nhiên. Thịt gà tươi được thái lát mỏng, ăn kèm bánh phở mềm dai và rau thơm, tạo nên món ăn bổ dưỡng và hấp dẫn.'),
(3, 'Bún chả', 'https://cachnau.vn/wp-content/uploads/2022/02/pho-ga-ga-noi.jpg', 'https://kipor.vn//upload/images/lam-bun-cha-bang-noi-chien-khong-dau-6.jpg', 'https://top10tphcm.com/wp-content/uploads/2021/01/Quan-bun-cha-ha-noi-o-TPHCM.jpg', 2, 0, 0, 70000, 10,'Bún chả là món ăn dân dã, với chả thịt heo nướng trên than hồng, kết hợp với bún tươi, nước mắm pha chua ngọt, và rau sống. Món ăn đậm vị, thơm ngon và mang đậm hương vị truyền thống Hà Nội.'),
(4, 'Nem nướng', 'https://i.ytimg.com/vi/I_n1IQggIQ4/maxresdefault.jpg', 'https://vcdn1-giadinh.vnecdn.net/2021/11/22/256046871-2647385258740674-189-7570-7298-1637563536.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=qUwIfHQjysmE4qAxSuXtbw', 'https://top10tphcm.com/wp-content/uploads/2021/01/Quan-bun-cha-ha-noi-o-TPHCM.jpg', 2, 0, 0, 60000, 24,'Nem nướng là món ăn độc đáo với thịt heo xay nhuyễn, trộn gia vị và nướng trên than hồng, tạo hương thơm đặc trưng. Khi ăn kèm với rau sống và nước chấm, món nem càng trở nên hấp dẫn và lôi cuốn.'),
(5, 'Cơm tấm', 'https://bizweb.dktcdn.net/100/442/328/files/hi-nh-avatar-website-cnsg.jpg?v=1644485704509', 'https://images2.thanhnien.vn/528068263637045248/2023/7/20/base64-16898350173331230391375.png', 'https://file.hstatic.net/1000394081/article/com-tam_e03b4325c9914def9d66619930a73432.jpg', 3, 0, 0, 55000, 21,'Cơm tấm là món ăn đặc trưng của miền Nam Việt Nam, gồm cơm tấm, sườn nướng thơm lừng, trứng ốp la, bì và chả. Thực khách sẽ cảm nhận được sự hài hòa giữa các thành phần, tạo nên một bữa ăn ngon miệng và giàu dinh dưỡng.'),
(6, 'Cơm chiên', 'https://image.baophapluat.vn/w840/Uploaded/2024/ycgvptcc/2020_05_28/cach-lam-com-chien-duong-chau-600x481_DLZM.jpg', 'https://i.ytimg.com/vi/_cdBAMq5KZ0/maxresdefault.jpg', 'https://cdn.tgdd.vn/2020/07/CookProduct/f-1200x676.jpg', 3, 0, 0, 65000, 22,'Cơm chiên là món ăn nhanh phổ biến, với hạt cơm được chiên vàng ươm, kết hợp cùng rau củ và hải sản hoặc thịt. Món ăn giòn ngon, dễ ăn và thích hợp cho mọi bữa ăn trong ngày.'),
(7, 'Gỏi cuốn chay', 'https://khaihoanphuquoc.com.vn/wp-content/uploads/2023/11/nu%CC%9Bo%CC%9B%CC%81c-ma%CC%86%CC%81m-cha%CC%82%CC%81m-go%CC%89i-cuo%CC%82%CC%81n-1200x923.png', 'https://cdn.tgdd.vn/2021/08/CookRecipe/Avatar/goi-cuon-tom-thit-thumbnail-1.jpg', 'https://netspace.edu.vn/app_assets/images/2020/04/25/cach-lam-goi-cuon-tom-thit-cuc-ki-hap-dan-245587-800.jpg', 4, 0, 0, 35000, 18,'Gỏi cuốn chay là món ăn thanh đạm với rau sống, bún, đậu hũ, cuốn trong bánh tráng mỏng. Món ăn thường chấm cùng nước chấm đậm đà, mang lại cảm giác tươi mát, nhẹ nhàng và bổ dưỡng.'),
(8, 'Mì xào chay', 'https://i-giadinh.vnecdn.net/2022/08/08/Thanh-pham-3-3-7795-1659943657.jpg', 'https://anchay.cdn.vccloud.vn/wp-content/uploads/2021/09/mi-xao-chay-ngon-bo-duong-thoq.jpg', 'https://cdn.tgdd.vn/2020/07/CookProduct/1-1200x676-12.jpg', 4, 0, 0, 40000, 34,'Mì xào chay là sự kết hợp hài hòa giữa mì dai ngon và rau củ tươi xanh, mang lại hương vị thanh đạm. Món ăn phù hợp cho người ăn chay hoặc những ai thích ăn nhẹ mà vẫn đầy đủ dinh dưỡng.'),
(9, 'Canh chua cá', 'https://i.ytimg.com/vi/zNhazi2P4yI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCGDf9GlJVxCRR7KD0LBzoFAwEO-Q', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQldivONiT8mdxnMuWY5m3dyCYjMPToTjWKDg&s', 'https://static-images.vnncdn.net/files/publish/2023/3/14/canh-ca-a-1024.jpg', 5, 0, 0, 55000, 32,'Canh chua cá là món ăn truyền thống với nước dùng chua ngọt từ me và thơm, kết hợp cùng cá tươi. Món canh có vị chua nhẹ, thơm ngon, là lựa chọn lý tưởng cho bữa cơm gia đình.'),
(10, 'Bò Kho', 'https://i-giadinh.vnecdn.net/2021/03/15/1-1615818742-7067-1615818945.jpg', 'https://i-giadinh.vnecdn.net/2021/03/15/1-1615818742-7067-1615818945.jpg', 'https://i.ytimg.com/vi/FXSTfjiEA0M/maxresdefault.jpg', 5, 0, 0, 60000, 12,'Bò kho là món ăn đậm đà với thịt bò được hầm mềm cùng các loại gia vị như quế, hồi, sả, tạo hương thơm nồng nàn. Món ăn có thể ăn kèm bánh mì hoặc cơm, thích hợp cho những bữa ăn ấm áp.');

-- cập nhật lại data cho foods khi thêm rating từ sql
DELIMITER $$

CREATE TRIGGER UpdateFoodRating AFTER INSERT ON ratings
FOR EACH ROW
BEGIN
    DECLARE new_avg_rating FLOAT;
    DECLARE total_ratings INT;

    SELECT COUNT(*) INTO total_ratings
    FROM ratings
    WHERE food_id = NEW.food_id;

    SELECT AVG(rating_value) INTO new_avg_rating
    FROM ratings
    WHERE food_id = NEW.food_id;

    UPDATE food
    SET rating = new_avg_rating,
        number_rating = total_ratings
    WHERE food_id = NEW.food_id;
END$$

DELIMITER ;

INSERT INTO ratings (user_id, food_id, content, date, rating_value, reply, date_reply) VALUES
(1, 1, 'Delicious food, would recommend!', '2024-10-01 12:30:00', 5, NULL, NULL),
(1, 1, 'Not bad, but could be better.', '2024-10-02 14:00:00', 3, NULL, NULL),
(1, 2, 'Absolutely loved it!', '2024-10-03 16:15:00', 5, NULL, NULL),
(1, 2, 'Too spicy for my taste.', '2024-10-04 17:45:00', 2, NULL, NULL),
(1, 3, 'Great portion size!', '2024-10-05 18:30:00', 4, NULL, NULL),
(1, 3, 'Would not order again.', '2024-10-06 19:00:00', 1, NULL, NULL),
(1, 4, 'Perfectly cooked!', '2024-10-07 20:30:00', 5, NULL, NULL),
(1, 4, 'Very average experience.', '2024-10-08 21:45:00', 3, NULL, NULL),
(1, 5, 'Too oily for my liking.', '2024-10-09 22:00:00', 2, NULL, NULL),
(1, 5, 'Loved the flavor!', '2024-10-10 23:15:00', 5, NULL, NULL),
(1, 6, 'Would recommend for special occasions.', '2024-10-11 09:30:00', 4, NULL, NULL),
(1, 6, 'Not worth the price.', '2024-10-12 10:45:00', 2, NULL, NULL),
(1, 7, 'Best meal I had this week!', '2024-10-13 11:00:00', 5, NULL, NULL),
(1, 7, 'The service was slow.', '2024-10-14 12:15:00', 3, NULL, NULL),
(1, 8, 'Amazing dessert!', '2024-10-15 13:30:00', 5, NULL, NULL),
(1, 8, 'Too sweet for my taste.', '2024-10-16 14:45:00', 2, NULL, NULL),
(1, 9, 'A must-try dish!', '2024-10-17 15:00:00', 5, NULL, NULL),
(1, 9, 'Not impressed at all.', '2024-10-18 16:15:00', 1, NULL, NULL),
(1, 10, 'Very filling and tasty!', '2024-10-19 17:30:00', 4, NULL, NULL),
(1, 10, 'The atmosphere was great!', '2024-10-20 18:00:00', 5, NULL, NULL),
(1, 1, 'Perfect for lunch!', '2024-10-21 19:30:00', 4, NULL, NULL),
(1, 2, 'Could use more seasoning.', '2024-10-22 20:00:00', 3, NULL, NULL),
(1, 3, 'My favorite place to eat!', '2024-10-23 21:15:00', 5, NULL, NULL),
(1, 4, 'Not fresh at all.', '2024-10-24 22:30:00', 1, NULL, NULL),
(1, 5, 'Wonderful presentation!', '2024-10-25 23:00:00', 5, NULL, NULL),
(1, 6, 'Nice ambiance.', '2024-10-26 09:30:00', 4, NULL, NULL),
(1, 7, 'Too salty for my liking.', '2024-10-27 10:45:00', 2, NULL, NULL),
(1, 8, 'Best pasta I’ve ever had!', '2024-10-28 11:00:00', 5, NULL, NULL),
(1, 9, 'Very disappointing.', '2024-10-29 12:15:00', 1, NULL, NULL),
(1, 10, 'Excellent service and food!', '2024-10-30 13:30:00', 5, NULL, NULL);

