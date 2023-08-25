

build:
	echo "Building docker image"
#	@cd ../keycloak-mobile-number-login-spi/ && sh ./build.sh
	@docker build -t ghcr.io/sunbird-rc/demo-onest-pledge/keycloak .

push: build
	@docker push ghcr.io/sunbird-rc/demo-onest-pledge/keycloak
