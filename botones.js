// ===== Configuración =====
// Número de WhatsApp Business: 57 (Colombia) + número, sin espacios ni signo +
const NUMERO = '573001234567';

// ===== Carga de imágenes de productos =====
const EXTENSIONES = ['png', 'jpg', 'jpeg', 'webp', 'avif', 'jfif'];

document.querySelectorAll('img[data-img]').forEach(img => {
  const base = img.dataset.img;
  let intento = 0;
  img.addEventListener('error', () => {
    intento++;
    if (intento < EXTENSIONES.length) img.src = `${base}.${EXTENSIONES[intento]}`;
    else console.warn(`No se encontró la imagen: ${base}.*`);
  });
  img.src = `${base}.${EXTENSIONES[0]}`;
});

// ===== Filtros del catálogo =====
const botones = document.querySelectorAll('.filtro');
const productos = document.querySelectorAll('.producto');

botones.forEach(boton => {
  boton.addEventListener('click', () => {
    botones.forEach(b => b.classList.remove('activo'));
    boton.classList.add('activo');
    const filtro = boton.dataset.filtro;
    productos.forEach(p => {
      p.hidden = filtro !== 'todos' && p.dataset.categoria !== filtro;
    });
  });
});

// ===== Botón de WhatsApp Business en la tarjeta de contacto =====
const saludo = 'Hola Nova Vortex, quiero información sobre sus productos.';
document.getElementById('wsContacto').href =
  `https://wa.me/${NUMERO}?text=${encodeURIComponent(saludo)}`;

// ===== Carrito de compras =====
const carrito = [];
const panel = document.getElementById('carrito');
const formato = n => '$' + n.toLocaleString('es-CO');

function actualizar() {
  const total = carrito.reduce((suma, p) => suma + p.precio, 0);
  document.getElementById('contador').textContent = carrito.length;
  document.getElementById('listaCarrito').innerHTML =
    carrito.map(p => `<li>${p.nombre} — ${formato(p.precio)}</li>`).join('');
  document.getElementById('total').textContent = formato(total);

  const mensaje = 'Hola Nova Vortex, quiero pedir:\n' +
    carrito.map(p => `- ${p.nombre} (${formato(p.precio)})`).join('\n') +
    `\nTotal: ${formato(total)}`;
  document.getElementById('enviarPedido').href =
    `https://wa.me/${NUMERO}?text=${encodeURIComponent(mensaje)}`;
}

document.querySelectorAll('.agregar').forEach(boton => {
  boton.addEventListener('click', () => {
    carrito.push({ nombre: boton.dataset.nombre, precio: Number(boton.dataset.precio) });
    actualizar();
    panel.hidden = false;
  });
});

document.getElementById('abrirCarrito').addEventListener('click', () => panel.hidden = false);
document.getElementById('cerrarCarrito').addEventListener('click', () => panel.hidden = true);