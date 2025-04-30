'use client';

// No se necesitan imports de React o Google Maps API Loader

export default function GoogleMap() {
  // No se necesitan refs ni useEffect

  return (
    // Contenedor que define el tamaño del mapa en tu layout
    <div className="relative w-full h-[400px] rounded-lg shadow-lg overflow-hidden">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.171318158758!2d-58.38914882419199!3d-34.599829172955694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccac7718acf4f%3A0xe33b7e98337c25a0!2sUruguay%20763%2C%20C1015ABO%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1745980255349!5m2!1ses!2sar"
        width="100%" // Hacer que ocupe todo el ancho del contenedor
        height="100%" // Hacer que ocupe todo el alto del contenedor
        style={{ border:0 }} 
        allowFullScreen={true} // Usar booleano en React
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
      >
      </iframe>
    </div>
  );
}