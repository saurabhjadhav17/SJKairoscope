-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 25, 2020 at 07:50 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kairoscope`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email_id` text NOT NULL,
  `address` text NOT NULL,
  `qualification` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`username`, `password`, `name`, `email_id`, `address`, `qualification`) VALUES
('admin', 'secret', 'Lakshu Pawar', 'thekairoscope@gmail.com', 'ector - 21, Kharghar, Navi-Mumbai', 'Bachelors in Fine Arts (Applied Art - Photography) Rachna Sansad College Of Applid Art, Mumbai');

-- --------------------------------------------------------

--
-- Table structure for table `completed_orders`
--

CREATE TABLE `completed_orders` (
  `order_id` int(20) NOT NULL,
  `client_name` varchar(50) NOT NULL,
  `client_contact` varchar(50) NOT NULL,
  `client_email_id` text NOT NULL,
  `client_address` varchar(200) NOT NULL,
  `event_type` varchar(50) NOT NULL,
  `order_date` date NOT NULL,
  `event_date` date NOT NULL,
  `time_FROM` time NOT NULL,
  `time_TO` time NOT NULL,
  `event_address` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `completed_orders`
--

INSERT INTO `completed_orders` (`order_id`, `client_name`, `client_contact`, `client_email_id`, `client_address`, `event_type`, `order_date`, `event_date`, `time_FROM`, `time_TO`, `event_address`) VALUES
(2, 'Trupti Tekawade', '9004803301', 'truptitekawade@gmail.com', 'Dadar Mumbai', 'Pre-Wedding', '0000-00-00', '0000-00-00', '16:00:00', '20:00:00', 'Parel Mumbai');

-- --------------------------------------------------------

--
-- Table structure for table `confirm_orders`
--

CREATE TABLE `confirm_orders` (
  `order_id` int(20) NOT NULL,
  `client_name` varchar(50) NOT NULL,
  `client_contact` varchar(50) NOT NULL,
  `client_email_id` text NOT NULL,
  `client_address` varchar(200) NOT NULL,
  `event_type` varchar(50) NOT NULL,
  `order_date` date NOT NULL,
  `event_date` date NOT NULL,
  `time_FROM` time NOT NULL,
  `time_TO` time NOT NULL,
  `event_address` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `event_id` int(20) NOT NULL,
  `event_type` varchar(50) NOT NULL,
  `event_cost` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`event_id`, `event_type`, `event_cost`) VALUES
(1, 'Pre-Wedding', 6000),
(2, 'Wedding', 15000),
(3, 'Engagement', 8000),
(4, 'Maternity', 7000),
(5, 'Babyshoot', 9000);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(20) NOT NULL,
  `client_name` varchar(50) NOT NULL,
  `client_contact` varchar(50) NOT NULL,
  `client_email_id` text NOT NULL,
  `client_address` varchar(100) NOT NULL,
  `event_id_fk` int(11) NOT NULL,
  `order_date` date NOT NULL,
  `event_date` date NOT NULL,
  `time_FROM` time NOT NULL,
  `time_TO` time NOT NULL,
  `event_address` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `client_name`, `client_contact`, `client_email_id`, `client_address`, `event_id_fk`, `order_date`, `event_date`, `time_FROM`, `time_TO`, `event_address`) VALUES
(4, 'Shriram Bhagwatwar', '9865322154', 'sabhagwatwar@gmail.com', 'Antop Hill Wadala', 5, '2020-04-25', '2020-04-28', '11:00:00', '15:00:00', 'CST Mumbai');

-- --------------------------------------------------------

--
-- Stand-in structure for view `pending_orders`
-- (See below for the actual view)
--
CREATE TABLE `pending_orders` (
`order_id` int(20)
,`client_name` varchar(50)
,`client_contact` varchar(50)
,`client_email_id` text
,`client_address` varchar(100)
,`order_date` date
,`event_date` date
,`time_FROM` time
,`time_TO` time
,`event_address` text
,`event_type` varchar(50)
);

-- --------------------------------------------------------

--
-- Table structure for table `photograph`
--

CREATE TABLE `photograph` (
  `photo_id` int(11) NOT NULL,
  `image` varchar(225) NOT NULL,
  `event_id_fk` int(20) NOT NULL,
  `event_type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `photograph`
--

INSERT INTO `photograph` (`photo_id`, `image`, `event_id_fk`, `event_type`) VALUES
(1, '', 1, 'Pre-Wedding'),
(2, '', 2, 'Wedding'),
(3, '', 3, 'Engagement'),
(4, '', 4, 'Maternity'),
(5, '', 5, 'Babyshoot');

-- --------------------------------------------------------

--
-- Structure for view `pending_orders`
--
DROP TABLE IF EXISTS `pending_orders`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `pending_orders`  AS  select `o`.`order_id` AS `order_id`,`o`.`client_name` AS `client_name`,`o`.`client_contact` AS `client_contact`,`o`.`client_email_id` AS `client_email_id`,`o`.`client_address` AS `client_address`,`o`.`order_date` AS `order_date`,`o`.`event_date` AS `event_date`,`o`.`time_FROM` AS `time_FROM`,`o`.`time_TO` AS `time_TO`,`o`.`event_address` AS `event_address`,`e`.`event_type` AS `event_type` from (`orders` `o` join `event` `e` on(`o`.`event_id_fk` = `e`.`event_id`)) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `password` (`password`);

--
-- Indexes for table `completed_orders`
--
ALTER TABLE `completed_orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `confirm_orders`
--
ALTER TABLE `confirm_orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`event_id`),
  ADD UNIQUE KEY `event_type` (`event_type`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `event_id_fk` (`event_id_fk`);

--
-- Indexes for table `photograph`
--
ALTER TABLE `photograph`
  ADD PRIMARY KEY (`photo_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `completed_orders`
--
ALTER TABLE `completed_orders`
  MODIFY `order_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `confirm_orders`
--
ALTER TABLE `confirm_orders`
  MODIFY `order_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `photograph`
--
ALTER TABLE `photograph`
  MODIFY `photo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`event_id_fk`) REFERENCES `event` (`event_id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
