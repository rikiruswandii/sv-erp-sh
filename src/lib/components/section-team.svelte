<script lang="ts">
	import { Agoy, Dion, Fan, Fin, Mikeu, PakFeb, TehPut, Zack } from '$lib/assets';
	import Skeleton from './ui/skeleton/skeleton.svelte';

	const teams = [
		{ name: 'Feby A. Dzuhri, S.Si.Kom', position: 'Co-Founder / CEO', image: PakFeb },
		{ name: 'Diah Putri Puspita Sari', position: 'Accounting', image: TehPut },
		{ name: 'M Alfin Afif Al Farizi Farham', position: 'Network Engineer', image: Fin },
		{ name: 'Rizky Zaki Zulkarnaen', position: 'Software Engineer', image: Zack },
		{ name: 'Naufal Al Munawar', position: 'Mobile Developer', image: 'https://ui-avatars.com/api/?name=Naufal' },
		{ name: 'Yoga Pangestu', position: 'Web Developer', image: Agoy },
		{ name: 'Riki Ruswandi', position: 'Web Developer', image: Mikeu },
		{ name: 'Ifan Prima Nursaid', position: 'Web Developer', image: Fan },
		{ name: 'M Yuqi Nurohman', position: 'Web Developer', image: 'https://ui-avatars.com/api/?name=Yuki' },
		{ name: 'Dion', position: 'Geting data...', image: Dion },
	];
</script>

<section id="team" class="bg-white dark:bg-slate-900 py-24 font-mono text-gray-800 dark:text-gray-100 transition-colors sm:py-32">
	<div
		class="mx-auto grid max-w-7xl gap-20 rounded-lg border border-solid border-gray-200 dark:border-gray-700 px-6 py-8 lg:px-8 xl:grid-cols-3"
	>
		<!-- Left Panel -->
		<div class="flex h-full flex-col justify-between">
			<div class="max-w-xl">
				<h2 class="text-3xl font-semibold tracking-tight text-pretty text-blue-900 dark:text-white sm:text-4xl">
					Kenali Tim Kami
				</h2>
				<p class="mt-6 text-lg/8 text-gray-600 dark:text-gray-300">
					Kami adalah tim kreatif dan berdedikasi yang membangun solusi digital untuk membantu bisnis Anda tumbuh dan berkembang.
				</p>
			</div>
			<div class="mt-8 max-w-xl self-center">
				<img src="/undraw_team_85hs.svg" alt="team" class="w-[60%]" />
			</div>
		</div>

		<!-- Team Grid -->
		<ul role="list" class="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
			{#each teams as team, index (team.name)}
				<li>
					<div class="flex items-center gap-x-6">
						<img class="size-16 rounded-full" src={team.image} alt={team.name} />
						<div>
							<h3 class="text-base/7 font-semibold tracking-tight text-gray-900 dark:text-white">
								{team.name}
							</h3>
							<p class="text-sm/6 font-semibold text-blue-600 dark:text-blue-400">{team.position}</p>
						</div>
					</div>
				</li>
			{:else}
				<li>
					<div class="flex items-center gap-x-6 animate-pulse">
						<Skeleton class="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700" />
						<div class="space-y-2">
							<Skeleton class="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700" />
							<Skeleton class="h-3 w-24 rounded bg-blue-200 dark:bg-blue-500/50" />
						</div>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</section>
