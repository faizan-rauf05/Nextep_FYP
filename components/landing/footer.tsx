import Link from "next/link"

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Counsellors", href: "/counsellors" },
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-sm font-bold text-primary-foreground">
              PF
            </span>
          </div>

          <span className="text-lg font-semibold text-foreground">
            PathFinder
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-5 flex-wrap">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-sm text-muted-foreground">
          © 2026 PathFinder
        </p>
      </div>
    </footer>
  )
}