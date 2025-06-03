# RisePay Webhook Integration

Este webhook procesa pagos de RisePay e integra automáticamente usuarios nuevos en el sistema Protocolo Intestinal Vital 4F.

## Funcionalidad

- Valida token API (`x-api-token: VitalTest2025`)
- Procesa eventos de pago con estado "Paid"
- Mapeo automático de productos a planes:
  - "Protocolo Intestinal Vital 4F - Essencial" → plan: "essencial"
  - "Protocolo Intestinal Vital 4F - Completo" → plan: "completo"
  - "Protocolo Intestinal Vital 4F - Premium" → plan: "premium" + trial VIP 30 días
- Crea usuarios automáticamente con contraseña "Vital2025!"
- Registra información completa del cliente (nombre, email, teléfono, documento)
- Previene duplicados mediante validación de orderId
- Logs completos en tabla webhook_logs

## Estructura de Base de Datos

Se crearon dos tablas nuevas:

1. **webhook_logs**
   - Registra todos los webhooks recibidos
   - Guarda payload completo, estado de procesamiento y errores

2. **subscriptions**
   - Gestiona suscripciones VIP y trials
   - Incluye fecha de expiración para trials

Se modificó la tabla existente **users** para agregar:
- Campos para nombre, teléfono y documento
- Índices para mejorar rendimiento de consultas

## Testing

Para probar el webhook localmente:

1. Instalar Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Iniciar el servidor local de funciones:
   ```bash
   cd supabase/functions
   supabase functions serve risepay-webhook
   ```

3. Enviar una solicitud POST (ejemplo con curl):
   ```bash
   curl -X POST http://localhost:54321/functions/v1/risepay-webhook \
     -H "x-api-token: VitalTest2025" \
     -H "Content-Type: application/json" \
     -d '{
       "orderId": "3303677",
       "platform": "RisePay",
       "status": "Paid",
       "customer": {
         "email": "test@example.com",
         "name": "Cliente Test",
         "phone": "11999999999",
         "document": "12345678901"
       },
       "product": {
         "name": "Protocolo Intestinal Vital 4F - Premium",
         "priceInCents": 12700
       }
     }'
   ```

## Despliegue

Para desplegar a producción:

1. Desplegar las migraciones de base de datos:
   ```bash
   supabase db push
   ```

2. Desplegar la función:
   ```bash
   supabase functions deploy risepay-webhook
   ```

3. Configurar en RisePay la URL del webhook:
   ```
   https://[PROJECT_REF].supabase.co/functions/v1/risepay-webhook
   ```

## Configuración de Producción

Para el entorno de producción, se recomienda:

1. Cambiar el token API a uno más seguro
2. Añadir más validaciones según necesidades de negocio
3. Configurar alertas para errores en el procesamiento de webhooks
