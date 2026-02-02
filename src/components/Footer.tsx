import stickerBunny from "@/assets/sticker-bunny.svg";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-8 md:py-12 relative overflow-hidden">
      {/* Decorative sticker */}
      <div className="absolute top-4 right-8 w-16 h-16 opacity-30 hidden md:block">
        <img src={stickerBunny} alt="" className="w-full h-full object-contain invert" />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="border-2 border-background px-4 py-2 rounded-[255px_15px_225px_15px/15px_225px_15px_255px] shadow-[3px_3px_0px_0px_hsl(5_100%_85%)]">
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
            Made with 💕 for Vietnamese students
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
