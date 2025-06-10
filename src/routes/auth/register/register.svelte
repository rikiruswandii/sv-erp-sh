<script lang="ts">
	import {
		FormField,
		FormControl,
		FormLabel,
		FormDescription,
		FormFieldErrors,
		FormButton
	} from '$lib/components/ui/form/index.js';
	import { m } from '$lib/paraglide/messages';
	import { Input } from '$lib/components/ui/input/index.js';
	import { formSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let { data }: { data: { form: SuperValidated<Infer<FormSchema>> } } = $props();

	const form = superForm(data.form, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance } = form;
</script>

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-sm">
		<img
			class="mx-auto h-10 w-auto"
			src="/pst-brand-logo-bg-none.png"
			alt={'PT. Pratama Solusi Teknologi'}
		/>
		<h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
			{m.register_text()}
		</h2>
	</div>

	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
		<form class="space-y-6" method="POST" use:enhance>
			<FormField {form} name="username">
				<FormControl>
					{#snippet children({ props })}
						<div class="flex w-full max-w-sm flex-col gap-1.5">
							<FormLabel for="username">{m.username_label()}</FormLabel>
							<Input
								{...props}
								bind:value={$formData.username}
								autocomplete="username"
								required
								placeholder={m.username_label()}
							/>
						</div>
					{/snippet}
				</FormControl>
				<FormDescription
					>{m.label_interupt({ name: m.username_label().toLocaleLowerCase() })}</FormDescription
				>
				<FormFieldErrors />
			</FormField>
			<FormField {form} name="password">
				<FormControl>
					{#snippet children({ props })}
						<div class="flex w-full max-w-sm flex-col gap-1.5">
							<FormLabel for="password">{m.password_label()}</FormLabel>
							<Input
								{...props}
								bind:value={$formData.password}
								autocomplete="current-password"
								type="password"
								required
								placeholder={m.password_label()}
							/>
						</div>
					{/snippet}
				</FormControl>
				<FormDescription
					>{m.label_interupt({ name: m.password_label().toLocaleLowerCase() })}</FormDescription
				>
				<FormFieldErrors />
			</FormField>

			<div>
				<FormButton class="flex w-full justify-center">{m.btn_register_label()}</FormButton>
			</div>
		</form>
	</div>
</div>
