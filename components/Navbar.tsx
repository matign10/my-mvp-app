'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Áreas de Práctica', href: '#areas' },
  { name: 'Profesionales', href: '#profesionales' },
  { name: 'Sobre Nosotros', href: '#sobre-nosotros' },
  { name: 'Contacto', href: '#contacto' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-[#b2bec3]">
      {/* Barra principal */}
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-[#2d3436] tracking-tight">
              ECEN
            </span>
          </Link>

          {/* Menú desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={`text-sm font-medium ${
                  pathname === item.href
                    ? 'text-[#2d3436] border-b-2 border-[#2d3436]'
                    : 'text-[#636e72] hover:text-[#2d3436]'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Botón móvil */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#2d3436]"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-t border-[#b2bec3]`}>
        <div className="px-4 py-3 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className={`block px-3 py-2 text-sm font-medium ${
                pathname === item.href
                  ? 'text-[#2d3436] bg-[#f8f9fa]'
                  : 'text-[#636e72] hover:text-[#2d3436] hover:bg-[#f8f9fa]'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
} 