import React, { useState } from "react";
import { Avatar, Button, Badge, Typography } from "@mui/material";
import Navbar from "./Navbar";
import { Mail, ContactMail, Edit } from "@mui/icons-material";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDailog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "./Hooks/useGetAppliedJob";

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar
              alt="profile"
              src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
              sx={{ width: 96, height: 96 }}
            />
            <div>
              <Typography variant="h6">{user?.fullname}</Typography>
              <Typography variant="body2">{user?.profile?.bio}</Typography>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            variant="outlined"
            sx={{ height: "fit-content" }}
            startIcon={<Edit />}
          >
            Edit
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <Typography variant="body2">{user?.email}</Typography>
          </div>
          <div className="flex items-center gap-3 my-2">
            <ContactMail />
            <Typography variant="body2">{user?.phoneNumber}</Typography>
          </div>
        </div>
        <div className="my-5">
          <Typography variant="h6">Skills</Typography>
          <div className="flex items-center gap-1">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge key={index} color="primary">
                  {item}
                </Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Typography variant="body1" className="font-bold">
            Resume
          </Typography>
          {isResume ? (
            <a
              target="_blank"
              rel="noreferrer"
              href={user?.profile?.resume}
              className="text-blue-500 w-full hover:underline cursor-pointer"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <Typography variant="h6" className="font-bold text-lg my-5">
          Applied Jobs
        </Typography>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
