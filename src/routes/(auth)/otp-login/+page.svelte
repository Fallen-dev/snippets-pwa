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
<p>
	With password-less login, you can login to your account using just your email. No more passwords
	to remember!. You will recieve a verification link to login.
</p>
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
	<!-- button -->
	<button class="btn variant-filled-primary w-full">Login</button>
</form>
<a href="/login" class="btn variant-ghost-primary w-full">Login with password</a>
<p>Don't have an account? <a href="/signup">Sign up instead.</a></p>

<style lang="postcss">
	.support-error-text {
		@apply text-sm font-medium text-error-500-400-token;
	}
</style>
