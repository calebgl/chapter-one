<script>
	import '../app.css';
</script>

<div class="page-wrapper">
	<slot />
</div>

<style>
	.page-wrapper {
		padding: 1rem;
	}

	.page-wrapper :global(> * + *) {
		margin-top: 2rem;
	}
</style>
