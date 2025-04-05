# Detener todos los procesos de Node.js
Write-Host "Deteniendo procesos de Node.js..." -ForegroundColor Yellow
taskkill /F /IM node.exe 2>$null

# Eliminar carpetas de caché
Write-Host "Eliminando carpetas de caché..." -ForegroundColor Yellow
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue

# Limpiar caché de npm
Write-Host "Limpiando caché de npm..." -ForegroundColor Yellow
npm cache clean --force

# Reinstalar dependencias
Write-Host "Reinstalando dependencias..." -ForegroundColor Yellow
npm install

Write-Host "Limpieza completada. Por favor, reinicia el servidor con 'npm run dev'" -ForegroundColor Green 