import { menu_list } from "../assets/assets";
import SectionHeading from "./SectionHeading";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <section className="explore-menu section-margin  scroll-mt-8" id="exploreMenu">
      <SectionHeading heading="Explore Menu" subheading="Delicious food for you" />

      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <div
            key={index}
            onClick={() =>
              setCategory((prev) =>
                prev === item.menu_name ? "All" : item.menu_name
              )
            }
          >
            <img
              className={`w-[7.5vw] min-w-20 cursor-pointer transition-all duration-75 rounded-full  ${category === item.menu_name ? "border-2  border-main-primary p-1" : ""}`}
              src={item.menu_image}
              alt={item.menu_name}
              loading="lazy"
            />
            <p className="menu-name">{item.menu_name}</p>
          </div>
        ))}
      </div>

      <hr />
    </section>
  );
};

export default ExploreMenu;
