<script lang="ts">
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';

	let showMenu = false;
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- svelte-ignore a11y-label-has-associated-control -->
<div class="max-w-md mx-auto navbar {$page.url.pathname === '/' ? 'bg-base-200' : 'bg-base-100'}">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost">
			<h3>Snippets</h3>
		</a>
	</div>
	<div class="flex-none">
		<div class="dropdown dropdown-end">
			<button
				tabindex="0"
				class="btn btn-ghost btn-circle avatar"
				on:click={() => (showMenu = !showMenu)}
				on:blur={() => (showMenu = false)}
			>
				<div class="w-10 rounded-full">
					<img src="//unsplash.it/300" alt="Your profile. button" />
				</div>
			</button>
			{#if showMenu}
				<ul
					tabindex="0"
					class="menu menu-compact dropdown-content mt-2 p-2 shadow bg-base-100 rounded-box min-w-[12rem] [&>li]:w-full"
					transition:slide
				>
					<li>
						<a href="/" class="justify-between">
							Profile
							<span class="badge">New</span>
						</a>
					</li>
					<li><a href="/">Settings</a></li>
					<li><a href="/" class="text-error">Logout</a></li>
				</ul>
			{/if}
		</div>
	</div>
</div>
