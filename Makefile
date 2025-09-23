#Makefile

lint:  #запустить eslint
	npx eslint .

lint-fix:  #автокоррекция
	npx eslint . --fix
