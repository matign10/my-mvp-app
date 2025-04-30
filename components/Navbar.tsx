'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sectionNavigation = [
  { name: 'Áreas de Práctica', href: '#areas' },
  { name: 'Abogados', href: '#profesionales' },
  { name: 'Sobre Nosotros', href: '#sobre-nosotros' },
  { name: 'Contacto', href: '#contacto' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('/');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = '/';
      const scrollPosition = window.scrollY;
      const offset = 100;

      sectionNavigation.forEach(section => {
        const element = document.getElementById(section.href.substring(1));
        if (element) {
          const elementTop = element.offsetTop;
          const elementHeight = element.offsetHeight;
          if (scrollPosition >= elementTop - offset && scrollPosition < elementTop + elementHeight - offset) {
            currentSection = section.href;
          }
        }
      });

      if (scrollPosition < 200) {
        currentSection = '/';
      }
      
      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.getElementById(href.substring(1));
      if (element) {
        const navbarHeight = 80;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - navbarHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else if (href === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-[#b2bec3] shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link 
            href="/"
            onClick={(e) => handleClick(e, '/')}
            className="flex items-center"
          >
            <span 
              className={`text-2xl font-bold tracking-tight drop-shadow-sm ${activeSection === '/' ? 'text-[#2d3436]' : 'text-[#636e72]'}`}
            >
              Echavarría Coll & González Novillo
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              key="Inicio"
              href="/"
              onClick={(e) => handleClick(e, '/')}
              className={`text-sm font-medium transition-colors duration-150 ease-in-out ${activeSection === '/' ? 'text-[#2d3436] bg-[#f8f9fa] rounded-md px-2 py-1' : 'text-[#636e72] hover:text-[#2d3436]'}`}
            >
              Inicio
            </Link>
            {sectionNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={`text-sm font-medium transition-colors duration-150 ease-in-out ${activeSection === item.href ? 'text-[#2d3436] bg-[#f8f9fa] rounded-md px-2 py-1' : 'text-[#636e72] hover:text-[#2d3436]'}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

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

      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-t border-[#b2bec3]`}>
        <div className="px-4 py-3 space-y-1">
          <Link
            key="Inicio-m"
            href="/"
            onClick={(e) => handleClick(e, '/')}
            className={`block px-3 py-2 text-sm font-medium ${activeSection === '/' ? 'text-[#2d3436] bg-[#f8f9fa]' : 'text-[#636e72] hover:text-[#2d3436] hover:bg-[#f8f9fa]'}`}
          >
            Inicio
          </Link>
          {sectionNavigation.map((item) => (
            <Link
              key={item.name + '-m'}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className={`block px-3 py-2 text-sm font-medium ${activeSection === item.href ? 'text-[#2d3436] bg-[#f8f9fa]' : 'text-[#636e72] hover:text-[#2d3436] hover:bg-[#f8f9fa]'}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
} 