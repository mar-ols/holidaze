import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CtaButton } from "../../../../styles/styled-components/buttons";
import { useFetch } from "../../../api/constant";
import { API_KEY } from "../../../api/constant/urls";

/* eslint-disable react/prop-types */

const schema = yup
  .object({
    banner: yup.string(),
    avatar: yup.string(),
    bio: yup.string(),
  })
  .required();

function EditProfileForm({ name, onSuccess }) {
  const storageProfile = JSON.parse(localStorage.getItem("profile") || "null");
  const currentBanner = storageProfile?.data?.banner?.url || "";
  const currentAvatar = storageProfile?.data?.avatar?.url || "";
  const currentBio = storageProfile?.data?.bio || "";
  const token = JSON.parse(localStorage.getItem("token") || "null");
  const currentVenueManager = storageProfile?.data?.venueManager || false;

  const [isVenueManager, setIsVenueManager] = useState(currentVenueManager);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      banner: currentBanner,
      avatar: currentAvatar,
      bio: currentBio,
    },
  });

  const { data, isLoading, isError, fetchData } = useFetch(
    `https://v2.api.noroff.dev/holidaze/profiles/${name}`,
    "PUT",
    null,
    token,
    API_KEY
  );

  const onSubmit = async (formData) => {
    const dataToSend = {
      banner: { url: formData.banner },
      avatar: { url: formData.avatar },
      bio: formData.bio,
      venueManager: isVenueManager,
    };

    await fetchData(dataToSend);
    console.log("Edit profile form data submitted:", dataToSend);
  };

  useEffect(() => {
    if (data) {
      console.log("Edit successful:", data);
      localStorage.setItem("profile", JSON.stringify(data));
      onSuccess();
    }

    if (isError) {
      console.error("Edit profile error:", isError);
    }
  }, [data, isError, onSuccess]);

  useEffect(() => {
    reset({ banner: currentBanner, avatar: currentAvatar, bio: currentBio });
  }, [reset, currentBanner, currentAvatar, currentBio]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="banner">Banner:</label>
        <input
          type="url"
          id="banner"
          name="banner"
          className="form-control"
          {...register("banner")}
        />
        <p>{errors.banner?.message}</p>

        <label htmlFor="avatar">Avatar:</label>
        <input
          type="url"
          id="avatar"
          name="avatar"
          className="form-control"
          {...register("avatar")}
        />
        <p className="warn">{errors.avatar?.message}</p>

        <label htmlFor="bio">Bio:</label>
        <textarea
          id="bio"
          name="bio"
          className="form-control"
          {...register("bio")}
        />
        <p className="warn">{errors.bio?.message}</p>

        <label htmlFor="manager">
          {isVenueManager
            ? "Would you like to unregister as a venue manager?"
            : "Would you like to register as a venue manager?"}
        </label>
        <div className="d-flex mb-4">
          <input
            id="manager"
            name="manager"
            className="me-1"
            type="checkbox"
            checked={isVenueManager}
            onChange={(e) => setIsVenueManager(e.target.checked)}
          />
          <span>Yes</span>
        </div>
        <CtaButton type="submit">
          {isLoading ? "Submitting..." : "Submit"}
        </CtaButton>
        {isError && <p className="error">{isError}</p>}
      </form>
    </>
  );
}

export { EditProfileForm };
