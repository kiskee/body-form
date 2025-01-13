import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {useState, useContext } from 'react'
import SingInDialog from "./SingIngDialog";
import { UserDetailContext } from "@/context/UserDetailContext";



export default function Hero() {
  const [openDialog, setOpenDialog] = useState(false)
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const onSubmit = () => {
    if (!userDetail?.name){
      setOpenDialog(true)
      return
    }
  }

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

  return (
    <div className="flex flex-col items-center mt-36 gap-2 mb-64">
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
      <Button className="bg-lime-500 text-white m-4 mt-8"   onClick={onSubmit}>Submit</Button>
      <SingInDialog openDialog={openDialog} closeDialog={(v) => setOpenDialog(v)} />
    </div>
  );
}
