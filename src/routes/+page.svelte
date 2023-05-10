<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Avatar, CodeBlock, toastStore, InputChip } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import Time from 'svelte-time';
	import { slide } from 'svelte/transition';
	import { Autocomplete } from '@skeletonlabs/skeleton';
	import { languages } from '$lib/db/languages';

	const getInitials = (name: string) =>
		name
			.trim()
			.split(' ')
			.map((char): string => char[0])
			.join('') as string;

	export let form, data;

	let textarea: HTMLTextAreaElement;

	const snippets = data.snippets.data as any;
	const error = data.snippets.error;
	const session = data.session;

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

	toastStore.clear();
	if (error)
		toastStore.trigger({
			message: '<h6>Could not get the snippets<h6><p>Try refreshing the page</p>',
			background: 'variant-filled-error'
		});

	onMount(() => {
		if (
			(!session && $page.url.searchParams.get('signin') === 'success') ||
			(!session && $page.url.searchParams.get('signup') === 'success')
		) {
			toastStore.trigger({
				message:
					'<p>A verification link has been sent to your email</p><h6>Verify your email to login</h6>'
			});
		}
		if (session && $page.url.searchParams.get('signin') === 'success') {
			toastStore.trigger({
				message: 'Welcome back!',
				autohide: false,
				callback(response) {
					if (response.status === 'closed') goto('/');
				}
			});
		}
	});

	let inputSelectLanguage = '' && '';
	let language = '';
	let showAutocompleteBox = false;
	let tagList = [] as string[];
	let username = session?.user.user_metadata?.username;
	let code = '';
	let showPreview = false;

	$: language && (tagList = [language]);

	const clearForm = () => {
		inputSelectLanguage = '';
		language = '';
		code = '';
		tagList = [];
		showAutocompleteBox = false;
	};

	$: if (form?.submitted) {
		clearForm();
	}
	$: if (form?.error) {
		toastStore.trigger({
			message: 'Something went wrong! Try again'
		});
	}
</script>

<div class="p-4 container space-y-6">
	<section class="space-y-4">
		{#if session}
			<div class="flex items-center justify-between">
				<h3>Hello {username?.split(' ')[0]}</h3>
				<form action="/signout" method="post">
					<button class="btn btn-sm variant-ghost-error">Sign out</button>
				</form>
			</div>
			<a href="/create">Create</a>
			<h3>Create your snippets</h3>
			<input
				class="input"
				type="search"
				name="demo"
				bind:value={inputSelectLanguage}
				on:focusin={() => {
					showAutocompleteBox = true;
				}}
				on:focusout={() => {
					setTimeout(() => {
						showAutocompleteBox = false;
					}, 1000);
				}}
				placeholder="Search your language"
			/>
			{#if showAutocompleteBox}
				<div class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto" transition:slide>
					<Autocomplete
						bind:input={inputSelectLanguage}
						options={languages}
						on:selection={(event) => {
							language = event.detail.label;
							inputSelectLanguage = language;
							showAutocompleteBox = false;
						}}
					/>
				</div>
			{/if}
			{#if language}
				<textarea
					name="code"
					id="code"
					placeholder="Paste your code or write here"
					class="textarea font-mono"
					rows="3"
					bind:value={code}
					bind:this={textarea}
					on:keydown={handleTab}
				/>
				<InputChip bind:value={tagList} name="chips" placeholder="Add tags. Separated by Enter." />
			{/if}
			{#if code && showPreview}
				<div class="space-y-4" transition:slide>
					<h6>Preview</h6>
					<CodeBlock {language} {code} background="bg-surface-100-800-token" />
				</div>
			{/if}
			<form action="?/addSnippet" method="post" use:enhance>
				<input type="text" name="user" value={username} hidden aria-hidden />
				<textarea name="code" value={code} hidden aria-hidden />
				<input type="text" name="language" value={language} hidden aria-hidden />
				<input type="text" name="tags" value={tagList} hidden aria-hidden />
				<button class="btn variant-filled-primary w-full" disabled={!code}>Submit</button>
			</form>
			{#if code}
				<div transition:slide>
					<button
						class="btn variant-ringed-primary w-full"
						on:click={() => (showPreview = !showPreview)}
						>{showPreview ? 'Hide' : 'Show'} preview</button
					>
				</div>
			{/if}
		{:else}
			<div class="card p-4 space-y-4">
				<h3>Sign up to create your own snippets</h3>
				<p>Enjoy making and sharing snippets and discovering <code>new</code> methods.</p>
				<a href="/signup" class="w-full btn variant-filled-primary">Sign up</a>
			</div>
		{/if}
	</section>

	<section class="space-y-6">
		<h3>Recent snippets</h3>
		{#each snippets as { language, user, code, date, tags }}
			<div class="space-y-3">
				<div class="flex-shrink-0">
					<CodeBlock
						language={language || 'plaintext'}
						{code}
						buttonCopied="Copied!"
						background="bg-surface-100-800-token"
					/>
				</div>
				<div class="w-full overflow-hidden">
					<div class="flex gap-3 overflow-x-scroll hide-scrollbar">
						{#each tags as tag}
							<span class="chip text-sm variant-soft-tertiary">{tag}</span>
						{/each}
					</div>
				</div>
				<div class="flex items-center gap-2">
					<Avatar initials={getInitials(user)} width="w-10" />
					<div class="flex w-full justify-between items-center gap-2">
						<h6 class="capitalize">{user}</h6>
						<Time relative timestamp={date} />
					</div>
				</div>
			</div>
		{/each}
	</section>
</div>
