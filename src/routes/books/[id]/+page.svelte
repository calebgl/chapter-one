<script>
	// import { enhance } from '$app/forms';
	import ChevronLeft from '$lib/components/icons/chevron-left.svelte';
	import Star from '$lib/components/icons/star.svelte';
	import { DateTime } from 'luxon';

	/**
	 * @param {number} num number to format
	 * @param {Intl.NumberFormatOptions} [options]
	 * @returns {string} formatted num
	 */
	function formatNumber(num, options) {
		return new Intl.NumberFormat('en', options).format(num);
	}

	/** @property {import('./$types').PageData} data */
	let { data } = $props();
	let tab = $state(0);
</script>

<div class="page">
	<header class="header">
		<button class="button button--primary" onclick={() => history.back()}>
			<ChevronLeft />
		</button>
	</header>

	<section class="book">
		<header class="book__header">
			<h1 class="book__title">{data.book.title}</h1>
			<p class="book__author">{data.book.author}</p>
			<div class="review-summary">
				<p class="review-summary__rating">{data.book.average_rating}</p>
				<Star />
				<p class="review-summary__count">({data.book.review_count})</p>
			</div>
		</header>

		<div class="book__cover"></div>
	</section>

	<section class="book-info">
		<p class="book-info__price">
			{formatNumber(data.book.price, { style: 'currency', currency: 'USD' })}
		</p>

		<div class="book-info__buttons">
			<button class="button button--primary book-info__button">Add to card</button>
			<button class="button button--primary book-info__button">Buy now</button>
		</div>

		<div class="book-info__tabs">
			<div class="tabs">
				<button class="button tab" onclick={() => (tab = 0)} data-active={tab === 0}
					>Description</button
				>
				<button class="button tab" onclick={() => (tab = 1)} data-active={tab === 1}>Details</button
				>
			</div>

			{#if tab === 0}
				Desc
				<!-- <p>{data.book.description}</p> -->
			{:else}
				<table class="details">
					<tbody>
						<tr>
							<th>Title</th>
							<td>{data.book.title}</td>
						</tr>
						<tr>
							<th>Author</th>
							<td>{data.book.author}</td>
						</tr>
						<tr>
							<th>Language</th>
							<td>{data.book.language}</td>
						</tr>
						<tr>
							<th>Pages</th>
							<td>{formatNumber(data.book.pages)}</td>
						</tr>
						<tr>
							<th>Publication date</th>
							<td>{DateTime.fromJSDate(data.book.publication_date).toFormat('LLL dd, yyyy')}</td>
						</tr>
						<tr>
							<th>Publisher</th>
							<td>{data.book.publisher}</td>
						</tr>
					</tbody>
				</table>
			{/if}
		</div>
	</section>

	<section class="reviews-section">
		<h2 class="reviews-section__title">Reviews</h2>
		<!-- <form class="form" method="post" use:enhance> -->
		<!-- 	<label for="username">username</label> -->
		<!-- 	<input type="text" name="username" required /> -->
		<!---->
		<!-- 	<label for="comment">comment</label> -->
		<!-- 	<textarea name="comment" required></textarea> -->
		<!---->
		<!-- 	<label for="rating">rating</label> -->
		<!-- 	<input type="number" name="rating" min="1" max="5" step="0.01" required /> -->
		<!---->
		<!-- 	<button type="submit">comment</button> -->
		<!-- </form> -->
		<!---->

		<!-- TODO: add skeleton loader -->
		{#await data.reviews}
			Loading reviews...
		{:then reviews}
			{#if data.book.review_count}
				<p>Total reviews: {data.book.review_count}</p>
				<div class="reviews">
					{#each reviews as review}
						<div class="review">
							<header class="review__header">
								<div class="review__avatar">{review.username[0].toUpperCase()}</div>
								<div class="review__profile">
									<p class="review__username">{review.username}</p>
									<div class="review__rating-wrapper">
										<p class="review__rating">{review.rating}</p>
										<Star />
									</div>
								</div>
								<p class="review__date">
									{DateTime.fromJSDate(review.created_at).toFormat('LLL dd, yyyy')}
								</p>
							</header>
							<div class="review__body">
								<p class="review__comment">{review.comment}</p>
							</div>
						</div>
						<hr />
					{/each}
				</div>
			{:else}
				There are no comments
			{/if}
		{/await}
	</section>
</div>

<style scoped>
	.page {
		padding: 1rem;
	}

	.button {
		padding: 0.25rem;
		border-radius: 0.5rem;
	}

	.button--primary {
		background-color: var(--clr-primary-600);
		transition: background-color var(--ts-300);
	}

	.button--primary:hover,
	.button--primary:focus-visible {
		background-color: var(--clr-primary-900);
	}

	.header {
		margin-bottom: 1rem;
	}

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
		grid-template-rows: subgrid;
		grid-row: 2 span;
		gap: 0.5rem;
		align-items: center;
	}

	.book-info__button {
		padding-block: 0.375rem;
	}

	.book-info__tabs {
		display: grid;
		grid-template-rows: subgrid;
		grid-row: 2 span;
		gap: 0.5rem;
	}

	.details {
		width: 100%;
	}

	.tabs {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.25rem;
		background-color: var(--clr-primary-900);
		padding: 0.25rem;
		border-radius: 0.75rem;
	}

	.tab {
		border-radius: 0.125rem;
		padding-block: 0.375rem;
		transition: background-color var(--ts-300);

		&:first-of-type {
			border-top-left-radius: 0.5rem;
			border-bottom-left-radius: 0.5rem;
		}

		&:last-of-type {
			border-top-right-radius: 0.5rem;
			border-bottom-right-radius: 0.5rem;
		}
	}

	.tab[data-active='true'] {
		background-color: var(--clr-primary-600);
	}

	.reviews-section {
		margin-top: 1.5rem;
	}

	.reviews-section__title {
		font-size: var(--fs-500);
		font-weight: var(--fw-700);
	}

	.reviews {
		display: grid;
		gap: 1.5rem;
	}

	.review {
		display: grid;
		gap: 0.5rem;
	}

	.review__header {
		display: flex;
		gap: 0.5rem;
		justify-content: space-between;
		align-items: start;
		flex-wrap: wrap;
	}

	.review__profile {
		flex-grow: 1;
	}
	.review__date {
		grid-row-start: 1;
		grid-column-start: 2;
		justify-self: end;
	}
	.review__rating {
		grid-area: rating;
	}

	.review__avatar {
		aspect-ratio: 1/1;
		width: 2.75rem;
		border-radius: 50%;
		background-color: var(--clr-primary-900);
		display: grid;
		place-content: center;
		font-size: var(--fs-500);
	}

	.review__rating-wrapper {
		display: flex;
		gap: 0.25rem;
	}

	.review__date,
	.review__rating,
	.review__comment {
		font-size: var(--fs-300);
	}

	th,
	td {
		font-weight: normal;
		padding: 1rem;
		border-top: 1px solid rgb(187, 191, 191);
		border-bottom: 1px solid rgb(187, 191, 191);
	}

	th {
		background-color: lch(95.44% 1.66 73.65);
		width: 30%;
	}

	td {
		background-color: lch(98.44% 0.66 56.65);
	}

	hr:last-of-type {
		display: none;
	}
</style>
