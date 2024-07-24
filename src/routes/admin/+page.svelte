<script>
	import { formatDate, formatNumber } from '$lib/intl';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<form>
	<div class="form-group">
		<label for="title">Title</label>
		<input name="title" placeholder="1984..." />
	</div>
	<div class="form-group">
		<label for="author">Author</label>
		<input name="author" placeholder="Goerge Orwell..." />
	</div>
	<div class="form-group">
		<label for="price">Price</label>
		<input name="price" type="number" step="0.1" min="0" max="500" />
	</div>
	<div class="form-group">
		<label for="language">Language</label>
		<input name="language" />
	</div>
	<div class="form-group">
		<label for="publisher">Publisher</label>
		<input name="publisher" />
	</div>
	<div class="form-group">
		<label for="description">Description</label>
		<textarea name="description"></textarea>
	</div>
</form>

<table>
	<thead>
		<tr>
			<th>Title</th>
			<th>Author</th>
			<th>Price</th>
			<th>Language</th>
			<th>Publisher</th>
			<th>Created at</th>
			<th>Updated at</th>
		</tr>
	</thead>
	<tbody>
		{#each data.books as book (book.id)}
			<tr>
				<td>{book.title}</td>
				<td>{book.author}</td>
				<td>{formatNumber(book.price, { style: 'currency', currency: 'USD' })}</td>
				<td>{book.language}</td>
				<td>{book.publisher}</td>
				<td>{formatDate(book.created_at)}</td>
				<td>{formatDate(book.updated_at)}</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	form {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	.form-group {
		display: grid;
		gap: 0.125rem;
	}

	input,
	textarea {
		padding: 0.5rem;
		background-color: var(--clr-bg-500);
		border-radius: 0.5rem;
	}

	textarea {
		height: 5lh;
	}

	:is(input, textarea)::placeholder {
		font-style: italic;
	}

	div:has(textarea) {
		grid-column: 2 span;
	}

	table {
		width: 100%;
	}

	thead {
		font-size: var(--fs-200);
		border-start-start-radius: 0.5rem;
		border-end-start-radius: 0.5rem;
	}

	tbody {
		font-size: var(--fs-300);
	}

	th {
		font-weight: var(--fw-500);
		text-align: start;
		background-color: var(--clr-bg-600);

		--radius: 0.25rem;

		&:first-of-type {
			border-start-start-radius: var(--radius);
			border-end-start-radius: var(--radius);
		}

		&:last-of-type {
			border-start-end-radius: var(--radius);
			border-end-end-radius: var(--radius);
		}
	}

	:is(th, td) {
		padding-inline: 0.5rem;
		padding-block: 0.25rem;

		&:first-of-type {
			padding-inline-start: 1rem;
		}

		&:last-of-type {
			padding-inline-end: 1rem;
		}
	}
</style>
