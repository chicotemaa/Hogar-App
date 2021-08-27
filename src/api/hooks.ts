import { useQuery } from 'react-query';

export const useOrdenesTrabajoInfo = (isPendientes?: boolean) =>
  useQuery(['OTList', isPendientes], () => getOrdenesTrabajoInfo(isPendientes));
