import { create } from '@/services/api/users/create';
import { get } from '@/services/api/users/get';
import { getAll } from '@/services/api/users/get-all';
import { getAllWithPagination } from '@/services/api/users/get-all-with-pagination';

export const user = {
  get,
  create,
  getAll,
  getAllWithPagination,
};
