import { localStorageStore } from "@skeletonlabs/skeleton";
import type { Writable } from "svelte/store";

export const snippets = localStorageStore('snippets', []) as Writable<Snippet[]>