<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<section class="gallery">
	{#each data.books as book}
		<a href={'books/' + book.id}><pre class="code">{JSON.stringify(book, null, 2)}</pre></a>
	{/each}
</section>

<style>
	.gallery {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 2rem;
	}

	pre {
		background-color: white;
		font-family: monospace;
		padding: 1rem;
		cursor: pointer;
	}
</style>
