export const user = (state = {}, { type, payload }) => {
  switch (type) {
    case "login":
      return payload;
    case "logOut":
      localStorage.removeItem("User");
      return {};
    default:
      return state;
  }
};

export const address = (
  state = { address: "", city: "", postalCode: "", phone: "" },
  { type, payload }
) => {
  switch (type) {
    case "address":
      localStorage.setItem("address",JSON.stringify(payload))
      return payload;
    default:
      return state;
  }
};

export const addressExtras = (
  state = { firstName: "", lastName: "", state: "", country: "" },
  { type, payload }
) => {
  switch (type) {
    case "addressExtras":
      localStorage.setItem("addressExtras",JSON.stringify(payload))
      return payload;
    default:
      return state;
  }
};


export const basket = (state = [], { type, payload }) => {
  switch (type) {
    case "add":
      localStorage.setItem("basket",JSON.stringify(payload))
      return payload;
    case "plus":
      localStorage.setItem("basket",JSON.stringify(payload))
      return payload;
    case "minus":
      localStorage.setItem("basket",JSON.stringify(payload))
      return payload;
    case "remove":
      localStorage.setItem("basket",JSON.stringify(payload))
      return payload;
      case "clearBasket":
        localStorage.removeItem("basket",JSON.stringify(payload))
        return payload;
  
    default:
      return state;
  }
};

export const basketExtra = (state = [], { type, payload }) => {
  switch (type) {
    case "addExtra":
      localStorage.setItem("basketExtra",JSON.stringify(payload))
      return payload;
    case "plusExtra":
      localStorage.setItem("basketExtra",JSON.stringify(payload))
      return payload;
    case "minusExtra":
      localStorage.setItem("basketExtra",JSON.stringify(payload))
      return payload;
    case "removeExtra":
      localStorage.setItem("basketExtra",JSON.stringify(payload))
      return payload;
      case "clearBasketExtra":
        localStorage.removeItem("basketExtra",JSON.stringify(payload))
        return payload;
  
    default:
      return state;
  }
};
