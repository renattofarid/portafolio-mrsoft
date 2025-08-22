import { toast } from "sonner";

export const successToast = (
  body: string,
  description: string = new Date().toLocaleString(),
  handler: () => void = () => toast.dismiss()
) => {
  return toast.success(body, {
    description: description,
    position: "bottom-center",
    action: {
      label: "Listo",
      onClick: handler,
    },
  });
};

export const errorToast = (
  body: string = "Error",
  description: string = new Date().toLocaleString()
) => {
  return toast.error(body, {
    description: description,
    position: "bottom-center",
    action: {
      label: "Cerrar",
      onClick: () => toast.dismiss(),
    },
  });
};
