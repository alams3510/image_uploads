import { Button } from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import Modal from "./components/Modal";
import axios from "axios";

function App() {
  const imgRef = useRef();
  const [image, setImage] = useState("");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [count, setCount] = useState(0);

  const handleOpen = () => {
    imgRef.current.click();
  };

  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };
  useEffect(() => {
    if (image) {
      setOpen(true);
    }
  }, [image]);
  const fetchAllImages = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/all/images`
      );
      setData(res.data.response);
    } catch (err) {
      console.log("err", err);
    }
  };
  useEffect(() => {
    fetchAllImages();
  }, [count]);

  return (
    <div className="bg-green-200 h-screen w-full">
      <h1 className="font-bold text-3xl text-center text-red-300">
        Uploading images-url on database and fetch from server
      </h1>
      <div className=" flex items-center justify-center mt-7">
        <ul className="max-h-screen overflow-y-scroll">
          {data &&
            data.map((item) => (
              <li key={item._id}>
                <img
                  src={`${import.meta.env.VITE_BASE_URL}/${item.imageUrl}`}
                  alt="image"
                  width={"100px"}
                />
              </li>
            ))}
        </ul>
        <Button onClick={handleOpen}>Upload Image</Button>
        <input
          type="file"
          ref={imgRef}
          className="hidden"
          onChange={handleChange}
          accept="image/*"
        />
        <Modal
          image={image}
          open={open}
          setOpen={setOpen}
          setCount={setCount}
        />
      </div>
    </div>
  );
}

export default App;
