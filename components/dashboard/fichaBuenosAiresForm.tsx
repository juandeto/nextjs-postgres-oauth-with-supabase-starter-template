'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Stamp } from 'lucide-react';
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
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

  console.log('itemPadron', itemPadron);

  const [isSubmitted, setIsSubmitted] = useState(false);

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
        });
    } catch (error) {}
    setIsSubmitted(true);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 border border-gray-300 shadow-md"
    >
      {/* Header */}
      <div className="flex flex-col items-center mb-6 border-b border-gray-300 pb-4">
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
        <h2 className="text-lg font-semibold text-center">JUNTA ELECTORAL</h2>
      </div>

      {/* Party/Group */}
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <Label htmlFor="partido" className="font-bold mr-2">
            PARTIDO/AGRUPACION:
          </Label>
          <Input
            id="partido"
            className="border-b border-gray-400 focus:border-gray-800"
            {...register('partido', { required: true })}
          />
        </div>
        {errors.partido && (
          <p className="text-red-500 text-sm">Este campo es requerido</p>
        )}
      </div>

      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <Label htmlFor="nombres" className="font-medium">
            Nombre(s):
          </Label>
          <Input
            id="nombres"
            className="border-b border-gray-400 focus:border-gray-800"
            {...register('nombres', { required: true })}
          />
          {errors.nombres && (
            <p className="text-red-500 text-sm">Este campo es requerido</p>
          )}
        </div>
        <div>
          <Label htmlFor="apellidos" className="font-medium">
            Apellido(s):
          </Label>
          <Input
            id="apellidos"
            className="border-b border-gray-400 focus:border-gray-800"
            {...register('apellidos', { required: true })}
          />
          {errors.apellidos && (
            <p className="text-red-500 text-sm">Este campo es requerido</p>
          )}
        </div>
        <div>
          <Label htmlFor="matricula" className="font-medium">
            Matrícula (L.E./L.C./D.N.I.) N°:
          </Label>
          <Input
            id="matricula"
            className="border-b border-gray-400 focus:border-gray-800"
            {...register('matricula', { required: true })}
          />
          {errors.matricula && (
            <p className="text-red-500 text-sm">Este campo es requerido</p>
          )}
        </div>
        <div>
          <Label htmlFor="fechaNacimiento" className="font-medium">
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
                className="border-b border-gray-400 focus:border-gray-800"
              />
            )}
          />
          {errors.fechaNacimiento && (
            <p className="text-red-500 text-sm">Este campo es requerido</p>
          )}
        </div>
        <div>
          <Label htmlFor="nacionalidad" className="font-medium">
            Nacionalidad:
          </Label>
          <Input
            id="nacionalidad"
            className="border-b border-gray-400 focus:border-gray-800"
            {...register('nacionalidad', { required: true })}
          />
          {errors.nacionalidad && (
            <p className="text-red-500 text-sm">Este campo es requerido</p>
          )}
        </div>
        <div>
          <Label htmlFor="lugarNacimiento" className="font-medium">
            Lugar:
          </Label>
          <Input
            id="lugarNacimiento"
            className="border-b border-gray-400 focus:border-gray-800"
            {...register('lugarNacimiento')}
          />
        </div>
        <div>
          <Label htmlFor="estadoCivil" className="font-medium">
            Estado Civil:
          </Label>
          <Select {...register('estadoCivil')}>
            <SelectTrigger
              id="estadoCivil"
              className="border-b border-gray-400 focus:border-gray-800 w-full"
            >
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="soltero">Soltero/a</SelectItem>
              <SelectItem value="casado">Casado/a</SelectItem>
              <SelectItem value="divorciado">Divorciado/a</SelectItem>
              <SelectItem value="viudo">Viudo/a</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="sexo" className="font-medium">
            Sexo:
          </Label>
          <Select {...register('sexo')} defaultValue={itemPadron?.sexo || ''}>
            <SelectTrigger
              id="sexo"
              className="border-b border-gray-400 focus:border-gray-800 w-full"
            >
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="M">Masculino</SelectItem>
              <SelectItem value="F">Femenino</SelectItem>
              <SelectItem value="O">Otro</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="clase" className="font-medium">
            Clase:
          </Label>
          <Input
            id="clase"
            className="border-b border-gray-400 focus:border-gray-800"
            {...register('clase')}
          />
        </div>

        <div>
          <Label htmlFor="profesion" className="font-medium">
            Profesión u Oficio:
          </Label>
          <Input
            id="profesion"
            className="border-b border-gray-400 focus:border-gray-800"
            {...register('profesion')}
          />
        </div>
      </div>

      {/* Address */}
      <div className="mb-6">
        <h3 className="font-bold text-center mb-4 uppercase">
          Último domicilio según documento cívico
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="distrito" className="font-medium">
              Distrito:
            </Label>
            <Input
              id="distrito"
              className="border-b border-gray-400 focus:border-gray-800"
              {...register('distrito')}
            />
          </div>
          <div>
            <Label htmlFor="localidad" className="font-medium">
              Ciudad, Pueblo o Localidad:
            </Label>
            <Input
              id="localidad"
              className="border-b border-gray-400 focus:border-gray-800"
              {...register('localidad', { required: true })}
            />
            {errors.localidad && (
              <p className="text-red-500 text-sm">Este campo es requerido</p>
            )}
          </div>
          <div className="flex-1">
            <Label htmlFor="calle" className="font-medium">
              Calle:
            </Label>
            <Input
              id="calle"
              className="border-b border-gray-400 focus:border-gray-800"
              {...register('calle', { required: true })}
            />
            {errors.calle && (
              <p className="text-red-500 text-sm">Este campo es requerido</p>
            )}
          </div>
          <div className="flex gap-2">
            <div className="w-24">
              <Label htmlFor="numero" className="font-medium">
                N°:
              </Label>
              <Input
                id="numero"
                className="border-b border-gray-400 focus:border-gray-800"
                {...register('numero', { required: true })}
              />
              {errors.numero && (
                <p className="text-red-500 text-sm">Este campo es requerido</p>
              )}
            </div>
            <div className="w-24">
              <Label htmlFor="piso" className="font-medium">
                Piso:
              </Label>
              <Input
                id="piso"
                className="border-b border-gray-400 focus:border-gray-800"
                {...register('piso')}
              />
            </div>
            <div className="w-24">
              <Label htmlFor="departamento" className="font-medium">
                Dpto:
              </Label>
              <Input
                id="departamento"
                className="border-b border-gray-400 focus:border-gray-800"
                {...register('departamento')}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Observations */}
      <div className="mb-6">
        <Label htmlFor="observaciones" className="font-medium">
          OBSERVACIONES:
        </Label>
        <Textarea
          id="observaciones"
          className="border border-gray-400 focus:border-gray-800 min-h-[100px]"
          {...register('observaciones')}
        />
      </div>

      {/* Signatures */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        <div className="flex flex-col items-start">
          <div>
            <Label htmlFor="fechaAfiliacion" className="font-medium">
              Fecha Aceptación de la Afiliación:
            </Label>
            <Controller
              name="fechaAfiliacion"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <DateInput
                  {...field}
                  value={field.value}
                  className="border-b border-gray-400 focus:border-gray-800"
                />
              )}
            />
          </div>
          <div className="h-24 w-full border-b border-gray-400 mb-2 flex items-end justify-center">
            <p className="text-gray-400 italic">
              Firma Autoridad Partidaria (se realiza manualmente)
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-14"></div>
          <div className="h-24 w-full border-b border-gray-400 mb-2 flex items-end justify-center">
            <p className="text-gray-400 italic">
              Firma del solicitante (se realiza manualmente)
            </p>
          </div>
        </div>
      </div>

      {/* Certification */}
      {/* <div className="mb-6 border-t border-gray-300 pt-4">
        <h3 className="font-medium text-center mb-4">
          Certificación de Firma (por los Titulares del Registro Provincial de
          las Personas o sus Delegaciones, Autoridad Partidaria, Escribano
          Público, Juez de Paz o de Primera Instancia en lo Civil y Comercial de
          turno)
        </h3>
        <div className="h-24 w-full border border-gray-400 rounded-md"></div>
      </div> */}

      {/* Submit Button */}
      <div className="flex justify-center mt-6">
        <Button type="submit" className="bg-primary hover:bg-primary-hover">
          Descargar Ficha
        </Button>
      </div>

      {/* Success Message */}
      {isSubmitted && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">
          Formulario enviado exitosamente.
        </div>
      )}
    </form>
  );
}
