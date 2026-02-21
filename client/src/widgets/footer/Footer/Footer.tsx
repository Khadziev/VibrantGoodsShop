import FooterColumns from './footerContent/FooterColumns';
import SocialPart from './footerContent/SocialPart';

const Footer = () => {
  return (
    <footer className="mt-20 bg-[rgb(var(--color-bg-tertiary))] border-t border-[rgb(var(--color-border))]">
      <div className="max-w-[1440px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <FooterColumns />
          </div>
          <div className="w-full">
            <SocialPart />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[rgb(var(--color-border))] flex flex-col md:flex-row items-center justify-between text-sm text-[rgb(var(--color-text-tertiary))]">
          <div>© {new Date().getFullYear()} VibrantGoods — Магазин электроники</div>
          <div className="mt-4 md:mt-0">Разработано с любовью ❤️</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
