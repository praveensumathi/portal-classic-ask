import {
  Button,
  FormHelperText,
  Grid,
  TextField,
  Typography,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import { json, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { fetchStates } from "../../services/api";
import Autocomplete from "@mui/material/Autocomplete";
import { useAuthContext } from "../../context/AuthContext";

interface AddressProps {
  onNext: (
    address: string,
    phoneNumber: string,
    pincode: string,
    district: string,
    state: string,
    name: string
  ) => void;
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

function ShippingAddress({ onNext }: AddressProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInputFields>({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const { user } = useAuthContext();

  const handleSubmitShippingDetails = async (data: IFormInputFields) => {
    try {
      onNext(
        data.address,
        data.phoneNumber,
        data.pincode,
        data.district,
        data.state,
        data.name
      );
      const formShippingData = {
        ...data,
        selectedState,
      };
      if (user && user.userId) {
        localStorage.setItem(user.userId, JSON.stringify(formShippingData));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [stateList, setStateList] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [shippingDetailsFormData, setShippingDetailsFormData] =
    useState<IFormInputFields>({
      phoneNumber: "",
      address: "",
      pincode: "",
      district: "",
      state: "",
      name: "",
    });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const states = await fetchStates();
    setStateList(states);
    if (user && user.userId) {
      const savedFormData = localStorage.getItem(user?.userId);
      if (savedFormData) {
        const parsedFormData = JSON.parse(savedFormData);
        setShippingDetailsFormData(parsedFormData);

        setValue("name", parsedFormData.name ?? "");
        setValue("address", parsedFormData.address);
        setValue("phoneNumber", parsedFormData.phoneNumber);
        setValue("district", parsedFormData.district);
        setValue("pincode", parsedFormData.pincode);
        setSelectedState(parsedFormData.selectedState);
        setValue("state", parsedFormData.selectedState);
      }
    }
  };

  return (
    <Box mt={1}>
      <form onSubmit={handleSubmit(handleSubmitShippingDetails)}>
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
            <Autocomplete
              sx={{ width: "100%", paddingTop: "10px" }}
              value={selectedState}
              onChange={(event, newValue) => {
                setSelectedState(newValue || "");
                setValue("state", newValue ?? "");
              }}
              options={stateList}
              renderInput={(params) => (
                <TextField
                  required
                  label="Select a state"
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
              type="submit"
            >
              Continue
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default ShippingAddress;
