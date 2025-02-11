import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";
import { SiInstagram, SiTiktok } from '@icons-pack/react-simple-icons';

export const Footer = () => {
  const socialLinks = [
    {
      icon: SiTiktok,
      href: "https://tiktok.com/@jcdurini",
      label: "TikTok"
    },
    {
      icon: SiInstagram,
      href: "https://instagram.com/jcduri",
      label: "Instagram"
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/jcdurini",
      label: "LinkedIn"
    }
  ];

  return (
    <footer className="border-t bg-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.label}</span>
                </a>
              ))}
            </div>
            <Link to="/students-login">
              <Button variant="link" className="text-muted-foreground hover:text-primary">
                Login miembros
              </Button>
            </Link>
          </div>
          <div className="w-32">
          <Link to="/">
            <img src="/eps-logo.png" alt="EPS Academy Logo" className="w-full" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};