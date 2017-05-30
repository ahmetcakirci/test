-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Anamakine: localhost
-- Üretim Zamanı: 30 May 2017, 14:35:17
-- Sunucu sürümü: 5.7.18-0ubuntu0.16.04.1
-- PHP Sürümü: 7.0.15-0ubuntu0.16.04.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `usersdb`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tbl_users`
--

CREATE TABLE `tbl_users` (
  `id` int(11) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `token` char(48) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `tbl_users`
--

INSERT INTO `tbl_users` (`id`, `username`, `password`, `name`, `token`) VALUES
(1, 'admin', 'admin', 'Admin', '6cadc8e79241813e869aa2cde7fb5aa9'),
(2, 'demo', 'demo', 'Demo', 'sdf234'),
(3, 'test', 'test', 'Test', '123213sdfdsf123123'),
(4, 'ahmetcakirci', 'ahmetcakirci', 'AHMET CAKIRCI', '7747b55a3892c25944dbebb1a99c8c1e'),
(5, 'hasan', 'hasan', 'Hasan', 'wjn23rjdudn23udnnusdnc23'),
(6, 'ali', 'ali', 'Ali', 'sdof34fmfknvcıu834jrf239djcınsdc'),
(7, 'veli', 'veli', 'Veli', 'mwdwed23dfı23dnı2jd893'),
(8, 'muhammet', 'muhammet', 'Muhammet', 'mıe8439fıhw823d9k2o3nd3b823u'),
(9, 'alex', 'alex', 'Alex', 'sıdnf823jdn328jc2n83hckenuvb34'),
(10, 'emre', 'emre', 'Emre', 'edmfj93j4n4ın92jd2nı3r23');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username_UNIQUE` (`username`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
