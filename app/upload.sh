

echo
echo "${color}Upload to Digital Ocean ...${reset}"

scp -r ./dist/Main.min.js root@138.197.81.6:/var/www/html/
scp -r ./dist/index.html root@138.197.81.6:/var/www/html/
