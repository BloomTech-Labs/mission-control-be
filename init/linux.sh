#!/bin/bash

get_docker() {
	read -r -p "Install Docker? [y/N] " answer
	if [[ "$answer" != y ]] && [[ "$answer" != Y ]]; then
		echo -e "\nSkipping Docker setup...\n"
	else
		sh ./get-docker.sh
	fi
}

enable_docker() {
	read -r -p "Start and enable Docker? [y/N] " answer
	if [[ "$answer" != y ]] && [[ "$answer" != Y ]]; then
		echo -e "\nSkipping Docker systemctl setup...\n"
	else
		echo -e "\nStarting Docker through systemctl..."
		systemctl start docker

		echo -e "\nEnabling Docker through systemctl..."
		systemctl enable docker

		echo -e "DONE.\n"
	fi
}

configure_docker() {
	read -r -p "Manage Docker as a non-root user? [y/N] " answer
	if [[ "$answer" != y ]] && [[ "$answer" != Y ]]; then
		echo -e "\nSkipping Docker non-root configuration..."
	else
		echo -e "\nAdding 'docker' group..."
		sudo groupadd docker

		echo -e "\nAdding user $USER to 'docker' group..."
		sudo usermod -aG docker "$USER"

		echo -e "\nDone. Logout and back in to refresh groups.\n"
	fi
}

install_dockerc() {
	read -r -p "Install docker-compose? [y/N] " answer
	if [[ "$answer" != y ]] && [[ "$answer" != Y ]]; then
		echo -e "\nSkipping docker-compose install"
	else
		sudo curl -L "https://github.com/docker/compose/releases/download/1.25.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
		sudo chmod +x /usr/local/bin/docker-compose
	fi
	}

get_docker
enable_docker
configure_docker
install_dockerc
