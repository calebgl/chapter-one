<script>
	import { enhance } from '$app/forms';
	import { formatDate } from '$lib/intl';
	import Star from './icons/star.svelte';
	import Button from './button.svelte';

	export let summary;
	export let reviews;

	/**
	 * @param {number} count
	 * @param {number} total
	 * @returns {string}
	 */
	function calculateWidth(count, total) {
		if (BigInt(total) === BigInt(0)) {
			return '0%';
		}

		return Math.trunc((count * 100) / total) + '%';
	}

	let textarea = '';
	$: totallength = textarea.length;

	const maxlength = 512;
</script>

<section class="reviews">
	<h2 class="reviews__title">Reviews</h2>

	<form class="reviews-form" method="post" use:enhance>
		<div class="form-group">
			<textarea
				bind:value={textarea}
				{maxlength}
				name="comment"
				placeholder="Leave your comment..."
				required
			></textarea>
			<div class="textarea-counter">{totallength}/{maxlength}</div>
		</div>

		<div class="form-group">
			<label for="rating">Rating</label>
			<input type="number" name="rating" min="1" max="5" step="0.1" required />
		</div>

		<Button variant="secondary" style="justify-self: center" --padding="0.25rem 0.75rem">
			Comment
		</Button>
	</form>

	<section class="summary">
		<div class="summary__total">
			{summary.average_rating}<Star /> of 5 <span>({summary.total_review_count})</span>
		</div>
		<div class="summary__row">
			<div class="summary__col">5 stars</div>
			<div class="summary__line-wrapper">
				<div
					class="summary__line"
					style:width={calculateWidth(summary.five_star_count, summary.total_review_count)}
				></div>
			</div>
			<div class="summary__percentage">
				{calculateWidth(summary.five_star_count, summary.total_review_count)}
			</div>
		</div>
		<div class="summary__row">
			<div class="summary__col">4 stars</div>
			<div class="summary__line-wrapper">
				<div
					class="summary__line"
					style:width={calculateWidth(summary.four_star_count, summary.total_review_count)}
				></div>
			</div>
			<div class="summary__percentage">
				{calculateWidth(summary.four_star_count, summary.total_review_count)}
			</div>
		</div>
		<div class="summary__row">
			<div class="summary__col">3 stars</div>
			<div class="summary__line-wrapper">
				<div
					class="summary__line"
					style:width={calculateWidth(summary.three_star_count, summary.total_review_count)}
				></div>
			</div>
			<div class="summary__percentage">
				{calculateWidth(summary.three_star_count, summary.total_review_count)}
			</div>
		</div>
		<div class="summary__row">
			<div class="summary__col">2 stars</div>
			<div class="summary__line-wrapper">
				<div
					class="summary__line"
					style:width={calculateWidth(summary.two_star_count, summary.total_review_count)}
				></div>
			</div>
			<div class="summary__percentage">
				{calculateWidth(summary.two_star_count, summary.total_review_count)}
			</div>
		</div>
		<div class="summary__row">
			<div class="summary__col">1 star</div>
			<div class="summary__line-wrapper">
				<div
					class="summary__line"
					style:width={calculateWidth(summary.one_star_count, summary.total_review_count)}
				></div>
			</div>
			<div class="summary__percentage">
				{calculateWidth(summary.one_star_count, summary.total_review_count)}
			</div>
		</div>
	</section>

	<section class="review-list">
		{#await reviews}
			<!-- TODO: add skeleton loader -->
			Loading reviews...
		{:then reviews}
			{#if summary.total_review_count}
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
								{formatDate(review.created_at)}
							</p>
						</header>
						<div class="review__body">
							<p class="review__comment">{review.comment}</p>
						</div>
					</div>
					<hr />
				{/each}
			{:else}
				There are no comments
			{/if}
		{/await}
	</section>
</section>

<style>
	.reviews > * + *:not(.reviews-form) {
		margin-top: 2rem;
	}

	.reviews-form {
		margin-top: 1rem;
	}

	.reviews__title {
		font-size: var(--fs-500);
		font-weight: var(--fw-700);
	}

	.summary {
		display: grid;
		gap: 0.25rem;
	}

	.summary__total {
		display: flex;
		gap: 0.25rem;
		align-items: center;
	}

	.summary__row {
		display: grid;
		grid-template-columns: 7ch 1fr 10ch;
		gap: 0.5rem;
		align-items: center;
	}

	.summary__line-wrapper {
		background-color: var(--clr-bg-600);
		border-radius: 0.5rem;
		height: 0.75rem;
	}

	.summary__line {
		position: relative;
		background-color: var(--clr-yellow-400);
		width: 100%;
		height: 100%;
		border-radius: 0.5rem;
	}

	.reviews-form {
		display: grid;
		gap: 1rem;
	}

	.form-group {
		display: grid;
		gap: 0.25rem;
	}

	.form-group:has(textarea) .textarea-counter {
		justify-self: end;
		font-size: var(--fs-200);
	}

	textarea {
		padding: 0.5rem;
		resize: none;
		height: 3lh;
	}

	textarea::placeholder {
		font-style: italic;
	}

	input,
	textarea {
		background-color: var(--clr-bg-500);
		border-radius: 0.5rem;
	}

	input {
		padding: 0.25rem 0.5rem;
	}

	.review-list {
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
		background-color: var(--clr-bg-600);
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

	hr {
		border-color: var(--clr-gray-400);
	}

	hr:last-of-type {
		display: none;
	}
</style>
