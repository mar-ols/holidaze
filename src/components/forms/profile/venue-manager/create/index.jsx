import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CtaButton } from "../../../../../styles/styled-components/buttons";
import { useFetch } from "../../../../api/constant";
import { API_KEY } from "../../../../api/constant/urls";

/* eslint-disable react/prop-types */

const schema = yup
  .object({
    venueName: yup.string().required("Please provide a venue name"),
    description: yup.string().required("Please enter a description"),
    venuePrice: yup
      .number()
      .transform((value, originalValue) =>
        originalValue.trim() === "" ? undefined : value
      )
      .required("Please enter a valid number")
      .min(1, "The price must be $1 or higher"),
    venueGuests: yup
      .number()
      .transform((value, originalValue) =>
        originalValue.trim() === "" ? undefined : value
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

function CreateVenue({ onSuccess, refreshVenues }) {
  const token = JSON.parse(localStorage.getItem("token") || "null");

  const [wifi, setWifi] = useState(false);
  const [parking, setParking] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [pets, setPets] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { data, isLoading, isError, fetchData } = useFetch(
    `https://v2.api.noroff.dev/holidaze/venues`,
    "POST",
    null,
    token,
    API_KEY
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
    console.log("Create venue form data submitted:", dataToSend);
  };

  useEffect(() => {
    if (data) {
      console.log("Creating venue successful:", data);
      onSuccess();
      refreshVenues();
    }

    if (isError) {
      console.error("Create venue error:", isError);
    }
  }, [data, isError, onSuccess, refreshVenues]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="createForm">
        <label htmlFor="venueName">Venue name:*</label>
        <input
          type="text"
          id="venueName"
          name="venueName"
          className="form-control"
          {...register("venueName")}
        />
        <p>{errors.venueName?.message}</p>

        <label htmlFor="description">Description:*</label>
        <textarea
          id="description"
          name="description"
          className="form-control"
          {...register("description")}
        />
        <p className="warn">{errors.description?.message}</p>

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
        <p className="warn">{errors.venuePrice?.message}</p>

        <label htmlFor="venueGuests">Max. guests allowed:*</label>
        <input
          type="number"
          min="1"
          id="venueGuests"
          name="venueGuests"
          className="form-control"
          {...register("venueGuests")}
        />
        <p className="warn">{errors.venueGuests?.message}</p>

        <label htmlFor="venueImg">Venue image:*</label>
        <input
          type="url"
          id="venueImg"
          name="venueImg"
          className="form-control"
          {...register("venueImg")}
        />
        <p>{errors.venueImg?.message}</p>

        <label htmlFor="venueImgAlt">Venue image alt:*</label>
        <input
          type="text"
          id="venueImgAlt"
          name="venueImgAlt"
          className="form-control"
          {...register("venueImgAlt")}
        />
        <p>{errors.venueImgAlt?.message}</p>

        <label htmlFor="venueCity">City:*</label>
        <input
          type="text"
          id="venueCity"
          name="venueCity"
          className="form-control"
          {...register("venueCity")}
        />
        <p>{errors.venueCity?.message}</p>

        <label htmlFor="venueCountry">Country:*</label>
        <input
          type="text"
          id="venueCountry"
          name="venueCountry"
          className="form-control"
          {...register("venueCountry")}
        />
        <p>{errors.venueCountry?.message}</p>

        <div className="d-flex">
          <input
            id="venueBreakfast"
            name="venueBreakfast"
            className="me-1"
            type="checkbox"
            checked={breakfast}
            onChange={(e) => setBreakfast(e.target.checked)}
          />{" "}
          <label htmlFor="venueBreakfast">
            Does the venue serve breakfast?
          </label>
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
          {isLoading ? "Submitting..." : "Submit"}
        </CtaButton>
        {isError && <p className="error">{isError}</p>}
      </form>
    </>
  );
}

export { CreateVenue };
