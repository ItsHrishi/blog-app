import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Text,
  TextField,
  TextArea,
} from "@radix-ui/themes";
import { Pencil1Icon, Cross2Icon, FileTextIcon } from "@radix-ui/react-icons";
import appwriteService from "../../appwrite/config";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import FullPageLoading from "../common/FullPageLoading";
import ErrorPage from "../common/ErrorPage";
import ImageUploadCropper from "../common/InputImageCropper";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    bio: "",
    profilePhoto: "",
  });
  const [loading, setLoading] = useState(false);
  const [fullPageLoading, setFullPageLoading] = useState(false);
  const [displayNewProfile, setDisplayNewProfile] = useState(null);
  const [tempData, setTempData] = useState(userData);
  const { id } = useParams();
  const currentUserData = useSelector((state) => state.auth.userData);
  const [error, setError] = useState("");

  if (id !== currentUserData.$id) {
    return <ErrorPage code={404} />;
  }

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await appwriteService.getAuthorMetaData(id);
        const metaData = data.documents[0] || {};
        setUserData({
          name: currentUserData?.name || "",
          email: currentUserData?.email || "",
          bio: metaData.bio || "",
          profilePhoto: metaData.profileImage || "",
        });
        setTempData({
          name: currentUserData?.name || "",
          email: currentUserData?.email || "",
          bio: metaData.bio || "",
          profilePhoto: metaData.profileImage || "",
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, [id, currentUserData]);

  const handleSave = async () => {
    try {
      if (error.length <= 0) {
        setLoading(true);
        let profileImageId = userData.profilePhoto;

        if (
          displayNewProfile &&
          tempData.profilePhoto !== userData.profilePhoto &&
          userData.profilePhoto.length > 0
        ) {
          const fileUpload = await appwriteService.updateProfilePhoto(
            userData.profilePhoto,
            tempData.profilePhoto
          );
          if (fileUpload) {
            profileImageId = fileUpload.$id;
          } else {
            console.error("Error updating the profile photo");
            return;
          }
        } else if (
          displayNewProfile &&
          tempData.profilePhoto !== userData.profilePhoto
        ) {
          const fileUpload = await appwriteService.uploadProfilePhoto(
            tempData.profilePhoto
          );
          if (fileUpload) {
            profileImageId = fileUpload.$id;
          } else {
            console.error("Error uploading new the profile photo");
            return;
          }
        }

        await appwriteService.updateUserMetaData({
          userId: currentUserData.$id,
          bio: tempData.bio,
          profileImage: profileImageId,
          userName: tempData.name,
        });

        if (userData.name !== tempData.name) {
          await appwriteService.updateUserName(tempData.name);
        }

        setIsEditing(false);
        setLoading(false);
        setDisplayNewProfile(null);
        setFullPageLoading(true);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      setLoading(false);
    }
  };

  const validateName = (name) => {
    if (name.trim() === "") {
      setError("Name cannot be empty.");
    } else if (name.length < 5) {
      setError("Name must be at least 5 characters long.");
    } else {
      setError("");
    }
  };

  const handleNameChange = (e) => {
    const { value } = e.target;
    setTempData((prev) => ({ ...prev, name: value }));
    validateName(value);
  };

  const handleCroppedImage = (croppedImageBlob) => {
    setTempData((prev) => ({
      ...prev,
      profilePhoto: croppedImageBlob,
    }));
    if (croppedImageBlob) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDisplayNewProfile(reader.result);
      };
      reader.readAsDataURL(croppedImageBlob);
    }
  };

  return fullPageLoading ? (
    <FullPageLoading />
  ) : (
    <Box className="w-full min-h-screen  p-4 md:p-8">
      <Card className="w-full max-w-3xl mx-auto shadow-lg rounded-xl">
        <Flex direction="column" gap="6" className="p-6 md:p-8">
          <Flex justify="between" align="center" className="border-b pb-4">
            <Text weight="bold" className="text-2xl md:text-3xl ">
              Profile
            </Text>
            {!isEditing ? (
              <Button
                variant="classic"
                highContrast
                className=" px-2 py-2 "
                onClick={() => setIsEditing(true)}
              >
                <Pencil1Icon className="w-4 h-4" />
                <span className="hidden md:block">Edit Profile</span>
              </Button>
            ) : (
              <Flex gap="2">
                <Button
                  loading={loading}
                  variant="classic"
                  color="grass"
                  className=" px-4 py-2 "
                  onClick={handleSave}
                >
                  <FileTextIcon width="16" height="16" />
                  <Box display={{ initial: "none", sm: "block" }} ml="1">
                    Save Changes
                  </Box>
                </Button>
                <Button
                  variant="classic"
                  className=" px-4 py-2 "
                  color="red"
                  onClick={() => {
                    setIsEditing(false);
                    setTempData(userData);
                    setDisplayNewProfile(null);
                  }}
                >
                  <Cross2Icon className="w-4 h-4" />
                </Button>
              </Flex>
            )}
          </Flex>

          <Flex direction="column" align="center" gap="6" className="w-full">
            <Box className="relative w-full">
              <Flex
                direction="column"
                align="center"
                justify="center"
                gap="4"
                className="w-full items-center"
              >
                <Avatar
                  size="8"
                  className="w-32 h-32 rounded-full border-4shadow-md"
                  src={appwriteService.getProfileImagePreview(
                    userData.profilePhoto
                  )}
                  fallback={tempData.name[0]}
                />

                {isEditing && (
                  <>
                    <ImageUploadCropper
                      onImageCropped={handleCroppedImage}
                      aspectRatio={1}
                      className="w-full items-center"
                    />
                  </>
                )}

                {isEditing && displayNewProfile && (
                  <div className="mt-4 p-2 bg-gray-50 rounded-lg shadow-sm">
                    <img
                      src={displayNewProfile}
                      alt="New Profile Preview"
                      className="max-w-[100px] rounded-lg"
                    />
                  </div>
                )}
              </Flex>
            </Box>

            <Flex direction="column" gap="6" className="w-full">
              <Box className="space-y-2">
                <Text weight="bold" className="text-base">
                  Name
                </Text>
                {isEditing ? (
                  <div>
                    <TextField.Root
                      className="w-full"
                      value={tempData.name}
                      placeholder="Enter your name"
                      onChange={handleNameChange}
                    />
                    {error && (
                      <Text color="red" size="2" className="mt-1">
                        {error}
                      </Text>
                    )}
                  </div>
                ) : (
                  <Text
                    weight="regular"
                    style={{
                      backgroundColor: "var(--accent-4)",
                    }}
                    className="text-base rounded-md p-1 ml-2"
                  >
                    {userData.name}
                  </Text>
                )}
              </Box>

              <Box className="space-y-2">
                <Text weight="bold" className="text-base ">
                  Email
                </Text>
                {isEditing ? (
                  <TextField.Root
                    className="w-full"
                    type="email"
                    disabled
                    value={tempData.email}
                  />
                ) : (
                  <Text
                    weight="regular"
                    style={{
                      backgroundColor: "var(--accent-4)",
                    }}
                    className="text-base rounded-md p-1 ml-2"
                  >
                    {userData.email}
                  </Text>
                )}
              </Box>

              <Box className="space-y-2">
                {isEditing ? (
                  <>
                    <Text weight="bold" className="text-base">
                      Bio
                    </Text>
                    <TextArea
                      value={tempData.bio}
                      onChange={(e) =>
                        setTempData((prev) => ({
                          ...prev,
                          bio: e.target.value,
                        }))
                      }
                      size="3"
                      className="w-full"
                      style={{
                        height: "180px",
                      }}
                    />
                  </>
                ) : (
                  <Flex>
                    <Text weight="bold" className="text-base">
                      Bio
                    </Text>
                    <Text
                      weight="regular"
                      className="text-base rounded-md p-1 whitespace-pre-wrap ml-2"
                      style={{
                        backgroundColor: "var(--accent-4)",
                      }}
                    >
                      {userData.bio || "No bio added yet."}
                    </Text>
                  </Flex>
                )}
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
};

export default UserProfile;
