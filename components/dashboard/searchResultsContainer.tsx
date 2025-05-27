import { searchInPadron } from '@/app/dashboard/actions';
import FichaBuenosAiresForm from './fichaBuenosAiresForm';
import { Badge } from '../ui/badge';

export default async function SearchResultsContainer({
  search,
}: {
  search: number;
}) {
  const results = await searchInPadron(search);

  if (!results || results?.length === 0)
    return (
      <div className="flex justify-center items-center">
        <Badge variant="destructive" className="mb-4 text-lg">
          No se encontraron resultados para tu búsqueda
        </Badge>
      </div>
    );

  const personaAfiliable = results[0].estadoDeAfiliacion === 'DISPONIBLE';

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center">
        {personaAfiliable ? (
          <Badge
            variant="default"
            className="mb-4 text-xl bg-green-100 text-green-800"
          >
            PERSONA {results[0].estadoDeAfiliacion}
          </Badge>
        ) : (
          <Badge variant="destructive" className="mb-4 text-lg">
            {results[0].estadoDeAfiliacion}
          </Badge>
        )}
      </div>
      {personaAfiliable && (
        <div className="flex justify-center items-center">
          <FichaBuenosAiresForm itemPadron={results[0]} />
        </div>
      )}
    </div>
  );
}
