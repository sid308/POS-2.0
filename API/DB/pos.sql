-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 03, 2021 at 12:08 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pos`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `id` int(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(50) NOT NULL,
  `state` varchar(50) NOT NULL,
  `pin_code` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_on` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`id`, `address`, `city`, `state`, `pin_code`, `created_on`, `created_by`, `updated_on`, `updated_by`) VALUES
(1, 'dlqn,wjhqiykwbfc,jqfnw.fmq', 'test', 'test', 421302, '2021-05-22 14:21:29', 0, NULL, NULL),
(16, 'mdiqafhebqk,bjfwkqw', 'Tanda', 'UP', 421302, '2020-10-23 19:57:31', 0, '2020-10-23 19:57:31', 0),
(17, 'mdiqafhebqk,bjfwkqw updated', 'Bhiwandi updated', 'up', 421302, '2020-10-23 19:57:31', 0, '2020-10-23 14:27:31', 0),
(19, 'mdiqafhebqk,bjfwkqw', 'Bhiwandi', 'maharashtra', 421302, '2020-10-23 19:57:31', 0, NULL, NULL),
(21, '319 Bala comp', 'Bhiwandi', 'maharashtra', 421302, '2020-10-23 19:57:31', 0, NULL, NULL),
(22, 'mdiqafhebqk,bjfwkqw', 'Bhiwandi', 'maharashtra', 421302, '2020-10-23 19:57:31', 0, NULL, NULL),
(23, 'mdiqafhebqk,bjfwkqw', 'Bhiwandi', 'maharashtra', 421302, '2020-10-23 19:57:31', 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `gst` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  `address_id` int(255) NOT NULL,
  `phone` int(20) NOT NULL,
  `created_on` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_on` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `name`, `gst`, `email`, `address_id`, `phone`, `created_on`, `created_by`, `updated_on`, `updated_by`) VALUES
(1, 'test', '1517jnwe77819', 'test@test.com', 1, 987654302, '2021-05-22 14:20:17', 0, NULL, NULL),
(11, 'saeem_updated', 'jdkauhwd1652updated', 'saeem_updated@techop.in', 16, 1111111111, '2020-10-23 19:57:31', 0, '2020-10-23 19:57:31', 0),
(12, 'ash', 'jdkauhwd1652', 'saeem@techop.in', 23, 789865427, '2020-10-23 19:57:31', 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `heros`
--

CREATE TABLE `heros` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `warehouse_id` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_on` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`id`, `product_id`, `warehouse_id`, `stock`, `created_on`, `created_by`, `updated_on`, `updated_by`) VALUES
(1, 3, 2, 400, '2020-10-23 19:57:31', 1, NULL, NULL),
(2, 1, 2, 300, '2020-10-23 19:57:31', 1, NULL, NULL),
(3, 2, 3, 250, '2020-10-23 19:57:31', 1, '2020-10-23 14:27:31', 0),
(4, 3, 1, 600, '2020-10-23 19:57:31', 1, NULL, NULL),
(5, 3, 1, 600, '2020-10-23 19:57:31', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `amount` varchar(255) NOT NULL,
  `order_date` date NOT NULL,
  `billing_address_id` int(11) NOT NULL,
  `shipping_address_id` int(11) NOT NULL,
  `payment_status` varchar(255) NOT NULL,
  `amount_paid` varchar(255) NOT NULL,
  `mode_of_payment` varchar(255) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `note` varchar(255) NOT NULL,
  `created_on` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_on` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `amount`, `order_date`, `billing_address_id`, `shipping_address_id`, `payment_status`, `amount_paid`, `mode_of_payment`, `customer_id`, `note`, `created_on`, `created_by`, `updated_on`, `updated_by`) VALUES
(1, '50000', '2020-10-22', 3, 3, '1', '25000', 'cash', 1, 'sample note', '2020-10-23 19:57:31', 1, NULL, NULL),
(2, '50000', '2020-10-22', 2, 3, 'unpaid', '25000', 'cash', 1, 'sample note', '2020-10-23 14:27:31', 1, NULL, NULL),
(3, '50000', '2020-10-22', 3, 3, '1', '25000', 'cash', 1, 'sample note', '2020-10-23 14:27:31', 1, NULL, NULL),
(4, '50000', '2020-10-22', 3, 3, '1', '25000', 'cash', 1, 'sample note', '2020-10-23 14:27:31', 1, NULL, NULL),
(5, '50000', '2020-10-22', 3, 3, '1', '25000', 'cash', 1, 'sample note', '2020-10-23 14:27:31', 1, NULL, NULL),
(6, '50000', '2020-10-22', 3, 3, '1', '25000', 'cash', 1, 'sample note', '2020-10-23 14:27:31', 1, NULL, NULL),
(7, '50000', '2020-10-22', 3, 3, '1', '25000', 'cash', 1, 'sample note', '2020-10-23 14:27:31', 1, NULL, NULL),
(8, '50000', '2020-10-22', 3, 3, '1', '25000', 'cash', 1, 'sample note', '2020-10-23 14:27:31', 1, NULL, NULL),
(9, '50000', '2020-10-22', 3, 3, '1', '25000', 'cash', 1, 'sample note', '2020-10-23 14:27:31', 1, NULL, NULL),
(11, '50000', '2020-10-22', 16, 16, '1', '25000', 'cash', 1, 'sample note', '2020-10-23 14:27:31', 1, NULL, NULL),
(13, '50000', '2020-10-21', 1, 16, '1', '25000', 'cash', 1, 'sample note updated', '2020-10-23 14:27:31', 1, '2020-10-23 08:57:31', 1);

-- --------------------------------------------------------

--
-- Table structure for table `order_item`
--

CREATE TABLE `order_item` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `warehouse_id` int(11) NOT NULL,
  `sold_price` int(11) NOT NULL,
  `sold_unit` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_on` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_item`
--

INSERT INTO `order_item` (`id`, `product_id`, `warehouse_id`, `sold_price`, `sold_unit`, `order_id`, `created_on`, `created_by`, `updated_on`, `updated_by`) VALUES
(2, 2, 1, 100, 200, 11, '2020-10-23 19:57:31', 1, NULL, NULL),
(3, 1, 1, 150, 250, 11, '2020-10-23 19:57:31', 1, NULL, NULL),
(6, 3, 1, 90, 90, 13, '2020-10-23 19:57:31', 1, '2020-10-23 14:27:31', 1),
(7, 5, 1, 250, 300, 13, '2020-10-23 19:57:31', 1, '2020-10-23 14:27:31', 1);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `is_pending` tinyint(1) NOT NULL,
  `created_on` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_on` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `unit_price` int(11) NOT NULL,
  `hsn_code` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_on` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `unit_price`, `hsn_code`, `created_on`, `created_by`, `updated_on`, `updated_by`) VALUES
(1, 'xyz', 250, 4413, '0000-00-00 00:00:00', 0, '2020-10-23 14:27:31', 0),
(2, 'pqr', 300, 5513, '0000-00-00 00:00:00', 0, NULL, NULL),
(3, 'abc', 200, 5313, '0000-00-00 00:00:00', 0, NULL, NULL),
(5, 'cde', 250, 4413, '2020-10-23 19:57:31', 0, '2020-10-23 14:27:31', 0);

-- --------------------------------------------------------

--
-- Table structure for table `product_stock`
--

CREATE TABLE `product_stock` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `warehouse_id` int(11) NOT NULL,
  `weight` varchar(255) NOT NULL,
  `created_on` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_on` datetime NOT NULL,
  `updated_by` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_stock`
--

INSERT INTO `product_stock` (`id`, `product_id`, `warehouse_id`, `weight`, `created_on`, `created_by`, `updated_on`, `updated_by`) VALUES
(1, 1, 1, '400kg', '2020-10-23 19:57:31', 1, '0000-00-00 00:00:00', 0),
(2, 3, 2, '400kg', '2020-10-23 19:57:31', 1, '0000-00-00 00:00:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `temp`
--

CREATE TABLE `temp` (
  `id` int(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `gst` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  `address_id` int(255) NOT NULL,
  `phone` int(20) NOT NULL,
  `created_on` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_on` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tutorials`
--

CREATE TABLE `tutorials` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `published` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `phone` int(20) NOT NULL,
  `created_on` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_on` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `pass`, `role`, `phone`, `created_on`, `created_by`, `updated_on`, `updated_by`, `last_login`) VALUES
(1, 'saeem', 'saeem@gmail.com ', '0', 'admin', 987654321, '2020-10-23 19:57:31', 0, '2020-10-23 14:27:31', 0, '2021-10-02 21:30:02'),
(2, 'hozefa', 'hoz@gmail.com', 'HOzze', 'admin', 20381927, '2020-10-23 19:57:31', 1, '2020-10-23 19:57:31', 1, '2021-09-26 16:13:16'),
(3, 'test', 'test@gmail.com', 'test@123', 'admin', 12312321, '2020-10-23 19:57:31', 0, NULL, NULL, NULL),
(4, 'update name', 'update@api.com', 'Test@123', 'admin', 12312321, '2020-10-23 14:27:31', 0, '2020-10-23 08:57:31', 0, NULL),
(5, 'apitest', 'test@api.com', 'Test@123', 'admin', 12312321, '2020-10-23 14:27:31', 0, NULL, NULL, NULL),
(8, 'saeem', 'saeem@gmail.com ', 'Test@123', 'admin', 987654321, '2020-10-23 14:27:31', 0, '2020-10-23 14:27:31', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vendor`
--

CREATE TABLE `vendor` (
  `id` int(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` int(20) NOT NULL,
  `gst` int(30) NOT NULL,
  `address_id` int(255) NOT NULL,
  `created_on` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_on` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vendor`
--

INSERT INTO `vendor` (`id`, `name`, `email`, `phone`, `gst`, `address_id`, `created_on`, `created_by`, `updated_on`, `updated_by`) VALUES
(1, 'saeem_updated', 'saeem_updated@techop.in', 789865427, 0, 17, '2020-10-23 19:57:31', 0, '2020-10-23 14:27:31', 0);

-- --------------------------------------------------------

--
-- Table structure for table `warehouse`
--

CREATE TABLE `warehouse` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `address_id` int(11) NOT NULL,
  `weight` varchar(255) NOT NULL,
  `amount` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_on` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `warehouse`
--

INSERT INTO `warehouse` (`id`, `name`, `address_id`, `weight`, `amount`, `created_on`, `created_by`, `updated_on`, `updated_by`) VALUES
(1, 'Shandar', 19, '300', 4000, '2020-10-23 19:57:31', 0, NULL, NULL),
(3, 'Bala Comp', 21, '200', 30000, '2020-10-23 19:57:31', 0, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `heros`
--
ALTER TABLE `heros`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_item`
--
ALTER TABLE `order_item`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_stock`
--
ALTER TABLE `product_stock`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tutorials`
--
ALTER TABLE `tutorials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendor`
--
ALTER TABLE `vendor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `warehouse`
--
ALTER TABLE `warehouse`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `heros`
--
ALTER TABLE `heros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `order_item`
--
ALTER TABLE `order_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `product_stock`
--
ALTER TABLE `product_stock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tutorials`
--
ALTER TABLE `tutorials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `vendor`
--
ALTER TABLE `vendor`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `warehouse`
--
ALTER TABLE `warehouse`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
