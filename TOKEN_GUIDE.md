# Generar Token de Google Calendar API

**Importante:** El token caduca cada 1 hora. Sigue estos pasos para generar uno nuevo antes de hacer pruebas en tu proyecto de Angular.

## Pasos para generar un token nuevo

1. Ingresa a [Google OAuth 2.0 Playground](https://developers.google.com/oauthplayground/).
2. En el **Step 1** (panel izquierdo), busca la categoría **Google Calendar API v3** y expándela.
3. Selecciona la opción: `https://www.googleapis.com/auth/calendar`.
4. Haz clic en el botón **Authorize APIs**.
5. Inicia sesión con tu cuenta de Google y acepta los permisos.
6. Automáticamente pasarás al **Step 2**. Haz clic en el botón **Exchange authorization code for tokens**.
7. En el panel de la derecha aparecerá un JSON. Copia el texto completo de `"access_token"` (siempre empieza con `ya29.`).

## Cómo refrescar el token (si la página sigue abierta)

1. Ve al **Step 2** en el panel izquierdo.
2. Haz clic en el botón inferior **Refresh access token**.
3. Copia el nuevo `"access_token"` generado a la derecha.

## Configuración en el código

Pega el token copiado en tu servicio de Angular (`calendario.service.ts`), asegurándote de no dejar espacios en blanco ni comillas extrañas:

```typescript
private accessToken = 'ya29.tu_token_aqui...';