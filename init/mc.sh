#!/bin/bash

yarn_or_npm() {
		if [[ ! $(which yarn) ]] && [[ ! $(yarn --version &> /dev/null) ]]; then
			npm i
		else
			yarn
		fi
}

containers() {
	echo -e "\nRunning Mission Control containers..."
	cd ../apollo && yarn_or_npm && \
		cd ../ && source sourceme.sh && \
		echo -e "Starting Containers..."
		docker-compose up --build -d && \
			echo
			echo -e "\nFinishing up..."
			sleep 5
}

install_cli() {
	read -r -p "Install Prisma CLI globally? [y/N] " answer
	if [[ "$answer" != y ]] && [[ "$answer" != Y ]]; then
		echo -e "\nSkipping Prisma installation"
	else
		if [[ ! $(which yarn) ]] && [[ ! $(yarn --version &> /dev/null) ]]; then
			echo -e "\nNow installing..."
			sudo npm i -g prisma
		else
			sudo yarn global add prisma
		fi
	fi
}

run_mc() {
	read -r -p "Start Mission Control container? [y/N] " answer
	if [[ "$answer" != y ]] && [[ "$answer" != Y ]]; then
		echo -e "\nSkipping Mission Control deployment..."
	else
		containers
		# Deploy Prisma
		read -r -p "Deploy prisma? [y/N] " answer
		if [[ "$answer" != y ]] && [[ "$answer" != Y ]]; then
			echo -e "\nNOTE: Prisma model has not been deployed..."
		else
			prisma deploy
			echo
			# Run Prisma Seed
			read -r -p "Run Seed? [y/N] " answer
			if [[ "$answer" != y ]] && [[ "$answer" != Y ]]; then
				echo -e "\nNOTE: Database is EMPTY"
			else
				prisma reset --force && prisma seed
				echo
				echo -e "Apollo Server listening on port 8000"
				echo -e "Prisma listening on port 7000"
				echo -e "\nHappy hacking from Labs 19 <3\n"
			fi
		fi
	fi
}

install_cli
run_mc
