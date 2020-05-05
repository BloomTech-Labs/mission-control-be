SHELL := bash
.SHELLFLAGS := -eu -o pipefail -c

ifneq ("$(wildcard .env)","")
	include .env
	export
endif

# =================================================================
# = Utility targets ===============================================
# =================================================================
NO_COLOR		:= \x1b[0m
OK_COLOR		:= \x1b[32;01m
ERROR_COLOR	:= \x1b[31;01m
WARN_COLOR	:= \x1b[33;01m

# ===================================================================================================
# Allows a target to require environment variables to exist
# Example that will only run 'mytarget' when the environment variable named 'SERVER' has been set:
#  mytarget: env-SERVER another-dependency
# ===================================================================================================
env-%:
	@if [ "${${*}}" = "" ]; then \
		printf "$(ERROR_COLOR)"; \
		echo "**** ERROR: Required environment variable $* not set ****"; \
		printf "$(NO_COLOR)"; \
		echo; \
		exit 1; \
	fi

clean:
	@printf "$(OK_COLOR)"																																												&& \
	 printf "\n%s\n" "======================================================================================"		&& \
	 printf "%s\n"   "= Cleaning up"																																						&& \
	 printf "%s\n"   "======================================================================================"		&& \
	 printf "$(NO_COLOR)"
	 rm -rf apollo/dist apollo/node_modules apollo/src/generated apollo/schema/generated prisma/node_modules

init: clean apollo-build
	@printf "$(OK_COLOR)"																																												&& \
	 printf "\n%s\n" "======================================================================================"		&& \
	 printf "%s\n"   "= Done initializing Prisma"																																&& \
	 printf "%s\n"   "======================================================================================"		&& \
	 printf "$(NO_COLOR)"

docker-stop-all:
	@printf "$(OK_COLOR)"																																												&& \
	 printf "\n%s\n" "======================================================================================"		&& \
	 printf "%s\n"   "= Stopping all Docker containers"																													&& \
	 printf "%s\n"   "======================================================================================"		&& \
	 printf "$(NO_COLOR)"
	-docker stop $(docker ps -q)

docker-clean: docker-stop-all
	@printf "$(OK_COLOR)"																																												&& \
	 printf "\n%s\n" "======================================================================================"		&& \
	 printf "%s\n"   "= Deep cleaning your Docker environment"																									&& \
	 printf "%s\n"   "======================================================================================"		&& \
	 printf "$(NO_COLOR)"
	-docker container rm $$(docker container ls -aq)
	-docker system prune -f

local-up: apollo-build
	@printf "$(OK_COLOR)"																																												&& \
	 printf "\n%s\n" "======================================================================================"		&& \
	 printf "%s\n"   "= Bringing up Prismatopia"																																&& \
	 printf "%s\n"   "======================================================================================"		&& \
	 printf "$(NO_COLOR)"
	 docker-compose up --abort-on-container-exit

lint: apollo-lint
	@printf "$(OK_COLOR)"																																												&& \
	 printf "\n%s\n" "======================================================================================"		&& \
	 printf "%s\n"   "= Linting Complete"																																				&& \
	 printf "%s\n"   "======================================================================================"		&& \
	 printf "$(NO_COLOR)"

coverage: apollo-coverage
	@printf "$(OK_COLOR)"																																												&& \
	 printf "\n%s\n" "======================================================================================"		&& \
	 printf "%s\n"   "= Coverage Run Complete"																																	&& \
	 printf "%s\n"   "======================================================================================"		&& \
	 printf "$(NO_COLOR)"

# =================================================================
# = Prisma targets ================================================
# =================================================================

prisma-generate:
	@printf "$(OK_COLOR)"																																												&& \
	 printf "\n%s\n" "======================================================================================"		&& \
	 printf "%s\n"   "= Generating Prisma schema"																																&& \
	 printf "%s\n"   "======================================================================================"		&& \
	 printf "$(NO_COLOR)"
	 cd prisma && yarn install && yarn generate

local-prisma-deploy: env-PRISMA_ENDPOINT env-PRISMA_SECRET env-PRISMA_MANAGEMENT_API_SECRET
	@printf "$(OK_COLOR)"																																												&& \
	 printf "\n%s\n" "======================================================================================"		&& \
	 printf "%s\n"   "= Deploying Prisma schema"																																&& \
	 printf "%s\n"   "======================================================================================"		&& \
	 printf "$(NO_COLOR)"
	 cd prisma && yarn install && yarn deploy

local-prisma-deploy-force: env-PRISMA_ENDPOINT env-PRISMA_SECRET env-PRISMA_MANAGEMENT_API_SECRET
	@printf "$(OK_COLOR)"																																												&& \
	 printf "\n%s\n" "======================================================================================"		&& \
	 printf "%s\n"   "= Forcing deployment of Prisma schema"																										&& \
	 printf "%s\n"   "======================================================================================"		&& \
	 printf "$(NO_COLOR)"
	 cd prisma && yarn install && yarn deploy --force

local-prisma-reseed: env-PRISMA_ENDPOINT env-PRISMA_SECRET
	@printf "$(OK_COLOR)"																																												&& \
	 printf "\n%s\n" "======================================================================================"		&& \
	 printf "%s\n"   "= Reeseeding Prisma deployment"																														&& \
	 printf "%s\n"   "======================================================================================"		&& \
	 printf "$(NO_COLOR)"
	 cd prisma && yarn install && yarn reseed

local-prisma-token: env-PRISMA_ENDPOINT env-PRISMA_SECRET
	@printf "$(OK_COLOR)"																																												&& \
	 printf "\n%s\n" "======================================================================================"		&& \
	 printf "%s\n"   "= Generating Prisma token"																																&& \
	 printf "%s\n"   "======================================================================================"		&& \
	 printf "$(NO_COLOR)"
	 cd prisma && yarn install && yarn token

# =================================================================
# = Apollo targets ================================================
# =================================================================

apollo-yarn-install: prisma-generate
	@printf "$(OK_COLOR)"																																												&& \
	 printf "\n%s\n" "======================================================================================"		&& \
	 printf "%s\n"   "= Checking Apollo Yarn packages																												"		&& \
	 printf "%s\n"   "======================================================================================"		&& \
	 printf "$(NO_COLOR)"																																												&& \
	 cd apollo && yarn install

apollo-build: env-APOLLO_CONTAINER_IMAGE apollo-yarn-install prisma-generate apollo-lint
	@printf "$(OK_COLOR)"																																												&& \
	 printf "\n%s\n" "======================================================================================"		&& \
	 printf "%s\n"   "= Building Apollo container image: $${APOLLO_CONTAINER_IMAGE}"														&& \
	 printf "%s\n"   "======================================================================================"		&& \
	 printf "$(NO_COLOR)"																																												&& \
	 yarn install && cd apollo && yarn install && docker build -t $${APOLLO_CONTAINER_IMAGE} .

apollo-lint: apollo-yarn-install
	@printf "$(OK_COLOR)"																																												&& \
	 printf "\n%s\n" "======================================================================================"		&& \
	 printf "%s\n"   "= Linting Apollo																																			"		&& \
	 printf "%s\n"   "======================================================================================"		&& \
	 printf "$(NO_COLOR)"																																												&& \
	 cd apollo && yarn lint

apollo-coverage: apollo-yarn-install
	@printf "$(OK_COLOR)"																																												&& \
	 printf "\n%s\n" "======================================================================================"		&& \
	 printf "%s\n"   "= Creating test coverage report for Apollo																						"		&& \
	 printf "%s\n"   "======================================================================================"		&& \
	 printf "$(NO_COLOR)"																																												&& \
	 cd apollo && yarn coverage

apollo-push: env-APOLLO_CONTAINER_IMAGE apollo-build
	@printf "$(OK_COLOR)"																																												&& \
	 printf "\n%s\n" "======================================================================================"		&& \
	 printf "%s\n"   "= Pushing Apollo container image: $${APOLLO_CONTAINER_IMAGE}"															&& \
	 printf "%s\n"   "======================================================================================"		&& \
	 printf "$(NO_COLOR)"																																												&& \
	 cd apollo && docker push $${APOLLO_CONTAINER_IMAGE}

apollo-token: env-APOLLO_TOKEN_ENDPOINT env-APOLLO_CLIENT_ID env-APOLLO_CLIENT_SECRET
	@printf "$(OK_COLOR)"																																												&& \
	 printf "\n%s\n" "======================================================================================"		&& \
	 printf "%s\n"   "= Grabbing token from: $${APOLLO_TOKEN_ENDPOINT}"																					&& \
	 printf "%s\n"   "======================================================================================"		&& \
	 printf "$(NO_COLOR)"																																												&& \
	 curl -s 																																																 			 \
		    --url $${APOLLO_TOKEN_ENDPOINT}																																 					 \
				--header 'accept: application/json'																																			 \
		    --header 'content-type: application/x-www-form-urlencoded' 																							 \
		    --data grant_type=password																																							 \
				--data scope=openid																																											 \
				--data-urlencode username=$${APOLLO_TEST_USERNAME}																											 \
				--data-urlencode password=$${APOLLO_TEST_PASSWORD}																											 \
				-u $${APOLLO_CLIENT_ID}:$${APOLLO_CLIENT_SECRET}


# =================================================================
# = AWS targets ===================================================
# =================================================================

# =================================================================
# Show a banner before running targets for the whole application
# TODO: aws iam get-user && aws iam list-account-aliases
# =================================================================
aws-app-banner: env-APPLICATION_NAME
	@printf "$(WARN_COLOR)"
	@printf "%s\n" "======================================================================================"
	@printf "%s\n" "= Attention!!"
	@printf "%s\n" "= The following actions will be performed against this application:"
	@printf "%s\n" "=   Application: $(APPLICATION_NAME)"
	@printf "%s\n" "=   Parameters:  aws.$(APPLICATION_NAME)"
	@printf "%s\n" "======================================================================================"
	@printf "$(NO_COLOR)"
	@( read -p "Are you sure you want to continue? [y/N]: " sure && case "$$sure" in [yY]) true;; *) false;; esac )

# =================================================================
# Provisions IAM resources for the application
# =================================================================
aws-deploy-app-iam: aws-app-banner
	@export STACK_NAME=$(APPLICATION_NAME)-iam 																																	&& \
	 export STACK_PARAMETERS="$$(cat aws.$(APPLICATION_NAME) | grep -v "#" | tr '\n' ' ')"											&& \
	 printf "$(OK_COLOR)"																																												&& \
	 printf "\n%s\n" "======================================================================================"		&& \
	 printf "%s\n"   "= Deploying CloudFormation stack $${STACK_NAME}"																					&& \
	 printf "%s"     "======================================================================================"		&& \
	 printf "$(NO_COLOR)"																																												&& \
	 aws cloudformation deploy 																						  		 												 					 \
	  --no-fail-on-empty-changeset 																				  		 												 					 \
    --template-file aws/app-iam.cf.yaml 																  		 												 					 \
    --stack-name $${STACK_NAME} 																				  		 												 					 \
	  --capabilities CAPABILITY_IAM 																			  		 												 					 \
	  --parameter-overrides $${STACK_PARAMETERS} 													  		 												 					 \
	  --tags poweredby=prismatopia application=$(APPLICATION_NAME)

# =================================================================
# Deploys the application specific network resources to AWS
# =================================================================
aws-deploy-app-network: aws-app-banner
	@export STACK_NAME=$(APPLICATION_NAME)-network 	 																														&& \
	 export STACK_PARAMETERS="$$(cat aws.$(APPLICATION_NAME) | grep -v "#" | tr '\n' ' ')"											&& \
	 printf "$(OK_COLOR)"																																												&& \
	 printf "\n%s\n" "======================================================================================"		&& \
	 printf "%s\n"   "= Deploying CloudFormation stack $${STACK_NAME}"																					&& \
	 printf "$(WARN_COLOR)"																																											&& \
	 printf "%s\n"   "= Note: This will create a hosted zone for your domain. You may need to stop here and"		&& \
	 printf "%s\n"   "=       update your domain registrar with the name servers for this hosted zone."					&& \
	 printf "$(OK_COLOR)"																																												&& \
	 printf "%s"     "======================================================================================"		&& \
	 printf "$(NO_COLOR)"																																												&& \
	 aws cloudformation deploy 																																							  		 \
	  --no-fail-on-empty-changeset 																																					  		 \
    --template-file aws/app-network.cf.yaml 																															  		 \
    --stack-name $${STACK_NAME} 																																					  		 \
	  --capabilities CAPABILITY_IAM 																																				  		 \
	  --parameter-overrides $${STACK_PARAMETERS} 																														  		 \
	  --tags poweredby=prismatopia application=$(APPLICATION_NAME)

# =================================================================
# Show a banner before running targets for a specific environment
# =================================================================
aws-env-banner: env-APPLICATION_NAME env-ENVIRONMENT_NAME
	@printf "$(WARN_COLOR)"
	@printf "%s\n" "======================================================================================"
	@printf "%s\n" "= Attention!!"
	@printf "%s\n" "= This command is going to be executed in the following AWS environment:"
	@printf "%s\n" "=   Application: $(APPLICATION_NAME)"
	@printf "%s\n" "=   Environment: $(ENVIRONMENT_NAME)"
	@printf "%s\n" "=   Parameters:  aws.$(APPLICATION_NAME)"
	@printf "%s\n" "=                aws.$(APPLICATION_NAME).$(ENVIRONMENT_NAME)"
	@printf "%s\n" "======================================================================================"
	@printf "$(NO_COLOR)"
	@( read -p "Are you sure you want to continue? [y/N]: " sure && case "$$sure" in [yY]) true;; *) false;; esac )


# ===========================================================================
# Provision DNS resources for the environment
# ===========================================================================
aws-deploy-env-dns: aws-env-banner
	@export STACK_NAME=$(APPLICATION_NAME)-$(ENVIRONMENT_NAME)-dns 																																			&& \
	 export STACK_PARAMETERS="$$(cat aws.$(APPLICATION_NAME) aws.$(APPLICATION_NAME).$(ENVIRONMENT_NAME) | grep -v "#" | tr '\n' ' ')"	&& \
	 printf "$(OK_COLOR)"																																																								&& \
	 printf "\n%s\n" "======================================================================================"														&& \
	 printf "%s\n"   "= Deploying CloudFormation stack $${STACK_NAME}"																																	&& \
	 printf "%s"     "======================================================================================"														&& \
	 printf "$(NO_COLOR)"																																																								&& \
	 aws cloudformation deploy 																																							  		 												 \
	  --no-fail-on-empty-changeset 																																					  		 												 \
    --template-file aws/env-dns.cf.yaml 																																	  		 												 \
    --stack-name $${STACK_NAME} 																																					  		 												 \
	  --parameter-overrides $${STACK_PARAMETERS} 																														  		 												 \
	  --tags poweredby=prismatopia application=$(APPLICATION_NAME) environment=$(ENVIRONMENT_NAME)

# ===========================================================================
# Provision SSL certificate for the environmnet
# ===========================================================================
aws-deploy-env-certificate: aws-env-banner
	@export STACK_NAME=$(APPLICATION_NAME)-$(ENVIRONMENT_NAME)-certificate 	 																														&& \
	 export STACK_PARAMETERS="$$(cat aws.$(APPLICATION_NAME) aws.$(APPLICATION_NAME).$(ENVIRONMENT_NAME) | grep -v "#" | tr '\n' ' ')"	&& \
	 printf "$(OK_COLOR)"																																																								&& \
	 printf "\n%s\n" "======================================================================================"														&& \
	 printf "%s\n"   "= Deploying CloudFormation stack $${STACK_NAME}"																																	&& \
	 printf "$(WARN_COLOR)"																																																							&& \
	 printf "%s\n"   "= Note: You need to verify the certificate deployed by this step in the AWS console"															&& \
	 printf "%s\n"   "=       before you continue."																																											&& \
	 printf "%s\n"   "=       TODO: https://github.com/binxio/cfn-certificate-provider"																									&& \
	 printf "$(OK_COLOR)"																																																								&& \
	 printf "%s"     "======================================================================================"														&& \
	 printf "$(NO_COLOR)"																																																								&& \
	 aws cloudformation deploy 																																							  		 												 \
	  --no-fail-on-empty-changeset 																																					  		 												 \
    --template-file aws/env-certificate.cf.yaml 																													  		 												 \
    --stack-name $${STACK_NAME} 																																					  		 												 \
	  --parameter-overrides $${STACK_PARAMETERS} 																														  		 												 \
	  --tags poweredby=prismatopia application=$(APPLICATION_NAME) environment=$(ENVIRONMENT_NAME)

# ===========================================================================
# Provision network resources for the environment
# ===========================================================================
aws-deploy-env-network: aws-env-banner
	@export STACK_NAME=$(APPLICATION_NAME)-$(ENVIRONMENT_NAME)-network 	 																																&& \
	 export STACK_PARAMETERS="$$(cat aws.$(APPLICATION_NAME) aws.$(APPLICATION_NAME).$(ENVIRONMENT_NAME) | grep -v "#" | tr '\n' ' ')"	&& \
	 printf "$(OK_COLOR)"																																																								&& \
	 printf "\n%s\n" "======================================================================================"														&& \
	 printf "%s\n"   "= Deploying CloudFormation stack $${STACK_NAME}"																																	&& \
	 printf "%s"     "======================================================================================"														&& \
	 printf "$(NO_COLOR)"																																																								&& \
	 aws cloudformation deploy 																																							  		 												 \
	  --no-fail-on-empty-changeset 																																					  		 												 \
    --template-file aws/env-network.cf.yaml 																															  		 												 \
    --stack-name $${STACK_NAME} 																																					  		 												 \
	  --parameter-overrides $${STACK_PARAMETERS} 																														  		 												 \
	  --tags poweredby=prismatopia application=$(APPLICATION_NAME) environment=$(ENVIRONMENT_NAME)

# ===========================================================================
# Provision database resources for the environment
# ===========================================================================
aws-deploy-env-db: aws-env-banner
	@export STACK_NAME=$(APPLICATION_NAME)-$(ENVIRONMENT_NAME)-db 	 																																		&& \
	 export STACK_PARAMETERS="$$(cat aws.$(APPLICATION_NAME) aws.$(APPLICATION_NAME).$(ENVIRONMENT_NAME) | grep -v "#" | tr '\n' ' ')"	&& \
	 printf "$(OK_COLOR)"																																																								&& \
	 printf "\n%s\n" "======================================================================================"														&& \
	 printf "%s\n"   "= Deploying CloudFormation stack $${STACK_NAME}"		   																														&& \
	 printf "%s"     "======================================================================================"														&& \
	 printf "$(NO_COLOR)"																																																								&& \
	 aws cloudformation deploy 																																							  		 												 \
	  --no-fail-on-empty-changeset 																																					  		 												 \
    --template-file aws/env-db.cf.yaml 																																		  		 												 \
    --stack-name $${STACK_NAME} 																																					  		 												 \
	  --parameter-overrides $${STACK_PARAMETERS} 																														  		 												 \
	  --tags poweredby=prismatopia application=$(APPLICATION_NAME) environment=$(ENVIRONMENT_NAME)

# ===========================================================================
# Provisions the Prisma service for the environment
# ===========================================================================
aws-deploy-env-prisma: aws-env-banner
	@export STACK_NAME=$(APPLICATION_NAME)-$(ENVIRONMENT_NAME)-prisma 	 																																&& \
	 export STACK_PARAMETERS="$$(cat aws.$(APPLICATION_NAME) aws.$(APPLICATION_NAME).$(ENVIRONMENT_NAME) | grep -v "#" | tr '\n' ' ')"	&& \
	 printf "$(OK_COLOR)"																																																								&& \
	 printf "\n%s\n" "======================================================================================"														&& \
	 printf "%s\n"   "= Deploying CloudFormation stack $${STACK_NAME}"				   																												&& \
	 printf "%s"     "======================================================================================"														&& \
	 printf "$(NO_COLOR)"																																																								&& \
	 aws cloudformation deploy 																																							  		 												 \
	  --no-fail-on-empty-changeset 																																					  		 												 \
	  --template-file aws/env-prisma.cf.yaml 																																  		 												 \
	  --stack-name $${STACK_NAME} 																																					  		 												 \
	  --parameter-overrides $${STACK_PARAMETERS} 																														  		 												 \
	  --tags poweredby=prismatopia application=$(APPLICATION_NAME) environment=$(ENVIRONMENT_NAME)

# ===========================================================================
# Provisions the Apollo service for the environment
# ===========================================================================
aws-deploy-env-apollo: aws-env-banner apollo-push
	@export STACK_NAME=$(APPLICATION_NAME)-$(ENVIRONMENT_NAME)-apollo 			 																														&& \
	 export STACK_PARAMETERS="$$(cat aws.$(APPLICATION_NAME) aws.$(APPLICATION_NAME).$(ENVIRONMENT_NAME) | grep -v "#" | tr '\n' ' ')"	&& \
	 printf "$(OK_COLOR)"																																																								&& \
	 printf "\n%s\n" "======================================================================================"														&& \
	 printf "%s\n"   "= Deploying CloudFormation stack $${STACK_NAME}"				   																												&& \
	 printf "%s"     "======================================================================================"														&& \
	 printf "$(NO_COLOR)"																																																								&& \
	 aws cloudformation deploy 																																							  		 												 \
	  --no-fail-on-empty-changeset 																																					  		 												 \
    --template-file aws/env-apollo.cf.yaml 																																  		 												 \
    --stack-name $${STACK_NAME} 																																					  		 												 \
	  --parameter-overrides $${STACK_PARAMETERS} 																														  		 												 \
	  --tags poweredby=prismatopia application=$(APPLICATION_NAME) environment=$(ENVIRONMENT_NAME)

# ===========================================================================
# Deploys all of the application level AWS resources in the proper order
# ===========================================================================
aws-deploy-app: aws-deploy-app-iam aws-deploy-app-network
	@echo
	@echo ======================================================================================
	@echo Finished deploying all application level AWS resources
	@echo ======================================================================================

# ===========================================================================
# Deploys all of the environment level AWS resources in the proper order
# ===========================================================================
aws-deploy-env: aws-deploy-env-dns aws-deploy-env-certificate aws-deploy-env-network aws-deploy-env-db aws-deploy-env-prisma aws-prisma-deploy apollo-push aws-deploy-env-apollo aws-apollo-update-service
	@echo
	@echo ======================================================================================
	@echo Finished deploying all environment level AWS resources
	@echo ======================================================================================

# ===========================================================================
# Retrieves the Prisma secret for the AWS deployed Prisma management API
# ===========================================================================
AWS_PRISMA_MANAGEMENT_API_SECRET_ARN_EXPORT := $(APPLICATION_NAME)-$(ENVIRONMENT_NAME)-PrismaManagementAPISecretArn
AWS_PRISMA_MANAGEMENT_API_SECRET_ARN := $$(aws cloudformation list-exports --query "Exports[?Name=='$(AWS_PRISMA_MANAGEMENT_API_SECRET_ARN_EXPORT)'].Value" --output text)
AWS_PRISMA_MANAGEMENT_API_SECRET := $$(aws secretsmanager get-secret-value --secret-id $(AWS_PRISMA_MANAGEMENT_API_SECRET_ARN) --query 'SecretString' --output text)

aws-prisma-management-secret: aws-env-banner
	@echo PRISMA_MANAGEMENT_API_SECRET: $$(AWS_PRISMA_MANAGEMENT_API_SECRET)

# ===========================================================================
# Retrieves the Prisma secret for the AWS deployed service
# ===========================================================================
AWS_PRISMA_SERVICE_API_SECRET_ARN_EXPORT := $(APPLICATION_NAME)-$(ENVIRONMENT_NAME)-PrismaServiceAPISecretArn
AWS_PRISMA_SERVICE_API_SECRET_ARN := $$(aws cloudformation list-exports --query "Exports[?Name=='$(AWS_PRISMA_SERVICE_API_SECRET_ARN_EXPORT)'].Value" --output text)
AWS_PRISMA_SERVICE_API_SECRET := $$(aws secretsmanager get-secret-value --secret-id $(AWS_PRISMA_SERVICE_API_SECRET_ARN) --query 'SecretString' --output text)

aws-prisma-service-secret: env-ENVIRONMENT_NAME aws-env-banner
	@echo PRISMA_SERVICE_API_SECRET_ARN_EXPORT: $(AWS_PRISMA_SERVICE_API_SECRET_ARN_EXPORT) && \
	 echo PRISMA_SERVICE_API_SECRET_ARN: $(AWS_PRISMA_SERVICE_API_SECRET_ARN)								&& \
	 echo PRISMA_SERVICE_API_SECRET: $(AWS_PRISMA_SERVICE_API_SECRET)

# ===========================================================================
# Gets a token for connecting to the AWS Prisma API
# ===========================================================================
aws-prisma-token: aws-env-banner
	@export $$(cat aws.$(APPLICATION_NAME) | grep -v "#" | xargs)																								&& \
	 export $$(cat aws.$(APPLICATION_NAME).$(ENVIRONMENT_NAME) | grep -v "#" | xargs)														&& \
	 export PRISMA_MANAGEMENT_API_SECRET="$(AWS_PRISMA_MANAGEMENT_API_SECRET)"																	&& \
	 export PRISMA_SECRET="$(AWS_PRISMA_SERVICE_API_SECRET)" 																										&& \
	 if [ $(ENVIRONMENT_NAME) = "production" ]; then																															 \
	 		export PRISMA_ENDPOINT="https://prisma.$${ApplicationDomainNamespace}";																		 \
	 else																																																					 \
	 		export PRISMA_ENDPOINT="https://prisma.$(ENVIRONMENT_NAME).$${ApplicationDomainNamespace}";								 \
	 fi																																																					&& \
	 printf "$(OK_COLOR)"																																												&& \
	 printf "\n%s\n" "======================================================================================"		&& \
	 printf "%s\n"   "= Getting Prisma API token for $${PRISMA_ENDPOINT}"		  		 															&& \
	 printf "%s"     "======================================================================================"		&& \
	 printf "$(NO_COLOR)\n"																																											&& \
	 cd prisma && yarn token

# ===========================================================================
# Runs Prisma deploy against the AWS environment
# ===========================================================================
aws-prisma-deploy: aws-env-banner
	@export $$(cat aws.$(APPLICATION_NAME) | grep -v "#" | xargs)																								&& \
	 export $$(cat aws.$(APPLICATION_NAME).$(ENVIRONMENT_NAME) | grep -v "#" | xargs)														&& \
	 export PRISMA_MANAGEMENT_API_SECRET="$(AWS_PRISMA_MANAGEMENT_API_SECRET)"																	&& \
	 export PRISMA_SECRET="$(AWS_PRISMA_SERVICE_API_SECRET)" 																										&& \
	 if [ $(ENVIRONMENT_NAME) = "production" ]; then																															 \
	 		export PRISMA_ENDPOINT="https://prisma.$${ApplicationDomainNamespace}";																		 \
	 else																																																					 \
	 		export PRISMA_ENDPOINT="https://prisma.$(ENVIRONMENT_NAME).$${ApplicationDomainNamespace}";								 \
	 fi																																																					&& \
	 printf "$(OK_COLOR)"																																												&& \
	 printf "\n%s\n" "======================================================================================"		&& \
	 printf "%s\n"   "= Deploying Prisma datamodel to $${PRISMA_ENDPOINT}"		   																&& \
	 printf "%s"     "======================================================================================"		&& \
	 printf "$(NO_COLOR)\n"																																											&& \
	 cd prisma && yarn deploy

# ===========================================================================
# Runs Prisma seed against the AWS environment
# ===========================================================================
aws-prisma-reseed: aws-env-banner
	@export $$(cat aws.$(APPLICATION_NAME) | grep -v "#" | xargs)																								&& \
	 export $$(cat aws.$(APPLICATION_NAME).$(ENVIRONMENT_NAME) | grep -v "#" | xargs)														&& \
	 export PRISMA_MANAGEMENT_API_SECRET="$(AWS_PRISMA_MANAGEMENT_API_SECRET)"																	&& \
	 export PRISMA_SECRET="$(AWS_PRISMA_SERVICE_API_SECRET)" 																										&& \
	 if [ $(ENVIRONMENT_NAME) = "production" ]; then																															 \
	 		export PRISMA_ENDPOINT="https://prisma.$${ApplicationDomainNamespace}";																		 \
	 else																																																					 \
	 		export PRISMA_ENDPOINT="https://prisma.$(ENVIRONMENT_NAME).$${ApplicationDomainNamespace}";								 \
	 fi																																																					&& \
	 printf "$(OK_COLOR)"																																												&& \
	 printf "\n%s\n" "======================================================================================"		&& \
	 printf "%s\n"   "= Seeding ${PRISMA_ENDPOINT}"			   																											&& \
	 printf "%s"     "======================================================================================"		&& \
	 printf "$(NO_COLOR)\n"																																											&& \
	 cd prisma && yarn reseed

# =================================================================
# Force an update of the Prisma service in AWS
# =================================================================
AWS_PRISMA_SERVICE_ARN_EXPORT := $(APPLICATION_NAME)-$(ENVIRONMENT_NAME)-PrismaServiceArn
AWS_PRISMA_SERVICE_ARN := $$(aws cloudformation list-exports --query 'Exports[?Name==`$(AWS_PRISMA_SERVICE_ARN_EXPORT)`].Value' --output text)

aws-prisma-update-service: aws-env-banner
	@echo PRISMA_SERVICE_ARN: ${AWS_PRISMA_SERVICE_ARN} 																																										&& \
	 export PRISMA_SERVICE_ARN=$(AWS_PRISMA_SERVICE_ARN) 																																										&& \
	 echo PRISMA_SERVICE_ARN: $${PRISMA_SERVICE_ARN} 																																												&& \
	 aws ecs update-service --cluster $(APPLICATION_NAME)-$(ENVIRONMENT_NAME) --service "$${AWS_PRISMA_SERVICE_ARN}" --force-new-deployment

# =================================================================
# Force an update of the Apollo service in AWS
# =================================================================
AWS_APOLLO_SERVICE_ARN_EXPORT := $(APPLICATION_NAME)-$(ENVIRONMENT_NAME)-ApolloServiceArn
AWS_APOLLO_SERVICE_ARN := $$(aws cloudformation list-exports --query 'Exports[?Name==`$(AWS_APOLLO_SERVICE_ARN_EXPORT)`].Value' --output text)

aws-apollo-update-service: aws-env-banner
	@printf "$(OK_COLOR)"																																																										&& \
	 printf "\n%s\n" "======================================================================================"																&& \
	 printf "%s\n"   "= Updating the Apollo service"													   																														&& \
	 printf "%s"     "======================================================================================"																&& \
	 printf "$(NO_COLOR)"																																																										&& \
	 export APOLLO_SERVICE_ARN=$(AWS_APOLLO_SERVICE_ARN) 																																										&& \
	 aws ecs update-service --cluster $(APPLICATION_NAME)-$(ENVIRONMENT_NAME) --service "$${APOLLO_SERVICE_ARN}" --force-new-deployment
