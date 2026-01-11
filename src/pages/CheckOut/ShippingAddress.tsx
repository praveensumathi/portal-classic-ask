import {
  Button,
  FormHelperText,
  Grid,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { updateUserAddress } from "../../services/api";
import Autocomplete from "@mui/material/Autocomplete";
import { useAuthContext } from "../../context/AuthContext";
import AddressConfirmDialog from "./AddressConfirmDialog";
import { useGetStateList } from "../../CustomHooksRQ/Category/Hooks";
import { IUser } from "../../interface/types";

interface AddressProps {
  onNext: (
    address: string,
    phoneNumber: string,
    pincode: string,
    district: string,
    state: string,
    name: string
  ) => void;
  onChangeLoginClick: () => void;
}

interface IFormInputFields {
  phoneNumber: string;
  address: string;
  pincode: string;
  district: string;
  state: string;
  name: string;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is Required")
    .typeError("Please enter Name")
    .min(5)
    .max(100),
  phoneNumber: yup
    .string()
    .required()
    .typeError("Please enter the PhoneNumber")
    .matches(/^[0-9]{10}$/, "Please enter a valid phone number"),
  address: yup.string().required("Address is mandatory"),
  pincode: yup
    .string()
    .required()
    .typeError("Please enter the Pincode")
    .matches(/^[0-9]{6}$/, "Please enter a valid Pincode"),
  district: yup.string().required("District is mandatory"),
  state: yup.string().required("State is mandatory"),
});

function ShippingAddress({ onNext, onChangeLoginClick }: AddressProps) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IFormInputFields>({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const { user, updateUserData } = useAuthContext();

  const [confirmAddressOpen, setConfirmAddressOpen] = useState(false);

  const handleContinueClick = () => {
    setConfirmAddressOpen(true);
  };

  const handleConfirmAddress = async () => {
    if (!user?.userId) return;

    const addressPayload = {
      address: getValues("address"),
      district: getValues("district"),
      pincode: getValues("pincode"),
      state: getValues("state"),
    };

    try {
      await updateUserAddress(user.userId, addressPayload);

      setConfirmAddressOpen(false);
      // go to next step
      handleSubmit(handleSubmitShippingDetails)();
    } catch (error) {
      console.error("Failed to update address", error);
    }
  };

  const handleSubmitShippingDetails = async (data: IFormInputFields) => {
    try {
      const formShippingData = {
        ...data,
        selectedState,
      };

      if (user && user.userId) {
        localStorage.setItem(user.userId, JSON.stringify(formShippingData));
      }

      updateUserData({
        ...user,
        address: {
          ...data,
        },
      } as IUser);

      onNext(
        data.address,
        data.phoneNumber,
        data.pincode,
        data.district,
        data.state,
        data.name
      );
    } catch (error) {
      console.error(error);
    }
  };

  const [stateList, setStateList] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  // const [shippingDetailsFormData, setShippingDetailsFormData] =
  //   useState<IFormInputFields>({
  //     phoneNumber: "",
  //     address: "",
  //     pincode: "",
  //     district: "",
  //     state: "",
  //     name: "",
  //   });

  const { data: _states, isLoading, isFetching } = useGetStateList();

  useEffect(() => {
    setStateList(_states);
  }, [!isLoading && !isFetching && _states]);

  useEffect(() => {
    fetchAddressData();
  }, []);

  const fetchAddressData = async () => {
    if (!user || !user.userId) return;

    // Always set basic fields from user
    setValue("name", user.name ?? "");
    setValue("phoneNumber", user.phoneNumber ?? "");

    // 👉 1️⃣ First priority: address from user (API)
    if (user.address) {
      const address = user.address;

      setValue("address", address.address ?? "");
      setValue("district", address.district ?? "");
      setValue("pincode", address.pincode ?? "");
      setValue("state", address.state ?? "");
      setSelectedState(address.state ?? "");

      return; // 👈 stop here, do NOT use localStorage
    }

    // 👉 2️⃣ Fallback: localStorage
    const savedFormData = localStorage.getItem(user.userId);
    if (savedFormData) {
      const parsedFormData = JSON.parse(savedFormData);

      setValue("address", parsedFormData.address ?? "");
      setValue("district", parsedFormData.district ?? "");
      setValue("pincode", parsedFormData.pincode ?? "");
      setValue("state", parsedFormData.selectedState ?? "");
      setSelectedState(parsedFormData.selectedState ?? "");
    }
  };

  return (
    <Box mt={1}>
      <form>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography>
              Name<span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              placeholder={"Enter Name"}
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message?.toString()}
              FormHelperTextProps={{
                sx: { color: "red", marginLeft: "0px" },
              }}
              inputProps={{ style: { padding: "10px" } }}
              autoComplete="new"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>
              Address<span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              multiline
              rows={9}
              placeholder={`Name:  xxxxxxxxxx\nAddress:  xxxxx xxxxx xxxxx\nLandmark:  xxx xxx xxxx xxxxx\nPincode:  xxxxxx\nState:  xxxxxxxxxx\nMobile No.:  xxxxxxxxxx\n--------------------------------\nFrom name:  xxxxxxxxxx\nMobile Number:  xxxxxxxxxx`}
              {...register("address")}
              error={!!errors.address}
              helperText={errors.address?.message?.toString()}
              FormHelperTextProps={{
                sx: { color: "red", marginLeft: "0px" },
              }}
            />
            <FormHelperText sx={{ fontWeight: "bold" }}>
              (Note: Please send the address in this format. If the address is
              not proper, we don't have any responsibility for the parcel.)
            </FormHelperText>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              Phone number<span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              variant="outlined"
              type="tel"
              fullWidth
              required
              inputProps={{ style: { padding: "10px" } }}
              {...register("phoneNumber")}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message?.toString()}
              FormHelperTextProps={{
                sx: { color: "red", marginLeft: "0px" },
              }}
              autoComplete="new"
            />
          </Grid>
          <Grid item xs={4}>
            <Typography>
              Pincode<span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              type="number"
              required
              inputProps={{ style: { padding: "10px" } }}
              {...register("pincode")}
              error={!!errors.pincode}
              helperText={errors.pincode?.message?.toString()}
              FormHelperTextProps={{
                sx: { color: "red", marginLeft: "0px" },
              }}
              autoComplete="new"
            />
          </Grid>
          <Grid item xs={8}>
            <Typography>
              District<span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              required
              inputProps={{ style: { padding: "10px" } }}
              {...register("district")}
              error={!!errors.district}
              helperText={errors.district?.message?.toString()}
              FormHelperTextProps={{
                sx: { color: "red", marginLeft: "0px" },
              }}
              autoComplete="new"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>
              State<span style={{ color: "red" }}>*</span>
            </Typography>
            <Autocomplete
              sx={{ width: "100%" }}
              value={selectedState}
              onChange={(event, newValue) => {
                setSelectedState(newValue || "");
                setValue("state", newValue ?? "");
              }}
              options={stateList ?? []}
              renderInput={(params) => (
                <TextField
                  required
                  placeholder="Select State"
                  error={!!errors.state}
                  helperText={errors?.state?.message?.toString()}
                  {...params}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              sx={{ marginTop: "15px" }}
              onClick={handleContinueClick}
              type="button"
            >
              Continue
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              fullWidth
              onClick={onChangeLoginClick}
              type="button"
            >
              Change Login Number
            </Button>
          </Grid>
        </Grid>
      </form>
      {confirmAddressOpen && (
        <>
          <AddressConfirmDialog
            open={confirmAddressOpen}
            onCancel={() => setConfirmAddressOpen(false)}
            onConfirm={handleConfirmAddress}
          />
        </>
      )}
    </Box>
  );
}

export default ShippingAddress;
