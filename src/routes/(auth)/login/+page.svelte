<script>
	import OauthButtons from '$lib/components/OauthButtons.svelte';
	let showPassword = false;
</script>

<h1>Log in</h1>
<p>Don't have an accoun? <a href="/signup" class="link">Create now</a>.</p>
<form>
	<!-- name -->
	<!-- email -->
	<div class="form-control">
		<label class="label" for="">
			<span class="label-text font-medium text-base">Your email</span>
		</label>
		<input type="email" placeholder="Type here" class="input input-bordered w-full" />
		<label class="label" for="">
			<span class="label-text-alt text-error">Email is required</span>
		</label>
	</div>
	<!-- password -->
	<div class="form-control">
		<label class="label" for="">
			<span class="label-text font-medium text-base">Your password</span>
		</label>
		<div class="input-group">
			<input
				type={showPassword ? 'text' : 'password'}
				placeholder="Type here"
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
		<label class="label" for="">
			<span class="label-text-alt text-error">Password is required</span>
		</label>
	</div>
	<!-- submit -->
	<button class="mt-4 btn btn-block btn-primary">Login</button>
	<p class="mt-4">
		Forget password? Use <a href="/" class="link">password free login</a>.
	</p>
</form>
<div class="divider py-4">Or login with</div>
<OauthButtons />
