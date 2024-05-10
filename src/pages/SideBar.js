import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  UserIcon, // More suited for Profile
  DocumentTextIcon, // Suited for Create Post (generic document icon)
  VideoCameraIcon, // Already suitable for Upload Video
  CameraIcon, // Already suitable for Upload Photo
  CalendarIcon, // Used for Meal Plan and now Workout Plan
  PresentationChartBarIcon, // Already suitable for Workout Status
  PowerIcon, // Already suitable for Log Out
} from "@heroicons/react/24/outline"; // Using outline icons for consistency
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export function SideBar() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card className="h-[calc(100vh)] fixed w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
      </div>
      <List className="font-semibold">
        <Link to="/profile">
          <ListItem>
            <ListItemPrefix>
              <UserIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profile
          </ListItem>
        </Link>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 1 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <DocumentTextIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Create Post
              </Typography>
            </AccordionHeader>
          </ListItem>
          {open === 1 && (
            <AccordionBody className="py-1">
              <List className="p-0">
                <Link to="/uploadVedio">
                  <ListItem>
                    <ListItemPrefix>
                      <VideoCameraIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Upload Video
                  </ListItem>
                </Link>
                <Link to="/uploadPhoto">
                  <ListItem>
                    <ListItemPrefix>
                      <CameraIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Upload Photo
                  </ListItem>
                </Link>
              </List>
            </AccordionBody>
          )}
        </Accordion>
        <Link to="/mealplan">
          <ListItem>
            <ListItemPrefix>
              <CalendarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Meal Plan
          </ListItem>
        </Link>
        <Link to="/workoutplan">
          <ListItem>
            <ListItemPrefix>
              <CalendarIcon className="h-5 w-5" /> {/* Substituted icon */}
            </ListItemPrefix>
            Workout Plan
          </ListItem>
        </Link>
        <Link to="/status">
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Workout Status
          </ListItem>
        </Link>
        {/* <Link to="/login">
          <ListItem>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </Link> */}
      </List>
    </Card>
  );
}
