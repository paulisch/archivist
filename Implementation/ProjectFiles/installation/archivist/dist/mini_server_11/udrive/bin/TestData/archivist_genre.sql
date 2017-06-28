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
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `genre` (
  `GenreId` int(11) NOT NULL AUTO_INCREMENT,
  `GenreName` varchar(45) NOT NULL,
  `ParentId` int(11) DEFAULT NULL,
  PRIMARY KEY (`GenreId`),
  KEY `fk_Genre_Genre1_idx` (`ParentId`),
  CONSTRAINT `fk_Genre_Genre1` FOREIGN KEY (`ParentId`) REFERENCES `genre` (`GenreId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;
INSERT INTO `genre` VALUES (1,'Jazz',NULL),(2,'Swing',1),(3,'Marsch',NULL),(4,'Polka',NULL),(5,'Schnellpolka',4),(6,'Konzertmarsch',3),(7,'Böhmische Polka',4),(8,'Funk',NULL),(9,'Folk',NULL),(10,'Walzer',NULL),(11,'Weltmusik',NULL),(12,'Pop',NULL),(13,'Reggae',NULL),(14,'Rock',NULL),(15,'Blues',NULL),(16,'Boogie',NULL),(17,'Schlager',NULL),(18,'Soul',NULL),(19,'Weltmusik',NULL),(20,'Wienerlied',NULL),(21,'Soundtrack',NULL),(22,'Klassische Musik',NULL),(23,'Trauermarsch',3),(24,'Prozessionsmarsch',3),(25,'Traditionsmarsch',3),(26,'Dixie',NULL),(27,'Sonstiges',NULL);
/*!40000 ALTER TABLE `genre` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-16 17:35:46
