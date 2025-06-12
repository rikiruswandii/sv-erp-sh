<!-- Bisa kosong atau redirect -->
<script>
	// Optional: redirect langsung ke /auth/login
	import { redirect } from '@sveltejs/kit';

	export const load = () => {
		throw redirect(307, '/');
	};
</script>
