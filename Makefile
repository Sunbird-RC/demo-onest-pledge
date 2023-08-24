RELEASE_VERSION = v0.0.1-beta
build:
	docker build -t ghcr.io/sunbird-rc/demo-onest-pledge/onest-donor-service backend/onest-donor-service
	docker build -t ghcr.io/sunbird-rc/demo-onest-pledge/notification-service backend/notification-service
	docker build -t ghcr.io/sunbird-rc/demo-onest-pledge/onest-ui onest-ui



release: build
	docker tag ghcr.io/sunbird-rc/demo-onest-pledge/onest-donor-service ghcr.io/sunbird-rc/demo-onest-pledge/onest-donor-service:$(RELEASE_VERSION)
	docker tag ghcr.io/sunbird-rc/demo-onest-pledge/notification-service ghcr.io/sunbird-rc/demo-onest-pledge/notification-service:${RELEASE_VERSION}
	docker tag -t ghcr.io/sunbird-rc/demo-onest-pledge/onest-ui ghcr.io/sunbird-rc/demo-onest-pledge/onest-ui:${RELEASE_VERSION}
	docker push ghcr.io/sunbird-rc/demo-onest-pledge/onest-donor-service
	docker push ghcr.io/sunbird-rc/demo-onest-pledge/notification-service
	docker push ghcr.io/sunbird-rc/demo-onest-pledge/onest-ui