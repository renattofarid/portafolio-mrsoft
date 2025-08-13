"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { sendEmail } from "../lib/coments.actions";
import { errorToast, successToast } from "@/lib/core.function";

const contactSchema = z.object({
  ruc: z
    .string()
    .min(11, "El RUC debe tener 11 dígitos")
    .max(11, "El RUC debe tener 11 dígitos")
    .regex(/^\d{11}$/, "El RUC debe contener solo números"),
  razon_social: z.string().min(1, "Requerido"),
  direccion: z.string().optional(),
  ciudad_pais: z.string().optional(),
  persona_contacto: z.string().min(1, "Requerido"),
  telefono: z.string().min(1, "Requerido"),
  correo: z.string().email("Correo inválido"),
  mensaje: z
    .string()
    .min(50, "Describa tu solicitud en al menos 50 caracteres"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function CommentForm() {
  const getLocalStorageValue = (key: string) => {
    if (typeof window === "undefined") return "";
    const value = localStorage.getItem(key);
    return value && value.trim() !== "" ? value : "";
  };

  const defaultValuesFromStorage = {
    razon_social: getLocalStorageValue("razon_social"),
    telefono: getLocalStorageValue("telefono"),
    correo: getLocalStorageValue("correo"),
    mensaje: getLocalStorageValue("mensaje"),
  };

  useEffect(() => {
    form.reset({
      ...form.getValues(),
      ...defaultValuesFromStorage,
    });
  }, []);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      ruc: "",
      razon_social: "",
      direccion: "",
      ciudad_pais: "",
      persona_contacto: "",
      telefono: "",
      correo: "",
      mensaje: "",
    },
    mode: "onChange",
  });

  async function onSubmit(values: ContactFormValues) {
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviarlo a una API
    console.log("Formulario enviado:", values);
    // Puedes mostrar un mensaje de éxito o redirigir al usuario
    await sendEmail({
      ruc: values.ruc,
      razon_social: values.razon_social,
      direccion: values.direccion || "",
      ciudad_pais: values.ciudad_pais || "",
      persona_contacto: values.persona_contacto,
      telefono: values.telefono,
      correo: values.correo,
      mensaje: values.mensaje,
      producto: "Mr. Soft",
    })
      .then((response) => {
        console.log("Respuesta del servidor:", response);
        successToast("Mensaje enviado con éxito");
        form.reset();
      })
      .catch((error) => {
        console.error("Error al enviar el mensaje:", error);
        errorToast("Error al enviar el mensaje");
      });
  }

  return (
    <main className="bg-brand-softGreen py-16">
      <div className="max-w-screen-xl mx-auto px-8">
        <div className="text-start mb-12">
          <h2 className="text-4xl font-bold text-black mb-4">
            Comunícate con Nosotros
          </h2>
          <p className="text-lg text-brand-gray">
            Estamos aquí para ayudarte con tus necesidades tecnológicas.
          </p>
        </div>
        <div className="max-w-screen-lg mx-auto bg-white rounded-lg shadow p-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <FormField
                control={form.control}
                name="ruc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RUC</FormLabel>
                    <FormControl>
                      <Input placeholder="RUC" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="razon_social"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Razón Social</FormLabel>
                    <FormControl>
                      <Input placeholder="Razón Social" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="direccion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dirección</FormLabel>
                    <FormControl>
                      <Input placeholder="Dirección" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ciudad_pais"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ciudad / País</FormLabel>
                    <FormControl>
                      <Input placeholder="Ciudad / País" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="persona_contacto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Persona de Contacto</FormLabel>
                    <FormControl>
                      <Input placeholder="Persona de Contacto" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telefono"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input placeholder="Teléfono" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="correo"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-2">
                    <FormLabel>Correo</FormLabel>
                    <FormControl>
                      <Input placeholder="Correo" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mensaje"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-2">
                    <FormLabel>Mensaje</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Mensaje" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full md:w-fit px-16 mx-auto cols-span-1 md:col-span-2 bg-brand-green hover:bg-brand-darkGreen text-white font-semibold rounded-full transition-colors duration-300"
              >
                Enviar
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}
