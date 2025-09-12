import { create } from '@/services/api/users/create';
import { get } from '@/services/api/users/get';
import { getAll } from '@/services/api/users/get-all';
import { getAllWithPagination } from '@/services/api/users/get-all-with-pagination';
import { getDetails } from '@/services/api/users/get-details';
import { update } from '@/services/api/users/update';

export const user = {
  get,
  getDetails,
  getAll,
  getAllWithPagination,
  create,
  update,
};
