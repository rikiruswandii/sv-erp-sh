// Deskripsi: Halaman ini digunakan untuk mengelola layout server pada panel admin.
import { error, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import {useInitials} from '$lib/hooks/useInitials';

export const load: LayoutServerLoad = async (event) => {
  const user = requireLogin(event);
  const ak = useInitials(user.name);
  const avatar = '/images/avatar/a-sm.jpg';
  
  return { user: { ...user, ak, avatar } };
};

// Memeriksa apakah user sudah login
function requireLogin(event: Parameters<LayoutServerLoad>[0]) {
  if (!event.locals.user) {
    throw redirect(302, '/auth/login');
  }

  return event.locals.user;
}
