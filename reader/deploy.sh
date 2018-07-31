color=`tput setaf 48`
magenta=`tput setaf 5`
reset=`tput setaf 7`


echo
echo "${color}v${reset}"
if [ "$1" = "--debug" ]
then
/Users/carlson/Downloads/2/elm make  ./src/Reader.elm --output ./dist/Main.js
else
/Users/carlson/Downloads/2/elm make --optimize ./src/Reader.elm --output ./dist/Main.js
fi

echo
echo "${color}Uglify ...${reset}"
uglifyjs ./dist/Main.js -mc 'pure_funcs="F2,F3,F4,F5,F6,F7,F8,F9"' -o ./dist/Main.min.js

echo
echo "${color}Clean up${reset}"
rm ./dist/Main.js

# echo
# echo "${color}Deploy to now ... ${reset}"
# now --public ./dist

echo
echo "${color}upload to cloud ...${reset}"
scp -r ./dist/Main.min.js root@138.197.81.6:/var/www/html/
scp -r ./dist/index.html root@138.197.81.6:/var/www/html/
