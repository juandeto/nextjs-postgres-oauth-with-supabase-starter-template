'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Check, Stamp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Padron } from '@/lib/db/schema';
import Image from 'next/image';
import { DateInput } from '../ui/date-input';
import { FichaFormValues } from '@/lib/schemas/schemas';

export default function FichaBuenosAiresForm({
  itemPadron,
}: {
  itemPadron: Padron;
}) {
  const [apellido, ...nombres] = itemPadron.nombreYApellido?.split(' ') || [];
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FichaFormValues>({
    defaultValues: {
      nombres: nombres?.join(' '),
      apellidos: apellido,
      sexo: itemPadron.sexo || '',
      clase: itemPadron.clase || '',
      distrito: itemPadron.distrito || 'San Isidro',
      calle: itemPadron.domicilio || '',
      nacionalidad: 'Argentina',
      fechaAfiliacion: new Date(),
      matricula: itemPadron.dni || '',
    },
  });

  const onSubmit = async (data: FichaFormValues) => {
    try {
      await fetch('/api/create-document', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'ficha-afiliacion.pdf';
          a.click();
          setDownloadSuccess(true);
          reset();
        });
    } catch (error) {}
  };

  return (
    <div className="w-full relative">
      <div className="flex justify-around items-center mt-6 mb-4">
        <Button
          type="submit"
          form="fichaAfiliacionBuenosAires"
          className="bg-primary hover:bg-primary-hover cursor-pointer"
        >
          Descargar Ficha
        </Button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 border border-gray-300 shadow-md w-[1100px] bg-white mx-auto"
        id="fichaAfiliacionBuenosAires"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-6  pb-4">
          <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-8">
            <Image
              src="/assets/escudo-buenos-aires.png"
              width={500}
              height={500}
              alt="Escudo de Buenos Aires"
            />
          </div>
          <h1 className="text-xl font-bold text-center">
            PROVINCIA DE BUENOS AIRES
          </h1>
          <h2 className="text-lg font-normal text-center">JUNTA ELECTORAL</h2>
        </div>
        {/* Party/Group */}
        <div className="mb-6">
          <div className="flex items-start mb-2 ">
            <Label
              htmlFor="partido"
              className="font-normal text-lg relative top-[10px]"
            >
              PARTIDO/AGRUPACION:
            </Label>
            <Input
              {...register('partido', { required: true })}
              contentEditable="true"
              className="!bg-white border-white border-b-2 border-dotted border-b-black rounded-none font-normal"
            />
          </div>
          {errors.partido && (
            <p className="text-red-500 text-sm">Este campo es requerido</p>
          )}
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 mb-2">
            <div>
              <div className="flex items-end">
                <Label htmlFor="apellidos" className="font-normal">
                  Apellido(s):
                </Label>
                <Input
                  id="apellidos"
                  className="!bg-white border-white border-b-2 border-dotted border-b-black rounded-none font-normal"
                  {...register('apellidos', { required: true })}
                />
              </div>
              {errors.apellidos && (
                <p className="text-red-500 text-sm">Este campo es requerido</p>
              )}
            </div>
            <div>
              <div className="flex items-end">
                <Label htmlFor="nombres" className="font-normal">
                  Nombre(s):
                </Label>
                <Input
                  id="nombres"
                  className="!bg-white border-white border-b-2 border-dotted border-b-black rounded-none font-normal"
                  {...register('nombres', { required: true })}
                />
              </div>
              {errors.nombres && (
                <p className="text-red-500 text-sm">Este campo es requerido</p>
              )}
            </div>
            <div>
              <div className="flex items-end">
                <Label
                  htmlFor="matricula"
                  className="font-normal whitespace-nowrap"
                >
                  Matrícula (L.E./L.C./D.N.I.) N°:
                </Label>
                <Input
                  id="matricula"
                  className="!bg-white border-white basis-full border-b-2 border-dotted border-b-black rounded-none"
                  {...register('matricula', { required: true })}
                />
              </div>
              {errors.matricula && (
                <p className="text-red-500 text-sm">Este campo es requerido</p>
              )}
            </div>
            <div className="flex justify-between">
              <div className="flex items-end basis-1/3">
                <Controller
                  name="sexo"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Label htmlFor="sexo" className="font-normal">
                        Sexo:
                      </Label>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger
                          id="sexo"
                          className="!bg-white border-white w-full border-b-2 border-dotted border-b-black rounded-none"
                        >
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent ref={field.ref}>
                          <SelectItem value="M">M</SelectItem>
                          <SelectItem value="F">F</SelectItem>
                          <SelectItem value="O">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </>
                  )}
                />
              </div>
              <div className="flex items-end basis-1/3">
                <Label htmlFor="clase" className="font-normal">
                  Clase:
                </Label>
                <Input
                  id="clase"
                  className="!bg-white border-white border-b-2 border-dotted border-b-black rounded-none font-normal"
                  {...register('clase')}
                />
              </div>
              <div className=" basis-1/3">
                <div className="flex items-end">
                  <Label
                    htmlFor="fechaNacimiento"
                    className="font-normal whitespace-nowrap"
                  >
                    Fecha de Nacimiento:
                  </Label>
                  <Controller
                    name="fechaNacimiento"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <DateInput
                        {...field}
                        value={field.value}
                        className="!bg-white border-white border-b-2 border-dotted border-b-black rounded-none font-normal"
                      />
                    )}
                  />
                </div>
                {errors.fechaNacimiento && (
                  <p className="text-red-500 text-sm">
                    Este campo es requerido
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-end">
              <Label htmlFor="nacionalidad" className="font-normal">
                Nacionalidad:
              </Label>
              <Input
                id="nacionalidad"
                className="!bg-white border-white border-b-2 border-dotted border-b-black rounded-none font-normal"
                {...register('nacionalidad', { required: true })}
              />
              {errors.nacionalidad && (
                <p className="text-red-500 text-sm">Este campo es requerido</p>
              )}
            </div>
            <div className="flex justify-between">
              <div className="flex items-end basis-full">
                <Label htmlFor="lugarNacimiento" className="font-normal">
                  Lugar:
                </Label>
                <Input
                  id="lugarNacimiento"
                  className="!bg-white border-b-2 border-white border-dotted border-b-black rounded-none"
                  {...register('lugarNacimiento')}
                />
              </div>
              <div className="flex items-end basis-full">
                <Label
                  htmlFor="profesion"
                  className="font-normal whitespace-nowrap"
                >
                  Profesión u Oficio:
                </Label>
                <Input
                  id="profesion"
                  className="!bg-white border-white border-b-2 border-dotted border-b-black rounded-none font-normal"
                  {...register('profesion')}
                />
              </div>
            </div>
            <div className="flex items-end basis-full w-full col-span-full">
              <Controller
                name="estadoCivil"
                control={control}
                render={({ field }) => (
                  <>
                    <Label
                      htmlFor="estadoCivil"
                      className="font-normal whitespace-nowrap"
                    >
                      Estado Civil:
                    </Label>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        id="estadoCivil"
                        className="!bg-white border-white w-full border-b-2 border-dotted border-b-black rounded-none"
                      >
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent ref={field.ref}>
                        <SelectItem value="Soltero">Soltero/a</SelectItem>
                        <SelectItem value="Casado">Casado/a</SelectItem>
                        <SelectItem value="Divorciado">Divorciado/a</SelectItem>
                        <SelectItem value="Viudo">Viudo/a</SelectItem>
                      </SelectContent>
                    </Select>
                  </>
                )}
              />
            </div>
          </div>
          <div className="">
            <h3 className="font-normal text-left uppercase">
              Último domicilio según documento cívico
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="flex items-end basis-full">
                <Label htmlFor="distrito" className="font-normal">
                  Distrito:
                </Label>
                <Input
                  id="distrito"
                  className="!bg-white border-white border-b-2 border-dotted border-b-black rounded-none font-normal"
                  {...register('distrito')}
                />
              </div>
              <div>
                <div className="flex items-end">
                  <Label
                    htmlFor="localidad"
                    className="font-normal whitespace-nowrap"
                  >
                    Ciudad, Pueblo o Localidad:
                  </Label>
                  <Input
                    id="localidad"
                    className="!bg-white border-white border-b-2 border-dotted border-b-black rounded-none font-normal"
                    {...register('localidad', { required: true })}
                  />
                </div>
                {errors.localidad && (
                  <p className="text-red-500 text-sm">
                    Este campo es requerido
                  </p>
                )}
              </div>
              <div className="flex items-end">
                <Label htmlFor="calle" className="font-normal">
                  Calle:
                </Label>
                <Input
                  id="calle"
                  className="!bg-white border-white border-b-2 border-dotted border-b-black rounded-none font-normal"
                  {...register('calle', { required: true })}
                />
                {errors.calle && (
                  <p className="text-red-500 text-sm">
                    Este campo es requerido
                  </p>
                )}
              </div>
              <div className="flex justify-between">
                <div className="basis-full">
                  <div className="basis-full flex items-end">
                    <Label htmlFor="numero" className="font-normal">
                      N°:
                    </Label>
                    <Input
                      id="numero"
                      className="!bg-white border-white border-b-2 border-dotted border-b-black rounded-none font-normal"
                      {...register('numero', { required: true })}
                    />
                  </div>
                  {errors.numero && (
                    <p className="text-red-500 text-sm">
                      Este campo es requerido
                    </p>
                  )}
                </div>
                <div className="basis-full flex items-end">
                  <Label htmlFor="piso" className="font-normal">
                    Piso:
                  </Label>
                  <Input
                    id="piso"
                    className="!bg-white border-white border-b-2 border-dotted border-b-black rounded-none font-normal"
                    {...register('piso')}
                  />
                </div>
                <div className="basis-full flex items-end">
                  <Label htmlFor="departamento" className="font-normal">
                    Dpto:
                  </Label>
                  <Input
                    id="departamento"
                    className="!bg-white border-white border-b-2 border-dotted border-b-black rounded-none font-normal"
                    {...register('departamento')}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Observations */}
          <div className="mb-12 flex items-start">
            <Label
              htmlFor="observaciones"
              className="font-normal relative top-[20px]"
            >
              OBSERVACIONES:
            </Label>

            <Input
              id="observaciones"
              type="textarea"
              className="!bg-white border-white border-b-2 border-dotted border-b-black rounded-none font-normal"
              {...register('observaciones')}
            />
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 mb-6">
            <div className="flex flex-col items-center justify-between border-2 border-black px-6 mb-4">
              <h4 className="relative -top-1.5 text-lg">
                Aceptación de la Afiliación:
              </h4>
              <div className="flex">
                <Label
                  htmlFor="fechaAfiliacion"
                  className="font-normal text-lg"
                >
                  Fecha
                </Label>
                <Controller
                  name="fechaAfiliacion"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <DateInput
                      {...field}
                      value={field.value}
                      className="!bg-white border-b-2 border-dotted border-b-black rounded-none text-lg"
                    />
                  )}
                />
              </div>
              <div className="h-24 w-full  mb-2 flex items-end justify-center">
                <p className="text-black border-t-2 border-dotted border-t-black">
                  Firma Autoridad Partidaria
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-24 w-full py-12 flex items-start justify-end">
                <p className="text-black text-center border-t-2 w-1/2 border-dotted border-t-black">
                  Firma del solicitante
                </p>
              </div>
              <div className="w-full">
                <div className="w-full">
                  <p className="text-black text-center border-t-2 w-full leading-[20px] border-dotted border-t-black">
                    Certificación de Firma (por los Titulares del Registro
                    Provincial de las Personas o sus Delegaciones, Autoridad
                    Partidaria, Escribano Público, Juez de Paz o de Primera
                    Instancia en lo Civil y Comercial de turno)
                  </p>
                  <p className="text-black text-center border-t-2 w-1/2 border-dashed mt-8 border-t-black"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      {downloadSuccess && (
        <div
          onClick={() => setDownloadSuccess(false)}
          className="absolute animate-bounce w-96 h-20 shadow-lg rounded-md flex justify-center bg-green-100 top-50 left-1/2 -translate-1/2"
        >
          <div className="absolute top-0 right-0 p-2 text-gray-600">
            <Button
              variant="outline"
              className="bg-transparent hover:bg-transparent text-gray-600"
            >
              x
            </Button>
          </div>
          <div className="flex items-center justify-center">
            <Check className="h-6 w-6 text-green-800" />
            <p className="ml-4 text-lg text-green-800">Ficha descargada</p>
          </div>
        </div>
      )}
    </div>
  );
}
