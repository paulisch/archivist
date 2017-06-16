-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: archivist
-- ------------------------------------------------------
-- Server version	5.7.18-log

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
-- Table structure for table `instrument`
--

DROP TABLE IF EXISTS `instrument`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `instrument` (
  `InstrumentId` int(11) NOT NULL AUTO_INCREMENT,
  `InstrumentName` varchar(45) NOT NULL,
  `Tune` varchar(2) NOT NULL,
  PRIMARY KEY (`InstrumentId`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instrument`
--

LOCK TABLES `instrument` WRITE;
/*!40000 ALTER TABLE `instrument` DISABLE KEYS */;
INSERT INTO `instrument` VALUES (1,'Altsaxophon','Eb'),(2,'Tenorsaxophon','Bb'),(3,'Klarinette','Bb'),(4,'Trompete','Bb'),(5,'Flöte','C'),(6,'Baritonsaxophon','Eb'),(7,'Klarinette','Eb'),(17,'Bassklarinette','Bb'),(18,'Sopransaxophon','Bb'),(19,'Tuba','C'),(20,'Posaune','C'),(21,'Bassposaune','C'),(22,'Horn','F'),(23,'Flügelhorn','Bb'),(24,'Tenorhorn','Bb'),(25,'Große Trommel',''),(26,'Kleine Trommel',''),(27,'Schlagzeug',''),(28,'Xylophon','C'),(29,'Pauke','C'),(30,'Glockenspiel','C'),(31,'Bass','C'),(32,'Bariton','Bb'),(33,'Piccolo','C'),(34,'Oboe','C'),(35,'Fagott','C'),(36,'Euphonium','Bb'),(37,'Sousaphon','C'),(38,'Tuba','F'),(39,'Tuba','Bb'),(40,'Tuba','F'),(41,'Becken',''),(42,'Gong',''),(43,'Tamtam',''),(44,'Bongos',''),(45,'Congas',''),(46,'Triangel',''),(47,'Tamburin',''),(48,'Shaker',''),(49,'Marimbaphon','');
/*!40000 ALTER TABLE `instrument` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-16 13:22:56
