<!-- src/routes/registrar-produto/+page.svelte -->
<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import { searchArtist } from '$lib/audiodb/client';
  import { enhance } from '$app/forms';

  // ── Campos principais ──
  let title = '';
  let artistName = '';
  let artistApiId = '';
  let price = 0;
  let productCode = '';       // api-id (será enviado como hidden)
  let description = '';
  let releaseDate = '';
  let asin = '';
  let stock = 1;

  // ── URLs das imagens ──
  let mainImageUrl = '';

  // ── Estados ──
  let loading = false;
  let error = '';
  let success = false;

  // ── Buscar artista na TheAudioDB ──
  async function lookupArtist() {
    if (!artistName.trim()) return;
    try {
      const artists = await searchArtist({ query: artistName });
      if (artists.length > 0) {
        const a = artists[0];
        artistApiId = a.idArtist;
        artistName = a.strArtist;
      } else {
        error = 'Artista não encontrado.';
      }
    } catch (e) {
      error = 'Erro ao buscar artista.';
    }
  }

  // ── Lógica do enhance ──
  function handleEnhance() {
    loading = true;
    error = '';
    success = false;
    return async ({ result }) => {
      loading = false;
      if (result.type === 'success') {
        success = true;
        // Opcional: redirecionar ou resetar formulário
        // resetForm();
      } else if (result.type === 'failure') {
        error = result.data?.error || 'Erro desconhecido.';
      }
    };
  }

  // (Opcional) função de reset, se quiser limpar após sucesso
  // function resetForm() { ... }
</script>

<Header />

<div class="page">
  <section class="product-page">
    <!-- GALERIA (campos visuais, não enviados diretamente) -->
    <div class="gallery">
      <!-- Imagem principal -->
      <div class="main-image">
        {#if mainImageUrl}
          <img src={mainImageUrl} alt="Capa principal" />
        {:else}
          <div class="upload-placeholder">
            <i class="ph ph-image-square"></i>
            <i class="ph ph-link"></i>
          </div>
        {/if}
        <input
          type="url"
          class="url-input"
          placeholder="Cole o link da imagem principal"
          bind:value={mainImageUrl}
        />
      </div>

      <!-- Detalhes do Produto (visuais) -->
      <div class="product-extra">
        <!-- <h2>Detalhes do Produto</h2>
        <textarea
          placeholder="Adicionar descrição do produto."
          bind:value={description}
        ></textarea> -->
        <div class="info-grid">
          <div class="field">
            <label>Data de Lançamento</label>
            <input
              type="text"
              placeholder="4 de Fevereiro de 1977"
              bind:value={releaseDate}
            />
          </div>
          <div class="field">
            <label>API-ID</label>
            <input type="text" placeholder="B0D5JTCRH2" bind:value={asin} />
          </div>
          <div class="field">
            <label>Estoque</label>
            <input type="number" placeholder="10" bind:value={stock} />
          </div>
        </div>
      </div>
    </div>

    <!-- FORMULÁRIO PRINCIPAL (enviado ao servidor) -->
    <form method="POST" use:enhance={handleEnhance} class="details">
      <!-- Campos visíveis do formulário -->
      <div class="form-group">
        <label for="title">Nome</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Nome do álbum"
          bind:value={title}
          required
        />
      </div>

      <div class="form-group">
        <label for="artistName">Artista/Banda</label>
        <div class="artist-search">
          <input
            id="artistName"
            name="artistName"
            type="text"
            placeholder="Artista/Banda"
            bind:value={artistName}
            required
          />
          <button
            type="button"
            on:click={lookupArtist}
            title="Buscar artista na TheAudioDB"
          >
            <i class="ph ph-magnifying-glass"></i>
          </button>
        </div>
        {#if artistApiId}
          <small>ID Artista: {artistApiId}</small>
        {/if}
      </div>

      <div class="price-box">
        <label for="price">Preço</label>
        <input
          id="price"
          name="price"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          bind:value={price}
          required
        />
      </div>

      <!-- Campos ocultos para dados que estão na galeria -->
      <input type="hidden" name="productCode" value={productCode} />
      <input type="hidden" name="description" value={description} />
      <input type="hidden" name="releaseDate" value={releaseDate} />
      <input type="hidden" name="asin" value={asin} />
      <input type="hidden" name="stock" value={stock} />
      <input type="hidden" name="mainImageUrl" value={mainImageUrl} />
      {#if artistApiId}
        <input type="hidden" name="artistApiId" value={artistApiId} />
      {/if}

      <!-- Mensagens de feedback -->
      {#if error}
        <div class="alert error">{error}</div>
      {/if}
      {#if success}
        <div class="alert success">Produto registrado com sucesso!</div>
      {/if}

      <button type="submit" class="buy-btn" disabled={loading}>
        {loading ? 'Enviando...' : 'Registrar Novo Produto'}
      </button>

      <!-- Accordion decorativo (mantido fora do fluxo de envio) -->
      <div class="accordion">
        <!-- Itens comentados -->
      </div>
    </form>
  </section>

  <footer class="footer">
    © 2026 Sultans of Music LTDA. Todos os direitos reservados.
  </footer>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Princess+Sofia&display=swap');
  @import url('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css');
  @import url('https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css');

  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:'Poppins', sans-serif; background:#f5f5f5; }

  .product-page { display:flex; gap:80px; padding:20px 60px 80px; }
  .gallery { flex:1; }

  .main-image { width:100%; max-width:650px; margin-bottom:30px; position:relative; }
  .main-image img { width:100%; max-height:520px; object-fit:contain; border-radius:12px; }
  .upload-placeholder {
    width:100%; height:400px; background:#ececec; border-radius:12px;
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    position:relative;
  }
  .upload-placeholder i:first-child { font-size:160px; color:#999; }
  .upload-placeholder i:last-child { font-size:40px; color:#999; margin-top:10px; }
  .url-input {
    width:100%; padding:12px; margin-top:10px; border:1px solid #ddd; border-radius:6px;
  }

  .details { width:520px; }
  .form-group { margin-bottom:20px; }
  .form-group label, .price-box label { display:block; margin-bottom:8px; font-weight:600; }
  .form-group input, .form-group textarea, .field input {
    width:100%; border:1px solid #d9d9d9; border-radius:4px; padding:12px;
    font-family:'Poppins', sans-serif; background:white;
  }
  .form-group textarea { min-height:120px; resize:none; }

  .artist-search { display:flex; gap:8px; align-items:center; }
  .artist-search button {
    background:#ffcc00; border:none; border-radius:4px; padding:10px 12px; cursor:pointer;
  }

  .price-box { margin-bottom:25px; }
  .price-box input {
    width:100%; height:55px; border:1px solid #ddd; border-radius:6px;
    padding:0 15px; font-size:28px; font-weight:700; color:#ffb700;
  }

  .buy-btn {
    width:100%; height:55px; border:none; border-radius:6px;
    background:#f4d600; color:black; font-weight:700; cursor:pointer;
  }
  .buy-btn:disabled { opacity:0.6; cursor:not-allowed; }

  .alert { padding:12px; border-radius:6px; margin-bottom:20px; }
  .error { background:#ffe0e0; color:#b30000; }
  .success { background:#e0ffe0; color:#006600; }

  .accordion { border-top:1px solid #ddd; margin-top:40px; }
  .accordion-item { height:70px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #ddd; cursor:pointer; }
  .accordion-item span { font-weight:500; }
  .accordion-item b { color:#ffcc00; font-size:24px; }

  .product-extra { margin-top:40px; }
  .product-extra h2 { font-size:42px; margin-bottom:20px; }
  .product-extra textarea { width:100%; height:120px; border:1px solid #ddd; border-radius:4px; padding:12px; margin-bottom:30px; resize:none; }
  .info-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:25px; }
  .field { display:flex; flex-direction:column; gap:8px; }
  .field label { font-size:14px; font-weight:600; }
  .field input { height:45px; }

  .footer { padding:25px; background:black; color:#ffcc00; text-align:center; font-size:13px; }

  @media(max-width:1100px) { .product-page { flex-direction:column; } .details { width:100%; } }
  @media(max-width:700px) {
    .product-page { padding:30px; }
    .info-grid { grid-template-columns:1fr; }
  }
</style>