-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema archivist
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema archivist
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `archivist` DEFAULT CHARACTER SET utf8 ;
USE `archivist` ;

-- -----------------------------------------------------
-- Table `archivist`.`Genre`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `archivist`.`Genre` (
  `GenreId` INT NOT NULL AUTO_INCREMENT,
  `GenreName` VARCHAR(45) NOT NULL,
  `ParentId` INT NULL,
  PRIMARY KEY (`GenreId`),
  INDEX `fk_Genre_Genre1_idx` (`ParentId` ASC),
  CONSTRAINT `fk_Genre_Genre1`
    FOREIGN KEY (`ParentId`)
    REFERENCES `archivist`.`Genre` (`GenreId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `archivist`.`MusicPiece`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `archivist`.`MusicPiece` (
  `MusicPieceId` INT NOT NULL AUTO_INCREMENT,
  `MusicPieceName` VARCHAR(45) NOT NULL,
  `Difficulty` SMALLINT(1) UNSIGNED NULL,
  `ArchiveNo` VARCHAR(45) NULL,
  `Composer` VARCHAR(45) NULL,
  `GenreId` INT NOT NULL,
  PRIMARY KEY (`MusicPieceId`),
  INDEX `fk_MusicPiece_Genre1_idx` (`GenreId` ASC),
  CONSTRAINT `fk_MusicPiece_Genre1`
    FOREIGN KEY (`GenreId`)
    REFERENCES `archivist`.`Genre` (`GenreId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `archivist`.`Instrument`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `archivist`.`Instrument` (
  `InstrumentId` INT NOT NULL AUTO_INCREMENT,
  `InstrumentName` VARCHAR(45) NOT NULL,
  `Tune` VARCHAR(2) NOT NULL,
  PRIMARY KEY (`InstrumentId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `archivist`.`Score`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `archivist`.`Score` (
  `ScoreId` INT NOT NULL AUTO_INCREMENT,
  `MusicPieceId` INT NOT NULL,
  `InstrumentId` INT NOT NULL,
  `FileName` VARCHAR(45) NOT NULL,
  `InstrumentNo` INT NOT NULL,
  PRIMARY KEY (`ScoreId`),
  INDEX `fk_MusicPiece_has_Instrument_Instrument1_idx` (`InstrumentId` ASC),
  INDEX `fk_MusicPiece_has_Instrument_MusicPiece1_idx` (`MusicPieceId` ASC),
  CONSTRAINT `fk_MusicPiece_has_Instrument_MusicPiece1`
    FOREIGN KEY (`MusicPieceId`)
    REFERENCES `archivist`.`MusicPiece` (`MusicPieceId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_MusicPiece_has_Instrument_Instrument1`
    FOREIGN KEY (`InstrumentId`)
    REFERENCES `archivist`.`Instrument` (`InstrumentId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;