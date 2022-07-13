import { Image, Trustee } from '@prisma/client';
import { useMutation, useQuery, useRouter } from 'blitz';

import { IdSchema } from '../../../../validations';
import deleteTrustee from '../../mutations/trustees/delete-trustee';
import updateTrusteeOrder from '../../mutations/trustees/update-trustee-order';
import getTrustees from '../../queries/trustees/get-trustees';

type UseManageTrusteesTrusteesReturn = {
  handleDeleteTrustee: (id: string) => Promise<void>;
  handleNavigateToUpsert: (id?: string) => Promise<void>;
  handleUpdateTrustee: (id: string, direction: 'up' | 'down') => Promise<void>;
  isLoading: boolean;
  trustees: Array<
    Pick<
      Trustee,
      'id' | 'order' | 'duties' | 'firstName' | 'lastName' | 'phoneNumber'
    > & {
      image: Pick<Image, 'description' | 'height' | 'url' | 'width'>;
    }
  >;
};

export const useManageTrustees = (): UseManageTrusteesTrusteesReturn => {
  const router = useRouter();

  const [data, { refetch }] = useQuery(getTrustees, undefined);

  const [deleteTrusteeMutation, { isLoading: isDeleteLoading }] =
    useMutation(deleteTrustee);
  const [updateTrusteeOrderMutation, { isLoading: isUpdateLoading }] =
    useMutation(updateTrusteeOrder);

  const handleUpdateTrustee = async (
    id: string,
    direction: 'up' | 'down'
  ): Promise<void> => {
    await updateTrusteeOrderMutation({
      direction,
      id,
    });
    await refetch();
  };

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
    handleUpdateTrustee,
    isLoading: isDeleteLoading || isUpdateLoading,
    trustees: data,
  };
};
