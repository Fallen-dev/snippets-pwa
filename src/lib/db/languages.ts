import type { AutocompleteOption } from '@skeletonlabs/skeleton';

	export const languages: AutocompleteOption[] = [
		{ label: 'Plaintext', value: 'plaintext', keywords: 'plain, txt, text' },
		{ label: 'JavaScript', value: 'js', keywords: 'javascript, js, jsx' },
		{ label: 'TypeScript', value: 'ts', keywords: 'typescript, ts, tsx, mts, cts' },
		{
			label: 'HTML, XML',
			value: 'html',
			keywords: 'xml, html, xhtml, rss, atom, xjb, xsd, xsl, plist, svg'
		},
		{ label: 'PHP', value: 'php', keywords: 'php' },
		{ label: 'Perl', value: 'pl', keywords: 'perl, pl, pm' },
		{ label: 'PostgreSQL', value: 'pgsql', keywords: 'pgsql, postgres, postgresql' },
		{ label: 'Python', value: 'py', keywords: 'python, py, gyp' },
		{ label: 'Ruby', value: 'Ruby', keywords: 'ruby, rb, gemspec, podspec, thor, irb' },
		{ label: 'Rust', value: 'rs', keywords: 'rust, rs' },
		{ label: 'Java', value: 'java', keywords: 'java, jsp' },
		{ label: 'Kotlin', value: 'kt', keywords: 'kotlin, kt' },
		{ label: 'LaTeX', value: 'tex', keywords: 'latex, tex' },
		{ label: 'C#', value: 'csharp', keywords: 'csharp, cs, c#' },
		{ label: 'C', value: 'c', keywords: 'c, h' },
		{ label: 'C++', value: 'cpp', keywords: 'cpp, hpp, cc, hh, c++, h++, cxx, hxx' }
	];