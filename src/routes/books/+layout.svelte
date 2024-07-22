<script>
	import Button from '$lib/components/button.svelte';
	import ChevronLeft from '$lib/components/icons/chevron-left.svelte';
</script>

<header class="header">
	<Button onclick={() => history.back()}>
		<ChevronLeft />
	</Button>
</header>

<slot />
