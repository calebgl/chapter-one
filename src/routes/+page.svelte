<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<section class="gallery">
	{#each data.books as book}
		<a href={'books/' + book.id} class="book">
			<header class="book__header">
				<h2 class="book__title">{book.title}</h2>
				<h3 class="book__author">{book.author}</h3>
			</header>

			<div class="book__cover-wrapper">
				<img src={`/api/books/${book.id}/images`} alt="" class="book__cover" />
			</div>
		</a>
	{/each}
</section>

<style>
	.gallery {
		display: grid;
		gap: 1rem;
	}

	.book {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.5rem;
		background-color: var(--clr-bg-600);
		padding: 1rem;
	}

	.book__header {
		overflow-x: hidden;
	}

	.book__cover-wrapper {
		overflow: hidden;
	}

	.book__cover {
		aspect-ratio: 3/4;
		height: 200px;
		width: 100%;
		object-fit: cover;
		margin-left: auto;
		margin-right: auto;
	}

	.book__title {
		font-size: var(--fs-600);
		font-weight: var(--fw-700);
		line-height: 1;

		overflow-x: clip;
		text-wrap: nowrap;
		text-overflow: ellipsis;
	}

	.book__author {
		font-size: var(--fs-300);
	}
</style>
