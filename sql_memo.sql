USE [memos&notas]
GO
ALTER TABLE [dbo].[note] DROP CONSTRAINT [DF_note_state]
GO
ALTER TABLE [dbo].[memo] DROP CONSTRAINT [DF_memo_state]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[number_memo_notes]') AND type in (N'U'))
DROP TABLE [dbo].[number_memo_notes]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[note]') AND type in (N'U'))
DROP TABLE [dbo].[note]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[memo]') AND type in (N'U'))
DROP TABLE [dbo].[memo]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[document]') AND type in (N'U'))
DROP TABLE [dbo].[document]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[addressee]') AND type in (N'U'))
DROP TABLE [dbo].[addressee]
GO
USE [master]
GO
DROP DATABASE [memos&notas]
GO
CREATE DATABASE [memos&notas]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'memos&notas', FILENAME = N'/var/opt/mssql/data/memos&notas.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'memos&notas_log', FILENAME = N'/var/opt/mssql/data/memos&notas_log.ldf' , SIZE = 73728KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [memos&notas] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [memos&notas].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [memos&notas] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [memos&notas] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [memos&notas] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [memos&notas] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [memos&notas] SET ARITHABORT OFF 
GO
ALTER DATABASE [memos&notas] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [memos&notas] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [memos&notas] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [memos&notas] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [memos&notas] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [memos&notas] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [memos&notas] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [memos&notas] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [memos&notas] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [memos&notas] SET  DISABLE_BROKER 
GO
ALTER DATABASE [memos&notas] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [memos&notas] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [memos&notas] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [memos&notas] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [memos&notas] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [memos&notas] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [memos&notas] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [memos&notas] SET RECOVERY FULL 
GO
ALTER DATABASE [memos&notas] SET  MULTI_USER 
GO
ALTER DATABASE [memos&notas] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [memos&notas] SET DB_CHAINING OFF 
GO
ALTER DATABASE [memos&notas] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [memos&notas] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [memos&notas] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [memos&notas] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [memos&notas] SET QUERY_STORE = OFF
GO
USE [memos&notas]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[addressee](
	[id] [tinyint] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](150) NOT NULL,
	[jobTitle] [text] NOT NULL,
	[archetype] [nvarchar](50) NOT NULL,
	[department] [text] NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[addressee] SET (LOCK_ESCALATION = AUTO)
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[document](
	[id] [tinyint] NULL,
	[doc] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[memo](
	[id] [tinyint] IDENTITY(1,1) NOT NULL,
	[asunto] [nvarchar](50) NOT NULL,
	[solicitado_por] [nvarchar](50) NOT NULL,
	[dirigido_a] [nvarchar](50) NOT NULL,
	[number] [tinyint] NOT NULL,
	[date] [nvarchar](50) NULL,
	[state] [nchar](1) NOT NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[memo] SET (LOCK_ESCALATION = AUTO)
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[note](
	[id] [tinyint] IDENTITY(1,1) NOT NULL,
	[asunto] [nvarchar](50) NOT NULL,
	[solicitado_por] [nvarchar](50) NOT NULL,
	[dirigido_a] [nvarchar](50) NOT NULL,
	[number] [tinyint] NOT NULL,
	[date] [nvarchar](50) NULL,
	[state] [nchar](1) NOT NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[note] SET (LOCK_ESCALATION = AUTO)
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[number_memo_notes](
	[id] [tinyint] IDENTITY(1,1) NOT NULL,
	[memorandum] [tinyint] NOT NULL,
	[notes] [tinyint] NOT NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[number_memo_notes] SET (LOCK_ESCALATION = AUTO)
GO
ALTER TABLE [dbo].[memo] ADD  CONSTRAINT [DF_memo_state]  DEFAULT ((1)) FOR [state]
GO
ALTER TABLE [dbo].[note] ADD  CONSTRAINT [DF_note_state]  DEFAULT ((1)) FOR [state]
GO
USE [master]
GO
ALTER DATABASE [memos&notas] SET  READ_WRITE 
GO
