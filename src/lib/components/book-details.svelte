<script>
	import { formatNumber, formatDate } from '$lib/intl';

	export let book;
</script>

<table class="details">
	<tbody>
		<tr>
			<th>Title</th>
			<td>{book.title}</td>
		</tr>
		<tr>
			<th>Author</th>
			<td>{book.author}</td>
		</tr>
		<tr>
			<th>Language</th>
			<td>{book.language}</td>
		</tr>
		<tr>
			<th>Pages</th>
			<td>{formatNumber(book.pages)}</td>
		</tr>
		<tr>
			<th>Publication date</th>
			<td>{formatDate(book.publication_date)}</td>
		</tr>
		<tr>
			<th>Publisher</th>
			<td>{book.publisher}</td>
		</tr>
	</tbody>
</table>

<style>
	.details {
		width: 100%;
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
</style>
