-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 15, 2025 at 02:45 PM
-- Server version: 8.0.29
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `employee_central`
--

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
CREATE TABLE IF NOT EXISTS `employees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `age` int NOT NULL,
  `position` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  `contact_email` varchar(255) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `is_deleted` tinyint(1) DEFAULT '0',
  `created_by` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_by` int DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `uuid`, `name`, `age`, `position`, `department`, `contact_email`, `phone_number`, `status`, `is_deleted`, `created_by`, `created_at`, `updated_by`, `updated_at`, `deleted_by`, `deleted_at`) VALUES
(1, '8d23d85b-8eca-4d5c-8d6f-d290b6370144', 'Acme', 25, 'Develpoer', '1', NULL, NULL, 1, 0, NULL, '2025-01-14 10:09:28', NULL, '2025-01-14 15:39:28', NULL, NULL),
(2, '87f67dae-64ac-4e94-99f7-263c22f2f5d8', 'Acme', 25, 'Develpoer', '1', NULL, NULL, 1, 0, NULL, '2025-01-14 10:28:19', NULL, NULL, NULL, NULL),
(3, 'fc923133-8340-4178-b772-50a977dc323a', 'Acme', 25, 'Develpoer', '1', NULL, NULL, 1, 0, NULL, '2025-01-14 10:28:57', NULL, NULL, NULL, NULL),
(4, 'de0b7a3f-1f2d-4195-abce-e96e7009018f', 'Acme', 25, 'Develpoer', '1', NULL, NULL, 1, 0, NULL, '2025-01-14 10:29:43', NULL, NULL, NULL, NULL),
(5, '910f5372-f408-4ee0-a2bb-778c6475d0d0', 'Acme', 25, 'Develpoer', '1', NULL, NULL, 1, 0, NULL, '2025-01-14 10:32:24', NULL, '2025-01-15 06:02:35', NULL, NULL),
(6, 'b26f7006-d4d9-40fb-9ed6-36d5368a9723', 'test', 89, 'twettwe', '4', 'twet@gmail.com', '14234234234', 1, 1, NULL, '2025-01-14 18:29:06', NULL, '2025-01-15 02:41:13', 0, '2025-01-15 02:46:09'),
(7, '2325f129-e65f-46eb-9610-6361abea4956', 'test', 89, 'twettwe', '4', 'twet@gmail.com', '14234234234', 1, 1, NULL, '2025-01-14 18:29:46', NULL, NULL, 0, '2025-01-15 02:40:34'),
(8, '6353debe-94d2-41be-94ab-500cb0fdce6a', 'test', 42, 'ewrw', '4', 'rwer@gmial.com', '14234234234', 1, 1, NULL, '2025-01-14 18:30:11', NULL, NULL, 0, '2025-01-15 02:40:20'),
(9, '47c900a6-ea6f-4821-84dc-f79f76d411fe', 'werw', 34, '434', '4', 'fsdf@gmail.com', '15345345345', 1, 1, NULL, '2025-01-14 18:35:02', NULL, NULL, 0, '2025-01-15 02:40:15'),
(10, '79aad1d7-b3fa-4d91-a01b-f46813c404ba', 'test', 56, 'hfghfg', '4', 'hf@gmail.com', '15345345534', 1, 1, NULL, '2025-01-14 18:36:39', NULL, NULL, 0, '2025-01-15 02:39:26'),
(11, '4a0ef74f-40c4-45a3-a433-74ba54a0fcb6', 'TEst-12223', 534, 'fdgdfgdf', '4', 'gdfg@gmail.com', '15345345345', 1, 1, NULL, '2025-01-14 18:39:36', NULL, '2025-01-15 02:25:43', 0, '2025-01-15 02:36:19');

-- --------------------------------------------------------

--
-- Table structure for table `log_table`
--

DROP TABLE IF EXISTS `log_table`;
CREATE TABLE IF NOT EXISTS `log_table` (
  `log_id` int NOT NULL AUTO_INCREMENT,
  `action` text NOT NULL,
  `user_id` int DEFAULT NULL,
  `timestamp` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`log_id`),
  KEY `timestamp` (`timestamp`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `log_table`
--

-- --------------------------------------------------------

--
-- Table structure for table `tracking_table`
--

DROP TABLE IF EXISTS `tracking_table`;
CREATE TABLE IF NOT EXISTS `tracking_table` (
  `track_id` int NOT NULL AUTO_INCREMENT,
  `api_endpoint` varchar(255) NOT NULL,
  `request_data` json NOT NULL,
  `response_data` json NOT NULL,
  `status_code` int NOT NULL,
  `timestamp` datetime DEFAULT CURRENT_TIMESTAMP,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`track_id`),
  KEY `timestamp` (`timestamp`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tracking_table`
--

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
