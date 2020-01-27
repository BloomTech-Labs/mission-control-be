#!/bin/bash

containers() {
	echo -e "\nRunning Mission Control backend"
	cd ../ && \
	echo -e "\nSourcing .env"
	source sourceme.sh && \
	echo -e "\nStarting container..."
	docker-compose up --build -d
	echo
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
				echo -e "\nApollo Server listening on port 8000"
				echo -e "Prisma listening on port 7000"
				echo -e "Happy hacking from Labs 19 <3\n"
			fi
		fi
	fi
}

run_mc
