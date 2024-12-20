import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CtaButton } from "../../../../../styles/styled-components/buttons";
import { useFetch } from "../../../../api/constant";
const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

/* eslint-disable react/prop-types */

const schema = yup
  .object({
    venueName: yup.string().required("Please provide a venue name"),
    description: yup.string().required("Please enter a description"),
    venuePrice: yup
      .number()
      .transform((value, originalValue) =>
        typeof originalValue === "string" && originalValue.trim() === ""
          ? undefined
          : value
      )
      .required("Please enter a valid number")
      .min(1, "The price must be $1 or higher"),
    venueGuests: yup
      .number()
      .transform((value, originalValue) =>
        typeof originalValue === "string" && originalValue.trim() === ""
          ? undefined
          : value
      )
      .required("Please enter a valid number")
      .min(1, "The max number of guests must be one or more"),
    venueImg: yup.string().required("Please provide a venue image"),
    venueImgAlt: yup.string().required("Please enter alt text for your image"),
    venueCity: yup
      .string()
      .required("Please enter the city your venue is located"),
    venueCountry: yup
      .string()
      .required("Please enter the country your venue is located"),
  })
  .required();

function UpdateVenue({ onSuccess, refreshVenues, id }) {
  const localStorageProfile = JSON.parse(
    localStorage.getItem("profile") || "null"
  );
  const manager = localStorageProfile.data.name;
  const token = JSON.parse(localStorage.getItem("token") || "null");

  const [wifi, setWifi] = useState(false);
  const [parking, setParking] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [pets, setPets] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { data: fetchVenueData, fetchData: getVenueData } = useFetch(
    `${apiUrl}holidaze/profiles/${manager}/venues?_bookings=true`,
    "GET",
    null,
    token,
    apiKey
  );

  useEffect(() => {
    getVenueData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (fetchVenueData?.data?.length > 0) {
      const venue = fetchVenueData.data[0];
      const { name, description, price, maxGuests, media, location, meta } =
        venue;

      reset({
        venueName: name || "",
        description: description || "",
        venuePrice: price || "",
        venueGuests: maxGuests || "",
        venueImg: media?.[0]?.url || "",
        venueImgAlt: media?.[0]?.alt || "",
        venueCity: location?.city || "",
        venueCountry: location?.country || "",
      });

      setWifi(meta?.wifi || false);
      setParking(meta?.parking || false);
      setBreakfast(meta?.breakfast || false);
      setPets(meta?.pets || false);
    }
  }, [fetchVenueData, reset]);

  const { data, isLoading, isError, fetchData } = useFetch(
    `${apiUrl}holidaze/venues/${id}`,
    "PUT",
    null,
    token,
    apiKey
  );

  const onSubmit = async (formData) => {
    const dataToSend = {
      name: formData.venueName,
      description: formData.description,
      price: formData.venuePrice,
      maxGuests: formData.venueGuests,
      media: [
        {
          url: formData.venueImg,
          alt: formData.venueImgAlt,
        },
      ],
      location: {
        city: formData.venueCity,
        country: formData.venueCountry,
      },
      meta: {
        wifi,
        parking,
        breakfast,
        pets,
      },
    };

    await fetchData(dataToSend);
  };

  useEffect(() => {
    if (data) {
      onSuccess();
      refreshVenues();
    }

    if (isError) {
      console.error("Create venue error:", isError);
    }
  }, [data, isError, onSuccess, refreshVenues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="createForm">
      <label htmlFor="venueName">Venue name:*</label>
      <input
        type="text"
        id="venueName"
        name="venueName"
        className="form-control"
        {...register("venueName")}
      />
      <p className="error">{errors.venueName?.message}</p>

      <label htmlFor="description">Description:*</label>
      <textarea
        id="description"
        name="description"
        className="form-control"
        {...register("description")}
      />
      <p className="error">{errors.description?.message}</p>

      <label htmlFor="venuePrice">Price per night:*</label>
      <input
        type="number"
        min="1"
        id="venuePrice"
        name="venuePrice"
        className="form-control"
        {...register("venuePrice")}
      />
      <span>$</span>
      <p className="error">{errors.venuePrice?.message}</p>

      <label htmlFor="venueGuests">Max. guests allowed:*</label>
      <input
        type="number"
        min="1"
        id="venueGuests"
        name="venueGuests"
        className="form-control"
        {...register("venueGuests")}
      />
      <p className="error">{errors.venueGuests?.message}</p>

      <label htmlFor="venueImg">Venue image:*</label>
      <input
        type="url"
        id="venueImg"
        name="venueImg"
        className="form-control"
        {...register("venueImg")}
      />
      <p className="error">{errors.venueImg?.message}</p>

      <label htmlFor="venueImgAlt">Venue image alt:*</label>
      <input
        type="text"
        id="venueImgAlt"
        name="venueImgAlt"
        className="form-control"
        {...register("venueImgAlt")}
      />
      <p className="error">{errors.venueImgAlt?.message}</p>

      <label htmlFor="venueCity">City:*</label>
      <input
        type="text"
        id="venueCity"
        name="venueCity"
        className="form-control"
        {...register("venueCity")}
      />
      <p className="error">{errors.venueCity?.message}</p>

      <label htmlFor="venueCountry">Country:*</label>
      <input
        type="text"
        id="venueCountry"
        name="venueCountry"
        className="form-control"
        {...register("venueCountry")}
      />
      <p className="error">{errors.venueCountry?.message}</p>

      <div className="d-flex">
        <input
          id="venueBreakfast"
          name="venueBreakfast"
          className="me-1"
          type="checkbox"
          checked={breakfast}
          onChange={(e) => setBreakfast(e.target.checked)}
        />{" "}
        <label htmlFor="venueBreakfast">Does the venue serve breakfast?</label>
      </div>

      <div className="d-flex">
        <input
          id="venueParking"
          name="venueParking"
          className="me-1"
          type="checkbox"
          checked={parking}
          onChange={(e) => setParking(e.target.checked)}
        />{" "}
        <label htmlFor="venueParking">
          Does the venue provide on-site parking?
        </label>
      </div>

      <div className="d-flex">
        <input
          id="venueWifi"
          name="venueWifi"
          className="me-1"
          type="checkbox"
          checked={wifi}
          onChange={(e) => setWifi(e.target.checked)}
        />{" "}
        <label htmlFor="venueWifi">Does the venue have wifi?</label>
      </div>

      <div className="d-flex mb-4">
        <input
          id="venuePets"
          name="venuePets"
          className="me-1"
          type="checkbox"
          checked={pets}
          onChange={(e) => setPets(e.target.checked)}
        />{" "}
        <label htmlFor="venuePets">Does the venue allow pets?</label>
      </div>

      <CtaButton type="submit">
        {isLoading ? "Submitting..." : "Update"}
      </CtaButton>
      {isError && <p className="error">{isError}</p>}
    </form>
  );
}

export { UpdateVenue };
