<script lang="ts">
	import type { ActionData } from './$types';
	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Princess+Sofia&display=swap"
		rel="stylesheet"
	/>
	<title>Sultans of Music — Entrar</title>
</svelte:head>

<div class="login-page">
	<!-- LEFT SIDE -->
	<div class="left">
		<div>
			<div class="logo">
				Sultans of <span>Music</span>
			</div>

			<div class="title-area" style="margin-top:120px;">
				<h1>Acessar Inventário</h1>
				<p>Gerenciamento de Estoque</p>
			</div>
		</div>

		<div class="users">
			<h3>Entrar como</h3>
			<div class="user-cards">
				<div class="card">
					<button class="close-btn">×</button>
					<img
						src="https://preview.redd.it/can-someone-help-me-recognize-where-and-when-was-this-v0-xme3cb1jleyg1.jpeg?width=640&crop=smart&auto=webp&s=014378936a237f66e5e6e9a16330eed63f521c26"
						alt="Michael"
					/>
					<h4>Michael Jackson</h4>
					<p>Ativo há 17 anos atrás</p>
				</div>

				<div class="card">
					<button class="close-btn">×</button>
					<img
						src="https://assets.vogue.com/photos/5e7f8b953d2fb10008ff3610/master/w_1600,c_limit/music_vogue-2%20(1).jpg"
						alt="Madonna"
					/>
					<h4>Madonna</h4>
					<p>Ativo agora</p>
				</div>
			</div>
		</div>
	</div>

	<!-- RIGHT SIDE -->
	<div class="right">
		<div class="login-box">
			<div class="top-text">
				<div class="mini-logo">
					Bem-vindo à <span>Sultans of</span> <span class="gold">Music</span>
				</div>
				<div class="register">
					Sem conta?<br />
					<a href="/register">Cadastre-se</a>
				</div>
			</div>

			<h2>Entrar</h2>

			<form method="post">
				<div class="login-input-group">
					<label for="email">Digite o seu nome de usuário ou endereço de e-mail</label>
					<input
						type="text"
						id="email"
						name="email"
						placeholder="Usuário ou endereço de email"
						autocomplete="username"
					/>
				</div>

				<div class="login-input-group">
					<label for="password">Digite a sua senha</label>
					<input
						type="password"
						id="password"
						name="password"
						placeholder="Senha"
						autocomplete="current-password"
					/>
				</div>

				<div class="forgot">
					<a href="/forgot-password">Esqueci a senha</a>
				</div>

				{#if form?.error}
					<p class="error-msg">{form.error}</p>
				{/if}

				<button type="submit" class="login-btn">Acessar</button>
			</form>
		</div>
	</div>
</div>

<style>
	:global(html),
	:global(body) {
  margin: 0;
  padding: 0;
}

.login-page {
  width: 100%;
  min-height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
}
	:global(#svelte) {
		height: 100%;
	}
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: 'Poppins'
	}

	.login-page {
		width: 100%;
		height: 100vh;
		display: flex;
		position: relative;
		overflow: hidden;
		background: linear-gradient(to bottom, transparent 0%, transparent 55%, black 55%, black 100%);
	}

	.login-page::before {
		content: '';
		position: absolute;
		inset: 0;
		background: url('https://static.wikia.nocookie.net/daisy-jones-and-the-six/images/6/6a/Ep108_promo_Daisy_crowd_surfing.jpg/revision/latest/scale-to-width-down/1000?cb=20230318011830');
		background-size: cover;
		background-position: center;
		filter: grayscale(100%) blur(3px);
		z-index: -1;
	}

	/* LEFT */
	.left {
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
		font-weight: 400;
		color: white;
		text-shadow: 5px 5px 5px black;
	}

	.logo span {
		color: #ffbf00;
		font-family: 'Princess Sofia', cursive;
	}

	.title-area h1 {
		font-family: 'Poppins', semibold;
		color: #ffbf00;
		font-size: 48px;
		margin-bottom: 5px;
		text-shadow: 10px 5px 5px black;
	}

	.title-area p {
		font-size: 28px;
		color: #f0f0f0;
		font-weight: 300;
		text-shadow: 10px 5px 5px black;
	}

	.users h3 {
		margin-bottom: 20px;
		font-size: 24px;
	}

	.user-cards {
		display: flex;
		gap: 25px;
		flex-wrap: wrap;
	}

	.card {
		width: 170px;
		background: white;
		border-radius: 14px;
		padding: 18px;
		color: black;
		transition: 0.3s;
		cursor: pointer;
		position: relative;
	}

	.card:hover {
		transform: translateY(-5px);
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

	.card img {
		display: block;
		margin: 0 auto 15px;
		width: 80px;
		height: 80px;
		border-radius: 50%;
		object-fit: cover;
		filter: grayscale(100%);
	}

	.card h4 {
		text-align: center;
		font-size: 15px;
		margin-bottom: 5px;
	}

	.card p {
		text-align: center;
		color: #999;
		font-size: 12px;
	}

	/* RIGHT */
	.right {
		width: 45%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 30px;
	}

	.login-box {
		width: 100%;
		max-width: 520px;
		background: #f5f5f5;
		border-radius: 35px;
		padding: 50px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
	}

	.top-text {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30px;
	}

	.mini-logo {
		font-size: 20px;
		font-family: 'Poppins', cursive;
	}

	.mini-logo span {
		color: #000;
		font-size: 26px;
		font-family: 'Princess Sofia', cursive;
	}

	.mini-logo .gold {
		color: #ffbf00;
		font-size: 26px;
		font-family: 'Princess Sofia', cursive;
	}

	.register {
		margin-left: 16px;
		font-size: 14px;
		color: #999;
	}

	.register a {
		text-decoration: none;
		color: #999;
		font-weight: 500;
	}

	.login-box h2 {
		font-family: 'Poppins', medium;
		font-size: 58px;
		margin-bottom: 30px;
	}

	.login-input-group {
		margin-bottom: 25px;
	}

	.login-input-group label {
		display: block;
		margin-bottom: 10px;
		font-size: 15px;
		color: #222;
	}

	.login-input-group input {
		width: 100%;
		height: 55px;
		border: 1px solid #ccc;
		border-radius: 10px;
		padding: 0 18px;
		font-size: 15px;
		outline: none;
		transition: 0.3s;
		background: #fff;
	}

	.login-input-group input:focus {
		border-color: #7aa7ff;
		box-shadow: 0 0 0 3px rgba(122, 167, 255, 0.2);
	}

	.forgot {
		text-align: right;
		margin-top: -10px;
		margin-bottom: 25px;
	}

	.forgot a {
		color: #ffbf00;
		text-decoration: none;
		font-size: 14px;
	}

	.error-msg {
		color: #b33;
		text-align: center;
		font-size: 14px;
		margin-bottom: 15px;
	}

	.login-btn {
		width: 100%;
		height: 58px;
		border: none;
		border-radius: 12px;
		background: black;
		color: #ffbf00;
		font-size: 18px;
		font-weight: 600;
		cursor: pointer;
		transition: 0.3s;
	}

	.login-btn:hover {
		opacity: 0.9;
		transform: scale(1.01);
	}

	/* RESPONSIVE */
	@media (max-width: 1100px) {
		.login-page {
			flex-direction: column;
			overflow: auto;
		}

		.left,
		.right {
			width: 100%;
		}

		.logo {
			font-size: 52px;
		}

		.title-area h1 {
			font-family: 'Poppins', semibold;
			font-size: 38px;
		}

		.title-area p {
			font-size: 22px;
		}

		.login-box {
			padding: 35px;
		}

		.login-box h2 {
			font-size: 42px;
		}
	}

	@media (max-width: 600px) {
		.left {
			padding: 30px 20px;
		}

		.logo {
			font-size: 42px;
		}

		.title-area h1 {
			font-family: 'Poppins', semibold;
			font-size: 30px;
		}

		.title-area p {
			font-size: 18px;
		}

		.user-cards {
			justify-content: center;
		}

		.login-box {
			border-radius: 25px;
			padding: 25px;
		}

		.login-box h2 {
			font-size: 55px;
		}

		.top-text {
			flex-direction: column;
			gap: 16px;
			align-items: flex-start;
		}
	}
</style>
