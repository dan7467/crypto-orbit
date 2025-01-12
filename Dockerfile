# Build Container Image
FROM ubuntu AS cobuilder

WORKDIR /crypto-orbit

RUN apt-get update && \
    apt install -y git npm && \
    git clone https://github.com/dan7467/crypto-orbit . && \
    npm install nest

# crypto-orbit container image
FROM ubuntu

LABEL org.opencontainers.image.authors="Dan BD" \
        org.opencontainers.image.description="Container image for crypto orbit"

# Install npm in the final stage
RUN apt-get update && apt install -y npm

# Copy project files from the builder stage
COPY --from=cobuilder /crypto-orbit /crypto-orbit

WORKDIR /crypto-orbit

EXPOSE 3000

# Set default user (optional)
# USER someguest

ENTRYPOINT ["npm"]

CMD ["start"]
