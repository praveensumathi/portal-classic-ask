export const calculateDiscountPercentage = (MRPprice, price) => {
  if (MRPprice === 0) {
    return 0;
  }

  return (((MRPprice - price) / MRPprice) * 100).toFixed(0);
};

const getStateLowerCase = (state: string): string => state.toLowerCase();

export const calculateDeliveryFee = (
  netWeight: number,
  shippingState: string
): number => {
  let calculatedDeliveryFee = 0;

  const selectedState = getStateLowerCase(shippingState);

  if (selectedState === "tamil nadu") {
    calculatedDeliveryFee = 0;
    return calculatedDeliveryFee;
  }

  if (selectedState === "puducherry") {
    if (netWeight > 0 && netWeight <= 1) {
      calculatedDeliveryFee = 40;
    } else if (netWeight > 1 && netWeight <= 2) {
      calculatedDeliveryFee = 70;
    } else if (netWeight > 2 && netWeight <= 3) {
      calculatedDeliveryFee = 100;
    } else if (netWeight > 3) {
      const subtractValue = netWeight - 3;
      calculatedDeliveryFee = 100 + subtractValue * 30;
    }
  } else if (
    selectedState === "kerala" ||
    selectedState === "andhra pradesh" ||
    selectedState === "karnataka" ||
    selectedState === "telangana"
  ) {
    if (netWeight > 0 && netWeight <= 0.5) {
      calculatedDeliveryFee = 60;
    } else if (netWeight > 0.5 && netWeight <= 1) {
      calculatedDeliveryFee = 70;
    } else if (netWeight > 1 && netWeight <= 2) {
      calculatedDeliveryFee = 130;
    } else if (netWeight > 2 && netWeight <= 3) {
      calculatedDeliveryFee = 190;
    } else if (netWeight > 3) {
      const subtractValue = netWeight - 3;
      calculatedDeliveryFee = 190 + subtractValue * 60;
    }
  } else {
    if (netWeight > 0 && netWeight <= 0.5) {
      calculatedDeliveryFee = 80;
    } else if (netWeight > 0.5 && netWeight <= 1) {
      calculatedDeliveryFee = 130;
    } else if (netWeight > 1 && netWeight <= 2) {
      calculatedDeliveryFee = 180;
    } else if (netWeight > 2 && netWeight <= 3) {
      calculatedDeliveryFee = 250;
    } else if (netWeight > 3) {
      const subtractValue = netWeight - 3;
      calculatedDeliveryFee = 250 + subtractValue * 120;
    }
  }

  return calculatedDeliveryFee;
};
