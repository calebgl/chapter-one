<script>
	/** @type {"primary" | "secondary"| "info" | undefined}  */
	export let variant = undefined;
	export let active = false;
</script>

<button
	{...$$restProps}
	class="button"
	class:button--primary={variant === 'primary'}
	class:button--secondary={variant === 'secondary'}
	class:button--info={variant === 'info'}
	class:active
>
	<slot />
</button>

<style>
	.button {
		padding: var(--padding, 0.25rem);
		border-start-start-radius: var(--radius-ss, 0.5rem);
		border-start-end-radius: var(--radius-se, 0.5rem);
		border-end-start-radius: var(--radius-es, 0.5rem);
		border-end-end-radius: var(--radius-ee, 0.5rem);
		background-color: var(--inactive, var(--clr-bg-500));
		transition: background-color var(--ts-300);
	}

	.button.active,
	.button:hover,
	.button:focus-visible {
		background-color: var(--active, --clr-bg-600);
	}

	.button--primary {
		--inactive: var(--clr-primary-400);
		/* background-color: var(--clr-primary-400); */
	}

	.button--primary.active,
	.button--primary:hover,
	.button--primary:focus-visible {
		--active: var(--clr-primary-500);
		/* background-color: var(--active, --clr-primary-500); */
	}

	.button--secondary {
		--inactive: var(--clr-secondary-400);
		/* background-color: var(--inactive, --clr-secondary-400); */
	}

	.button--secondary.active,
	.button--secondary:hover,
	.button--secondary:focus-visible {
		--active: var(--clr-secondary-500);
		/* background-color: var(--active, --clr-secondary-500); */
	}
</style>
