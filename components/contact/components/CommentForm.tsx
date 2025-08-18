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
      producto: "Portafolio de Mr. Soft",
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
    <main className="py-16">
      <div className="max-w-screen-xl mx-auto px-8">
        <div className="text-start mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Contáctanos</h2>
          <p className="text-lg">
            Cuéntanos sobre tu proyecto, idea o consulta. Estamos listos para
            ayudarte y responderte lo antes posible. Completa el formulario y
            nos pondremos en contacto contigo en un plazo máximo de 24 horas
            hábiles.
          </p>
        </div>
        <div className="max-w-screen-lg mx-auto rounded-lg p-8">
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
                      <Input
                        className="input-contact"
                        placeholder="RUC"
                        {...field}
                      />
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
                      <Input
                        className="input-contact"
                        placeholder="Razón Social"
                        {...field}
                      />
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
                      <Input
                        className="input-contact"
                        placeholder="Dirección"
                        {...field}
                      />
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
                      <Input
                        className="input-contact"
                        placeholder="Ciudad / País"
                        {...field}
                      />
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
                      <Input
                        className="input-contact"
                        placeholder="Persona de Contacto"
                        {...field}
                      />
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
                      <Input
                        className="input-contact"
                        placeholder="Teléfono"
                        {...field}
                      />
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
                      <Input
                        className="input-contact"
                        placeholder="Correo"
                        type="email"
                        {...field}
                      />
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
                      <Textarea
                        className="input-contact !h-32"
                        placeholder="Mensaje"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant="secondary"
                type="submit"
                className="w-full md:w-fit px-16 mx-auto cols-span-1 md:col-span-2 h-10 rounded-xl transition-colors duration-300"
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
