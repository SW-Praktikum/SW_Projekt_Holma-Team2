-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: holma
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
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
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT ' ',
  `creation_date` datetime NOT NULL,
  `group_id` int DEFAULT NULL,
  `last_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`article_id`),
  KEY `group_id` (`group_id`),
  CONSTRAINT `article_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `group` (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5020 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (5019,'Mehl','2020-07-21 15:52:30',2008,'2020-07-21 15:52:30');
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
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT ' ',
  `creation_date` datetime NOT NULL,
  `owner` int DEFAULT NULL,
  `last_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`group_id`),
  KEY `owner` (`owner`),
  CONSTRAINT `group_ibfk_1` FOREIGN KEY (`owner`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2009 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group`
--

LOCK TABLES `group` WRITE;
/*!40000 ALTER TABLE `group` DISABLE KEYS */;
INSERT INTO `group` VALUES (2007,'Fußballverein','2020-07-21 15:46:24',1003,'2020-07-21 15:46:24'),(2008,'Familie','2020-07-21 15:50:45',1003,'2020-07-21 15:50:45');
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
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT ' ',
  `creation_date` datetime NOT NULL,
  `purchasing_user` int DEFAULT NULL,
  `amount` float DEFAULT '1',
  `article` int NOT NULL,
  `unit` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT ' ',
  `retailer` int DEFAULT NULL,
  `standardarticle` tinyint NOT NULL DEFAULT '0',
  `checked` tinyint NOT NULL DEFAULT '0',
  `shopping_list` int DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=4072 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list_entry`
--

LOCK TABLES `list_entry` WRITE;
/*!40000 ALTER TABLE `list_entry` DISABLE KEYS */;
INSERT INTO `list_entry` VALUES (4071,'Mehl','2020-07-21 15:52:41',1003,1,5019,'kg',9000,0,1,3014,'2020-07-21 15:52:58','2020-07-21 13:52:58');
/*!40000 ALTER TABLE `list_entry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `retailer`
--

DROP TABLE IF EXISTS `retailer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `retailer` (
  `retailer_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT ' ',
  `creation_date` datetime NOT NULL,
  `last_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`retailer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9041 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `retailer`
--

LOCK TABLES `retailer` WRITE;
/*!40000 ALTER TABLE `retailer` DISABLE KEYS */;
INSERT INTO `retailer` VALUES (9000,'Aldi Nord','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9001,'Aldi Süd','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9002,'Alnatura','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9003,'Apotheke','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9004,'Bäcker','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9005,'Basic','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9006,'Bauer','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9007,'Billa','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9008,'Carrefour','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9009,'Denns','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9010,'DM','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9011,'Edeka','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9012,'Fressnapf','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9013,'Globus','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9014,'Grüner Markt','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9015,'Hamberger','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9016,'Kaufland','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9017,'Kroger','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9018,'Lekkerland','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9019,'Lidl','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9020,'Markt','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9021,'Markthalle','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9022,'Marktkauf','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9023,'Metro','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9024,'Metzger','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9025,'Mix Markt','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9026,'Müller','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9027,'Naturgut','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9028,'Netto','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9029,'Norma','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9030,'Penny','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9031,'Pro Biomarkt','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9032,'Real','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9033,'REWE','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9034,'REWE City','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9035,'Selgros','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9036,'Supermarkt','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9037,'Tankstelle','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9038,'Tesco','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9039,'Teegut','2021-06-20 20:00:00','2021-06-20 20:00:00'),(9040,'Sonstige','2021-06-20 20:00:00','2021-06-20 20:00:00');
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
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT ' ',
  `creation_date` datetime NOT NULL,
  `group_id` int DEFAULT NULL,
  `last_updated` datetime DEFAULT NULL,
  `archived` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`shopping_list_id`),
  KEY `group_id` (`group_id`),
  CONSTRAINT `shopping_list_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `group` (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3015 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping_list`
--

LOCK TABLES `shopping_list` WRITE;
/*!40000 ALTER TABLE `shopping_list` DISABLE KEYS */;
INSERT INTO `shopping_list` VALUES (3013,'25-jähriges Jubiläum','2020-07-21 15:49:08',2007,'2020-07-21 15:49:08',0),(3014,'Wocheneinkauf 20.07','2020-07-21 15:52:13',2008,'2020-07-21 15:52:13',0);
/*!40000 ALTER TABLE `shopping_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `standard_article_group_relations`
--

DROP TABLE IF EXISTS `standard_article_group_relations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `standard_article_group_relations` (
  `list_entry_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`list_entry_id`,`group_id`),
  KEY `group_id` (`group_id`),
  CONSTRAINT `standard_article_group_relations_ibfk_1` FOREIGN KEY (`list_entry_id`) REFERENCES `list_entry` (`list_entry_id`),
  CONSTRAINT `standard_article_group_relations_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `group` (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `standard_article_group_relations`
--

LOCK TABLES `standard_article_group_relations` WRITE;
/*!40000 ALTER TABLE `standard_article_group_relations` DISABLE KEYS */;
/*!40000 ALTER TABLE `standard_article_group_relations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT ' ',
  `creation_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT ' ',
  `google_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT ' ',
  `last_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1011 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1000,'Michael Schumacher','2020-07-02 15:05:33','schumi@ferrari.it','KKD9SY8tF44FtsQuDwu39AEAWIL3','2020-07-02 15:05:33'),(1001,'Nihat Ö','2020-07-02 15:05:33','etwas_beeindruckendes@festgestellt.de','LZ1wBRXZhRz50RqCvPRycz4k4i3O','2020-07-02 15:05:32'),(1002,'Tim Reibe','2020-07-02 15:09:23','mail.timreibe@gmail.com','OP0Eqcb91JTM8iAeGFZjBcw66Ry1','2020-07-02 15:09:23'),(1003,'Dominik K.','2020-07-21 08:48:19','dk108@hdm-stuttgart.de','aKShDCNsHvYGBFZ3XRN7tEyPLki2','2020-07-21 08:48:19'),(1004,'Angela Merköl','2020-07-02 15:05:33','angela@cdu.de','Ui1wBwasDSjsadjiJD2PRycz4k4i3O','2020-07-02 15:05:33'),(1005,'Fartin Morster','2020-07-02 15:05:33','morster@hotmail.de','LowWJsatF44FtsQuDwu39AasWIL3','2020-07-02 15:05:31'),(1006,'Alina Hofner','2020-07-02 15:05:33','17_Semester@Regelstudienzeit.de','AsdkkwkqsDSjsadjiJD2PRycz4k4i3O','2020-07-02 15:05:21'),(1007,'Friedrich Januar','2020-07-02 15:05:33','Januar@Kalt.de','iawdatF44FtsQu212Dwu39warijaif3','2020-07-02 15:05:21'),(1008,'Helmut Brokkoli','2020-07-02 15:05:33','Helmut_Brokkoli@mail.de','LowWJsatF44FtsQuDwu39AasWIL3','2020-07-02 17:01:22'),(1009,'Karl Lass-Ess','2020-07-02 15:05:33','Komm_in_die@Gruppe.de','WoroakKAsDSjsadjiJD2PRycz4k4i3O','2020-07-02 14:05:33'),(1010,'Jens Spreißel','2020-07-02 15:05:33','Sreißel@aua.com','asdWJsatF44FtsQuDwu39AasWIL3','2020-07-02 15:05:12');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_group_relations`
--

LOCK TABLES `user_group_relations` WRITE;
/*!40000 ALTER TABLE `user_group_relations` DISABLE KEYS */;
INSERT INTO `user_group_relations` VALUES (2007,1000),(2007,1001),(2007,1002),(2008,1002),(2007,1003),(2008,1003),(2007,1004);
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

-- Dump completed on 2020-07-21 16:07:07
