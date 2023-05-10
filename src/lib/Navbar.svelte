<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- svelte-ignore a11y-label-has-associated-control -->
<div class="max-w-md mx-auto navbar bg-base-200">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost">
			<h3>Snippets</h3>
		</a>
	</div>
	<div class="flex-none">
		<div class="dropdown dropdown-end">
			<label tabindex="0" class="btn btn-ghost btn-circle avatar">
				<div class="w-10 rounded-full">
					<img src="//unsplash.it/300" alt="Your profile. button" />
				</div>
			</label>
			<ul
				tabindex="0"
				class="menu menu-compact dropdown-content mt-2 p-2 shadow bg-base-100 rounded-box w-52"
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
		</div>
	</div>
</div>
