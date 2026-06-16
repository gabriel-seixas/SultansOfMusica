<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';

	let { children } = $props();
</script>

<Header />
<!-- <Breadcrumb /> -->

<main>
	{@render children()}
</main>

<Footer />

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
