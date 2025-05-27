import { redirect } from 'next/navigation';

import { createClient } from '@/lib/auth/server';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SearchResultsContainer from '@/components/dashboard/searchResultsContainer';
import { Suspense } from 'react';

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  const s = await searchParams;
  const search = Number(s?.search) as number | undefined;

  if (error || !data?.user) {
    redirect('/sign-in');
  }

  return (
    <div className="min-h-[75vh]">
      <div className="container mx-auto py-24">
        <form action="dashboard" method="get">
          <Label
            htmlFor="search"
            className="block text-2xl p-4 font-medium text-secondary-foreground text-center"
          >
            Buscar en el padrón
          </Label>
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center items-center">
              <Input
                type="number"
                name="search"
                placeholder="Busca por D.N.I. Ejemplo: 34653250"
                className="h-10 rounded-md px-6 has-[>svg]:px-4"
                defaultValue={Number.isNaN(search) ? '' : search}
              />
              <Button size="lg" type="submit">
                Buscar
              </Button>
            </div>
            {search && Number.isNaN(search) ? (
              <div className="text-destructive text-md py-2">
                Búsqueda inválida. Por favor, introduzca un número de DNI
                válido.
              </div>
            ) : null}
          </div>
        </form>
      </div>
      {search && search !== Number.NaN ? (
        <Suspense
          fallback={
            <div className="w-full text-2xl text-center">
              Cargando resultados...
            </div>
          }
        >
          <SearchResultsContainer search={search} />
        </Suspense>
      ) : null}
    </div>
  );
}
