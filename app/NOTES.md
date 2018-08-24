
## Nginx

The `nginx` configuraton file on this is `/usr/local/etc/nginx/nginx.conf`

```
    location / {
        root   html;
       \ index  index.html;
        try_files $uri $uri /index.html;
    }
```

## Zeit.co

[Options I](https://github.com/zeit/serve-handler#options)

[Options II](https://github.com/zeit/serve-handler#rewrites-array))

## Digital Ocean

[nginx](https://www.digitalocean.com/community/tutorials/nginx-essentials-installation-and-configuration-troubleshooting)

[Understanding nginx config](https://www.digitalocean.com/community/tutorials/understanding-the-nginx-configuration-file-structure-and-configuration-contexts)

`sudo nginx -t && sudo nginx -s reload`

`nginx -s stop`

`nginx`

## SSH

`ls -al ~/.ssh`

`cat ~/.ssh/id_rsa.pub`

