import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import { useContext } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";
import axios from "axios";

export default function SingInDialog({ openDialog, closeDialog }) {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: "Bearer " + tokenResponse?.access_token } }
      );

      console.log(userInfo);
      setUserDetail(userInfo?.data);
      closeDialog(false);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog} className="bg-white ">
      <DialogContent className="bg-black text-white flex flex-col items-center justify-center gap-3">
        <DialogHeader>
          <DialogTitle><p className="font-bold text-3xl text-center text-lime-500">
              Continue With Body-form 1.0
            </p> </DialogTitle>
          <DialogDescription className="mt-2 text-center text-xl">
            
            
              To use Body-form you must log into an existing account or create
              one
            
           
          </DialogDescription>
        </DialogHeader>
        <Button
              className="bg-lime-600 text-white text-xl rounded-lg"
              onClick={googleLogin}
            >
              Sign In With Google
            </Button>
            <p className="text-xs">
              By using Body-form, you agree to the collection of usage data for
              analytics
            </p>
      </DialogContent>
    </Dialog>
  );
}
