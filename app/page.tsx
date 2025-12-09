'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, Award, Users, Lightbulb, Heart, Scale, Briefcase, Shield, Linkedin } from "lucide-react";
import BackgroundImage from "@/components/BackgroundVideo";
import GoogleMap from "@/components/GoogleMap";
import PracticeArea from "@/components/PracticeArea";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Smooth scroll function
const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
  e.preventDefault();
  const element = document.querySelector(targetId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden bg-[#2d3436]">
        <BackgroundImage />
        <div className="absolute inset-0 hero-pattern z-[1]" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 h-screen flex items-center">
          <motion.div
            className="max-w-2xl text-white"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="w-12 h-[2px] bg-amber-500" />
              <span className="text-amber-500 font-medium tracking-wider text-sm uppercase">Estudio Jurídico</span>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Excelencia Legal al Servicio de{" "}
              <span className="text-amber-500">Nuestros Clientes</span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl mb-8 text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Brindamos asesoramiento legal integral con los más altos estándares de calidad y profesionalismo.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <a
                href="#contacto"
                onClick={(e) => scrollToSection(e, '#contacto')}
                className="inline-block bg-amber-600 text-white px-8 py-4 text-base font-semibold hover:bg-amber-700 transition-all duration-300 rounded-md shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
              >
                Contáctenos
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <a
            href="#areas"
            onClick={(e) => scrollToSection(e, '#areas')}
            className="flex flex-col items-center text-white/70 hover:text-amber-500 transition-colors cursor-pointer"
          >
            <span className="text-sm mb-2">Explorar</span>
            <ChevronDown className="w-6 h-6 animate-bounce-slow" />
          </a>
        </motion.div>
      </section>

      {/* Áreas de Práctica */}
      <section className="py-20 md:py-28 bg-white" id="areas">
        <div className="max-w-screen-xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-amber-600 font-medium tracking-wider text-sm uppercase">Nuestros Servicios</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d3436] mt-2 tracking-tight">
              Áreas de Práctica
            </h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mt-4" />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={fadeInUp}>
              <PracticeArea
                title="Derecho Civil"
                description="Asesoramiento integral en derecho civil, contratos, familia y sucesiones."
                icon={<Scale className="w-12 h-12 text-amber-600" />}
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
            </motion.div>
            <motion.div variants={fadeInUp}>
              <PracticeArea
                title="Derecho Laboral"
                description="Solución integral en materia laboral y relaciones de trabajo."
                icon={<Briefcase className="w-12 h-12 text-amber-600" />}
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
            </motion.div>
            <motion.div variants={fadeInUp}>
              <PracticeArea
                title="Derecho Penal"
                description="Defensa penal especializada y asesoramiento en procedimientos penales."
                icon={<Shield className="w-12 h-12 text-amber-600" />}
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
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Profesionales Destacados */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white" id="profesionales">
        <div className="max-w-screen-xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-amber-600 font-medium tracking-wider text-sm uppercase">Equipo Legal</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d3436] mt-2 tracking-tight">
              Nuestros Profesionales
            </h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mt-4" />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              {
                name: "Matías González Novillo",
                role: "Abogado",
                specialty: "Derecho Civil y Comercial",
                description: "Especialista en derecho civil y comercial. Brinda asesoramiento integral a empresas y particulares, con amplia experiencia en contratos y resolución de conflictos.",
                linkedin: "https://linkedin.com/in/matias-gonzalez-novillo"
              },
              {
                name: "Profesional 2",
                role: "Abogado",
                specialty: "Derecho Laboral",
                description: "Descripción del segundo profesional.",
                linkedin: "#"
              },
              {
                name: "Profesional 3",
                role: "Abogado",
                specialty: "Derecho Penal",
                description: "Descripción del tercer profesional.",
                linkedin: "#"
              },
              {
                name: "Profesional 4",
                role: "Abogado",
                specialty: "Derecho Corporativo",
                description: "Descripción del cuarto profesional.",
                linkedin: "#"
              }
            ].map((profesional, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                  {/* Avatar container */}
                  <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                    <div className="w-28 h-28 rounded-full bg-white shadow-lg flex items-center justify-center border-4 border-amber-500 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-14 h-14 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <a
                        href={profesional.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-amber-600 p-2 rounded-full hover:bg-amber-50 transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 text-center">
                    <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full mb-3">
                      {profesional.specialty}
                    </span>
                    <h3 className="text-xl font-bold text-[#2d3436] mb-1 tracking-tight">{profesional.name}</h3>
                    <p className="text-amber-600 font-medium mb-3">{profesional.role}</p>
                    <p className="text-sm text-gray-600 line-clamp-3">{profesional.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#2d3436]">
        <div className="max-w-screen-xl mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {[
              { number: "20+", label: "Años de Experiencia" },
              { number: "500+", label: "Casos Resueltos" },
              { number: "98%", label: "Clientes Satisfechos" },
              { number: "4", label: "Áreas de Práctica" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold text-amber-500 mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sobre Nosotros */}
      <section className="py-20 md:py-28 bg-white" id="sobre-nosotros">
        <div className="max-w-screen-xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-amber-600 font-medium tracking-wider text-sm uppercase">Conózcanos</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d3436] mt-2 tracking-tight">
              Sobre Nosotros
            </h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="relative h-[400px] rounded-2xl overflow-hidden"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Placeholder con gradiente elegante */}
              <div className="w-full h-full bg-gradient-to-br from-[#2d3436] via-[#3d4448] to-[#2d3436] flex items-center justify-center">
                <div className="text-center text-white/80">
                  <Scale className="w-20 h-20 mx-auto mb-4 text-amber-500" />
                  <p className="text-lg font-medium">ECEN</p>
                  <p className="text-sm text-white/60">Estudio Jurídico</p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-4 left-4 w-20 h-20 border-l-2 border-t-2 border-amber-500" />
              <div className="absolute bottom-4 right-4 w-20 h-20 border-r-2 border-b-2 border-amber-500" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-[#2d3436] mb-4 flex items-center gap-3">
                <Award className="w-6 h-6 text-amber-600" />
                Nuestra Historia
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Con más de 20 años de experiencia, ECEN se ha consolidado como uno de los estudios jurídicos más prestigiosos del país. Nuestro compromiso con la excelencia y la atención personalizada nos ha permitido construir relaciones duraderas con nuestros clientes.
              </p>

              <h3 className="text-2xl font-bold text-[#2d3436] mb-4 flex items-center gap-3">
                <Heart className="w-6 h-6 text-amber-600" />
                Nuestra Misión
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Brindar asesoramiento legal integral de la más alta calidad, con un enfoque personalizado y orientado a resultados, garantizando la protección de los intereses de nuestros clientes.
              </p>

              <h3 className="text-2xl font-bold text-[#2d3436] mb-4">Nuestros Valores</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Award, label: "Excelencia profesional" },
                  { icon: Shield, label: "Compromiso ético" },
                  { icon: Lightbulb, label: "Innovación constante" },
                  { icon: Users, label: "Atención personalizada" }
                ].map((valor, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-amber-50 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <valor.icon className="w-5 h-5 text-amber-600" />
                    <span className="text-gray-700 text-sm font-medium">{valor.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className="py-20 md:py-28 bg-gray-50" id="contacto">
        <div className="max-w-screen-xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-amber-600 font-medium tracking-wider text-sm uppercase">Comuníquese</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d3436] mt-2 tracking-tight">
              Contacto
            </h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Contact cards */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-[#2d3436] mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  Información de contacto
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Dirección</p>
                      <p className="text-gray-800 font-medium">Uruguay 763, C1013 CABA, Argentina</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Teléfono</p>
                      <p className="text-gray-800 font-medium">+123 456 789</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-800 font-medium">contacto@ecen.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-[#2d3436] mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  Horario de atención
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Lunes a Viernes</span>
                    <span className="font-medium text-gray-800">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Sábados</span>
                    <span className="font-medium text-gray-800">9:00 - 13:00</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <ContactForm />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <GoogleMap />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  );
}
