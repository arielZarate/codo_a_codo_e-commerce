use grupo21;




-- Crear la tabla productos con una clave foránea a la tabla categorias
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    id_categoria INT,
    imagen_url VARCHAR(255),
    talla VARCHA(10),
    CONSTRAINT fk_categoria FOREIGN KEY (id_categoria) REFERENCES categorias(id)
);




INSERT INTO productos (nombre, descripcion, precio, id_categoria, imagen_url, talla) VALUES
('Sudadera Básica', 'Sudadera cómoda y básica para el día a día.', 25.99, 1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPX9Wu_tY2TB81MaFVmMb9pH2gF_378_VTWg&s', 'M'),
('Pantalón Casual', 'Pantalón casual de algodón.', 30.50, 2, 'https://tequierofashion.com/cdn/shop/products/Sin_titulo-ABG_03ec47aa-17f1-4208-b93b-2b3be177a399.jpg?v=1709925177', 'L'),
('Pantalón Corto Deportivo', 'Pantalón corto ideal para hacer deporte.', 20.75, 3, 'https://acdn.mitiendanube.com/stores/001/332/272/products/img_01791-17a28a5801e65ed22716700869889052-1024-1024.jpg', 'S'),
('Abrigo de Invierno', 'Abrigo cálido para el invierno.', 75.00, 4, 'https://phantom-marca.unidadeditorial.es/981f0bc558cc95d13bb8b9f37d32ff33/resize/828/f/jpg/assets/multimedia/imagenes/2023/11/03/16990150342659.png', 'XL'),
('Blusa Elegante', 'Blusa elegante para ocasiones especiales.', 40.20, 5, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR698oJNcWC4xAAykoAIrcVpSBj6ZToucqHw&s', 'M'),
('Camiseta de Algodón', 'Camiseta de algodón para uso diario.', 15.00, 6, 'https://acdn.mitiendanube.com/stores/857/306/products/420011-ff82725bfe70d6cd5316643783684101-1024-1024.png', 'L'),
('Falda de Verano', 'Falda fresca para el verano.', 22.50, 7, 'https://i5.walmartimages.com.mx/mg/gm/3pp/asr/285b86b3-94ea-4c69-821a-0cc8a0bd0c25.2dd5962c28f7c2c3a4267096c4d6c523.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF', 'S');
