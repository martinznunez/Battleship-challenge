import { turnUser } from '../constants';

const checkWinner = (userBoats, cpuBoats) => {
  const allUserBoatsDestroyed = userBoats.every((boat) => boat.destroyed);
  const allCpuBoatsDestroyed = cpuBoats.every((boat) => boat.destroyed);

  if (allUserBoatsDestroyed) {
    return turnUser.CPU;
  }

  if (allCpuBoatsDestroyed) {
    return turnUser.USER;
  }

  return null;
};

export default checkWinner;
