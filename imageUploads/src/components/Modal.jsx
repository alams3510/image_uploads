import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import axios from "axios";

export default function Modal({ image, open, setOpen, setCount }) {
  const handleOpen = () => setOpen(() => !open);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("image", image);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/upload`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data) {
        handleOpen();
        setCount((prev) => prev + 1);
      }
      console.log("uploaded sucessful", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Dialog open={open} handler={handleOpen} className="overflow-y-scroll">
        <DialogHeader>Are You sure to Upload this Image?</DialogHeader>
        <DialogBody className="flex items-center justify-center">
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="image"
              className="max-w-96"
            />
          )}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleUpload}>
            <span>upload</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
