RELEASE_VERSION = v0.0.1-beta
build:
	docker build -t ghcr.io/sunbird-rc/demo-onest-pledge/onest-donor-service backend/onest-donor-service
	docker build -t ghcr.io/sunbird-rc/demo-onest-pledge/certificate-pdf backend/certificate-pdf-service
	docker build -t ghcr.io/sunbird-rc/demo-onest-pledge/onest-ui onest-ui

release:
	docker tag ghcr.io/sunbird-rc/demo-onest-pledge/onest-donor-service ghcr.io/sunbird-rc/demo-onest-pledge/onest-donor-service:$(RELEASE_VERSION)
	docker tag ghcr.io/sunbird-rc/demo-onest-pledge/onest-ui ghcr.io/sunbird-rc/demo-onest-pledge/onest-ui:$(RELEASE_VERSION)
	docker tag ghcr.io/sunbird-rc/demo-onest-pledge/certificate-pdf ghcr.io/sunbird-rc/demo-onest-pledge/certificate-pdf:$(RELEASE_VERSION)
	docker push ghcr.io/sunbird-rc/demo-onest-pledge/onest-donor-service
	docker push ghcr.io/sunbird-rc/demo-onest-pledge/onest-ui
	docker push ghcr.io/sunbird-rc/demo-onest-pledge/certificate-pdf
	docker push ghcr.io/sunbird-rc/demo-onest-pledge/onest-donor-service:$(RELEASE_VERSION)
	docker push ghcr.io/sunbird-rc/demo-onest-pledge/onest-ui:$(RELEASE_VERSION)
	docker push ghcr.io/sunbird-rc/demo-onest-pledge/certificate-pdf:$(RELEASE_VERSION)