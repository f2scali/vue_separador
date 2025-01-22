import axios from 'axios';

// Configuración global
const axiosInstance = axios.create({
  baseURL: `${RUTA_WEB2PY}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función GET
export async function getRequest(url, procesando) {
  procesando.value = true;
  let error = '';
  let mensaje = '';
  let registros = [];
  try {
    const response = await axiosInstance.get(url);
    const data = response.data;
    mensaje = data.mensaje ?? null;
    registros = data.registros ?? [];
    error = data.error ?? null;
  } catch (err) {
    error = err.response?.data?.error || err.message || 'Error al obtener los datos.';
  } finally {
    procesando.value = false;
  }
  return { error, mensaje, registros };
}

// Función POST
export async function postRequest(url, payload, procesando) {
  procesando.value = true;
  let error = '';
  let mensaje = '';
  let registros = [];
  try {
    const response = await axiosInstance.post(url, payload);
    const data = response.data;
    mensaje = data.mensaje ?? null;
    registros = data.registros ?? [];
    error = data.error ?? null;
  } catch (err) {
    error = err.response?.data?.error || err.message || 'Error al enviar los datos.';
  } finally {
    procesando.value = false;
  }
  return { error, mensaje, registros };
}

// Función PUT
export async function putRequest(url, payload, procesando) {
  procesando.value = true;
  let error = '';
  let mensaje = '';
  let registros = [];
  try {
    const response = await axiosInstance.put(url, payload);
    const data = response.data;
    mensaje = data.mensaje ?? null;
    registros = data.registros ?? [];
    error = data.error ?? null;
  } catch (err) {
    error = err.response?.data?.error || err.message || 'Error al actualizar los datos.';
  } finally {
    procesando.value = false;
  }
  return { error, mensaje, registros };
}

