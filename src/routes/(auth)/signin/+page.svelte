<script>
	import { enhance } from '$app/forms';
	import { toastStore } from '@skeletonlabs/skeleton';

	export let form;

	let showPassword = false;
	toastStore.clear();

	$: if (form?.errors)
		toastStore.trigger({
			message: form?.errors.message || 'Try again.',
			background: 'variant-filled-error',
			autohide: false
		});
</script>

<h1>Login</h1>
<form method="post" class="space-y-6" use:enhance>
	<!-- email -->
	<label class="label">
		<span>Email</span>
		<input
			type="email"
			name="email"
			class="input"
			value={form?.data?.email ?? ''}
			placeholder="Email"
		/>
		{#if form?.errors.email}
			<span class="support-error-text">{form?.errors.email[0]}</span>
		{/if}
	</label>
	<!-- password -->
	<label class="label">
		<span>Password</span>
		<input
			type={showPassword ? 'text' : 'password'}
			name="password"
			class="input"
			placeholder="Password"
		/>
		{#if form?.errors.password}
			<span class="support-error-text">{form?.errors.password[0]}</span>
		{/if}
		<label class="flex items-center gap-3 pt-2">
			<input
				class="checkbox w-4 h-4"
				class:input-error={form?.errors.password}
				type="checkbox"
				bind:checked={showPassword}
			/>
			<span class="text-sm">Show password</span>
		</label>
	</label>
	<!-- button -->
	<button class="btn variant-filled-primary w-full">Login</button>
</form>
<a href="/otp-login" class="btn variant-ghost-primary w-full">Password-less login</a>
<p>Don't have an account? <a href="/signup">Sign up instead.</a></p>

<style lang="postcss">
	.support-error-text {
		@apply text-sm font-medium text-error-500-400-token;
	}
</style>
