import React, { useEffect, useState } from "react";
import { Theme } from "@radix-ui/themes";
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
import { Pencil1Icon, Cross2Icon } from "@radix-ui/react-icons";
import appwriteService from "../../appwrite/config";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import FullPageLoading from "../common/FullPageLoading";

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
      setLoading(true);
      let profileImageId = userData.profilePhoto;
      console.log("check 1", tempData.profilePhoto);
      console.log("check 2", userData.profilePhoto);

      if (
        displayNewProfile &&
        tempData.profilePhoto !== userData.profilePhoto &&
        userData.profilePhoto.length > 0
      ) {
        console.log("inside if : ");
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

      const updateUserMetaData = await appwriteService.updateUserMetaData({
        userId: currentUserData.$id,
        bio: tempData.bio,
        profileImage: profileImageId,
      });

      if (userData.name !== tempData.name) {
        await appwriteService.updateUserName(tempData.name);
      }

      console.log("updateUserMetaData:", updateUserMetaData);

      setIsEditing(false);
      setLoading(false);
      setDisplayNewProfile(null);
      setFullPageLoading(true);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Error updating user data:", error);
      setLoading(false);
    }
  };

  return fullPageLoading ? (
    <FullPageLoading />
  ) : (
    <Box className="w-full min-h-screen p-2 sm:p-4 md:p-6">
      <Card
        size="3"
        className="w-full max-w-[95%] sm:max-w-xl md:max-w-2xl mx-auto"
      >
        <Flex direction="column" gap="4" p="2 sm:p-4 md:p-6">
          <Flex justify="between" align="center" direction="row" gap="3">
            <Text size={{ initial: "5", sm: "6" }} weight="bold">
              Profile
            </Text>
            {!isEditing ? (
              <Button
                variant="classic"
                highContrast
                onClick={() => setIsEditing(true)}
              >
                <Pencil1Icon className="w-4 h-4" />
                <span className="hidden md:block">Edit</span>
              </Button>
            ) : (
              <Flex gap="2">
                <Button
                  loading={loading}
                  variant="classic"
                  highContrast
                  onClick={handleSave}
                >
                  Save
                </Button>
                <Button
                  variant="classic"
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

          <Flex direction="column" align="center" gap="4">
            <Box position="relative" className="p-4">
              <Flex direction="row" align="center" gap="4">
                {/* Avatar with dynamic sizes */}
                <Avatar
                  size={{ initial: "5", sm: "6" }}
                  src={appwriteService.getProfileImagePreview(
                    userData.profilePhoto
                  )}
                  fallback={tempData.name[0]}
                />
                <Flex direction="column" gap="2">
                  {/* File Upload Label */}
                  {isEditing && (
                    <label className="text-sm font-medium text-gray-600 bg-gray-100 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-200 transition">
                      Change Profile Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          setTempData((prev) => ({
                            ...prev,
                            profilePhoto: e.target.files?.[0],
                          }));
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setDisplayNewProfile(reader.result);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  )}

                  {/* New Profile Preview */}
                  {isEditing && displayNewProfile && (
                    <div className="mt-2">
                      <img
                        src={displayNewProfile}
                        alt="New Profile Preview"
                        className="max-w-full h-auto rounded-md border border-gray-300 shadow-sm"
                        style={{ maxHeight: "120px" }}
                      />
                    </div>
                  )}
                </Flex>
              </Flex>
            </Box>

            <Flex direction="column" gap="4" className="w-full">
              <Box>
                <Text size="2" weight="bold">
                  Name
                </Text>
                {isEditing ? (
                  <TextField.Root
                    size={{ initial: "2", sm: "3" }}
                    value={tempData.name}
                    onChange={(e) =>
                      setTempData((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                ) : (
                  <Text size={{ initial: "3", sm: "4" }}>{userData.name}</Text>
                )}
              </Box>

              <Box>
                <Text size="2" weight="bold">
                  Email
                </Text>
                {isEditing ? (
                  <TextField.Root
                    size={{ initial: "2", sm: "3" }}
                    type="email"
                    disabled
                    value={tempData.email}
                    onChange={(e) =>
                      setTempData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <Text size={{ initial: "3", sm: "4" }}>{userData.email}</Text>
                )}
              </Box>

              <Box>
                <Text size="2" weight="bold">
                  Bio
                </Text>
                {isEditing ? (
                  <TextArea
                    value={tempData.bio}
                    onChange={(e) =>
                      setTempData((prev) => ({ ...prev, bio: e.target.value }))
                    }
                    className="min-h-[100px]"
                  />
                ) : (
                  <Text size={{ initial: "3", sm: "4" }}>{userData.bio}</Text>
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
