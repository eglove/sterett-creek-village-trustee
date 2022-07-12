import { Image, Trustee } from '@prisma/client';
import { useMutation, useQuery, useRouter } from 'blitz';

import { IdSchema } from '../../../../validations';
import deleteTrustee from '../../queries/trustees/delete-trustee';
import getTrustees from '../../queries/trustees/get-trustees';

type UseManageTrusteesTrusteesReturn = {
  handleDeleteTrustee: (id: string) => Promise<void>;
  handleNavigateToUpsert: (id?: string) => Promise<void>;
  isLoading: boolean;
  trustees: Array<
    Pick<Trustee, 'duties' | 'firstName' | 'lastName' | 'phoneNumber'> & {
      image: Pick<Image, 'description' | 'height' | 'url' | 'width'>;
    }
  >;
};

export const useManageTrustees = (): UseManageTrusteesTrusteesReturn => {
  const router = useRouter();

  const [data, { refetch }] = useQuery(getTrustees, undefined);

  const [deleteTrusteeMutation, { isLoading }] = useMutation(deleteTrustee);

  const handleNavigateToUpsert = async (id?: string): Promise<void> => {
    if (typeof id === 'undefined') {
      await router.push('/dashboard/trustees/upsert');
    } else {
      await router.push(`/dashboard/trustees/upsert?id=${id}`);
    }
  };

  const handleDeleteTrustee = async (id: string): Promise<void> => {
    await deleteTrusteeMutation(
      IdSchema.parse({
        id,
      })
    );
    await refetch();
  };

  return {
    handleDeleteTrustee,
    handleNavigateToUpsert,
    isLoading,
    trustees: data,
  };
};
