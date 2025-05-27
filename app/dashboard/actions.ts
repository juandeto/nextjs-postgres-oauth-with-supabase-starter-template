import { getSearchFromPadron } from '@/lib/db/queries';
import { Padron } from '@/lib/db/schema';

export async function searchInPadron(search: number): Promise<Padron[] | null> {
  if (!search) return null;

  const results = await getSearchFromPadron(search);

  return results;
}
