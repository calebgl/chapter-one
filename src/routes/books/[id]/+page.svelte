<script>
	import { enhance } from '$app/forms';

	/** @type {import('./$types').PageData}*/
	export let data;
</script>

<button on:click={() => history.back()}>back</button>

<h1>{data.book.title}</h1>

<form class="form" method="post" use:enhance>
	<label for="username">username</label>
	<input type="text" name="username" required />

	<label for="comment">comment</label>
	<textarea name="comment" required></textarea>

	<label for="rating">rating</label>
	<input type="number" name="rating" min="1" max="5" step="0.01" required />

	<button type="submit">comment</button>
</form>

<section>
	{#await data.comments}
		Loading comments...
	{:then comments}
		{#if comments[0]}
			total comments: {comments[0]?.total}
			{#each comments as comment}
				<div class="comment">
					<p class="comment__username">{comment.username}</p>
					<hr />
					<p class="comment__text">{comment.comment}</p>
				</div>
			{/each}
		{:else}
			there are no comments
		{/if}
	{/await}
</section>

<style>
	form {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 1rem;
	}

	.comment {
		display: grid;
		background-color: white;
		padding: 1rem;
	}

	.comment__username {
		font-weight: bold;
	}
</style>
