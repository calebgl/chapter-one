<script>
	import BookDescription from '$lib/components/book-description.svelte';
	import BookDetails from '$lib/components/book-details.svelte';
	import BookReviews from '$lib/components/book-reviews.svelte';
	import Button from '$lib/components/button.svelte';
	import Star from '$lib/components/icons/star.svelte';
	import { formatNumber } from '$lib/intl';

	/** @type {import('./$types').PageData} */
	export let data;

	/** @type {typeof BookDescription | typeof BookDetails} */
	let tab = BookDescription;
</script>

<section class="book">
	<header class="book__header">
		<h1 class="book__title">{data.book.title}</h1>
		<p class="book__author">{data.book.author}</p>
		<div class="review-summary">
			<p class="review-summary__rating">{data.book.average_rating}</p>
			<Star />
			<p class="review-summary__count">({data.book.total_review_count})</p>
		</div>
	</header>

	<div class="book__cover"></div>
</section>

<section class="book-info">
	<p class="book-info__price">
		{formatNumber(data.book.price, { style: 'currency', currency: 'USD' })}
	</p>

	<div class="book-info__buttons">
		<Button variant="secondary" --padding="0.375rem">Add to cart</Button>
		<Button variant="primary" --padding="0.375rem">Buy now</Button>
	</div>

	<div class="book-info__tabs">
		<div class="tabs">
			<Button
				onclick={() => (tab = BookDescription)}
				active={tab === BookDescription}
				--inactive="var(--clr-bg-600)"
				--active="var(--clr-bg-400)"
				--radius-se="0.125rem"
				--radius-ee="0.125rem"
			>
				Description
			</Button>
			<Button
				onclick={() => (tab = BookDetails)}
				active={tab === BookDetails}
				--inactive="var(--clr-bg-600)"
				--active="var(--clr-bg-400)"
				--radius-ss="0.125rem"
				--radius-es="0.125rem"
			>
				Details
			</Button>
		</div>

		<svelte:component this={tab} book={data.book} description={data.book.description} />
	</div>
</section>

<BookReviews reviews={data.reviews} summary={data.book} />

<style>
	.book {
		margin-bottom: 2rem;
	}

	.book__header {
		margin-bottom: 1.5rem;
	}

	.book__cover {
		aspect-ratio: 3/4;
		width: clamp(100px, 60%, 300px);
		background-color: lime;
		margin-left: auto;
		margin-right: auto;
	}

	.book__title {
		font-size: var(--fs-600);
		font-weight: var(--fw-700);
	}

	.book__author {
		font-size: var(--fs-300);
	}

	.review-summary {
		font-size: var(--fs-300);
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.review-summary__count {
		font-size: var(--fs-200);
	}

	.book-info {
		display: grid;
		grid-auto-flow: row;
		gap: 1.5rem;
	}

	.book-info__price {
		font-size: var(--fs-600);
	}

	.book-info__buttons {
		display: grid;
		grid-template-rows: grid;
		gap: 0.5rem;
		align-items: center;
	}

	.book-info__tabs {
		display: grid;
		grid-template-rows: grid;
		gap: 0.5rem;
	}

	.tabs {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.25rem;
		background-color: var(--clr-bg-600);
		padding: 0.25rem;
		border-radius: 0.75rem;
	}

	/* .tab { */
	/* 	border-radius: 0.125rem; */
	/* 	padding-block: 0.375rem; */
	/* 	transition: background-color var(--ts-300); */
	/**/
	/* 	&:first-of-type { */
	/* 		border-top-left-radius: 0.5rem; */
	/* 		border-bottom-left-radius: 0.5rem; */
	/* 	} */
	/**/
	/* 	&:last-of-type { */
	/* 		border-top-right-radius: 0.5rem; */
	/* 		border-bottom-right-radius: 0.5rem; */
	/* 	} */
	/* } */
	/**/
	/* .tab[data-active='true'] { */
	/* 	background-color: var(--clr-bg-400); */
	/* } */
</style>
