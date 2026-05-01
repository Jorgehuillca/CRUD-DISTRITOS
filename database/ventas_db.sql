-- ============================================
-- Script de Base de Datos: ventas_db
-- Tabla: distritos
-- ============================================

CREATE DATABASE IF NOT EXISTS ventas_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE ventas_db;

DROP TABLE IF EXISTS distritos;

CREATE TABLE distritos (
  id_dis     INT          NOT NULL AUTO_INCREMENT,
  nom_dis    VARCHAR(100) NOT NULL,
  cod_postal VARCHAR(10)  NOT NULL,
  poblacion  INT          NOT NULL DEFAULT 0,
  PRIMARY KEY (id_dis)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 25 registros de prueba (distritos del Perú)
INSERT INTO distritos (nom_dis, cod_postal, poblacion) VALUES
('Miraflores',        '15074', 99337),
('San Isidro',        '15073', 60735),
('Barranco',          '15063', 33903),
('Surco',             '15038', 344242),
('La Molina',         '15026', 171646),
('San Borja',         '15037', 111928),
('Jesús María',       '15072', 66171),
('Lince',             '15046', 49591),
('Magdalena del Mar', '15076', 54386),
('Pueblo Libre',      '15084', 74164),
('San Miguel',        '15086', 129747),
('Breña',             '15082', 74711),
('Rímac',             '15094', 164911),
('El Agustino',       '15007', 191365),
('La Victoria',       '15034', 173630),
('Lima Cercado',      '15001', 271814),
('Chorrillos',        '15064', 325547),
('Ate',               '15022', 646369),
('Santa Anita',       '15008', 228422),
('San Juan de Miraflores', '15801', 404001),
('Villa El Salvador', '15828', 393254),
('Villa María del Triunfo', '15809', 442001),
('Lurín',             '15843', 89416),
('Pachacámac',        '15823', 129653),
('Comas',             '07001', 520450),
('Los Olivos',        '07056', 365921),
('Independencia',     '07009', 216764),
('San Martín de Porres', '07016', 700177),
('Carabayllo',        '07002', 333045),
('Puente Piedra',     '07057', 362055);
