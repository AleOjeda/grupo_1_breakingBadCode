-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: marketfy_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.17-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` text NOT NULL,
  `path` text NOT NULL,
  `icon` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Almacén','almacen','../../../img/groceries.png'),(2,'Bebidas','bebidas','../../../img/groceries.png'),(3,'Carnes','carnes','../../../img/groceries.png'),(4,'Limpieza','limpieza','../../../img/groceries.png'),(5,'Golosinas','golosinas','../../../img/groceries.png'),(6,'Congelados','congelados','../../../img/groceries.png'),(7,'Lácteos y quesos','lacteos-quesos','../../../img/groceries.png'),(8,'Fiambres','fiambres','../../../img/groceries.png');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frequent_products`
--

DROP TABLE IF EXISTS `frequent_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `frequent_products` (
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`product_id`),
  KEY `frequent_products_fk1` (`product_id`),
  CONSTRAINT `frequent_products_fk0` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `frequent_products_fk1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frequent_products`
--

LOCK TABLES `frequent_products` WRITE;
/*!40000 ALTER TABLE `frequent_products` DISABLE KEYS */;
/*!40000 ALTER TABLE `frequent_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `status` text NOT NULL,
  `required_date` date NOT NULL,
  `shipped_date` date DEFAULT NULL,
  `comments` text DEFAULT NULL,
  `tracking_number` int(11) NOT NULL,
  `shipping_address` text NOT NULL,
  `total` int(11) NOT NULL,
  `userOrder` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_fk0` (`user_id`),
  CONSTRAINT `orders_fk0` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,'pedido','2021-03-19','0000-00-00','Entregar en puerta',20000145,'Tarapaca 890',10000,1),(2,1,'Entregado','0000-00-00','0000-00-00','Entregar en la puerta',20000146,'Tarapaca 890',8100,2);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders_products`
--

DROP TABLE IF EXISTS `orders_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders_products` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `product_unit_price` text NOT NULL,
  PRIMARY KEY (`order_id`,`product_id`),
  KEY `orders_products_fk1` (`product_id`),
  CONSTRAINT `orders_products_fk0` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `orders_products_fk1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders_products`
--

LOCK TABLES `orders_products` WRITE;
/*!40000 ALTER TABLE `orders_products` DISABLE KEYS */;
INSERT INTO `orders_products` VALUES (1,3,4,'1800'),(1,18,2,'1400'),(2,2,3,'2000'),(2,3,2,'1050');
/*!40000 ALTER TABLE `orders_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `payment_date` date NOT NULL,
  `amount` int(11) NOT NULL,
  `comments` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `payments_fk0` (`user_id`),
  KEY `payments_fk1` (`order_id`),
  CONSTRAINT `payments_fk0` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `payments_fk1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `brand` text NOT NULL,
  `description` text NOT NULL,
  `display` text NOT NULL,
  `image` text NOT NULL,
  `price` text NOT NULL,
  `discount` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `other_details` text DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `sub_category_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `products_fk0` (`category_id`),
  KEY `products_fk1` (`sub_category_id`),
  CONSTRAINT `products_fk0` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `products_fk1` FOREIGN KEY (`sub_category_id`) REFERENCES `sub_categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Natura','Aceite de maravilla botella','1 L','/img/productos/product-0000000000001','1750',5,3,'',1,1),(2,'Kraft','Mayonesa Frasco','397 gr','/img/productos/product-0000000000002','2042',50,5,'',1,2),(3,'Miraflores','Arroz Grano Largo Ancho Grado 1','1 Kg','/img/productos/product-0000000000003','1086',0,9,'',1,3),(4,'Maggi','Caldo de Gallina Caja','132 gr','/img/productos/product-0000000000004','890',0,5,'',1,4),(5,'Van Camp\'s','Atún Lomitos en Aceite','160 gr','/img/productos/product-0000000000005','990',0,11,'',1,5),(6,'Nescafé','Café instantáneo Tradición tarro','250 gr','/img/productos/product-0000000000006','5380',0,4,'',1,6),(7,'Selecta','Harina sin Polvos de Hornear Bolsa','1 Kg','/img/productos/product-0000000000007','891',0,6,'',1,7),(8,'Cintazul','Huevo Blanco Mediano','30 Un','/img/productos/product-0000000000008','3710',0,17,'',1,8),(9,'Carozzi','Pasta Vitaminizada Tallarín 87 Bolsa','1 Kg','/img/productos/product-0000000000009','1581',0,18,'',1,9),(10,'Selecta','Queque Vainilla','450 gr','/img/productos/product-0000000000010','1488',0,16,'',1,10),(11,'Pomarola','Salsa de Tomate Italiana Doypack','800 gr','/img/productos/product-0000000000011','950',0,14,'',1,11),(12,'Lobos','Sal de Mesa Bolsa','1 Kg','/img/productos/product-0000000000012','318',0,14,'',1,12),(13,'Lays','Papas Fritas Corte Americano','380 gr','/img/productos/product-0000000000013','1813',0,10,'',1,13),(14,'Benedictino','Agua purificada sin gas','6,5 L','/img/productos/product-0000000000014','1466',0,16,'',2,14),(15,'Cachantun','Agua sin Gas Sabor Granada Botella','500 cc','/img/productos/product-0000000000015','644',0,15,'',2,15),(16,'Aperol','Licor Aperitivo Infusión Botella','750 cc','/img/productos/product-0000000000016','9108',0,3,'',2,16),(17,'Monster','Bebida Energizante Regular','470 ml','/img/productos/product-0000000000017','1348',0,9,'',2,17),(18,'Coca-Cola','Bebida sin Azúcar','1,5 L','/img/productos/product-0000000000018','1494',0,16,'0',2,18),(19,'Watt\'s','Néctar de Naranja Light 0% Azúcar Añadida','1,5 L','/img/productos/product-0000000000019','1054',0,10,'0',2,19),(20,'El Buen Corte','Carne Molida 10%','500 gr','/img/productos/product-0000000000020','3254',0,1,'',3,20),(21,'Super Cerdo','Pulpa Pierna','900 gr','/img/productos/product-0000000000021','4694',0,14,'',3,21),(22,'San Jorge','Chorizos Receta Tradicional','1 Kg','/img/productos/product-0000000000022','3026',0,1,'',3,22),(23,'Cif','Cif Limpiador original crema','750 Gr','/img/productos/product-0000000000023','920',0,5,'',4,23),(24,'Omo','Detergente Polvo Multiacción','5 Kg','/img/productos/product-0000000000024','9154',0,12,'',4,24),(25,'Glade','Desodorante Ambiental Mañana de Campo','420 cc','/img/productos/product-0000000000025','1548',0,11,'',4,25),(26,'Raid','Insecticida Max Mata Arañas','360 cc','/img/productos/product-0000000000026','3514',0,9,'',4,26),(27,'Clorox','Cloro Gel pureza Citrica Frasco','900 ml','/img/productos/product-0000000000027','1421',0,20,'',4,27),(28,'Lysoform','Pack Pastillas para Estanque Inodoro','3 Un','/img/productos/product-0000000000028','3021',0,16,'',4,28),(29,'Cif','Cif Limpiador original crema','750 Gr','/img/productos/product-0000000000023','930',0,11,'',4,29),(30,'Poett','Limpiador Liquido Concentrado Lavanda Botella','4 L','/img/productos/product-0000000000030','3645',0,9,'',4,30),(31,'Cif','Cif Limpiador original crema','750 Gr','/img/productos/product-0000000000023','980',0,15,'',4,31),(32,'Elite','Papel Higiénico Elite Ultra Doble Hoja 12 Un 50 mt','12 Un','/img/productos/product-0000000000032','6741',0,5,'',4,32),(33,'Nutra Bien','Alfajor Chileno Dulce de leche','270 gr','/img/productos/product-0000000000033','1738',0,13,'',5,33),(34,'Costa','Barritas De Cereal Con Chips de Chocolate','168 gr','/img/productos/product-0000000000034','900',0,17,'',5,34),(35,'Ambrosoli','Caramelo Arbolito','430 gr','/img/productos/product-0000000000035','1702',0,1,'',5,35),(36,'Nestlé','Chocolate Trencito','150 gr','/img/productos/product-0000000000036','1440',0,16,'',5,36),(37,'El Almendro','Turron Duro','75 gr','/img/productos/product-0000000000037','2254',0,16,'',5,37),(38,'El Golfo','Salmon En Porciones Congelado','500 gr','/img/productos/product-0000000000038','4740',0,3,'',6,38),(39,'Super Pollo','Pechuga De Pollo Deshuesada Congelada','700 gr','/img/productos/product-0000000000039','2961',0,13,'',6,39),(40,'La Crianza','Hamburguesa Vacuno Premium','10 Un de 100 gr c/u','/img/productos/product-0000000000040','5380',0,1,'',6,40),(41,'Savory','Helado de Leche Sabor Chirimoya Alegre','1 L','/img/productos/product-0000000000041','2162',0,15,'',6,41),(42,'Super Cerdo','Medallon Lomo Centro','750 gr','/img/productos/product-0000000000042','4840',0,1,'',6,42),(43,'Frutos del Maipo','Papas Pre-Fritas','1 Kg','/img/productos/product-0000000000043','2998',0,9,'',6,43),(44,'Frutos Del Maipo','Choclos En Granos','500 gr','/img/productos/product-0000000000044','1406',0,1,'',6,44),(45,'Nestlé','Crema de Leche Caja','200 cc','/img/productos/product-0000000000045','742',0,9,'',7,45),(46,'Nestlé','Manjar Bolsa','1 Kg','/img/productos/product-0000000000046','2930',0,7,'',7,46),(47,'Colun','Leche Blanca Descremada','1 L','/img/productos/product-0000000000047','780',0,20,'',7,47),(48,'Lefersa','Levadura Seca','250 gr','/img/productos/product-0000000000048','3118',0,16,'',7,48),(49,'Soprole','Margarina','250 gr','/img/productos/product-0000000000049','576',0,7,'',7,49),(50,'Colun','Flan Vainilla Postre','100 gr','/img/productos/product-0000000000050','237',0,4,'',7,50),(51,'Quilque','Queso Mantecoso laminado','500 gr','/img/productos/product-0000000000051','3411',0,12,'',7,51),(52,'Colun','Yogurt Batido Sabor Frutilla Bolsa','1 Kg','/img/productos/product-0000000000052','1106',0,3,'',7,52),(53,'La Preferida','Jamón Pierna','200 gr','/img/productos/product-0000000000053','2014',0,10,'',8,53),(54,'Receta del Abuelo','Salchichas Premium (10 un)','500 gr','/img/productos/product-0000000000054','2934',0,4,'',8,54);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopping_cart_items`
--

DROP TABLE IF EXISTS `shopping_cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shopping_cart_items` (
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`product_id`),
  KEY `shopping_cart_items_fk1` (`product_id`),
  CONSTRAINT `shopping_cart_items_fk0` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `shopping_cart_items_fk1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping_cart_items`
--

LOCK TABLES `shopping_cart_items` WRITE;
/*!40000 ALTER TABLE `shopping_cart_items` DISABLE KEYS */;
INSERT INTO `shopping_cart_items` VALUES (1,1,3),(1,2,6),(1,3,5),(1,4,3),(1,17,5),(2,5,6),(2,6,3),(2,8,3),(2,9,3),(2,10,3);
/*!40000 ALTER TABLE `shopping_cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_categories`
--

DROP TABLE IF EXISTS `sub_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sub_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `sub_category` text NOT NULL,
  `path` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sub_categories_fk0` (`category_id`),
  CONSTRAINT `sub_categories_fk0` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_categories`
--

LOCK TABLES `sub_categories` WRITE;
/*!40000 ALTER TABLE `sub_categories` DISABLE KEYS */;
INSERT INTO `sub_categories` VALUES (1,1,'Aceites y vinagres','aceites-vinagres'),(2,1,'Aderezos','aderezos'),(3,1,'Arroz y legumbres','arroz-legumbres'),(4,1,'Caldos, sopas, puré y bolsas para horno','caldos-sopas-pure'),(5,1,'Conservas','conservas'),(6,1,'Desayunos y meriendas','desayunos-meriendas'),(7,1,'Harinas, premezclas','harinas-premezclas'),(8,1,'Huevos','huevos'),(9,1,'Pastas','pastas'),(10,1,'Polvos y preparaciones','polvos'),(11,1,'Puré y salsas de tomate','salsas-tomate'),(12,1,'Sal, pimienta y especias','especias'),(13,1,'Snacks','snacks'),(14,2,'Aguas','aguas'),(15,2,'Aguas saborizadas','aguas-saborizadas'),(16,2,'Aperitivos','aperitivos'),(17,2,'Energizantes/Isotónicas','energizantes-isotonicas'),(18,2,'Gaseosas','gaseosas'),(19,2,'Jugos','jugos'),(20,3,'Carne Vacuna','carne-vacuna'),(21,3,'Carne de cerdo','carne-cerdo'),(22,3,'Chorizos y Morcillas','chorizos-morcillas'),(23,4,'Accesorios de limpieza','accesorios'),(24,4,'Cuidado de la ropa y calzado','ropa-calzado'),(25,4,' Desodorantes de ambiente ','ambiente'),(26,4,' Insecticidas ','insecticidas'),(27,4,' Lavandinas/Cloro ','lavandina-cloro'),(28,4,' Limpieza de baño ','baño'),(29,4,' Limpieza de cocina ','cocina'),(30,4,' Limpieza de pisos y muebles ','pisos-muebles'),(31,4,' Limpieza de hogar ','hogar'),(32,4,' Papeles ','papeles'),(33,5,' Alfajores','alfajores'),(34,5,' Barras de cereal','barras-cereal'),(35,5,'Caramelos',' gomitas y chupetines\"'),(36,5,' Chocolates','chocolates'),(37,5,' Turrones','turrones'),(38,6,' Congelados de Pescado y Mariscos','pescado-mariscos'),(39,6,' Congelados de pollo','pollo'),(40,6,' Hamburguesas','hamburguesas'),(41,6,' Helados y postres','helados-postres'),(42,6,' Medallones','medallones'),(43,6,' Papas Fritas Congeladas','papas-fritas'),(44,6,' Vegetales Congelados','vegetales'),(45,7,' Cremas','cremas'),(46,7,' Dulce de leche','dulce-de-leche'),(47,7,' Leches','leches'),(48,7,' Levaduras','levaduras'),(49,7,' Mantecas y margarinas','mantecas-margarinas'),(50,7,'Postres',' gelatinas'),(51,7,' Quesos','quesos'),(52,7,' Yogures','yogures'),(53,8,' Fiambres','fiambres'),(54,8,' Salchichas','salchichas'),(55,1,'Ver Todo','ver-todo'),(56,2,'Ver Todo','ver-todo'),(57,3,'Ver Todo','ver-todo'),(58,4,'Ver Todo','ver-todo'),(59,5,'Ver Todo','ver-todo'),(60,6,'Ver Todo','ver-todo'),(61,7,'Ver Todo','ver-todo'),(62,8,'Ver Todo','ver-todo');
/*!40000 ALTER TABLE `sub_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `address` text DEFAULT NULL,
  `phone` text DEFAULT NULL,
  `other_comments` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`) USING HASH
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Alejandro Ojeda','ale@marketfy.com','$2a$10$1RPr6AEHOuE6O0NqdbX3VODbK90Fvm7LAa0HCY0olJOyKtj70vE1i',NULL,NULL,NULL),(2,'Test1234','Test1234@marketfy.com','$2a$10$LujO8skZL/YJ8w0W/Wq.0.s8NDMtmKd.KpNTPrTloqheHYju5Q5mq',NULL,NULL,NULL),(3,'Test Name','ale@hotmail','$2a$10$pKVqWhVJnuHiPGG/VHryyeBYMFJJdQ.2B1b8dDZLS.9tI6I4j9B62',NULL,NULL,NULL),(5,'Alexis','alexis@hotmail.com','$2a$10$a6dnloiwUnWv8MeOIR9CYOfIz0ig0SLkcHgltI0OEP3NY0empSpqK',NULL,NULL,NULL),(6,'Jass','jass@hotmail.com','$2a$10$xflpfRpqcS43hW/VSdpoc.0bpUx.ZRvDdYnXFpGk/MwXwCNhRX1Ea',NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'marketfy_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-02 16:34:36
