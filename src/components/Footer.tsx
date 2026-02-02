const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="border-[3px] border-background px-4 py-2 shadow-[4px_4px_0px_0px_hsl(72_100%_50%)]">
            <span className="font-heading text-2xl">NOTEKIT</span>
          </div>

          {/* Tagline */}
          <p className="font-heading text-xl md:text-2xl text-center">
            Sai thì xé. ✂️
          </p>

          {/* Copyright */}
          <p className="font-body text-sm text-background/70">
            © 2026 NOTEKIT. All rights reserved.
          </p>
        </div>

        {/* Fun decorative element */}
        <div className="mt-8 pt-6 border-t border-background/20 text-center">
          <p className="font-body text-sm text-background/50">
            Made with 💚 for Vietnamese students
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
