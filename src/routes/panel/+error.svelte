<script lang="ts">
	import { page } from '$app/state';
	console.log("error panel", page.error?.status);
</script>

<svelte:head>
</svelte:head>

<div class="bg-white text-gray-800">
	<div class="min-h-screen flex flex-col">
		<!-- main -->
		<div class="flex-grow">
			<!-- content -->
			<div class="flex justify-center items-center min-h-screen px-4">
				<div class="text-center space-y-6 max-w-md w-full">
					<img class="mx-auto h-64" src="/images/gfx/error-404.svg" alt="Error 404" />
					<div>
						<h3 class="text-2xl font-bold">
							{page.status} - {page.error?.message} (panel)
						</h3>
						<p class="mt-4 text-gray-600">
							Kami mohon maaf atas ketidaknyamanan ini. Halaman yang Anda akses mungkin telah dihapus atau tidak pernah ada.
						</p>
						<a href="/panel" class="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition">
							Kembali ke Beranda
						</a>
					</div>
				</div>
			</div>
			<!-- content end -->
		</div>
	</div>
</div>
