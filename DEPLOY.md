# Deployment Guide — VPS (subdomain, isolated from other sites)

This project runs as its own PM2 process on its own port, behind its own
Nginx server block. Nothing here touches your existing sites' Nginx
config, PM2 processes, or ports — every step below only creates new,
uniquely-named files/processes.

Replace `SUBDOMAIN` (e.g. `test.guloguzinsaatyikimhafriyat.com`) and
`PORT` (pick a port not already in use — see step 0) with your real
values throughout.

## 0. Check prerequisites and pick a free port

```bash
node -v          # need >= 20.9 (Next.js 16 requirement)
nginx -v
pm2 -v || npm install -g pm2   # only installs if missing; safe to run either way

# see what ports are already taken by other Node apps so you don't collide
sudo ss -tlnp | grep node
```

Pick an unused port for this app, e.g. `3010`.

## 1. Clone the project into its own directory

Use a directory that doesn't overlap with any existing site:

```bash
sudo mkdir -p /var/www/guloguzinsaat
sudo chown $USER:$USER /var/www/guloguzinsaat
git clone <this-repo-url> /var/www/guloguzinsaat
cd /var/www/guloguzinsaat
git checkout claude/wordpress-site-migration-oy8euc   # or main once merged
```

## 2. Configure environment variables

```bash
cp .env.example .env
nano .env
```

Set real values:

```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=<strong unique password>
SESSION_SECRET=<output of: openssl rand -base64 32>
```

The `data/` directory (admin account, Instagram feed cache) is created
automatically on first run and lives only on this server — back it up
if you care about not having to re-enter the Instagram Feed ID later.

## 3. Install, build

```bash
npm ci
npm run build
```

## 4. Start with PM2 under a unique name, on your chosen port

```bash
PORT=3010 pm2 start npm --name "guloguzinsaat" -- start
pm2 save
```

`--name "guloguzinsaat"` keeps this process completely separate from
your other PM2-managed apps. `pm2 save` snapshots *all* currently
running PM2 processes (including your existing ones) into the restart
list — that's expected and fine, it does not change or restart them.

If PM2 isn't already set to auto-start on reboot on this server, run
the command `pm2 startup` prints and follow its instructions (skip
this if your other sites already have it configured — running it
twice is harmless but unnecessary).

## 5. Add a new Nginx server block (new file — existing sites untouched)

Create `/etc/nginx/sites-available/guloguzinsaat.conf`:

```nginx
server {
    listen 80;
    server_name SUBDOMAIN;

    location / {
        proxy_pass http://127.0.0.1:3010;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable it and reload (not restart — `reload` doesn't drop existing
connections to your other sites):

```bash
sudo ln -s /etc/nginx/sites-available/guloguzinsaat.conf /etc/nginx/sites-enabled/
sudo nginx -t   # must say "syntax is ok" / "test is successful" before continuing
sudo systemctl reload nginx
```

## 6. DNS

In your DNS provider, add an **A record** for `SUBDOMAIN` pointing at
this VPS's IP address (skip if you already have a wildcard `*` A
record covering it).

## 7. SSL certificate

```bash
sudo certbot --nginx -d SUBDOMAIN
```

Certbot only edits the server block for the domain you pass with `-d`
— your other sites' certificates and configs are untouched.

## 8. Verify

Visit `https://SUBDOMAIN` — you should see the homepage. Check:

```bash
pm2 status guloguzinsaat
pm2 logs guloguzinsaat --lines 50
```

## Redeploying after future changes

```bash
cd /var/www/guloguzinsaat
git pull
npm ci
npm run build
pm2 reload guloguzinsaat   # zero-downtime reload of *only* this app
```

Never use `pm2 restart all` or `sudo systemctl restart nginx` for
routine updates — `pm2 reload <name>` and `nginx reload` are the
commands that only affect this one app.

## Moving to the main domain later

Once you're happy on the subdomain: add a second `server_name` (the
main domain) to `guloguzinsaat.conf` — or create the final config with
the real domain — reload Nginx, run `certbot --nginx -d yourdomain.com`
for the new hostname, and update DNS. The old WordPress site's DNS
record for the main domain would need to change to point at this VPS
at that point.
