#!/bin/bash

# Ejemplo de cómo probar el webhook con curl
# Uso:
# - Para probar localmente: ./test-curl.sh local
# - Para probar en producción: ./test-curl.sh prod URL
#   Donde URL es la URL de tu proyecto Supabase, por ejemplo:
#   ./test-curl.sh prod https://abcdefg.supabase.co

# Determinar URL según el entorno
if [ "$1" = "local" ]; then
  URL="http://localhost:54321/functions/v1/risepay-webhook"
  echo "Probando webhook en entorno local: $URL"
elif [ "$1" = "prod" ] && [ -n "$2" ]; then
  URL="$2/functions/v1/risepay-webhook"
  echo "Probando webhook en producción: $URL"
else
  echo "Uso:"
  echo "  - Para probar localmente: ./test-curl.sh local"
  echo "  - Para probar en producción: ./test-curl.sh prod URL"
  exit 1
fi

# Ejecutar curl con el payload de ejemplo
curl -X POST "$URL" \
  -H "Content-Type: application/json" \
  -H "x-api-token: VitalTest2025" \
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

echo ""
echo "Solicitud enviada. Si ves errores, verifica que el servidor esté en ejecución."
