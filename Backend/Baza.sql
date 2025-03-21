

SELECT name, collation_name FROM sys.databases;
GO
ALTER DATABASE db_ab2ebf_gimnastika SET SINGLE_USER WITH
ROLLBACK IMMEDIATE;
GO
ALTER DATABASE db_ab2ebf_gimnastika COLLATE Croatian_CI_AS;
GO
ALTER DATABASE db_ab2ebf_gimnastika SET MULTI_USER;
GO
SELECT name, collation_name FROM sys.databases;
GO

create table klubovi(
sifra int not null primary key identity(1,1),
naziv varchar(100) not null,
adresa varchar(100) not null,
iban varchar(50) not null
);

create table vjezbaci(
sifra int not null primary key identity(1,1),
ime varchar(30) not null,
prezime varchar(40) not null,
datumrodenja datetime not null,
spol varchar(20) not null,
kategorija varchar(50) not null,
email varchar(100) not null,
klub int not null references klubovi(sifra)
);

create table treneri(
sifra int not null primary key identity(1,1),
ime varchar(30) not null,
prezime varchar(40) not null,
oib char(11) null,
email varchar(100) not null,
klub int not null references klubovi(sifra)
);

create table suci(
sifra int not null primary key identity(1,1),
ime varchar(30) not null,
prezime varchar(40) not null,
oib char(11) null,
email varchar(100) not null,
kategorija_suca varchar(50) not null,
klub int not null references klubovi(sifra)
);

create table natjecanja(
sifra int not null primary key identity(1,1),
grad varchar(40) not null,
adresa varchar(100) not null,
datum datetime not null,
iznoskotizacije int not null
);

create table klub_natjecanja(
klub int not null references klubovi(sifra),
natjecanje int not null references natjecanja(sifra)
);

select * from klubovi;

insert into klubovi
(naziv,adresa,iban) values
('Gd Osijek-�ito','Kralja Zvonimira 5 Osijek','HR134761872638934762536');

insert into klubovi(naziv,adresa,iban) values
--2
('ZTD Hrvatski sokol Zagreb','Trg Republike Hrvatske 6 Zagreb','HR986473829487376263'),
--3
('Gimnasti�ko Dru�tvo "Hrvatski Sokol" Valpovo','Dr. F. Tu�mana 2 Valpovo','HR1836274958374653529');

select * from vjezbaci;

insert into vjezbaci
(ime,prezime,datumrodenja,spol,kategorija,email,klub) values
('Ana','Ani�','2015-08-13','�ensko','kadetkinje','anaanic@gmail.com',1);


insert into vjezbaci(ime,prezime,datumrodenja,spol,kategorija,email,klub) values
--2
('Maria','Hes','2013-04-22','�ensko','juniorke','mariahes@gmail.com',2),
--3
('Ivan','Markovi�','2016-08-09','mu�ko','kadet','ivanmarkovic@gmail.com',3),
--4
('Marko','Ivi�','2016-07-17','mu�ko','kadet','markoivic@gmail.com',1);

select * from treneri;

insert into treneri
(ime,prezime,oib,email,klub) values
('Boris','Bukovec',62839563744,'botaosijek@gmail.com',3);

insert into treneri(ime,prezime,oib,email,klub) values
--2
('Filip','Rosandi�',44759023244,'filiprosandic@gmail.com',2),
--3
('Marko','Simon',76990325656,'markosimon@gmail.com',1);

select * from suci;

insert into suci
(ime,prezime,oib,email,kategorija_suca,klub) values
('Marin','Marini�',52738294738,'marinmarinic@gmail.com','nacionalni sudac',3);

insert into suci(ime,prezime,oib,email,kategorija_suca,klub) values
--2
('�ana','Bili�',36389547865,'zanabilic@gmail.com','regionalni sudac',2),
--3
('Vladimir','Juki�',63859687657,'vladimir.j@gmail.com','nacionalni sudac',1);

select * from natjecanja;

insert into natjecanja
(grad,adresa,datum,iznoskotizacije) values
('Osijek','Ul. Kneza Trpimira 23','2024-12-22 09:00:00',50);

insert into natjecanja
(grad,adresa,datum,iznoskotizacije) values
--2
('Zagreb','Je�dove�ka ulica 3B','2025-02-13 09:00:00',50);

insert into klub_natjecanja
(klub,natjecanje) values
(1,1),
(2,1),
(3,1);

insert into klub_natjecanja
(klub,natjecanje) values
(1,2),
(2,2);



select * from klubovi;
select * from vjezbaci;
select * from treneri;
select * from suci;
select * from natjecanja;
select * from klub_natjecanja;