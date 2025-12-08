'use client';

import Link from 'next/link';
import { Scale, MapPin, Phone, Mail, Linkedin, Clock } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1a2e] text-white">
      {/* Main footer content */}
      <div className="max-w-screen-xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Scale className="w-8 h-8 text-amber-500" />
              <span className="text-2xl font-bold">ECEN</span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Brindamos asesoramiento legal integral con los más altos estándares de calidad y profesionalismo desde hace más de 20 años.
            </p>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com/company/ecen"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-amber-600 transition-colors duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <div className="w-1 h-5 bg-amber-500 rounded-full" />
              Enlaces Rápidos
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Inicio', href: '/' },
                { label: 'Áreas de Práctica', href: '#areas' },
                { label: 'Profesionales', href: '#profesionales' },
                { label: 'Sobre Nosotros', href: '#sobre-nosotros' },
                { label: 'Contacto', href: '#contacto' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-amber-500 transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-amber-500/50 rounded-full" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice Areas */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <div className="w-1 h-5 bg-amber-500 rounded-full" />
              Áreas de Práctica
            </h3>
            <ul className="space-y-3">
              {[
                'Derecho Civil',
                'Derecho Laboral',
                'Derecho Penal',
                'Derecho Comercial',
              ].map((area) => (
                <li key={area}>
                  <Link
                    href="#areas"
                    className="text-gray-400 hover:text-amber-500 transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-amber-500/50 rounded-full" />
                    {area}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <div className="w-1 h-5 bg-amber-500 rounded-full" />
              Contacto
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">
                  Uruguay 763, C1013<br />
                  CABA, Argentina
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <a href="tel:+123456789" className="text-gray-400 hover:text-amber-500 transition-colors">
                  +123 456 789
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <a href="mailto:contacto@ecen.com" className="text-gray-400 hover:text-amber-500 transition-colors">
                  contacto@ecen.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">
                  Lun - Vie: 9:00 - 18:00<br />
                  Sáb: 9:00 - 13:00
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-screen-xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; {currentYear} ECEN Estudio Jurídico. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                Política de Privacidad
              </Link>
              <Link href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                Términos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
