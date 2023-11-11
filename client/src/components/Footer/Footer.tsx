
import FooterColumns from "./footerContent/FooterColumns";
import SocialPart from "./footerContent/SocialPart";


const Footer = () => {
  return (
    <footer className="mt-12">
      <div className="border-t-[1px] border-slate-500/30">
        <div className="flex flex-wrap py-4 md:py-8 md:px-4 w-full xl:max-w-[2100px] mx-auto">
          <FooterColumns />
          <div className="w-full md:w-1/3">
            <div className="border-t-[1px] border-slate-500/30 text-center text-xs md:text-sm py-4"></div>
            <SocialPart />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

