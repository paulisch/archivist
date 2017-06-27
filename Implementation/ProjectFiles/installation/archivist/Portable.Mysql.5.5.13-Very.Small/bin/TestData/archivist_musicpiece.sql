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
-- Table structure for table `musicpiece`
--

DROP TABLE IF EXISTS `musicpiece`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `musicpiece` (
  `MusicPieceId` int(11) NOT NULL AUTO_INCREMENT,
  `MusicPieceName` varchar(45) NOT NULL,
  `Difficulty` smallint(1) unsigned DEFAULT NULL,
  `ArchiveNo` varchar(45) DEFAULT NULL,
  `Composer` varchar(45) DEFAULT NULL,
  `GenreId` int(11) NOT NULL,
  PRIMARY KEY (`MusicPieceId`),
  KEY `fk_MusicPiece_Genre1_idx` (`GenreId`),
  CONSTRAINT `fk_MusicPiece_Genre1` FOREIGN KEY (`GenreId`) REFERENCES `genre` (`GenreId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `musicpiece`
--

LOCK TABLES `musicpiece` WRITE;
/*!40000 ALTER TABLE `musicpiece` DISABLE KEYS */;
INSERT INTO `musicpiece` VALUES (1,'In the End it \'s Yellow',2,'','Lorenz Raab',1),(2,'Nutville',3,'','Horace Silver',1),(3,'Dem Land Tirol die Treue',1,'D3','Florian Pedarnig',25),(4,'A Celtic Impression',2,'A1','Darrol Barry',9),(5,'Axel F.',2,'A14','Harold Faltermeyer',14),(6,'Böhmischer Traum',1,'B9','Norbert Gälle',7),(7,'Brucker Lager',2,'B10','Johann Nepomuk',3),(8,'Country Roads',2,'C18','John Denver',12),(9,'Dixieland for Band',2,'D16','Heinz Herrmannsdörfer',26),(10,'Dobs Boogey und St. Luis Blues',2,'D17','Walter Dobschinski',16),(11,'Der Musikerstreik',2,'D21',NULL,27),(12,'Erinnerung an Zirkus Renz',2,'E5',NULL,6),(13,'Florentiner Marsch',3,'F6','Julius Fucik',6),(14,'Gabriellas Song',2,'G1','Stefan Nilsson',12),(15,'Heal the World',2,'H4','Michael Jackson',12),(16,'Hit the Road Jack',3,'H8','Ray Charles',1),(17,'Heidrun-Polka',2,'H13','Franz Watz',4),(18,'Nachtschwärmer',3,'N1','',10),(19,'Pink Panther',2,'P3','Henry Mancini',2),(20,'Pirates of the Caribbean: Dead Man\'s Chest',3,'P4','Hans Zimmer',21);
/*!40000 ALTER TABLE `musicpiece` ENABLE KEYS */;
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
