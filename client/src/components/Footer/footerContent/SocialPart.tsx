import { socialMedia } from "../../../mock/footer";
import { Link } from "react-router-dom";

const SocialPart = () => {
  return (
    <div className="mt-8 rtl:md:mt-0 ltr:xl:mt-0 rtl:lg:mr-12 ltr:xl:ml-12  ltr:2xl:ml-48">
      <div>
        <h2 className="text-md sm:text-lg text-customColorTextBase">Будьте с нами!</h2>
        <div className="flex mt-3">
          {socialMedia.map((SocialItem) => {
            return (
              <Link to={SocialItem} key={SocialItem.name}>
                <SocialItem.icon
                  style={{
                    fontSize: "2rem",
                    color: "inherit",
                  }}
                />
              </Link>
            );
          })}
        </div>
      </div>
      <div className="mt-6 text-customColorTextBase">
        <h2 className="text-md sm:text-lg text-customColorTextBase">
          Будьте в курсе последних скидок, написав нам по электронной почте
        </h2>
        <form
          className="flex items-center flex-wrap sm:flex-nowrap mt-4 "
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            className=" w-full py-3 px-4 outline-none rounded-lg sm:rounded-none ltr:sm:rounded-tl-lg ltr:sm:rounded-bl-lg rtl:sm:rounded-tr-lg rtl:sm:rounded-br-lg shadow-md sm:shadow-none focus:shadow-sm"
            type="email"
            placeholder="введите ваш email"
          />
          <button
            className="outline-none py-3 px-4 w-full sm:w-auto mt-2 sm:mt-0 rounded-lg sm:rounded-none md:w-auto bg-palette-primary text-palette-side rtl:sm:rounded-tl-lg rtl:sm:rounded-bl-lg ltr:sm:rounded-tr-lg ltr:sm:rounded-br-lg"
            type="button"
          >
            отправить
          </button>
        </form>
      </div>
    </div>
  );
};

export default SocialPart;
