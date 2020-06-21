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
  `group` int DEFAULT NULL,
  `last_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`article_id`),
  KEY `id_idx` (`group`),
  CONSTRAINT `article_ibfk_1` FOREIGN KEY (`group`) REFERENCES `group` (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (1,'Tomaten','2029-05-20 20:00:00',1,'2029-05-20 20:00:00'),(2,'Apfel','2029-05-20 20:00:00',2,'2029-05-20 20:00:00'),(3,'Gurke','2029-05-20 20:00:00',3,'2029-05-20 20:00:00');
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
  `owner` int NOT NULL DEFAULT '0',
  `last_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group`
--

LOCK TABLES `group` WRITE;
/*!40000 ALTER TABLE `group` DISABLE KEYS */;
INSERT INTO `group` VALUES (1,'Strick-Club','2029-05-20 20:00:00',29,'2029-05-20 20:00:00'),(2,'Studium','2029-05-20 20:00:00',30,'2029-05-20 20:00:00'),(3,'Familie-Mustermann','2029-05-20 20:00:00',31,'2029-05-20 20:00:00'),(4,'TestGruppe','2020-06-21 11:26:26',29,'2020-06-21 11:26:26'),(5,'TestGruppe','2020-06-21 11:26:27',29,'2020-06-21 11:26:27'),(6,'Gruppe','2020-06-21 11:27:38',29,'2020-06-21 11:27:38'),(7,'Oma','2020-06-21 11:36:34',29,'2020-06-21 11:36:34'),(8,'Oma','2020-06-21 11:36:37',29,'2020-06-21 11:36:37'),(9,'Formel1','2020-06-21 11:42:15',29,'2020-06-21 11:42:15');
/*!40000 ALTER TABLE `group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listentry`
--

DROP TABLE IF EXISTS `listentry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listentry` (
  `listentry_id` int NOT NULL AUTO_INCREMENT,
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
  PRIMARY KEY (`listentry_id`),
  KEY `purchasing_user` (`purchasing_user`),
  KEY `retailer` (`retailer`),
  KEY `shopping_list` (`shopping_list`),
  KEY `article` (`article`),
  CONSTRAINT `listentry_ibfk_1` FOREIGN KEY (`purchasing_user`) REFERENCES `user` (`user_id`),
  CONSTRAINT `listentry_ibfk_2` FOREIGN KEY (`retailer`) REFERENCES `retailer` (`retailer_id`),
  CONSTRAINT `listentry_ibfk_3` FOREIGN KEY (`shopping_list`) REFERENCES `shoppinglist` (`shoppinglist_id`),
  CONSTRAINT `listentry_ibfk_4` FOREIGN KEY (`article`) REFERENCES `article` (`article_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listentry`
--

LOCK TABLES `listentry` WRITE;
/*!40000 ALTER TABLE `listentry` DISABLE KEYS */;
INSERT INTO `listentry` VALUES (1,'Tomaten','2021-06-20 20:00:00',28,5,1,'kg',1,0,0,1,'2021-06-20 20:00:00'),(2,'Apfel','2021-06-20 20:00:00',29,2,2,'St.',1,0,0,1,'2021-06-20 20:00:00'),(3,'Gurke','2021-06-20 20:00:00',30,1,3,'St.',1,0,0,1,'2021-06-20 20:00:00');
/*!40000 ALTER TABLE `listentry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listentry_group_relations`
--

DROP TABLE IF EXISTS `listentry_group_relations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listentry_group_relations` (
  `listentry_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`listentry_id`,`group_id`),
  KEY `group_id` (`group_id`),
  CONSTRAINT `listentry_group_relations_ibfk_1` FOREIGN KEY (`listentry_id`) REFERENCES `listentry` (`listentry_id`),
  CONSTRAINT `listentry_group_relations_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `group` (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listentry_group_relations`
--

LOCK TABLES `listentry_group_relations` WRITE;
/*!40000 ALTER TABLE `listentry_group_relations` DISABLE KEYS */;
/*!40000 ALTER TABLE `listentry_group_relations` ENABLE KEYS */;
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
-- Table structure for table `shoppinglist`
--

DROP TABLE IF EXISTS `shoppinglist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shoppinglist` (
  `shoppinglist_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT ' ',
  `creation_date` datetime NOT NULL,
  `group` int DEFAULT NULL,
  `last_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`shoppinglist_id`),
  KEY `id_idx` (`group`),
  CONSTRAINT `shoppinglist_ibfk_1` FOREIGN KEY (`group`) REFERENCES `group` (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shoppinglist`
--

LOCK TABLES `shoppinglist` WRITE;
/*!40000 ALTER TABLE `shoppinglist` DISABLE KEYS */;
INSERT INTO `shoppinglist` VALUES (1,'Familien-Wocheneinkauf','2021-06-20 20:00:00',1,'2021-06-20 20:00:00'),(2,'Sommerfest','2021-06-20 20:00:00',2,'2021-06-20 20:00:00'),(3,'50er Geburtstag','2021-06-20 20:00:00',5,'2021-06-20 20:00:00'),(4,'Besuch Oma und Opa','2021-06-20 20:00:00',3,'2021-06-20 20:00:00');
/*!40000 ALTER TABLE `shoppinglist` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (28,'Dennis','2029-05-20 20:00:00','dennis@beispiel.de','1','2029-05-20 20:00:00'),(29,'Jonas','2029-05-20 20:00:00','jonas@beispiel.de','2','2029-05-20 20:00:00'),(30,'Christian','2029-05-20 20:00:00','christian@beispiel.de','3','2029-05-20 20:00:00'),(31,'Yassine','2029-05-20 20:00:00','yassine@beispiel.de','4','2029-05-20 20:00:00'),(32,'Dominik','2029-05-20 20:00:00','dominik@beispiel.de','5','2029-05-20 20:00:00'),(33,'Tim','2029-05-20 20:00:00','tim@beispiel.de','6','2029-05-20 20:00:00'),(34,'Dennis Laßahn','2020-06-21 13:38:14','dennislassahn@outlook.de','NsucPOKIIhVuNQ3Gb0KbnAootv12','2020-06-21 13:38:14');
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
INSERT INTO `user_group_relations` VALUES (1,29),(2,29),(3,29),(4,29),(8,29),(9,29),(3,30);
/*!40000 ALTER TABLE `user_group_relations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'holma'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-21 18:38:49
