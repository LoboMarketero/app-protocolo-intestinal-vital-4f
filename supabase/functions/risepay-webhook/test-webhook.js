#!/usr/bin/env node

/**
 * Este script simula una solicitud de webhook de RisePay para pruebas
 * No requiere Supabase CLI, simplemente envía una solicitud POST al endpoint
 * 
 * Uso:
 * 1. Iniciar el servidor de desarrollo de tu función Edge (según tu método de despliegue)
 * 2. Ejecutar este script: `node test-webhook.js`
 */

const https = require('https');
const http = require('http');

// Configuración de la solicitud
const WEBHOOK_URL = 'https://[PROJECT_REF].supabase.co/functions/v1/risepay-webhook';
const LOCAL_TEST_URL = 'http://localhost:54321/functions/v1/risepay-webhook';

// Payload de prueba (igual al proporcionado en los requisitos)
const testPayload = {
  orderId: "3303677",
  platform: "RisePay",
  status: "Paid",
  customer: {
    email: "test@example.com",
    name: "Cliente Test",
    phone: "11999999999",
    document: "12345678901"
  },
  product: {
    name: "Protocolo Intestinal Vital 4F - Premium",
    priceInCents: 12700
  }
};

// Headers
const headers = {
  'Content-Type': 'application/json',
  'x-api-token': 'VitalTest2025'
};

// Preparar datos
const postData = JSON.stringify(testPayload);

// Determinar si usar URL local o remota
const useLocal = process.argv.includes('--local');
const url = new URL(useLocal ? LOCAL_TEST_URL : WEBHOOK_URL);
const client = url.protocol === 'https:' ? https : http;

console.log(`Enviando solicitud de prueba a: ${url.href}`);

// Crear opciones de solicitud
const options = {
  hostname: url.hostname,
  port: url.port || (url.protocol === 'https:' ? 443 : 80),
  path: url.pathname,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData),
    'x-api-token': 'VitalTest2025'
  }
};

// Enviar solicitud
const req = client.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('RESPUESTA:');
    try {
      const parsedData = JSON.parse(data);
      console.log(JSON.stringify(parsedData, null, 2));
    } catch (e) {
      console.log(data);
    }
  });
});

req.on('error', (e) => {
  console.error(`Error en la solicitud: ${e.message}`);
});

// Escribir datos en la solicitud
req.write(postData);
req.end();

console.log('Solicitud enviada. Esperando respuesta...');
