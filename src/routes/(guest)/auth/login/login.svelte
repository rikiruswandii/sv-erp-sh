<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { Input } from '$lib/components/ui/input/index.js';
	import {
		FormField,
		FormControl,
		FormLabel,
		FormDescription,
		FormFieldErrors,
		FormButton
	} from '$lib/components/ui/form/index.js';
	import { formSchema, type FormSchema } from '$lib/schemas/auth/login';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import Button from '$lib/components/ui/button/button.svelte';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';

	let { data }: { data: { form: SuperValidated<Infer<FormSchema>> } } = $props();

	const form = superForm(data.form, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance, delayed } = form;
</script>

<div
	class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-white px-6 py-12 lg:px-8 dark:bg-slate-900"
>
	<a href="/" class="sm:mx-auto sm:w-full sm:max-w-sm">
		<img
			class="mx-auto h-10 w-auto"
			src="/pst-brand-logo-bg-none.png"
			alt={'PT. Pratama Solusi Teknologi'}
		/>
		<h2
			class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-blue-900 dark:text-slate-100"
		>
			{m.login_text()}
		</h2>
	</a>

	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
		<form class="space-y-6" method="POST" use:enhance>
			<FormField {form} name="email">
				<FormControl>
					{#snippet children({ props })}
						<div class="flex w-full max-w-sm flex-col gap-1.5">
							<FormLabel for="email" class="text-slate-700 dark:text-slate-200">
								{m.email_label()}
							</FormLabel>
							<Input
								{...props}
								bind:value={$formData.email}
								autocomplete="email"
								required
								placeholder={m.email_label()}
								class="bg-white text-slate-900 placeholder-slate-400 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500"
							/>
						</div>
					{/snippet}
				</FormControl>
				<FormDescription class="text-sm text-slate-500 dark:text-slate-400">
					{m.label_interupt({ name: m.email_label().toLocaleLowerCase() })}
				</FormDescription>
				<FormFieldErrors />
			</FormField>

			<FormField {form} name="password">
				<FormControl>
					{#snippet children({ props })}
						<div class="flex w-full max-w-sm flex-col gap-1.5">
							<FormLabel for="password" class="text-slate-700 dark:text-slate-200">
								{m.password_label()}
							</FormLabel>
							<Input
								{...props}
								bind:value={$formData.password}
								autocomplete="current-password"
								type="password"
								required
								placeholder={m.password_label()}
								class="bg-white text-slate-900 placeholder-slate-400 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500"
							/>
						</div>
					{/snippet}
				</FormControl>
				<FormDescription class="text-sm text-slate-500 dark:text-slate-400">
					{m.label_interupt({ name: m.password_label().toLocaleLowerCase() })}
				</FormDescription>
				<FormFieldErrors />
			</FormField>

			<div>
				{#if $delayed}
					<Button disabled class="flex w-full justify-center bg-blue-900 text-white hover:bg-blue-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300">
						<LoaderCircle class="animate-spin" />
						Harap tunggu...
					</Button>
				{:else}
				<FormButton
					class="flex w-full justify-center bg-blue-900 text-white hover:bg-blue-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
				>
					{m.btn_login_label()}
				</FormButton>
				{/if}
			</div>
		</form>
	</div>
</div>
