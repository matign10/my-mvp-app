import Image from "next/image";
import Link from "next/link";
import BackgroundVideo from "@/components/BackgroundVideo";
import GoogleMap from "@/components/GoogleMap";
import PracticeArea from "@/components/PracticeArea";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-screen bg-transparent">
        <BackgroundVideo />
        <div className="relative h-full flex items-center z-10 pt-20 max-w-screen-xl mx-auto px-4">
          <div className="max-w-2xl text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight drop-shadow-lg">
              Excelencia Legal al Servicio de Nuestros Clientes
            </h1>
            <p className="text-lg mb-8 drop-shadow-lg">
              Brindamos asesoramiento legal integral con los más altos estándares de calidad y profesionalismo.
            </p>
            <Link
              href="#contacto"
              className="inline-block bg-[#636e72] text-white px-6 py-3 text-sm md:px-8 md:text-base font-medium hover:bg-[#4a525a] transition-colors rounded-md"
            >
              Contáctenos
            </Link>
          </div>
        </div>
      </section>

      {/* Áreas de Práctica */}
      <section className="py-16 md:py-20 bg-white" id="areas">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#2d3436] mb-12 text-center tracking-tight">
            Áreas de Práctica
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PracticeArea
              title="Derecho Civil"
              description="Asesoramiento integral en derecho civil, contratos, familia y sucesiones."
              icon={
                <svg className="w-12 h-12 text-[#2d3436]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
              expandedContent={{
                description: "Nuestro equipo especializado en derecho civil ofrece una amplia gama de servicios para proteger sus derechos y resolver conflictos de manera efectiva.",
                services: [
                  "Contratos y negociaciones comerciales",
                  "Derecho de familia y divorcios",
                  "Sucesiones y herencias",
                  "Responsabilidad civil",
                  "Derechos reales y propiedad"
                ]
              }}
            />
            <PracticeArea
              title="Derecho Laboral"
              description="Solución integral en materia laboral y relaciones de trabajo."
              icon={
                <svg className="w-12 h-12 text-[#2d3436]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
              expandedContent={{
                description: "Brindamos asesoramiento completo en materia laboral, protegiendo los derechos tanto de empleadores como de trabajadores.",
                services: [
                  "Negociaciones colectivas",
                  "Despidos y liquidaciones",
                  "Accidentes laborales",
                  "Discriminación laboral",
                  "Convenios colectivos"
                ]
              }}
            />
            <PracticeArea
              title="Derecho Penal"
              description="Defensa penal especializada y asesoramiento en procedimientos penales."
              icon={
                <svg className="w-12 h-12 text-[#2d3436]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              }
              expandedContent={{
                description: "Ofrecemos una defensa penal robusta y profesional, garantizando el debido proceso y la protección de sus derechos fundamentales.",
                services: [
                  "Defensa en juicios penales",
                  "Recursos y apelaciones",
                  "Delitos económicos",
                  "Delitos contra la propiedad",
                  "Asesoramiento preventivo"
                ]
              }}
            />
          </div>
        </div>
      </section>

      {/* Profesionales Destacados */}
      <section className="py-16 md:py-20 bg-[#f8f9fa]" id="profesionales">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#2d3436] mb-12 text-center tracking-tight">
            Nuestros Profesionales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Dr. Juan Pérez",
                role: "Socio Fundador",
                description: "Especialista en derecho civil y comercial con más de 15 años de experiencia. Lidera el área de derecho corporativo y ha asesorado a importantes empresas nacionales e internacionales.",
                linkedin: "https://linkedin.com/in/juan-perez"
              },
              {
                name: "Dra. María González",
                role: "Socia Senior",
                description: "Experta en derecho laboral y relaciones de trabajo. Ha desarrollado una destacada trayectoria en negociaciones colectivas y resolución de conflictos laborales.",
                linkedin: "https://linkedin.com/in/maria-gonzalez"
              },
              {
                name: "Dr. Carlos Rodríguez",
                role: "Socio Senior",
                description: "Especialista en derecho penal y procesal penal. Ha defendido exitosamente casos de alta complejidad y es reconocido por su expertise en derecho constitucional.",
                linkedin: "https://linkedin.com/in/carlos-rodriguez"
              },
              {
                name: "Dra. Ana Martínez",
                role: "Socia Senior",
                description: "Experta en derecho tributario y financiero. Ha asesorado a importantes grupos empresarios en operaciones de fusión y adquisición, y en estructuraciones fiscales.",
                linkedin: "https://linkedin.com/in/ana-martinez"
              }
            ].map((profesional, i) => (
              <div key={i} className="text-center">
                <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto mb-4 bg-gray-200">
                  <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-[#2d3436] tracking-tight">{profesional.name}</h3>
                  <a 
                    href={profesional.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#2d3436] hover:text-[#636e72] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-.88-.018-2.013-1.227-2.013-1.227 0-1.415.957-1.415 1.949v5.668h-3v-11h2.85v1.63h.042c.438-.83 1.51-1.704 3.107-1.704 3.322 0 3.89 2.188 3.89 5.034v6.04z"/>
                    </svg>
                  </a>
                </div>
                <p className="text-[#636e72] mb-2">{profesional.role}</p>
                <p className="text-sm text-[#636e72]">{profesional.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre Nosotros */}
      <section className="py-16 md:py-20 bg-white" id="sobre-nosotros">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#2d3436] mb-12 text-center tracking-tight">
            Sobre Nosotros
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden bg-gray-200">
              <div className="w-full h-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#2d3436] mb-6">Nuestra Historia</h3>
              <p className="text-[#636e72] mb-6">
                Con más de 20 años de experiencia, ECEN se ha consolidado como uno de los estudios jurídicos más prestigiosos del país. Nuestro compromiso con la excelencia y la atención personalizada nos ha permitido construir relaciones duraderas con nuestros clientes.
              </p>
              <h3 className="text-2xl font-bold text-[#2d3436] mb-6">Nuestra Misión</h3>
              <p className="text-[#636e72] mb-6">
                Brindar asesoramiento legal integral de la más alta calidad, con un enfoque personalizado y orientado a resultados, garantizando la protección de los intereses de nuestros clientes.
              </p>
              <h3 className="text-2xl font-bold text-[#2d3436] mb-6">Nuestros Valores</h3>
              <ul className="list-disc list-inside text-[#636e72] space-y-2">
                <li>Excelencia profesional</li>
                <li>Compromiso ético</li>
                <li>Innovación constante</li>
                <li>Atención personalizada</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className="py-16 md:py-20 bg-white" id="contacto">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#2d3436] mb-12 text-center tracking-tight">
            Contacto
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-[#2d3436] mb-4">Información de contacto</h3>
                <div className="space-y-4 text-[#636e72]">
                  <p className="flex items-center">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Uruguay 763, C1013 CABA, Argentina
                  </p>
                  <p className="flex items-center">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +123 456 789
                  </p>
                  <p className="flex items-center">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    contacto@ecen.com
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#2d3436] mb-4">Horario de atención</h3>
                <div className="space-y-2 text-[#636e72]">
                  <p>Lunes a Viernes: 9:00 - 18:00</p>
                  <p>Sábados: 9:00 - 13:00</p>
                </div>
              </div>
              <ContactForm />
            </div>
            <div>
              <GoogleMap />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
