const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Función para cifrar con César
function cifrarCesar(texto, desplazamiento) {
  return texto
    .split('')
    .map(char => {
      const c = char.charCodeAt(0);
      if (c >= 65 && c <= 90) {
        // Mayúsculas
        return String.fromCharCode(((c - 65 + desplazamiento) % 26) + 65);
      }
      if (c >= 97 && c <= 122) {
        // Minúsculas
        return String.fromCharCode(((c - 97 + desplazamiento) % 26) + 97);
      }
      return char;
    })
    .join('');
}

// Ruta POST para cifrar mensaje
app.post('/cifrar', (req, res) => {
  const { mensaje, desplazamiento } = req.body;

  if (!mensaje || desplazamiento == null) {
    return res.status(400).json({ error: 'Faltan datos: mensaje y desplazamiento son requeridos' });
  }

  const cifrado = cifrarCesar(mensaje, parseInt(desplazamiento));
  res.json({ mensajeOriginal: mensaje, cifrado });
});

app.listen(PORT, () => {
  console.log(`🚀 API César corriendo en http://localhost:${PORT}`);
});
