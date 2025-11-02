import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="animate-fade-in">
            <h3 className="text-xl font-bold mb-4 text-primary">O₂ Gardens Cafe</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Премиальное место для незабываемых мероприятий и торжеств в сердце Армении.
            </p>
            <a
              href="https://o2gardens.am"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2 bg-accent text-accent-foreground font-semibold rounded-md hover:bg-accent/90 transition-colors"
            >
              Посетить O₂ Gardens
            </a>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h3 className="text-lg font-semibold mb-4">Быстрые ссылки</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link href="/halls" className="text-muted-foreground hover:text-primary transition-colors">
                  Залы
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  О нас
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                <MapPin className="mt-1 flex-shrink-0" size={18} />
                <span>Армения, Ереван</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                <Phone size={18} />
                <span>+374 XX XXX XXX</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                <Mail size={18} />
                <span>info@o2gardens.am</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <h3 className="text-lg font-semibold mb-4">Мы в соцсетях</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <p>&copy; {new Date().getFullYear()} O₂ Gardens Cafe. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
