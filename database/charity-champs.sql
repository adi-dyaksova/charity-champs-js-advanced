USE [master]
GO
/****** Object:  Database [Charity-champs]    Script Date: 6.1.2023 г. 4:30:20 ******/
CREATE DATABASE [Charity-champs]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Charity-champs', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\Charity-champs.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Charity-champs_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\Charity-champs_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [Charity-champs] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Charity-champs].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Charity-champs] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Charity-champs] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Charity-champs] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Charity-champs] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Charity-champs] SET ARITHABORT OFF 
GO
ALTER DATABASE [Charity-champs] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [Charity-champs] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Charity-champs] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Charity-champs] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Charity-champs] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Charity-champs] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Charity-champs] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Charity-champs] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Charity-champs] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Charity-champs] SET  ENABLE_BROKER 
GO
ALTER DATABASE [Charity-champs] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Charity-champs] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Charity-champs] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Charity-champs] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Charity-champs] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Charity-champs] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Charity-champs] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Charity-champs] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [Charity-champs] SET  MULTI_USER 
GO
ALTER DATABASE [Charity-champs] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Charity-champs] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Charity-champs] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Charity-champs] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Charity-champs] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Charity-champs] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [Charity-champs] SET QUERY_STORE = OFF
GO
USE [Charity-champs]
GO
/****** Object:  Table [dbo].[Category]    Script Date: 6.1.2023 г. 4:30:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[category_id] [int] NOT NULL,
	[name] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED 
(
	[category_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cause]    Script Date: 6.1.2023 г. 4:30:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cause](
	[cause_id] [int] NOT NULL,
	[name] [varchar](100) NOT NULL,
	[short_description] [varchar](1000) NOT NULL,
	[long_description] [varchar](max) NOT NULL,
	[start_date] [date] NOT NULL,
	[end_date] [date] NOT NULL,
	[coordinates] [geography] NULL,
	[duration_id] [int] NOT NULL,
	[isUrgent] [bit] NOT NULL,
	[image] [image] NULL,
	[creator_id] [int] NOT NULL,
	[city_id] [int] NOT NULL,
	[category_id] [int] NOT NULL,
 CONSTRAINT [PK_Cause] PRIMARY KEY CLUSTERED 
(
	[cause_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[City]    Script Date: 6.1.2023 г. 4:30:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[City](
	[city_id] [int] NOT NULL,
	[name] [varchar](50) NOT NULL,
 CONSTRAINT [PK_CITY] PRIMARY KEY CLUSTERED 
(
	[city_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Duration]    Script Date: 6.1.2023 г. 4:30:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Duration](
	[duration_id] [int] NOT NULL,
	[type] [varchar](20) NOT NULL,
 CONSTRAINT [PK_Duration] PRIMARY KEY CLUSTERED 
(
	[duration_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 6.1.2023 г. 4:30:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[user_id] [int] IDENTITY(1,1) NOT NULL,
	[first_name] [varchar](50) NOT NULL,
	[last_name] [varchar](50) NOT NULL,
	[username] [varchar](20) NOT NULL,
	[password] [varchar](25) NOT NULL,
	[email] [varchar](30) NOT NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserCause]    Script Date: 6.1.2023 г. 4:30:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserCause](
	[user_id] [int] NOT NULL,
	[cause_id] [int] NOT NULL,
 CONSTRAINT [PK_UserCause] PRIMARY KEY CLUSTERED 
(
	[user_id] ASC,
	[cause_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Cause]  WITH CHECK ADD  CONSTRAINT [FK__Cause__category___37A5467C] FOREIGN KEY([category_id])
REFERENCES [dbo].[Category] ([category_id])
GO
ALTER TABLE [dbo].[Cause] CHECK CONSTRAINT [FK__Cause__category___37A5467C]
GO
ALTER TABLE [dbo].[Cause]  WITH CHECK ADD  CONSTRAINT [FK__Cause__city_id__2C3393D0] FOREIGN KEY([city_id])
REFERENCES [dbo].[City] ([city_id])
GO
ALTER TABLE [dbo].[Cause] CHECK CONSTRAINT [FK__Cause__city_id__2C3393D0]
GO
ALTER TABLE [dbo].[Cause]  WITH CHECK ADD  CONSTRAINT [FK__Cause__duration___4F7CD00D] FOREIGN KEY([duration_id])
REFERENCES [dbo].[Duration] ([duration_id])
GO
ALTER TABLE [dbo].[Cause] CHECK CONSTRAINT [FK__Cause__duration___4F7CD00D]
GO
ALTER TABLE [dbo].[Cause]  WITH CHECK ADD  CONSTRAINT [FK_Cause_User] FOREIGN KEY([creator_id])
REFERENCES [dbo].[User] ([user_id])
GO
ALTER TABLE [dbo].[Cause] CHECK CONSTRAINT [FK_Cause_User]
GO
ALTER TABLE [dbo].[UserCause]  WITH CHECK ADD  CONSTRAINT [FK_UserCause_Cause] FOREIGN KEY([cause_id])
REFERENCES [dbo].[Cause] ([cause_id])
GO
ALTER TABLE [dbo].[UserCause] CHECK CONSTRAINT [FK_UserCause_Cause]
GO
ALTER TABLE [dbo].[UserCause]  WITH CHECK ADD  CONSTRAINT [FK_UserCause_User] FOREIGN KEY([user_id])
REFERENCES [dbo].[User] ([user_id])
GO
ALTER TABLE [dbo].[UserCause] CHECK CONSTRAINT [FK_UserCause_User]
GO
/****** Object:  StoredProcedure [dbo].[InsertUsers]    Script Date: 6.1.2023 г. 4:30:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE Procedure [dbo].[InsertUsers] @first_name varchar(50), @last_name varchar(50), @username varchar(20), @password varchar(25), @email varchar(30)
AS
INSERT INTO [User]
                        (first_name,
                         last_name,
                         username,
                         password,
						 email)
            VALUES     ( @first_name,
                         @last_name,
                         @username,
                         @password,
						 @email);
SELECT TOP 1 * FROM [User] ORDER BY user_id DESC
GO
USE [master]
GO
ALTER DATABASE [Charity-champs] SET  READ_WRITE 
GO
