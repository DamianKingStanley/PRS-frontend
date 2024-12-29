import React from "react";
import "./ShopTalk.css";
import banner from "../../assets/banner.png";

const ShopTalk = () => {
  return (
    <div className="ShopTalkComponent">
      <section className="ShopTalk">
        <div>
          <img src={banner} alt="banner" />
        </div>
        <div>
          <h3>MOUAU Bookshop</h3>

          <p>
            Experience the future of academic shopping with c-BookShop! No more
            long queues or wasted time. Whether it's textbooks, manuals, or any
            other course materials, we've got you covered. Simply browse our
            extensive collection, add your desired items to your cart, and
            complete your purchase with ease. Make sure to screenshot your order
            and payment receipt—this is your key to swift collection at our
            store.
          </p>
          <p>
            But that's not all! We also offer a wide range of digital materials,
            including past questions, sample term papers, seminar research, and
            project guides. With c-BookShop, your academic success is just a few
            clicks away. Open 24/7 for your convenience, ensuring you have
            access to the resources you need, whenever you need them. Shop
            smart, study better, and take control of your academic journey with
            c-BookShop today!
          </p>
        </div>
      </section>
    </div>
  );
};

export default ShopTalk;
