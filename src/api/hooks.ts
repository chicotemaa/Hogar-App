import { useQuery } from 'react-query';

import { getOrdenesTrabajoInfo } from '~/services/tecnicosServices';

export const useOrdenesTrabajoInfo = (isPendientes = false) =>
  useQuery(['OTList', isPendientes], () => getOrdenesTrabajoInfo(isPendientes));
