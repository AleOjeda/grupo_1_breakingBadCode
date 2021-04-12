CREATE TABLE `users` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` TEXT(255) NOT NULL,
	`email` TEXT(255) NOT NULL UNIQUE,
	`password` TEXT NOT NULL,
	`address` TEXT(255),
	`phone` TEXT(255),
	`other_comments` TEXT(255),
	PRIMARY KEY (`id`)
);

CREATE TABLE `frequent_products` (
	`user_id` INT NOT NULL,
	`product_id` INT NOT NULL,
	`quantity` INT NOT NULL,
	PRIMARY KEY (`user_id`,`product_id`)
);

CREATE TABLE `products` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`brand` TEXT NOT NULL,
	`description` TEXT NOT NULL,
	`display` TEXT NOT NULL,
	`image` TEXT NOT NULL,
	`price` TEXT NOT NULL,
	`discount` INT NOT NULL,
	`stock` INT NOT NULL,
	`other_details` TEXT,
	`category_id` INT NOT NULL,
	`sub_category_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `categories` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`category` TEXT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `sub_categories` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`category_id` INT NOT NULL,
	`sub_category` TEXT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `payments` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`user_id` INT NOT NULL,
	`order_id` INT NOT NULL,
	`payment_date` DATE NOT NULL,
	`amount` INT NOT NULL,
	`comments` TEXT,
	PRIMARY KEY (`id`)
);

CREATE TABLE `orders_products` (
	`order_id` INT NOT NULL,
	`product_id` INT NOT NULL,
	`quantity` INT NOT NULL,
	`product_unit_price` TEXT NOT NULL,
	PRIMARY KEY (`order_id`,`product_id`)
);

CREATE TABLE `orders` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`user_id` INT NOT NULL,
	`status` TEXT NOT NULL,
	`required_date` DATE NOT NULL,
	`shipped_date` DATE,
	`comments` TEXT,
	`tracking_number` INT NOT NULL,
	`shipping_address` TEXT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `shopping_cart_items` (
	`user_id` INT NOT NULL,
	`product_id` INT NOT NULL,
	`quantity` INT NOT NULL,
	PRIMARY KEY (`user_id`,`product_id`)
);

ALTER TABLE `frequent_products` ADD CONSTRAINT `frequent_products_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `frequent_products` ADD CONSTRAINT `frequent_products_fk1` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`);

ALTER TABLE `products` ADD CONSTRAINT `products_fk0` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`);

ALTER TABLE `products` ADD CONSTRAINT `products_fk1` FOREIGN KEY (`sub_category_id`) REFERENCES `sub_categories`(`id`);

ALTER TABLE `sub_categories` ADD CONSTRAINT `sub_categories_fk0` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`);

ALTER TABLE `payments` ADD CONSTRAINT `payments_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `payments` ADD CONSTRAINT `payments_fk1` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`);

ALTER TABLE `orders_products` ADD CONSTRAINT `orders_products_fk0` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`);

ALTER TABLE `orders_products` ADD CONSTRAINT `orders_products_fk1` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`);

ALTER TABLE `orders` ADD CONSTRAINT `orders_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `shopping_cart_items` ADD CONSTRAINT `shopping_cart_items_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `shopping_cart_items` ADD CONSTRAINT `shopping_cart_items_fk1` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`);

