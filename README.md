# Hospedagem de Imagens - MVP

Plataforma rápida, simples e minimalista para hospedagem de imagens inspirada no funcionamento do Postimages. Desenvolvido com Next.js, com foco em uploads grandes via streaming sem esgotar a memória do servidor.

## Principais Funcionalidades

- Upload rápido sem cadastro ou login.
- Suporte para imagens em formato JPG, PNG, GIF e WebP.
- **Upload de arquivos de até 120 MB**.
- Interface amigável com suporte a Drag & Drop.
- Sem uso de banco de dados (armazenamento direto no filesystem).
- Geração de links curtos, diretos e permanentes.

---

## 💻 Como Rodar e Desenvolver Localmente

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Configure o `.env`:**
   Copie o arquivo `.env.example` para `.env` e ajuste se necessário.
   ```bash
   cp .env.example .env
   ```
   No modo local, certifique-se de que `UPLOAD_DIR` esteja apontando para `./public/uploads` para que o Next.js possa servir as imagens estáticas localmente, ou configure outra pasta.

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. Acesse [http://localhost:3000](http://localhost:3000).

---

## 🚀 Deploy no Servidor (Linux VPS)

Recomenda-se utilizar uma VPS com Ubuntu/Debian, PM2 para gerenciar a aplicação Node.js, e Nginx como reverse proxy.

### 1. Preparação da VPS

Instale Node.js (v18+) e Nginx:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs nginx
npm install -g pm2
```

### 2. Configurar a pasta de Uploads

Por questões de segurança e performance, os uploads devem ficar FORA da raiz da aplicação para não interferirem no build do Next.js e para o Nginx poder servir rapidamente.

```bash
sudo mkdir -p /var/www/image-host/uploads
# Dê permissão ao usuário que rodará a aplicação (ex: ubuntu)
sudo chown -R ubuntu:ubuntu /var/www/image-host
```

### 3. Deploy da Aplicação

Clone a aplicação na sua VPS (ex: `/home/ubuntu/image-hosting`), instale e faça o build:

```bash
cd /home/ubuntu/image-hosting
npm install
npm run build
```

Configure seu `.env` de produção:
```env
NEXT_PUBLIC_SITE_URL=https://seusite.com
UPLOAD_DIR=/var/www/image-host/uploads
MAX_FILE_SIZE_MB=120
```

Inicie com PM2:
```bash
pm2 start npm --name "image-host" -- start
pm2 save
pm2 startup
```

---

## 🛡️ Configuração Avançada do Nginx e HTTPS

A performance real do MVP reside em fazer o Nginx servir os arquivos de `/var/www/image-host/uploads` **diretamente**, sem passar pelo Node.js.

Crie/edite o bloco do site no Nginx: `sudo nano /etc/nginx/sites-available/image-host`

```nginx
server {
    server_name seusite.com;

    # Otimizações de Upload 
    client_max_body_size 130M; # Limite absoluto de upload do Nginx

    # Rota para as imagens hospedadas (Extremamente Rápida e Segura)
    location /uploads/ {
        alias /var/www/image-host/uploads/;
        
        # Prevenção de execução de scripts acidentais
        location ~ \.(php|sh|pl|py|cgi)$ {
            deny all;
        }

        # Cache Aggressive para imagens estáticas
        expires max;
        add_header Cache-Control "public, no-transform";
        access_log off;
    }

    # Proxy reverso para o Frontend/API no Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Ative o site e reinicie o Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/image-host /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### HTTPS com Let's Encrypt

Para habilitar SSL gratuito e seguro:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d seusite.com
```

### 🔒 Diretrizes de Segurança do MVP

1. **Path Traversal / Segurança:** O `crypto.randomBytes(4).toString('hex')` do backend evita colisões e o nome fixo gerado pelo backend remove totalmente vetores de `path traversal`.
2. **Execução de Código:** Ao forçar extensões conhecidas na API (`.jpg`, `.png`, etc) e negar arquivos dinâmicos no Nginx, o servidor fica blindado contra *web shells*.
3. **Memória (DDoS via Arquivos Grandes):** O backend consome o arquivo via **Streaming (Busboy)**, o que significa que o arquivo de 120MB não é armazenado na RAM (apenas em buffer de pequenos KB), garantindo que a VPS suporte usos paralelos facilmente.
