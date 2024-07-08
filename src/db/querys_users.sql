


-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS usuarios
CHARACTER SET utf8mb4
COLLATE utf8mb4_spanish_ci;

-- Usar la base de datos
use grupo21;

-- Crear la tabla
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    domicilio VARCHAR(50) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
     email VARCHAR(50) NOT NULL,
     contrasena VARCHAR(255) NOT NULL,
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_spanish_ci;



-- Usar la base de datos
USE grupo21;

-- Insertar usuarios
INSERT INTO usuarios (nombre, apellido, domicilio, telefono, emaiIl, contrasena) VALUES
('Juan', 'Pérez', 'Calle Falsa 123', '1234567890', 'juan.perez@example.com', 'admin123'),
('María', 'García', 'Avenida Siempre Viva 456', '2345678901', 'maria.garcia@example.com', 'admin123'),
('Carlos', 'Rodríguez', 'Plaza Mayor 789', '3456789012', 'carlos.rodriguez@example.com', 'admin123'),
('Ana', 'López', 'Boulevard Central 101', '4567890123', 'ana.lopez@example.com', 'admin123'),
('Luis', 'Martínez', 'Camino Real 202', '5678901234', 'luis.martinez@example.com', 'admin123'),
('Elena', 'Fernández', 'Ronda del Bosque 303', '6789012345', 'elena.fernandez@example.com', 'admin123'),
('José', 'Gómez', 'Callejón del Gato 404', '7890123456', 'jose.gomez@example.com', 'admin123'),
('Laura', 'Hernández', 'Paseo de los Olivos 505', '8901234567', 'laura.hernandez@example.com', 'admin123'),
('Miguel', 'Sánchez', 'Calle del Sol 606', '9012345678', 'miguel.sanchez@example.com', 'admin123'),
('Lucía', 'Ramírez', 'Vía Láctea 707', '0123456789', 'lucia.ramirez@example.com', 'admin123');
