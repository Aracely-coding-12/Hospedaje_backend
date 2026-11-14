const express = require("express"); //es la forma clasica de importar express con node
const swaggerUi = require("swagger-ui-express");
const openapi = require("./docs/openapi");

const app = express();
const PORT = process.env.PORT || 3000;

//Documentacion de la API con Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapi));

//req(request) res(response) res.json(respuesta en formato JSON)
//arrow function
app.get("/api/saludo", (req, res) => {
  res.json({ mensaje: "Hola desde mi API" });
});

//Ejercicio 01
app.get("/api/yo", (req, res) => {
  res.json({ Nombre: "Susan Ñauinripa", Carrera: "Ingenieria en software" });
});

//Ejercicio 02
app.get("/api/edad/:anio", (req, res) => {
    const anioActual = new Date().getFullYear();
    const anio = Number(req.params.anio);

    if (!Number.isInteger(anio) || anio < 1900 || anio > anioActual) {
        return res.status(400).json({
            error: "Año inválido"
        });
    }

    const edad = anioActual - anio;

    res.json({
        edad: edad,
        año: anio
    });
});



app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});