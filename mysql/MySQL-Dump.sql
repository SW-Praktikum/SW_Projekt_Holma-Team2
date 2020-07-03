-- MySQL dump 10.13  Distrib 8.0.20, for macos10.15 (x86_64)
--
-- Host: localhost    Database: holma
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article` (
  `article_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT ' ',
  `creation_date` datetime NOT NULL,
  `group_id` int DEFAULT NULL,
  `last_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`article_id`),
  KEY `group_id` (`group_id`),
  CONSTRAINT `article_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `group` (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5007 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (5000,'Milch','2020-07-02 15:07:23',2000,'2020-07-02 15:07:23'),(5001,'Brot','2020-07-02 15:07:23',2000,'2020-07-02 15:07:23'),(5002,'Fleisch','2020-07-02 15:07:23',2000,'2020-07-02 15:07:23'),(5003,'Banane','2020-07-02 15:07:23',2001,'2020-07-02 15:07:23'),(5004,'Hartweizengries','2020-07-02 15:07:23',2002,'2020-07-02 15:07:23'),(5006,'Shampoo','2020-07-02 15:08:07',2002,'2020-07-02 15:08:07');
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group`
--

DROP TABLE IF EXISTS `group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group` (
  `group_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT ' ',
  `creation_date` datetime NOT NULL,
  `owner` int DEFAULT NULL,
  `last_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`group_id`),
  KEY `owner` (`owner`),
  CONSTRAINT `group_ibfk_1` FOREIGN KEY (`owner`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2005 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group`
--

LOCK TABLES `group` WRITE;
/*!40000 ALTER TABLE `group` DISABLE KEYS */;
INSERT INTO `group` VALUES (2000,'Monaco','2020-07-02 15:05:33',1000,'2020-07-02 15:05:33'),(2001,'Skiurlaub','2020-07-02 15:05:33',1000,'2020-07-02 15:05:33'),(2002,'Familie','2020-07-02 15:05:33',1001,'2020-07-02 15:05:33'),(2003,'HDM Ausfahrt','2020-07-02 15:05:34',1001,'2020-07-02 15:05:34'),(2004,'Beste Freunde','2020-07-02 15:09:35',1002,'2020-07-02 15:09:35');
/*!40000 ALTER TABLE `group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `list_entry`
--

DROP TABLE IF EXISTS `list_entry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `list_entry` (
  `list_entry_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT ' ',
  `creation_date` datetime NOT NULL,
  `purchasing_user` int DEFAULT NULL,
  `amount` float DEFAULT '1',
  `article` int NOT NULL,
  `unit` varchar(100) DEFAULT ' ',
  `retailer` int DEFAULT NULL,
  `standardarticle` tinyint NOT NULL DEFAULT '0',
  `checked` tinyint NOT NULL DEFAULT '0',
  `shopping_list` int NOT NULL,
  `last_updated` datetime DEFAULT NULL,
  `checked_ts` datetime DEFAULT NULL,
  PRIMARY KEY (`list_entry_id`),
  KEY `purchasing_user` (`purchasing_user`),
  KEY `retailer` (`retailer`),
  KEY `shopping_list` (`shopping_list`),
  KEY `article` (`article`),
  CONSTRAINT `list_entry_ibfk_1` FOREIGN KEY (`purchasing_user`) REFERENCES `user` (`user_id`),
  CONSTRAINT `list_entry_ibfk_2` FOREIGN KEY (`retailer`) REFERENCES `retailer` (`retailer_id`),
  CONSTRAINT `list_entry_ibfk_3` FOREIGN KEY (`shopping_list`) REFERENCES `shopping_list` (`shopping_list_id`),
  CONSTRAINT `list_entry_ibfk_4` FOREIGN KEY (`article`) REFERENCES `article` (`article_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4000 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list_entry`
--

LOCK TABLES `list_entry` WRITE;
/*!40000 ALTER TABLE `list_entry` DISABLE KEYS */;
/*!40000 ALTER TABLE `list_entry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `list_entry_group_relations`
--

DROP TABLE IF EXISTS `list_entry_group_relations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `list_entry_group_relations` (
  `list_entry_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`list_entry_id`,`group_id`),
  KEY `group_id` (`group_id`),
  CONSTRAINT `list_entry_group_relations_ibfk_1` FOREIGN KEY (`list_entry_id`) REFERENCES `list_entry` (`list_entry_id`),
  CONSTRAINT `list_entry_group_relations_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `group` (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list_entry_group_relations`
--

LOCK TABLES `list_entry_group_relations` WRITE;
/*!40000 ALTER TABLE `list_entry_group_relations` DISABLE KEYS */;
/*!40000 ALTER TABLE `list_entry_group_relations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `retailer`
--

DROP TABLE IF EXISTS `retailer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `retailer` (
  `retailer_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT ' ',
  `creation_date` datetime NOT NULL,
  `last_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`retailer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9014 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `retailer`
--

LOCK TABLES `retailer` WRITE;
/*!40000 ALTER TABLE `retailer` DISABLE KEYS */;
INSERT INTO `retailer` VALUES (9000,'Marktkauf','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9001,'ALDI','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9002,'Kaufland','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9003,'EDEKA','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9004,'Penny','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9005,'Real','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9006,'REWE','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9007,'Lidl','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9008,'Norma','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9009,'DM','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9010,'Müller','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9011,'Metzger','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9012,'Bäcker','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9013,'Teegut','2021-06-20 20:00:00','2021-06-20 20:00:00');
/*!40000 ALTER TABLE `retailer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopping_list`
--

DROP TABLE IF EXISTS `shopping_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shopping_list` (
  `shopping_list_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT ' ',
  `creation_date` datetime NOT NULL,
  `group_id` int DEFAULT NULL,
  `last_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`shopping_list_id`),
  KEY `group_id` (`group_id`),
  CONSTRAINT `shopping_list_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `group` (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3007 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping_list`
--

LOCK TABLES `shopping_list` WRITE;
/*!40000 ALTER TABLE `shopping_list` DISABLE KEYS */;
INSERT INTO `shopping_list` VALUES (3000,'Wochenenkauf','2020-07-02 15:05:34',2000,'2020-07-02 15:05:34'),(3001,'Silvester','2020-07-02 15:05:34',2001,'2020-07-02 15:05:34'),(3002,'Grillen Samstag','2020-07-02 15:05:34',2000,'2020-07-02 15:05:34'),(3003,'Fahrtverpflegung','2020-07-02 15:05:34',2003,'2020-07-02 15:05:34'),(3004,'Frühstück','2020-07-02 15:05:34',2002,'2020-07-02 15:05:34'),(3005,'Reinorgeln am Samstag','2020-07-02 15:20:12',2004,'2020-07-02 15:20:12'),(3006,'Abschlussball','2020-07-02 15:20:12',2004,'2020-07-02 15:20:12');
/*!40000 ALTER TABLE `shopping_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT ' ',
  `creation_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `email` varchar(100) NOT NULL DEFAULT ' ',
  `google_id` varchar(128) NOT NULL DEFAULT ' ',
  `last_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1003 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1000,'Michael Schumacher','2020-07-02 15:05:33','schumi@ferrari.it','KKD9SY8tF44FtsQuDwu39AEAWIL3','2020-07-02 15:05:33'),(1001,'Nihat Ö','2020-07-02 15:05:33','etwas_beeindruckendes@festgestellt.de','LZ1wBRXZhRz50RqCvPRycz4k4i3O','2020-07-02 15:05:33'),(1002,'Tim Reibe','2020-07-02 15:09:23','mail.timreibe@gmail.com','OP0Eqcb91JTM8iAeGFZjBcw66Ry1','2020-07-02 15:09:23');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_group_relations`
--

DROP TABLE IF EXISTS `user_group_relations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_group_relations` (
  `group_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`group_id`,`user_id`),
  KEY `user_group_relations_ibfk_2` (`user_id`),
  CONSTRAINT `user_group_relations_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `group` (`group_id`),
  CONSTRAINT `user_group_relations_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_group_relations`
--

LOCK TABLES `user_group_relations` WRITE;
/*!40000 ALTER TABLE `user_group_relations` DISABLE KEYS */;
INSERT INTO `user_group_relations` VALUES (2004,1000),(2004,1001),(2004,1002);
/*!40000 ALTER TABLE `user_group_relations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-03 10:29:46
