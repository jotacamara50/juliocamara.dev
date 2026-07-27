# juliocamara.dev

Portfólio pessoal estático de Júlio Câmara.

## Visualizar localmente

Abra `index.html` no navegador ou execute:

```bash
python3 -m http.server 8080
```

Acesse `http://localhost:8080`.

## Publicar no servidor

Os registros DNS `A` de `juliocamara.dev` e `www.juliocamara.dev` devem apontar
para o servidor. O Compose reutiliza o proxy existente na rede `edge-proxy`.

```bash
cp .env.example .env
nano .env
docker compose up -d --build
docker compose ps
docker logs -f edge-acme-companion
```
