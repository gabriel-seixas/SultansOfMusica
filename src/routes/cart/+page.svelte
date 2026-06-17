<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import { cart, subtotal } from '$lib/stores/cart';
  import { enhance } from '$app/forms';
  import type { SubmitFunction } from '@sveltejs/kit';
  import type { SaleRequestInfo } from '$lib/somapi/types';

  let error = '';
  let success = '';
  let saleId: number | undefined = undefined;

  function removeItem(productId: number) {
    cart.update(items => items.filter(item => item.product.id !== productId));
  }

  function updateQuantity(productId: number, newQty: number) {
    cart.update(items =>
      items.map(item =>
        item.product.id === productId
          ? { ...item, quantity: Math.min(Math.max(1, newQty), item.product.stock) }
          : item
      )
    );
  }

  let saleItems = $derived(
    $cart.map(item => ({
      'product-id': item.product.id,
      'sale-amount': item.quantity
    }))
  );

  const handleEnhance: SubmitFunction = ({ cancel }) => {
    error = '';
    success = '';
    if ($cart.length === 0) {
      cancel();
      return;
    }
    return async ({ result, update }) => {
      if (result.type === 'success') {
        success = 'Pedido finalizado com sucesso!';
        saleId = result.data?.saleId;
        cart.set([]);
        await update(); // limpa o formulário
      } else if (result.type === 'failure') {
        error = result.data?.error || 'Erro ao finalizar pedido.';
      }
    };
  };
</script>

<Header />

<div class="page">
  <main class="cart-container">
    <h1>Carrinho</h1>

    {#if $cart.length === 0}
      <p class="empty-cart">Seu carrinho está vazio.</p>
      <a href="/catalog" class="continue">Adicionar Produtos →</a>
    {:else}
      <!-- Lista de itens -->
      {#each $cart as item}
        <div class="cart-item">
          <div class="item-left">
            <img src={item.product.cover || '/placeholder.jpg'} alt={item.product.title} />
            <div class="item-info">
              <h3>{item.product.title}</h3>
              <p>{item.product.artist}</p>
              <span>{item.product.type}</span>
              <small class="stock">
                {item.product.stock > 0 ? '✔ Em estoque' : '✘ Fora de estoque'}
              </small>
            </div>
          </div>

          <div class="item-actions">
            <select
              value={item.quantity}
              on:change={(e) => updateQuantity(item.product.id, parseInt(e.target.value))}
              disabled={item.product.stock === 0}
            >
              {#each Array.from({ length: Math.min(item.product.stock, 10) || 1 }, (_, i) => i + 1) as qty}
                <option value={qty}>{qty}</option>
              {/each}
            </select>
            <button type="button" class="remove-btn" on:click={() => removeItem(item.product.id)}>
              Remover
            </button>
          </div>

          <div class="item-price">
            R$ {((item.product.price / 100) * item.quantity).toFixed(2).replace('.', ',')}
          </div>
        </div>
      {/each}

      <!-- Resumo -->
      <section class="summary">
        <div class="summary-row">
          <span>Subtotal</span>
          <strong>R$ {$subtotal.toFixed(2).replace('.', ',')}</strong>
        </div>
        <div class="summary-row total">
          <span>Total</span>
          <strong>R$ {$subtotal.toFixed(2).replace('.', ',')}</strong>
        </div>
      </section>

      <!-- Formulário para finalizar -->
      <form method="POST" action="?/checkout" use:enhance={handleEnhance}>
        <input type="hidden" name="items" value={JSON.stringify(saleItems)} />

        {#if error}
          <div class="alert error">{error}</div>
        {/if}
        {#if success}
          <div class="alert success">{success} {saleId ? `(Venda #${saleId})` : ''}</div>
        {/if}

        <button type="submit" class="checkout-btn" disabled={$cart.length === 0}>
          Finalizar Pedido
        </button>
      </form>

      <a href="/catalogo" class="continue">ou Adicionar Mais Produtos →</a>
    {/if}
  </main>

  <footer class="footer">
    © 2026 Sultans of Music LTDA. Todos os direitos reservados.
  </footer>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Princess+Sofia&display=swap');
  @import url('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css');
  @import url('https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css');

.page {
  font-family: 'Poppins', sans-serif;
  background: #f5f5f5;
  min-height: 100vh;
}

  .page :global(*) {
  box-sizing: border-box;
  }

  .cart-container {
    max-width:1200px; margin:auto; padding:60px 40px 80px;
  }
  .cart-container h1 {
    font-size:56px; margin-bottom:50px;
  }
  .empty-cart {
    font-size:20px; color:#666; margin-bottom:30px;
  }

  .cart-item {
    width:100%;
    display:grid;
    grid-template-columns:1fr 180px 140px;
    align-items:center;
    padding:35px 0;
    border-top:1px solid #ddd;
  }
  .item-left {
    display:flex; gap:25px; align-items:center;
  }
  .item-left img {
    width:110px; height:110px; object-fit:cover; border-radius:6px;
  }
  .item-info h3 {
    margin-bottom:6px; font-size:20px;
  }
  .item-info p {
    color:#666; margin-bottom:6px;
  }
  .item-info span {
    display:block; color:#999; margin-bottom:12px;
  }
  .stock {
    color:#4c9b53; font-size:14px;
  }
  .shipping {
    color:#888; font-size:14px;
  }

  .item-actions {
    display:flex; flex-direction:column; gap:15px;
  }
  .item-actions select {
    width:70px; height:38px; border:1px solid #ddd; border-radius:6px; padding:0 10px;
  }
  .remove-btn {
    color:#f4d600; text-decoration:none; font-size:14px; font-weight:600;
    background:none; border:none; cursor:pointer; padding:0; text-align:left;
  }
  .item-price {
    font-size:20px; font-weight:700;
  }

  .summary {
    margin-top:40px; background:#f0f0f0; border-radius:8px; padding:35px;
  }
  .summary-row {
    display:flex; justify-content:space-between; padding:20px 0; border-bottom:1px solid #ddd;
  }
  .summary-row:last-child { border-bottom:none; }
  .summary-row span { color:#666; }
  .total span, .total strong { font-size:22px; color:black; }

  .checkout-btn {
    width:100%; height:65px; border:none; border-radius:6px;
    background:#f4d600; color:black; font-size:18px; font-weight:700;
    cursor:pointer; margin-top:50px;
  }
  .checkout-btn:disabled { opacity:0.6; cursor:not-allowed; }

  .continue {
    display:block; text-align:center; margin-top:25px;
    color:#444; text-decoration:none; font-weight:500;
  }

  .alert { padding:12px; border-radius:6px; margin:15px 0; }
  .error { background:#ffe0e0; color:#b30000; }
  .success { background:#e0ffe0; color:#006600; }

  .footer {
    width:100%; padding:25px; background:black; color:#ffcc00;
    text-align:center; font-size:13px;
  }

  @media(max-width:900px) {
    .cart-item {
      grid-template-columns:1fr; gap:25px;
    }
    .item-actions {
      flex-direction:row; align-items:center;
    }
  }
  @media(max-width:700px) {
    .cart-container { padding:30px; }
    .cart-container h1 { font-size:42px; }
    .item-left { flex-direction:column; align-items:flex-start; }
    .summary { padding:20px; }
  }
</style>