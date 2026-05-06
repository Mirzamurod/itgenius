# Dispatcher Cargo Frontend

`Next.js + React + TypeScript` asosida dispatcher uchun cargo ro'yxati sahifasi.

## Ishga tushirish (Local)

### 1) Dependency o'rnatish

```bash
npm install
```

### 2) Environment sozlash

Loyihaning root qismida `.env` (yoki `.env.local`) fayl yarating:

```env
NEXT_PUBLIC_API_BASE_URL=your_api_base_url
NEXT_PUBLIC_X_DEVICE_TYPE=web
NEXT_PUBLIC_X_LANGUAGE=uz
NEXT_PUBLIC_X_CLIENT_TOKEN=your_client_token
NEXT_PUBLIC_X_USER_TOKEN=your_user_token
```

### 3) Development server

```bash
npm run dev
```

Brauzerda oching: [http://localhost:3000](http://localhost:3000)  
Carga sahifasi: [http://localhost:3000/dispatcher/cargo](http://localhost:3000/dispatcher/cargo)

### 4) Production build (ixtiyoriy)

```bash
npm run build
npm run start
```

