const app = require("./src/app.js");

//let puerto = 3000; //también se puede usar el 8080 y el 3001
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor express ejecutándose en el  http://localhost:${PORT}`);
});
