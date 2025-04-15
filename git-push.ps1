
# Script para subir cambios a GitHub
# Navegar al directorio del proyecto
cd $PSScriptRoot

# Mostrar el estado actual
Write-Host "Estado actual del repositorio:" -ForegroundColor Yellow
git status

# Preguntar si desea continuar
$confirmar = Read-Host "¿Deseas confirmar y subir estos cambios? (s/n)"
if ($confirmar -ne "s") {
    Write-Host "Operación cancelada." -ForegroundColor Red
    exit
}

# Agregar los archivos modificados
Write-Host "Agregando archivos modificados..." -ForegroundColor Cyan
git add app/page.tsx components/BackgroundVideo.tsx components/Navbar.tsx contexts/ThemeContext.tsx components/ThemeToggle.tsx app/layout.tsx tailwind.config.js

# Confirmar los cambios
Write-Host "Confirmando cambios..." -ForegroundColor Cyan
git commit -m "Fix: Restaurar texto alineado a la izquierda, e implementar modo claro/oscuro"

# Subir los cambios al repositorio remoto
Write-Host "Subiendo cambios a GitHub..." -ForegroundColor Cyan
git push

Write-Host "¡Proceso completado!" -ForegroundColor Green
Write-Host "Presiona cualquier tecla para salir..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
