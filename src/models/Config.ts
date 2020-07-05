
export class Config {

  public static get API_ROUTE(): any {

    return {

      URL_CATEGORIES: 'https://www.yaatoo.ci/mobileApp/getcategories.php',
      URL_PRODUCTS: 'https://www.yaatoo.ci/mobileApp/products.php',
      URL_POST_PRODUCTS: 'https://www.yaatoo.ci/mobileApp/post.php',
      URL_GET_BY_CATEGORIES: 'https://www.yaatoo.ci/mobileApp/products.php',
      URL_LOGIN: 'https://www.yaatoo.ci/mobileApp/login.php',

      URL_SLIDERS: 'https://www.yaatoo.ci/mobileApp/getSliders.php',
      URL_REGISTER: 'https://www.yaatoo.ci/mobileApp/registration.php',
      URL_POP_CATEGORIE: 'https://www.yaatoo.ci/mobileApp/getTopCategories.php',
      URL_TOP_PROMO_BANNER: 'https://www.yaatoo.ci/mobileApp/getFristPromo.php',
      URL_TOP_PROMO2_BANNER: 'https://www.yaatoo.ci/mobileApp/getLastPromo.php',
      URL_WEEK_DEALS: 'https://www.yaatoo.ci/mobileApp/getWeekDeals.php',
      URL_POPULAR_PRODUCTS: 'https://www.yaatoo.ci/mobileApp/getPopularProducts.php',
      URL_SEARCH: 'https://www.yaatoo.ci/mobileApp/searchProducts.php',
      URL_FIDELITY: 'https://www.yaatoo.ci/mobileApp/fidelity.php',
      URL_VERIF_PRODUCT: 'https://www.yaatoo.ci/mobileApp/verification.php',

      URL_GET_PRODUCT_BY_ID: 'https://www.yaatoo.ci/mobileApp/getProductById.php',
      URL_GET_CARRIER: 'https://www.yaatoo.ci/mobileApp/getCarrierByShop.php',
      URL_GET_SHOPS: 'https://www.yaatoo.ci/mobileApp/getShops.php',
      URL_GET_SHOPS_DELIVERY: 'https://www.yaatoo.ci/mobileApp/getShops_delivery.php',
      URL_GET_CART_PRODUCT: 'https://www.yaatoo.ci/mobileApp/getCartProducts.php',
      URL_ADDTOCART: 'https://www.yaatoo.ci/mobileApp/addToCart.php',
      URL_UPDATE_CART: 'https://www.yaatoo.ci/mobileApp/setCartCustomer.php',
      URL_ADD_CART_PRODUCTS: 'https://www.yaatoo.ci/mobileApp/cartProducts.php',
      URL_USER_ORDERS: 'https://www.yaatoo.ci/mobileApp/getOrderByCustomer.php',
      URL_REMOVE_PRODUCT: 'https://www.yaatoo.ci/mobileApp/deleteCartProduct.php',
      URL_UPDATE_PRODUCT: 'https://www.yaatoo.ci/mobileApp/updateCartProduct.php',
      URL_DELIVERY_ADDRESS: 'https://www.yaatoo.ci/mobileApp/saveDeleveryAddress.php',
      URL_DELIVERY_DATE: 'https://www.yaatoo.ci/mobileApp/saveDeliveryDate.php',
      URL_CONFIRM_ORDER: 'https://www.yaatoo.ci/mobileApp/confirmOrders.php',
      URL_DISCOUNT: 'https://www.yaatoo.ci/mobileApp/getDiscount.php',
      // URL_TOP_MENU: "https://www.yaatoo.ci/mobileApp/getCatIcons_bis.php",
      URL_TOP_MENU: 'https://www.yaatoo.ci/mobileApp/getCatIcons.php',
      URL_OM: 'https://www.yaatoo.ci/mobileApp/om/initialization.php',
      URL_OM_CONFIRMATION: 'https://www.yaatoo.ci/mobileApp/om/getConfirmation.php',
      URL_PROMO_PRODUCT: 'https://www.yaatoo.ci/mobileApp/getPromotionProductsByShop.php',
      URL_SHOPIN_SLIDERS: 'https://www.yaatoo.ci/mobileApp/getSliderByBoutique.php',
      URL_SHOPINSHOP_PRODUCTS: 'https://www.yaatoo.ci/mobileApp/getProductForBoutique.php',
      // URL_SHOPINSHOP_PRODUCTS: 'https://www.yaatoo.ci/mobileApp/getProductByBlockForBoutique.php',
      // Spacial SHop
      URL_SPECIAL_SHOP: 'https://www.yaatoo.ci/mobileApp/getBoutiqueSpeciales.php',
      // URL_SPECIAL_SHOP: 'http://145.239.70.207/mobileApp/getBoutiqueSepecialisees_bis.php',
      URL_SEARCH_SPECIAL_SHOP: 'https://www.yaatoo.ci/mobileApp/searchShops.php',
      // URL_SEARCH_SPECIAL_SHOP: 'http://145.239.70.207/mobileApp/searchShops.php',

      URL_PAYEMENT: 'https://www.yaatoo.ci/mobileApp/getLastPaymentImage.php',
      URL_RECOMMANDE_PROD: 'https://www.yaatoo.ci/mobileApp/getProductFromSameCategorie.php',

      // URL_CATEGORIES : 'https://www.yaatoo.ci/mobileApp/getcategories.php',
      // URL_PRODUCTS : 'https://www.yaatoo.ci/mobileApp/products.php',
      // URL_POST_PRODUCTS : 'https://www.yaatoo.ci/mobileApp/post.php',
      // URL_GET_BY_CATEGORIES : 'https://www.yaatoo.ci/mobileApp/products.php',
      // URL_LOGIN : 'https://www.yaatoo.ci/mobileApp/login.php',

      // URL_SLIDERS : 'https://www.yaatoo.ci/mobileApp/getSliders.php',
      // URL_REGISTER : 'https://www.yaatoo.ci/mobileApp/registration.php',
      // URL_POP_CATEGORIE : 'https://www.yaatoo.ci/mobileApp/getTopCategories.php',
      // URL_TOP_PROMO_BANNER : 'https://www.yaatoo.ci/mobileApp/getFristPromo.php',
      // URL_TOP_PROMO2_BANNER : 'https://www.yaatoo.ci/mobileApp/getLastPromo.php',
      // URL_WEEK_DEALS : 'https://www.yaatoo.ci/mobileApp/getWeekDeals.php',
      // URL_POPULAR_PRODUCTS : 'https://www.yaatoo.ci/mobileApp/getPopularProducts.php',
      // URL_SEARCH : 'https://www.yaatoo.ci/mobileApp/searchProducts.php',

      // URL_GET_CARRIER : 'https://www.yaatoo.ci/mobileApp/getCarrierByShop.php',
      // URL_GET_SHOPS : 'https://www.yaatoo.ci/mobileApp/getShops.php',
      // URL_GET_CART_PRODUCT : 'https://www.yaatoo.ci/mobileApp/getCartProducts.php',
      // URL_ADDTOCART : 'https://www.yaatoo.ci/mobileApp/addToCart.php',
      // URL_UPDATE_CART : 'https://www.yaatoo.ci/mobileApp/setCartCustomer.php',
      // URL_ADD_CART_PRODUCTS : 'https://www.yaatoo.ci/mobileApp/cartProducts.php',
      // URL_USER_ORDERS : 'https://www.yaatoo.ci/mobileApp/getOrderByCustomer.php',
      // URL_REMOVE_PRODUCT : 'https://www.yaatoo.ci/mobileApp/deleteCartProduct.php',
      // URL_UPDATE_PRODUCT : 'https://www.yaatoo.ci/mobileApp/updateCartProduct.php',
      // URL_DELIVERY_ADDRESS : 'https://www.yaatoo.ci/mobileApp/saveDeleveryAddress.php',
      // URL_DELIVERY_DATE : 'https://www.yaatoo.ci/mobileApp/saveDeliveryDate.php',
      // URL_CONFIRM_ORDER : 'https://www.yaatoo.ci/mobileApp/confirmOrders.php',
    }
  }
}
