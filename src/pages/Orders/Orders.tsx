import React, { useEffect, useState } from "react";
import ShowOrdersByDate from "./ShowOrdersByDate";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { paths } from "../../routes/paths";

function Orders() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user && isLoading) {
      navigate(`/${paths.LOGIN}`, { state: { fromOrders: true } });
    }
  }, [isLoading]);

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  return (
    <>
      <ShowOrdersByDate />
    </>
  );
}

export default Orders;
