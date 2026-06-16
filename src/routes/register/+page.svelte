<script lang="ts">
    import type { ActionData } from './$types';
	let { form }: { form: ActionData } = $props();
	import { goto } from '$app/navigation';

	let email = '';
	// let username = '';
	// let phone = '';
	let password = '';

	let loading = false;
	let errorMessage = '';

	async function register() {
		errorMessage = '';
		loading = true;

		try {
			const response = await fetch('http://localhost:8080/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email,
					// username,
					// phone,
					password
				})
			});

			if (!response.ok) {
				const data = await response.json();
				throw new Error(data.message || 'Erro ao cadastrar usuário');
			}

			await goto('/login');
		} catch (error) {
			errorMessage =
				error instanceof Error
					? error.message
					: 'Ocorreu um erro inesperado';
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Cadastro | Sultans of Music</title>
</svelte:head>

<div class="container">

	<div class="left-panel">
		<div class="hero-content">
			<h1 class="logo">
				Sultans of <span>Music</span>
			</h1>

			<div class="inventory-info">
				<h2>Acessar Inventário</h2>
				<p>Gerenciamento de Estoque</p>
			</div>
		</div>

		<div class="users-section">
			<h3>Entrar como</h3>

			<div class="users">
				<div class="user-card">
					<button class="close-btn">×</button>

					<img
						src="https://preview.redd.it/can-someone-help-me-recognize-where-and-when-was-this-v0-xme3cb1jleyg1.jpeg?width=640&crop=smart&auto=webp&s=014378936a237f66e5e6e9a16330eed63f521c26"
						alt="Michael Jackson"
					/>

					<h4>Michael Jackson</h4>
					<span>Ativo há 17 anos atrás</span>
				</div>

				<div class="user-card">
					<button class="close-btn">×</button>

					<img
						src="https://assets.vogue.com/photos/5e7f8b953d2fb10008ff3610/master/w_1600,c_limit/music_vogue-2%20(1).jpg"
						alt="Madonna"
					/>

					<h4>Madonna</h4>
					<span>Ativo agora</span>
				</div>
			</div>
		</div>
	</div>

	<div class="right-panel">
		<div class="register-box">
			<div class="header">
				<div class="mini-logo">
					Bem-vindo à
					<span>Sultans of</span>
					<span class="gold">Music</span>
				</div>

				<div class="login">
					Já tem conta?<br />
					<a href="/login">Entre!</a>
				</div>
			</div>

			<h2>Cadastrar</h2>

			<form method="post">
				<label>Digite o seu endereço de e-mail</label>

				<input
					type="email"
					name="email"
					placeholder="Endereço de email"
					required
				/>

				<div class="row">
					<!-- <div class="input-group">
						<label>Nome de usuário</label>

						<input
							bind:value={username}
							type="text"
							placeholder="Usuário"
							required
						/>
					</div> -->

					<!-- <div class="input-group">
						<label>Telefone de contato</label>

						<input
							bind:value={phone}
							type="text"
							placeholder="Telefone"
						/>
					</div> -->
				</div>

				<label>Digite a sua senha</label>

				<input
					bind:value={password}
					type="password"
					name="password"
					placeholder="Senha"
					required
				/>

				{#if errorMessage}
					<p class="error">
						{errorMessage}
					</p>
				{/if}

				<button
					type="submit"
					class="submit-btn"
					disabled={loading}
				>
					{#if loading}
						Cadastrando...
					{:else}
						Cadastrar
					{/if}
				</button>
			</form>
		</div>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Princess+Sofia&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

	:global(body) {
		margin: 0;
		background: #000;
		font-family: 'Poppins', sans-serif;
	}

	* {
		box-sizing: border-box;
	}

	.container {
		width: 100%;
		min-height: 100vh;
		display: flex;
		background:
			linear-gradient(
				to bottom,
				transparent 0%,
				transparent 55%,
				black 55%,
				black 100%
			),
			url('/images/register-bg.webp');

		background-size: cover;
		background-position: center;
	}

	.left-panel {
		width: 55%;
		padding: 50px 40px;
		color: white;

		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.logo {
		font-size: 6rem;
		font-family: 'Princess Sofia', cursive;
		text-shadow: 5px 5px 5px black;
	}

	.logo span {
		color: #ffbf00;
		font-family: 'Princess Sofia', cursive;
	}

	.inventory-info h2 {
		color: #ffbf00;
		font-size: 48px;
	}

	.inventory-info p {
		font-size: 28px;
		font-weight: 300;
	}

	.users {
		display: flex;
		gap: 25px;
		flex-wrap: wrap;
	}

	.user-card {
		width: 170px;
		background: white;
		color: black;
		border-radius: 14px;
		padding: 18px;
		position: relative;
	}

	.close-btn {
		position: absolute;
		top: 10px;
		right: 10px;
		width: 18px;
		height: 18px;
		border: none;
		border-radius: 50%;
		background: #ffbf00;
		cursor: pointer;
	}

	.user-card img {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		object-fit: cover;
		display: block;
		margin: auto;
	}

	.user-card:hover {
		transform: translateY(-5px);
	}

	.right-panel {
		width: 45%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 30px;
	}

	.register-box {
		width: 100%;
		max-width: 520px;
		background: #f5f5f5;
		padding: 50px;
		border-radius: 35px;
	}

	.header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 30px;
	}

	.mini-logo span {
		font-family: 'Princess Sofia', cursive;
		font-size: 26px;
	}

	.gold {
		color: #ffbf00;
	}

	.login a {
		text-decoration: none;
		color: #777;
	}

	form {
		display: flex;
		flex-direction: column;
	}

	label {
		margin-bottom: 10px;
		margin-top: 15px;
	}

	input {
		height: 55px;
		padding: 0 18px;
		border-radius: 10px;
		border: 1px solid #ccc;
	}

	.row {
		display: flex;
		gap: 15px;
	}

	.input-group {
		flex: 1;
	}

	.submit-btn {
		margin-top: 25px;
		height: 58px;
		border: none;
		border-radius: 12px;
		background: #ffbf00;
		font-size: 18px;
		font-weight: 600;
		cursor: pointer;
	}

	.error {
		margin-top: 15px;
		color: #d62828;
		font-size: 14px;
	}

	@media (max-width: 1100px) {
		.container {
			flex-direction: column;
		}

		.left-panel,
		.right-panel {
			width: 100%;
		}
	}

	@media (max-width: 600px) {
		.row {
			flex-direction: column;
		}

		.logo {
			font-size: 3rem;
		}
	}
</style>