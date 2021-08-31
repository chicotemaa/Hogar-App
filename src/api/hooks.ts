import { useQuery } from 'react-query';

import { getOrdenesTrabajoInfo } from '~/services/tecnicosServices';

export const useOrdenesTrabajoInfo = (isPendientes?: boolean) =>

  useQuery(['OTList', isPendientes], () => getOrdenesTrabajoInfo(isPendientes));
