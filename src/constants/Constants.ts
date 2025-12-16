export const NavBarDrawerWidthMobile = "60vw";
export const NavBarDrawerWidthDesktop = "20vw";
export const FullScreenDrawerWidth = "100vw";

export const CART_ITEMS_KEY = `${import.meta.env.VITE_CART_ITEMS_KEY}`;
export const LOCAL_STORAGE_PAYMENT_RESPONSE = `${
  import.meta.env.VITE_LOCAL_STORAGE_PAYMENT_RESPONSE_KEY
}`;
export const LOCAL_STORAGE_SHIPPING_DETAILS = `${
  import.meta.env.VITE_LOCAL_STORAGE_SHIPPING_DETAILS_KEY
}`;
export const LOCAL_STORAGE_DELIVERY_FEE = `${
  import.meta.env.VITE_LOCAL_STORAGE_DELIVERY_FEE_KEY
}`;

export const HomeProductsSliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 2.8,
  arrows: false,
  lazyLoad: "ondemand",
  pauseOnFocus: true,
};

export const ProductsSliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1.5,
  slidesToScroll: 1,
  arrows: false,
  lazyLoad: "ondemand",
};

export const ProductDetailsSliderSettings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  dots: true,
};

export const UserRoles = {
  ADMIN: "admin",
  CUSTOMER: "customer",
  SUPER_CUSTOMER: "superCustomer",
  SHOP: "shop",
};
