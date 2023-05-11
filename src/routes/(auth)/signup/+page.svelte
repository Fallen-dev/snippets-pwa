<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import OauthButtons from '$lib/components/OauthButtons.svelte';
	import { slide } from 'svelte/transition';
	import { z } from 'zod';

	export let form;

	const user = form?.inputData.user;
	const email = form?.inputData.email;

	let error = form?.error;

	const signupSchema = z.object({
		user: z.string().min(1, { message: 'Username is required' }).trim(),
		email: z
			.string()
			.min(1, { message: 'Email is required.' })
			.email({ message: 'Must be a proper email.' }),
		password: z
			.string()
			.min(1, { message: 'Password is required.' })
			.min(6, { message: 'Password must be at least 6 characters.' })
			.trim()
	});

	let showPassword = false;
	let loading = false;

	const handleSubmit: SubmitFunction = async (event) => {
		loading = true;
		const inputData = {
			user: event.data.get('user'),
			email: event.data.get('email'),
			password: event.data.get('password')
		};

		try {
			const { user, email, password } = signupSchema.parse(inputData);
			// Add db auth here
		} catch (err: any) {
			error = form?.error || err?.flatten().fieldErrors;
			event.cancel();
			loading = false;
		}

		return async (event) => {
			event.update();

			error = null;
			loading = false;
		};
	};
</script>

<h1>Sign up</h1>
<p>Already have an accoun? <a href="/login" class="link">Login instead.</a></p>
<form method="post" use:enhance={handleSubmit}>
	<!-- name -->
	<div class="form-control">
		<label class="label" for="">
			<span class="label-text font-medium text-base">What is your name?</span>
		</label>
		<input
			type="text"
			placeholder="Type here"
			name="user"
			class="input input-bordered w-full"
			value={user ?? ''}
		/>
		{#if error?.user}
			<label class="label" for="" transition:slide>
				<span class="label-text-alt text-error">{error?.user[0]}</span>
			</label>
		{/if}
	</div>
	<!-- email -->
	<div class="form-control">
		<label class="label" for="">
			<span class="label-text font-medium text-base">Your email</span>
		</label>
		<input
			type="email"
			placeholder="Type here"
			name="email"
			class="input input-bordered w-full"
			value={email ?? ''}
		/>
		{#if error?.email}
			<label class="label" for="" transition:slide>
				<span class="label-text-alt text-error">{error?.email[0]}</span>
			</label>
		{/if}
	</div>
	<!-- password -->
	<div class="form-control">
		<label class="label" for="">
			<span class="label-text font-medium text-base">Create a password</span>
		</label>
		<div class="input-group">
			<input
				type={showPassword ? 'text' : 'password'}
				placeholder="Type here"
				name="password"
				class="input input-bordered border-r-0 w-full"
			/>
			<button
				class="btn btn-square btn-ghost border-l-0 border-base-content/20 pr-1"
				on:click|preventDefault={() => (showPassword = !showPassword)}
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
					{#if showPassword}
						<path
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="4"
							d="M6 16c.635 1.22 1.596 2.35 2.823 3.355C12.26 22.173 17.779 24 24 24s11.739-1.827 15.177-4.645C40.404 18.35 41.365 17.22 42 16m-13.023 8l2.071 7.727m6.305-10.373l5.657 5.656M5 27.01l5.657-5.657m6.271 10.375L18.998 24"
						/>
					{:else}
						<mask id="ipTPreviewOpen0"
							><g fill="#555" stroke="#fff" stroke-linejoin="round" stroke-width="4"
								><path
									d="M24 36c11.046 0 20-12 20-12s-8.954-12-20-12S4 24 4 24s8.954 12 20 12Z"
								/><path d="M24 29a5 5 0 1 0 0-10a5 5 0 0 0 0 10Z" /></g
							></mask
						><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipTPreviewOpen0)" />
					{/if}
				</svg>
			</button>
		</div>
		{#if error?.password}
			<label class="label" for="" transition:slide>
				<span class="label-text-alt text-error">{error?.password[0]}</span>
			</label>
		{/if}
	</div>
	<!-- submit -->
	<button class="mt-4 btn btn-block btn-primary" class:loading>Sign up</button>
</form>
<div class="divider py-4">Or sign up with</div>
<OauthButtons />
