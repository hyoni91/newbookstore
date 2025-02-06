-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(50) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `phone` VARCHAR(30) NULL,
    `addr` VARCHAR(50) NULL,
    `email` VARCHAR(100) NULL,
    `role` VARCHAR(30) NOT NULL DEFAULT 'USER',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
