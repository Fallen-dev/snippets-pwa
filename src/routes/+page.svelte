<script lang="ts">
	let username = 'rain';
	const languages = ['java', 'js', 'ts', 'ruby', 'rust', 'c', 'c#', 'kotlin', 'haskell', 'golang'];

	export let form;

	let title: string, code: string, lang: string;
</script>

<section class="bg-base-200 p-4 -mx-4 -mt-4 rounded-b-box space-y-6">
	<h3>Create new snippet</h3>
	<div class="space-y-2">
		<textarea rows="3" class="textarea textarea-bordered w-full font-mono rounded-md" />
		<h6>Select language</h6>
		<div class="flex gap-3 items-center justify-between">
			<div class="carousel gap-3">
				{#each languages as language}
					<p class="btn btn-xs rounded">{language}</p>
				{/each}
			</div>
			<input type="text" placeholder="Search here" class="input input-sm input-bordered w-24" />
		</div>
		<h6 class="pt-2">Title for your snippet</h6>
		<input
			type="text"
			placeholder="Type here"
			bind:value={title}
			class="input input-bordered w-full"
		/>
	</div>
	<form action="?/submit" method="post">
		<input type="text" name="title" value={title} hidden aria-hidden />
		<input type="text" name="lang" value={lang} hidden aria-hidden />
		<input type="text" name="user" value={username} hidden aria-hidden />
		<textarea name="code" value={code} hidden aria-hidden />
		<button class="btn btn-primary btn-block">Submit</button>
	</form>
</section>

{#if form?.code}
	<div class="card bg-base-300">
		<div class="card-body">
			<h3 class="card-title">{form?.title}</h3>
		</div>
		<div class="mockup-code">
			<code class="p-6">{form?.code}</code>
		</div>
	</div>
{/if}
