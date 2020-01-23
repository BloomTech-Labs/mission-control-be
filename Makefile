SHELL := bash

.SHELLFLAGS := -eu -o pipefail -c  

include .env
export

# =================================================================
# = Utility targets ===============================================
# =================================================================

# Allows a target to require environment variables to exist
# Example that will only run 'mytarget' when the environment variable named 'SERVER' has been set:
#  mytarget: env-SERVER another-dependency
env-%:
	@if [ "${${*}}" = "" ]; then \
		echo "Required environment variable $* not set"; \
		echo; \
		exit 1; \
	fi

clean:
	@echo
	@echo Cleaning up
	@rm -rf apollo/dist apollo/node_modules apollo/src/generated apollo/schema/generated

init: clean
	@echo
	@echo Initializing
	@cd apollo && npm install -production && npm prune

# =================================================================
# = Prisma targets ================================================
# =================================================================

prisma-generate:
	@echo
	@echo Generating Prisma schema
	@cd prisma && \
	prisma generate

local-prisma-deploy:
	@echo
	@echo Deploying Prisma schema
	@cd prisma && \
	prisma deploy

local-prisma-token:
	@echo
	@echo Generating Prisma token
	@cd prisma && \
	prisma token


# =================================================================
# = Apollo targets ================================================
# =================================================================

apollo-generate: prisma-generate
	@echo
	@echo Generating Apollo code
	cd apollo && npx graphql-codegen

apollo-npm-build: apollo-generate
	@echo
	@echo Building Apollo image
	cd apollo && npm run build

apollo-docker-build: #apollo-npm-build
	@echo
	@echo ======================================================================================
	@echo Building Apollo image
	@echo ======================================================================================
	cd apollo && docker build -t lambdaschoollabs/missioncontrol:latest .

apollo-push: apollo-docker-build
	@echo
	@echo ======================================================================================
	@echo Pushing Apollo image to registry
	@echo ======================================================================================
	cd apollo && docker push lambdaschoollabs/missioncontrol:latest

apollo-token: env-TEST_OAUTH_TOKEN_ENDPOINT env-TEST_OAUTH_CLIENT_ID env-TEST_OAUTH_CLIENT_SECRET
	@echo
	@echo Generating token that can be used for Apollo
	@curl --request POST \
		--url ${TEST_OAUTH_TOKEN_ENDPOINT}/v1/token \
		--header 'content-type: application/x-www-form-urlencoded' \
		--data 'grant_type=client_credentials&scope=groups' -u ${TEST_OAUTH_CLIENT_ID}:${TEST_OAUTH_CLIENT_SECRET}


# =================================================================
# = AWS targets ===================================================
# =================================================================

# =================================================================
# Show a banner before running stuff in AWS
# =================================================================
aws-banner: env-APPLICATION_NAME env-ENVIRONMENT_NAME
	@echo ======================================================================================
	@echo Attention!!
	@echo This command is going to be executed in the following AWS environment:
	@echo   Application: $(APPLICATION_NAME)
	@echo   Environment: $(ENVIRONMENT_NAME)
	@echo ======================================================================================
	@( read -p "Are you sure you want to continue? [y/N]: " sure && case "$$sure" in [yY]) true;; *) false;; esac )

# =================================================================
# Deploys the application specific network resources to AWS
# =================================================================
aws-deploy-app-network: aws-banner
	@export AWS_STACK_NAME=$(APPLICATION_NAME)-network && \
	 echo  && \
	 echo ======================================================================================  && \
	 echo Deploying the application network components using stack $${AWS_STACK_NAME}             && \
	 echo ======================================================================================  && \
	 cd aws && \
	 aws cloudformation deploy \
	 --no-fail-on-empty-changeset \
   --template-file app-network.cf.yaml \
   --stack-name $${AWS_STACK_NAME} \
	 --capabilities CAPABILITY_IAM \
	 --parameter-overrides $$(jq -r '.[] | [.ParameterKey, .ParameterValue] | join("=")' params.json) \
	 --tags application=$(APPLICATION_NAME)

# ===========================================================================
# Deploys the application specific DNS to AWS
# ===========================================================================
aws-deploy-app-dns: aws-banner
	@echo
	@echo ======================================================================================
	@echo Deploying the main application DNS using stack $(APPLICATION_NAME)-dns
	@echo ======================================================================================
	@cd aws && \
	aws cloudformation deploy \
	--no-fail-on-empty-changeset \
  --template-file app-dns.cf.yaml \
  --stack-name $(APPLICATION_NAME)-dns \
	--parameter-overrides $$(jq -r '.[] | [.ParameterKey, .ParameterValue] | join("=")' params.json) \
	--tags application=$(APPLICATION_NAME)

# ===========================================================================
# Deploys the environment specific network to AWS
# ===========================================================================
aws-deploy-env-network: aws-banner
	@echo
	@echo ======================================================================================
	@echo Deploying the environment specific network components using stack $(APPLICATION_NAME)-$(ENVIRONMENT_NAME)-network
	@echo ======================================================================================
	@cd aws && \
	aws cloudformation deploy \
	--no-fail-on-empty-changeset \
  --template-file env-network.cf.yaml \
  --stack-name $(APPLICATION_NAME)-$(ENVIRONMENT_NAME)-network \
	--parameter-overrides $$(jq -r '.[] | [.ParameterKey, .ParameterValue] | join("=")' params.json) \
	--tags application=$(APPLICATION_NAME) environment=$(ENVIRONMENT_NAME)

# ===========================================================================
# Deploys the Postgres database to AWS
# ===========================================================================
aws-deploy-env-db: aws-banner
	@echo
	@echo ======================================================================================
	@echo Deploying the DB using stack $(APPLICATION_NAME)-$(ENVIRONMENT_NAME)-db
	@echo ======================================================================================
	@cd aws && \
	aws cloudformation deploy \
	--no-fail-on-empty-changeset \
  --template-file env-db.cf.yaml \
  --stack-name $(APPLICATION_NAME)-$(ENVIRONMENT_NAME)-db \
	--parameter-overrides $$(jq -r '.[] | [.ParameterKey, .ParameterValue] | join("=")' params.json) \
	--tags application=$(APPLICATION_NAME) environment=$(ENVIRONMENT_NAME)

# ===========================================================================
# Deploys the Prisma service to AWS
# ===========================================================================
aws-deploy-env-prisma: aws-banner
	@echo
	@echo ======================================================================================
	@echo Deploying the Prisma service using stack $(APPLICATION_NAME)-$(ENVIRONMENT_NAME)-prisma
	@echo ======================================================================================
	@cd aws && \
	 aws cloudformation deploy \
	 --no-fail-on-empty-changeset \
	 --template-file env-prisma.cf.yaml \
	 --stack-name $(APPLICATION_NAME)-$(ENVIRONMENT_NAME)-prisma \
	 --parameter-overrides $$(jq -r '.[] | [.ParameterKey, .ParameterValue] | join("=")' params.json) \
	 --tags application=$(APPLICATION_NAME) environment=$(ENVIRONMENT_NAME)

# ===========================================================================
# Deploys the Apollo service to AWS
# ===========================================================================
aws-deploy-env-apollo: aws-banner
	@echo
	@echo ======================================================================================
	@echo Deploying the Apollo service using stack $(APPLICATION_NAME)-$(ENVIRONMENT_NAME)-apollo
	@echo ======================================================================================
	@cd aws && \
	aws cloudformation deploy \
	--no-fail-on-empty-changeset \
  --template-file env-apollo.cf.yaml \
  --stack-name $(APPLICATION_NAME)-$(ENVIRONMENT_NAME)-apollo \
	--parameter-overrides $$(jq -r '.[] | [.ParameterKey, .ParameterValue] | join("=")' params.json) \
	--tags application=$(APPLICATION_NAME) environment=$(ENVIRONMENT_NAME)

# ===========================================================================
# Deploys all of the AWS resources in the proper order
# ===========================================================================
aws-deploy-all: aws-deploy-app-network aws-deploy-app-dns aws-deploy-env-network aws-deploy-env-db aws-deploy-env-prisma aws-deploy-env-apollo
	@echo
	@echo ======================================================================================
	@echo Finished deploying all AWS resources
	@echo ======================================================================================

# ===========================================================================
# Retrieves the Prisma secret for the AWS deployed Prisma management API
# ===========================================================================
PRISMA_MANAGEMENT_API_SECRET_ARN_EXPORT := mission-control-stage-PrismaManagementAPISecret
PRISMA_MANAGEMENT_API_SECRET_ARN := $$(aws cloudformation list-exports --query 'Exports[?Name==\`$(PRISMA_MANAGEMENT_API_SECRET_ARN_EXPORT)\`].Value' --output text)
PRISMA_MANAGEMENT_API_SECRET := $$(aws secretsmanager get-secret-value --secret-id $(PRISMA_MANAGEMENT_API_SECRET_ARN) --query 'SecretString' --output text)

aws-prisma-management-secret: aws-banner
	@echo PRISMA_MANAGEMENT_API_SECRET_ARN: $(PRISMA_MANAGEMENT_API_SECRET_ARN)
	@echo PRISMA_MANAGEMENT_API_SECRET: $(PRISMA_MANAGEMENT_API_SECRET)


# ===========================================================================
# Retrieves the Prisma secret for the AWS deployed service
# ===========================================================================
PRISMA_SERVICE_API_SECRET_ARN_EXPORT := mission-control-stage-PrismaServiceAPISecret
PRISMA_SERVICE_API_SECRET_ARN := $$(aws cloudformation list-exports --query 'Exports[?Name==`$(PRISMA_SERVICE_API_SECRET_ARN_EXPORT)`].Value' --output text)
PRISMA_SERVICE_API_SECRET := $$(aws secretsmanager get-secret-value --secret-id $(PRISMA_SERVICE_API_SECRET_ARN) --query 'SecretString' --output text)

aws-prisma-service-secret: aws-banner
	@echo PRISMA_SERVICE_API_SECRET_ARN: $(PRISMA_SERVICE_API_SECRET_ARN)
	@echo PRISMA_SERVICE_API_SECRET: $(PRISMA_SERVICE_API_SECRET)


# ===========================================================================
# Gets a token for connecting to the AWS Prisma API
# ===========================================================================
aws-prisma-token: aws-banner
	@cd prisma && \
	export PRISMA_MANAGEMENT_API_SECRET='$(PRISMA_MANAGEMENT_API_SECRET)' && \
	export PRISMA_SECRET='$(PRISMA_SERVICE_API_SECRET)' && \
	export PRISMA_ENDPOINT="https://prisma-stage.use-mission-control.com/" && \
	prisma token


# ===========================================================================
# Runs Prisma deploy against the AWS environment
# ===========================================================================
aws-prisma-deploy: aws-banner
	@cd prisma && \
	export PRISMA_MANAGEMENT_API_SECRET='$(PRISMA_MANAGEMENT_API_SECRET)' && \
	export PRISMA_SECRET='$(PRISMA_SERVICE_API_SECRET)' && \
	export PRISMA_ENDPOINT='https://prisma-stage.use-mission-control.com/' && \
	prisma deploy


# =================================================================
# Force an update of the Prisma service
# =================================================================
PRISMA_SERVICE_ARN_EXPORT := mission-control-stage-PrismaServiceArn
PRISMA_SERVICE_ARN := $$(aws cloudformation list-exports --query 'Exports[?Name==`$(PRISMA_SERVICE_ARN_EXPORT)`].Value' --output text)

aws-prisma-update-service: aws-banner
	@export PRISMA_SERVICE_ARN=$(PRISMA_SERVICE_ARN) && \
	echo PRISMA_SERVICE_ARN: $${PRISMA_SERVICE_ARN} && \
	aws ecs update-service --cluster mission-control-stage --service "$${PRISMA_SERVICE_ARN}" --force-new-deployment


# =================================================================
# Force an update of the Apollo service
# =================================================================
APOLLO_SERVICE_ARN_EXPORT := mission-control-stage-ApolloServiceArn
APOLLO_SERVICE_ARN := $$(aws cloudformation list-exports --query 'Exports[?Name==`$(APOLLO_SERVICE_ARN_EXPORT)`].Value' --output text)

aws-apollo-update-service: aws-banner
	@export APOLLO_SERVICE_ARN=$(APOLLO_SERVICE_ARN) && \
	echo APOLLO_SERVICE_ARN: $${APOLLO_SERVICE_ARN} && \
	aws ecs update-service --cluster mission-control-stage --service "$${APOLLO_SERVICE_ARN}" --force-new-deployment

