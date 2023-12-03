import { footerContent } from "@/mock/footer";
import { Link } from "react-router-dom";

const FooterColumns = () => {
  return (
    <div className="flex justify-between flex-wrap flex-grow min-width-[800px] xl:rtl:pl-60">
      {footerContent.map((item) => {
        return (
          <div className="mt-6 md:mt-0" key={item.title}>
            <h2 className="text-md rtl:border-r-4 ltr:border-l-4 border-palette-primary px-2 text-customColorTextBase">
              {[item.title]}
            </h2>
            <div className="flex flex-col mt-2">
              {item.subtitles.map((subItem) => {
                return (
                  <Link to={subItem} key={subItem.text}>
                    <p className="text-sm text-palette-base/90 px-4 py-2 hover:text-palette-base/100 text-customColorTextBase">
                      {[subItem.text]}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FooterColumns;
