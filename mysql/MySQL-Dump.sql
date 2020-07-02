-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
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
  KEY `id_idx` (`group_id`),
  CONSTRAINT `article_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `group` (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=506 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (503,'Tomaten','2029-05-20 00:00:00',100,'2029-05-20 00:00:00'),(504,'Apfel','2029-05-20 00:00:00',101,'2029-05-20 00:00:00'),(505,'Gurke','2029-05-20 00:00:00',102,'2029-05-20 00:00:00');
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
  PRIMARY KEY (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group`
--

LOCK TABLES `group` WRITE;
/*!40000 ALTER TABLE `group` DISABLE KEYS */;
INSERT INTO `group` VALUES (100,'Test','2029-05-20 20:00:00',29,'2029-05-20 20:00:00'),(101,'Studium','2029-05-20 20:00:00',30,'2029-05-20 20:00:00'),(102,'Omas von der Müllhalde','2029-05-20 20:00:00',35,'2029-05-20 20:00:00');
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
) ENGINE=InnoDB AUTO_INCREMENT=5004 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list_entry`
--

LOCK TABLES `list_entry` WRITE;
/*!40000 ALTER TABLE `list_entry` DISABLE KEYS */;
INSERT INTO `list_entry` VALUES (5002,'Gurke','2021-06-20 20:00:00',30,1,503,'St.',1,0,0,1,'2021-06-20 20:00:00','2002-07-20 20:00:00'),(5003,'Apfel','2021-06-20 20:00:00',34,1,504,'St.',1,0,0,1,'2021-06-20 20:00:00','2002-07-20 20:00:00');
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
INSERT INTO `list_entry_group_relations` VALUES (5002,101),(5003,102);
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `retailer`
--

LOCK TABLES `retailer` WRITE;
/*!40000 ALTER TABLE `retailer` DISABLE KEYS */;
INSERT INTO `retailer` VALUES (1,'ALDI','2021-06-20 20:00:00','2021-06-20 20:00:00'),(2,'Kaufland','2021-06-20 20:00:00','2021-06-20 20:00:00'),(3,'EDEKA','2021-06-20 20:00:00','2021-06-20 20:00:00'),(4,'Penny','2021-06-20 20:00:00','2021-06-20 20:00:00'),(5,'Real','2021-06-20 20:00:00','2021-06-20 20:00:00'),(6,'REWE','2021-06-20 20:00:00','2021-06-20 20:00:00'),(7,'Lidl','2021-06-20 20:00:00','2021-06-20 20:00:00'),(8,'Norma','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9,'DM','2021-06-20 20:00:00','2021-06-20 20:00:00'),(10,'Müller','2021-06-20 20:00:00','2021-06-20 20:00:00'),(11,'Metzger','2021-06-20 20:00:00','2021-06-20 20:00:00'),(12,'Bäcker','2021-06-20 20:00:00','2021-06-20 20:00:00'),(13,'Teegut','2021-06-20 20:00:00','2021-06-20 20:00:00'),(14,'Marktkauf','2021-06-20 20:00:00','2021-06-20 20:00:00');
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
  KEY `id_idx` (`group_id`),
  CONSTRAINT `shopping_list_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `group` (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping_list`
--

LOCK TABLES `shopping_list` WRITE;
/*!40000 ALTER TABLE `shopping_list` DISABLE KEYS */;
INSERT INTO `shopping_list` VALUES (1,'Familieneinkauf','2002-07-20 20:00:00',101,'2002-07-20 20:00:00'),(2,'Familie-Maier','2002-07-20 20:00:00',102,'2002-07-20 20:00:00');
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
) ENGINE=InnoDB AUTO_INCREMENT=1002 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (28,'Dennis','2029-05-20 20:00:00','dennis@beispiel.de','1','2029-05-20 20:00:00'),(29,'Jonas','2029-05-20 20:00:00','jonas@beispiel.de','2','2029-05-20 20:00:00'),(30,'Christian','2029-05-20 20:00:00','christian@beispiel.de','3','2029-05-20 20:00:00'),(31,'Yassine','2029-05-20 20:00:00','yassine@beispiel.de','4','2029-05-20 20:00:00'),(32,'Dominik','2029-05-20 20:00:00','dominik@beispiel.de','5','2029-05-20 20:00:00'),(34,'Dennis Laßahn','2020-06-21 13:38:14','dennislassahn@outlook.de','NsucPOKIIhVuNQ3Gb0KbnAootv12','2020-06-21 13:38:14'),(46,'Da','2020-06-23 11:19:50','Dsa','123ad','2020-06-23 11:19:50'),(47,'DaDa','2020-06-23 12:15:41','123dawd','123ad','2020-06-29 15:41:47'),(48,'Grau','2020-06-29 15:48:46','Graui','fadfsf','2020-06-29 15:48:46'),(49,'Grau','2020-06-29 15:48:50','Graui','fadfsf','2020-06-29 15:48:50'),(1000,'Dominik K.','2020-07-01 12:39:21','dk108@hdm-stuttgart.de','aKShDCNsHvYGBFZ3XRN7tEyPLki2','2020-07-01 12:39:21'),(1001,'Torsten','2029-05-20 00:00:00','beispiel@web.de','100','2029-05-20 00:00:00');
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
INSERT INTO `user_group_relations` VALUES (100,1000),(101,1001);
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

-- Dump completed on 2020-07-02 10:06:40
