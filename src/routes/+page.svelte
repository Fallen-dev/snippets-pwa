<script lang="ts">
	import 'highlight.js/styles/base16/chalk.css';

	import { CodeBlock } from 'svhighlight';
	import { z } from 'zod';
	import type { SubmitFunction } from './$types.js';
	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';
	import { backIn, quintIn, quintOut } from 'svelte/easing';

	let username = 'rain';
	const languages = [
		'java',
		'javascript',
		'typescript',
		'ruby',
		'rust',
		'c',
		'c#',
		'kotlin',
		'haskell',
		'golang'
	];

	const checkSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M20 7L10 17l-5-5"/></svg>`;

	export let form;

	let textarea: HTMLTextAreaElement;
	let loading = false;
	let submit_error = form?.error;

	let title = form?.input.title as string;
	let code = form?.input.code as string;
	let language = form?.input.language as string;

	$: showCodeBlock = form?.input || false;

	const handleTab = (event: KeyboardEvent) => {
		if (event.key === 'Tab') {
			event.preventDefault();
			const start = textarea.selectionStart;
			const end = textarea.selectionEnd;
			const tab = '  ';
			textarea.value = textarea.value?.substring(0, start) + tab + textarea.value?.substring(end);
			textarea.selectionStart = textarea.selectionEnd = start + tab.length;
			return;
		}
		return;
	};

	const schema = z.object({
		code: z.string().min(1, { message: 'Code block cannot be empty.' }).trim(),
		language: z.string().min(1, { message: 'You must specify the language.' })
	});

	const handleSubmit = (async (event) => {
		loading = true;

		const input = {
			code: event.data.get('code'),
			language: event.data.get('language')
		} as { code: string; language: string };

		try {
			const { code, language } = schema.parse(input);
			const title = event.data.get('title');
			showCodeBlock = true;
		} catch (error: any) {
			submit_error = form?.error || error.flatten().fieldErrors;
			console.log(submit_error);

			event.cancel();
			loading = false;
		}

		return async (form) => {
			form.update();
			language = '';
			loading = false;
		};
	}) as SubmitFunction;

	function resetForm() {
		code = language = title = '';
		showCodeBlock = false;
		return;
	}
	$: console.log('Input:', form?.input);
</script>

<section class="bg-base-200 p-4 -mx-4 -mt-4 rounded-b-box space-y-4">
	<h3>Create new snippet</h3>

	<form method="post" class="form-control gap-1" use:enhance={handleSubmit}>
		<!-- Lang selection -->
		<div>
			<label class="label" for="language">
				<span>Select language</span>
			</label>
			<div class="space-y-4">
				<input
					type="text"
					id="language"
					name="language"
					placeholder="Select from below as of now"
					class="input w-full"
					bind:value={language}
					hidden
				/>
				<div class="carousel gap-3">
					{#each languages as _language}
						<button
							class="btn btn-outline btn-sm gap-1"
							class:btn-active={language === _language}
							on:click|preventDefault={() => (language = _language)}
						>
							{#if language === _language}
								<span
									in:slide={{ axis: 'x', duration: 250, easing: quintOut }}
									out:slide={{ axis: 'x', duration: 250, delay: 125, easing: quintIn }}
								>
									{@html checkSVG}
								</span>
							{/if}
							<span class="uppercase">{_language}</span>
						</button>
					{/each}
				</div>
			</div>
		</div>
		{#if !language}
			<h2 in:slide={{ delay: 375 }} out:slide class="mt-4 text-center text-base-content/40">
				Select a language to continue
			</h2>
		{:else}
			<div
				in:slide={{ easing: quintIn, duration: 600 }}
				out:slide={{ easing: quintOut, delay: 125 }}
			>
				<!-- textarea -->
				<div>
					<label class="label" for="code">
						<span>Your snippet</span>
					</label>
					<textarea
						id="code"
						name="code"
						rows="6"
						class="textarea w-full font-mono rounded-2xl"
						bind:value={code}
						bind:this={textarea}
						on:keydown={handleTab}
					/>
					{#if submit_error?.code}
						<label class="label" for="" transition:slide>
							<span class="label-text-alt text-error">{submit_error?.code[0]}</span>
						</label>
					{/if}
				</div>
				<div class="-mt-1">
					<label class="label" for="title">
						<span>Give your snippet a title</span>
					</label>
					<input
						id="title"
						type="text"
						name="title"
						placeholder="Optional"
						class="input w-full"
						bind:value={title}
					/>
				</div>
				<div class="mt-4 form-control gap-4">
					<button type="submit" class="btn btn-primary btn-block" class:loading>Submit</button>
					<button class="btn btn-outline btn-block" on:click|preventDefault={resetForm}
						>Cancel</button
					>
				</div>
			</div>
		{/if}
	</form>
</section>

{#if showCodeBlock}
	<section
		class="mt-6 space-y-4"
		in:slide={{ delay: 600, duration: 600, easing: quintOut }}
		out:slide={{ duration: 600, easing: backIn }}
	>
		<h3>Your snippet has been created! 🥳</h3>

		<CodeBlock language={form?.input.language} code={form?.input.code} showLineNumbers={false} />

		<button class="mt-6 btn btn-block btn-ghost" on:click={() => (showCodeBlock = false)}
			>Delete your snippet 😢</button
		>
	</section>
{/if}
