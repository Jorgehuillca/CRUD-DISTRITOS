import { crearDistrito } from './api.js';

// ── Referencias DOM ───────────────────────────────────────────────────────────
const inputNombre     = document.getElementById('nom_dis');
const inputCodPostal  = document.getElementById('cod_postal');
const inputPoblacion  = document.getElementById('poblacion');
const errorPoblacion  = document.getElementById('errorPoblacion');
const btnGuardar      = document.getElementById('btnGuardar');
const mensajeExito    = document.getElementById('mensajeExito');
const mensajeError    = document.getElementById('mensajeError');
const errorNombre     = document.getElementById('errorNombre');
const errorCodigo     = document.getElementById('errorCodigo');

// ── Validación en tiempo real ─────────────────────────────────────────────────
inputNombre.addEventListener('input', () => {
  errorNombre.textContent = inputNombre.value.trim() ? '' : 'El nombre es requerido.';
});
inputCodPostal.addEventListener('input', () => {
  errorCodigo.textContent = inputCodPostal.value.trim() ? '' : 'El código postal es requerido.';
});

// ── Envío del formulario ──────────────────────────────────────────────────────
btnGuardar.addEventListener('click', async () => {
  const nom_dis    = inputNombre.value.trim();
  const cod_postal = inputCodPostal.value.trim();
  const poblacion  = inputPoblacion.value.trim();
  let valido = true;

  // Validar campos
  if (!nom_dis)    { 
    errorNombre.textContent   = 'El nombre es requerido.';       
    valido = false; }
  if (!cod_postal) { 
    errorCodigo.textContent   = 'El código postal es requerido.';
    valido = false; }
  if (!poblacion)  { 
    errorPoblacion.textContent = 'La población es requerida.';    
    valido = false; }

  if (!valido) return;

  // Deshabilitar botón mientras se procesa
  btnGuardar.disabled = true;
  btnGuardar.textContent = '⏳ Guardando...';
  mensajeError.classList.add('hidden');

  try {
    await crearDistrito({ nom_dis, cod_postal, poblacion: parseInt(poblacion) });

    // Mostrar éxito y redirigir
    mensajeExito.classList.remove('hidden');
    setTimeout(() => { window.location.href = '/index.html'; }, 1500);

  } catch (err) {
    mensajeError.textContent = '❌ Error: ' + err.message;
    mensajeError.classList.remove('hidden');
    btnGuardar.disabled = false;
    btnGuardar.textContent = '💾 Guardar Distrito';
  }
});

// ── Enter en campos ───────────────────────────────────────────────────────────
[inputNombre, inputCodPostal].forEach(input =>
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') btnGuardar.click();
  })
);
