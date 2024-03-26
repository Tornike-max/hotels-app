// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import { googleAuth } from "../api/data";

// const useAuthWithGoogle = () => {
//   const queryClient = useQueryClient();

//   const { mutateAsync: authWithGoogle, isPending } = useMutation({
//     mutationFn: googleAuth,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["user"] });
//       toast.success("User Authenticate successfully");
//     },
//     onError: () => {
//       toast.error("Error while authenticate with google");
//     },
//   });

//   return { authWithGoogle, isPending };
// };

// export default useAuthWithGoogle;
