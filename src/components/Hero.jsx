import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState, useContext } from "react";
import SingInDialog from "./SingIngDialog";
import { UserDetailContext } from "@/context/UserDetailContext";
import exerciseApiService from "../services/rapidApiBody";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";

export default function Hero() {
  const [openDialog, setOpenDialog] = useState(false);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const onSubmit = () => {
    if (!userDetail?.name) {
      setOpenDialog(true);
      return;
    }
  };

  const muscles = [
    "Pectoralis major",
    "Pectoralis minor",
    "Latissimus dorsi (lats)",
    "Trapezius",
    "Rhomboids",
    "Erector spinae",
    "Deltoids (anterior, lateral, posterior)",
    "Biceps brachii",
    "Triceps brachii",
    "Brachioradialis",
    "Wrist flexors",
    "Wrist extensors",
    "Rectus abdominis (six-pack)",
    "External obliques",
    "Internal obliques",
    "Transverse abdominis",
    "Lumbar muscles",
    "Multifidus",
    "Quadriceps",
    "Hamstrings",
    "Gluteus maximus",
    "Gluteus medius",
    "Gluteus minimus",
    "Gastrocnemius (calves)",
    "Soleus",
    "Hip abductors",
    "Hip adductors",
    "Hip flexors (psoas, iliacus)",
    "Pelvic floor muscles",
    "Serratus anterior",
    "Rotator cuff muscles",
    "Intercostals",
  ];

  const fetchBodyParts = async () => {
    try {
      const bodyParts = await exerciseApiService.getBodyPartList();
      console.log(bodyParts);
    } catch (error) {
      console.error("Error al obtener las partes del cuerpo:", error.message);
    }
  };

  //fetchBodyParts();

  return (
    <div className="flex flex-col items-center gap-2 mb-16">
      <div className="grid grid-cols-3 gap-6 md:grid-cols-2 sm:grid-cols-2 sm:gap-2 ss:grid-cols-1">
        <Card className="w-80 flex flex-col text-center border-lime-500">
          <CardHeader>
            <AspectRatio ratio={14 / 14}>
              <img src={img1} alt="Image" className="rounded-md object-cover" />
            </AspectRatio>
          </CardHeader>
          <CardContent>
            <h2 className="text-4xl font-bold">Exercises</h2>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <Button
              className="bg-lime-500 text-white m-4 mt-8"
              onClick={onSubmit}
            >
              Search
            </Button>
          </CardFooter>
        </Card>
        <Card className="w-80 flex flex-col text-center border-lime-500">
          <CardHeader>
            <AspectRatio ratio={14 / 14}>
              <img src={img2} alt="Image" className="rounded-md object-cover" />
            </AspectRatio>
          </CardHeader>
          <CardContent>
          <h2 className="text-4xl font-bold">Body Parts</h2>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <Button
              className="bg-lime-500 text-white m-4 mt-8"
              onClick={onSubmit}
            >
              Submit
            </Button>
          </CardFooter>
        </Card>
        <Card className="w-80 flex flex-col text-center border-lime-500">
          <CardHeader>
            <AspectRatio ratio={14 / 14}>
              <img src={img3} alt="Image" className="rounded-md object-cover" />
            </AspectRatio>
          </CardHeader>
          <CardContent>
          <h2 className="text-4xl font-bold">Equipment</h2>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <Button
              className="bg-lime-500 text-white m-4 mt-8"
              onClick={onSubmit}
            >
              Submit
            </Button>
          </CardFooter>
        </Card>
      </div>

      <h2 className="text-4xl font-bold text-lime-400 p-4">
        What do you want to Ejercice??
      </h2>
      <h2 className="p-2 text-2xl">Select a part of the Body:</h2>
      <Select>
        <SelectTrigger className="w-1/3">
          <SelectValue placeholder="Muscle" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {muscles.map((muscle, index) => (
            <SelectItem
              value={muscle.toLowerCase().replace(/\s+/g, "-")}
              className="border-2 border-black bg-white"
              key={index}
            >
              {muscle}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button className="bg-lime-500 text-white m-4 mt-8" onClick={onSubmit}>
        Submit
      </Button>
      <SingInDialog
        openDialog={openDialog}
        closeDialog={(v) => setOpenDialog(v)}
      />
    </div>
  );
}
